import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import {
  directionalLightToggle,
  directionalLightColorChange,
} from "../redux/Global";

function LightControl() {
  const directLight = useAppSelector(
    (state) => state.GlobalSettings.Lights.directLight
  );
  const dispatch = useAppDispatch();

  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newColor = e.target.value;
    console.log(newColor);
    dispatch(directionalLightColorChange(newColor));
  };
  const toggleLights = () => {
    dispatch(directionalLightToggle());
  };
  return (
    <>
      <div className=" flex flex-col justify-center border-2 items-center border-red-400 p-1  max-w-max">
        <label>Directional Light</label>
        <input
          type="color"
          value={directLight.args[0]}
          onChange={(e) => handleColorChange(e)}
        />
        <div
          onClick={() => toggleLights()}
          className="border-2 cursor-move border-red-400 p-1 hover:border-yellow-400 max-w-max"
        >
          On/Off
        </div>
      </div>
    </>
  );
}

export default LightControl;
