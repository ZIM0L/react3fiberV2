import { useState } from "react";
import { useAppDispatch } from "../hooks/hooks";
import { addShape } from "../redux/Shapes";
import ShapeCollection from "./ShapeCollection";
import TextureTab from "./Texture";
import LightControl from "./LightTab";

interface Vec3 {
  x: number;
  y: number;
  z: number;
}

function InputTab() {
  const dispatch = useAppDispatch();

  const [position, setPosition] = useState<Vec3>({ x: 0, y: 0, z: 0 });
  const [size, setSize] = useState<Vec3>({ x: 1, y: 1, z: 1 });
  const [color, setColor] = useState("#ffffff");
  const [shape, setShape] = useState("Box");

  function handleShapeCreate() {
    return {
      position: [position.x, position.y, position.z],
      size: [size.x, size.y, size.z],
      color: color,
      shape: shape,
      texture: null,
    };
  }

  return (
    <>
      <div className=" text-red-400 text-center">Shape Creator</div>
      <div className="flex flex-row">
        <div>
          <form className="flex flex-row space-x-1 justify-center items-center p-1 mt-0">
            {/* Position */}
            <div>
              <div>
                <label>Position X: {position.x} </label>
                <input
                  type="range"
                  min="-11"
                  max="11"
                  value={position.x}
                  onChange={(e) =>
                    setPosition({
                      ...position,
                      x: Number(e.target.value),
                    })
                  }
                />
              </div>
              <div>
                <label>Position Y: {position.y} </label>
                <input
                  type="range"
                  min="-11"
                  max="11"
                  value={position.y}
                  onChange={(e) =>
                    setPosition({
                      ...position,
                      y: Number(e.target.value),
                    })
                  }
                />
              </div>
              <div>
                <label>Position Z: {position.z} </label>
                <input
                  type="range"
                  min="-11"
                  max="11"
                  value={position.z}
                  onChange={(e) =>
                    setPosition({
                      ...position,
                      z: Number(e.target.value),
                    })
                  }
                />
              </div>
            </div>
            {/* Size */}
            <div>
              <div>
                <label>Size X: {size.x} </label>
                <input
                  type="range"
                  min="1"
                  max="11"
                  value={size.x}
                  onChange={(e) =>
                    setSize({
                      ...size,
                      x: Number(e.target.value),
                    })
                  }
                />
              </div>
              <div>
                <label>Size Y: {size.y} </label>
                <input
                  disabled={shape === "Sphere" || shape === "Cylinder"}
                  type="range"
                  min="1"
                  max="11"
                  value={size.y}
                  onChange={(e) =>
                    setSize({
                      ...size,
                      y: Number(e.target.value),
                    })
                  }
                />
              </div>
              <div>
                <label>Size Z: {size.z} </label>
                <input
                  disabled={shape === "Sphere" || shape === "Cone"}
                  type="range"
                  min="1"
                  max="11"
                  value={size.z}
                  onChange={(e) =>
                    setSize({
                      ...size,
                      z: Number(e.target.value),
                    })
                  }
                />
              </div>
            </div>
            <div className="flex flex-col">
              <div
                onClick={(e) => {
                  e.preventDefault, setShape("Box");
                }}
                className={`${
                  shape === "Box" ? "text-red-400" : ""
                } cursor-pointer`}
              >
                Box
              </div>
              <div
                onClick={(e) => {
                  e.preventDefault, setShape("Sphere");
                }}
                className={`${
                  shape === "Sphere" ? "text-red-400" : ""
                } cursor-pointer`}
              >
                Sphere
              </div>
              <div
                onClick={(e) => {
                  e.preventDefault, setShape("Cone");
                }}
                className={`${
                  shape === "Cone" ? "text-red-400" : ""
                } cursor-pointer`}
              >
                Cone
              </div>
              <div
                onClick={(e) => {
                  e.preventDefault, setShape("Cylinder");
                }}
                className={`${
                  shape === "Cylinder" ? "text-red-400" : ""
                } cursor-pointer`}
              >
                Cylinder
              </div>
            </div>
            <div>
              <label>Color: </label>
              <input
                type="color"
                value={color}
                onChange={(e) => setColor(e.target.value)}
              />
            </div>
            <div
              onClick={() => dispatch(addShape(handleShapeCreate()))}
              className="hover:text-red-400 hover:cursor-pointer border-2 border-red-500 p-1"
            >
              Create shape
            </div>
          </form>
          <LightControl />
        </div>
        <div className="text-center border-l-2 border-red-400 p-2 ">
          <ShapeCollection />
        </div>
        <TextureTab />
      </div>
    </>
  );
}

export default InputTab;
