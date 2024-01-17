import { PivotControls } from "@react-three/drei";
import { useAppSelector } from "../../hooks/hooks";
import { SpotLight } from "@react-three/drei";

function SpotLightComp() {
  const Global = useAppSelector((state) => state.GlobalSettings); // odczyt
  const spotLight = Global.Lights.spotLight;
  return (
    <>
      {spotLight.toggle && (
        <PivotControls
          lineWidth={1}
          rotation={[0, -Math.PI / 1, 0]}
          axisColors={[0x0ceecc, 0x0ceecc, 0x06eecc]}
        >
          <SpotLight
            position={[0, 5, 0]}
            castShadow
            intensity={0.2}
            distance={spotLight.distance}
            angle={0.7}
            attenuation={7}
            anglePower={2} // Diffuse-cone anglePower (default: 5)
            color={spotLight.color}
          ></SpotLight>
        </PivotControls>
      )}
    </>
  );
}

export default SpotLightComp;
