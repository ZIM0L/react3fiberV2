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
  Stars,
  Sparkles
} from "@react-three/drei";

import * as THREE from "three";
import InputTab from "./components/InputTab";
import { useAppSelector } from "./hooks/hooks";
import DirectionaLightComp from "./components/Lights/Directionallight";
import SpotLightComp from "./components/Lights/SpotLight";
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


  return (
    <>
      <InputTab />
      <Canvas style={{ position: "absolute" }} camera={{ position: [0, 4, 8] }} shadows>
      <OrbitControls makeDefault  />
      <ambientLight intensity={1.5} />

      <SpotLightComp />
      <DirectionaLightComp/>

      {
        Global.EnvColor.toogle 
        ? 
        <Environment background near={1} far={1000} resolution={256}>
          <mesh scale={100}>
            <sphereGeometry args={[1, 64, 64]} />
            <meshBasicMaterial color={Global.EnvColor.mesh} side={THREE.BackSide} />
          </mesh>
        </Environment>
        
        :
        <>
          <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={3} />
          <Sparkles count={120} speed={3.3} opacity={1} color={'#ffa500'} size={5} scale={[20,20,20]} noise={2}/>
        </>
      }

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
