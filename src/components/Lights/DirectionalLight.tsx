import { PivotControls } from "@react-three/drei";
import { useAppSelector } from "../../hooks/hooks";

function DirectionaLightComp() {
  const Global = useAppSelector((state) => state.GlobalSettings); // odczyt
  const directionalLight = Global.Lights.directLight;
  return (
    <>
      {directionalLight.toggle && (
        <PivotControls
          lineWidth={1}
          rotation={[0, -Math.PI / 2, 0]}
          axisColors={[0xf2e8cc, 0xf2e8cc, 0xf2e8cc]}
        >
          <directionalLight
            intensity={4}
            position={[
              directionalLight.position[0],
              directionalLight.position[1],
              directionalLight.position[2],
            ]}
            args={[directionalLight.args[0], directionalLight.args[1]]}
            castShadow={true}
          />
        </PivotControls>
      )}
    </>
  );
}

export default DirectionaLightComp;
