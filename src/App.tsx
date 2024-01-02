import { Canvas } from "@react-three/fiber";
import {
  OrbitControls,
  Environment,
  PivotControls,
  Sphere,
  Box,
  Cylinder,
  Cone,
  Outlines,
} from "@react-three/drei";

import * as THREE from "three";
import InputTab from "./components/InputTab";
import { useAppSelector } from "./hooks/hooks";

const CanvasTest = () => {
  const shapeArray = useAppSelector((state) => state.Shapes); // odczyt
  // const dispatch = useAppDispatch(); // zmiana

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
      <Canvas style={{ position: "absolute" }}>
        <OrbitControls makeDefault />
        <ambientLight intensity={1} />
        <directionalLight
          position={[0, 4, 1]}
          args={[0xac733f, 10]}
          castShadow
        />

        <Environment background near={1} far={1000} resolution={256}>
          <mesh scale={100}>
            <sphereGeometry args={[1, 64, 64]} />
            <meshBasicMaterial color={0x00ffff} side={THREE.BackSide} />
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
              {/* <mesh>
                <cylinderGeometry args={[2,2,3]} />
                <meshStandardMaterial color={shape.color}/>
              </mesh> */}
              <ShapeComponent
                position={[
                  shape.position[0],
                  shape.position[1],
                  shape.position[2],
                ]}
                args={getShapeSize(shape.shape, shape.size)}
              >
                <meshStandardMaterial color={shape.color} />
                <Outlines thickness={0.01} color="black" opacity={0.1} />
              </ShapeComponent>
              {/* <mesh position={[shape.position[0],shape.position[1],shape.position[2]]} castShadow receiveShadow>
                <boxGeometry args={[shape.size[0],shape.size[1],shape.size[2]]} />
                <meshStandardMaterial color={shape.color} />
              </mesh> */}
            </PivotControls>
          );
        })}
      </Canvas>
    </>
  );
};

export default CanvasTest;
