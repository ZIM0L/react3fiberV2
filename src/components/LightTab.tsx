import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import {
  directionalLightToggle,
  directionalLightColorChange,
  spotLightColorChange,
  spotLightToggle,
  EnvironmentColorChange,
  EnvironmentColorToggle,
} from "../redux/Global";

function LightControl() {
  const directLight = useAppSelector(
    (state) => state.GlobalSettings.Lights.directLight
  );
  const spotLight = useAppSelector(
    (state) => state.GlobalSettings.Lights.spotLight
  );
  const worldMesh = useAppSelector((state) => state.GlobalSettings.EnvColor);
  const dispatch = useAppDispatch();

  const handleColorChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    lightNum: number
  ) => {
    const newColor = e.target.value;
    switch (lightNum) {
      case 0:
        dispatch(EnvironmentColorChange(newColor));
        break;
      case 1:
        dispatch(directionalLightColorChange(newColor));
        break;
      case 2:
        dispatch(spotLightColorChange(newColor));
        break;
      default:
        break;
    }
  };
  const toggleLights = (lightNum: number) => {
    switch (lightNum) {
      case 0:
        dispatch(EnvironmentColorToggle());
        break;
      case 1:
        dispatch(directionalLightToggle());
        break;
      case 2:
        dispatch(spotLightToggle());
        break;

      default:
        break;
    }
  };

  return (
    <div className="flex flex-row ">
      <div className=" flex flex-col justify-center border-2 items-center border-red-400 p-1  max-w-max">
        <label>World Mesh</label>
        <input
          type="color"
          value={worldMesh.mesh}
          onChange={(e) => handleColorChange(e, 0)}
        />
        <div
          onClick={() => toggleLights(0)}
          className="border-2 cursor-move border-red-400 p-1 hover:border-yellow-400 max-w-max"
        >
          On/Off
        </div>
      </div>
      <div className=" flex flex-col justify-center border-2 items-center border-red-400 p-1  max-w-max">
        <label>Directional Light</label>
        <input
          type="color"
          value={directLight.args[0]}
          onChange={(e) => handleColorChange(e, 1)}
        />
        <div
          onClick={() => toggleLights(1)}
          className="border-2 cursor-move border-red-400 p-1 hover:border-yellow-400 max-w-max"
        >
          On/Off
        </div>
      </div>
      <div className=" flex flex-col justify-center border-2 items-center border-red-400 p-1  max-w-max">
        <label>Spot Light</label>
        <input
          type="color"
          value={spotLight.color}
          onChange={(e) => handleColorChange(e, 2)}
        />
        <div
          onClick={() => toggleLights(2)}
          className="border-2 cursor-move border-red-400 p-1 hover:border-yellow-400 max-w-max"
        >
          On/Off
        </div>
      </div>
    </div>
  );
}

export default LightControl;
