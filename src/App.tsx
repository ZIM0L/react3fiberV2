import { Canvas, useLoader } from "@react-three/fiber";
import {
  OrbitControls,
  Environment,
  PivotControls,
  Sphere,
  Box,
  Cylinder,
  Cone,
  Outlines,
  Wireframe,
} from "@react-three/drei";

import * as THREE from "three";
import InputTab from "./components/InputTab";
import { useAppSelector } from "./hooks/hooks";

const CanvasTest = () => {
  const shapeArray = useAppSelector((state) => state.Shapes); // odczyt
  const Global = useAppSelector((state) => state.GlobalSettings); // odczyt

  const [colorMap] = useLoader(THREE.TextureLoader, ["stone.jpg"]);
  const [colorMap2] = useLoader(THREE.TextureLoader, ["low_poly.jpg"]);
  const [colorMap3] = useLoader(THREE.TextureLoader, ["black-polygon.jpg"]);
  const [colorMap4] = useLoader(THREE.TextureLoader, ["grass.jpg"]);
  const [colorMap5] = useLoader(THREE.TextureLoader, ["mesh.png"]);

  const getShapeComponent = (shapeType: string) => {
    switch (shapeType) {
      case "Box":
        return Box;
      case "Sphere":
        return Sphere;
      case "Cylinder":
        return Cylinder;
      case "Cone":
        return Cone;
      default:
        return Box; // Domyślny kształt
    }
  };

  const getShapeSize = (
    shapeType: string,
    size: number[]
  ): [number, number?, number?] => {
    switch (shapeType) {
      case "Box":
        return [size[0], size[1], size[2]];
      case "Sphere":
        return [size[0]]; // Zakładam, że rozmiar sfery to tylko promień
      case "Cylinder":
        return [size[0], size[0], size[2]]; // Zakładam, że rozmiar cylindra to promień podstawy, promień górnej podstawy, wysokość
      case "Cone":
        return [size[0], size[1]]; // Zakładam, że rozmiar stożka to promień podstawy, wysokość
      default:
        return [1, 1, 1]; // Domyślny rozmiar dla nieznanego kształtu
    }
  };

  const directionalLight = Global.Lights.directLight;
  return (
    <>
      <InputTab />
      <Canvas style={{ position: "absolute" }} shadows>
        <OrbitControls makeDefault />
        <PivotControls
          lineWidth={1}
          rotation={[0, -Math.PI / 2, 0]}
          axisColors={[0xf2e8cc, 0xf2e8cc, 0xf2e8cc]}
        >
          <ambientLight intensity={1} />

          {/* <SpotLight
        castShadow 
  distance={5}
  angle={0.15}
  attenuation={5}
  anglePower={5} // Diffuse-cone anglePower (default: 5)
/> */}
          {directionalLight.toggle && (
            <directionalLight
              intensity={2}
              position={[
                directionalLight.position[0],
                directionalLight.position[1],
                directionalLight.position[2],
              ]}
              args={[directionalLight.args[0], directionalLight.args[1]]}
              castShadow={true}
            />
          )}
        </PivotControls>

        <Environment background near={1} far={1000} resolution={256}>
          <mesh scale={100}>
            <sphereGeometry args={[1, 64, 64]} />
            <meshBasicMaterial color={0x00aaaa} side={THREE.BackSide} />
          </mesh>
        </Environment>

        {shapeArray.value.map((shape, key) => {
          const ShapeComponent = getShapeComponent(shape.shape);
          return (
            <PivotControls
              key={key}
              opacity={0.6}
              scale={
                ((shape.size[0] + shape.size[1] + shape.size[2]) / 4) * 1.2
              }
              visible={true}
              rotation={[0, -Math.PI / 2, 0]}
              depthTest={false}
              lineWidth={1}
              anchor={[0, 0, 0]}
            >
              '
              <ShapeComponent
                castShadow
                receiveShadow
                position={[
                  shape.position[0],
                  shape.position[1],
                  shape.position[2],
                ]}
                args={getShapeSize(shape.shape, shape.size)}
              >
                <meshStandardMaterial
                  color={shape.color}
                  map={
                    shape.texture == 10
                      ? colorMap
                      : shape.texture == 11
                      ? colorMap2
                      : shape.texture == 12
                      ? colorMap3
                      : shape.texture == 13
                      ? colorMap4
                      : colorMap5
                  }
                />
                <Outlines thickness={0.01} color="black" opacity={0.1} />
                {Global.wireframe && (
                  <Wireframe stroke={0xbc214a} thickness={0.02} />
                )}
              </ShapeComponent>
            </PivotControls>
          );
        })}
      </Canvas>
    </>
  );
};

export default CanvasTest;
