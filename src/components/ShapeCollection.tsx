import React, { useState } from "react";
import { useAppSelector, useAppDispatch } from "../hooks/hooks";
import { removeShape, changeShapeColor } from "../redux/Shapes";
import { wireframeToggle } from "../redux/Global";

function ShapeCollection() {
  const shapes = useAppSelector((state) => state.Shapes);
  const dispatch = useAppDispatch();
  const [shapeIndexToRemove, setShapeIndexToRemove] = useState<number>(0);

  const handleRemoveShape = () => {
    dispatch(removeShape(shapeIndexToRemove));
  };

  const handleColorChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    shapeIndex: number
  ) => {
    const newColor = e.target.value;
    dispatch(changeShapeColor({ index: shapeIndex, color: newColor }));
  };

  return (
    <>
      <div className="flex flex-row">
        <div className=" space-x-1">
          <label>Index to delete:</label>
          <input
            type="number"
            value={shapeIndexToRemove}
            onChange={(e) => setShapeIndexToRemove(Number(e.target.value))}
          />
          <span
            className="hover:text-red-400 hover:cursor-pointer border-2 border-red-500 p-1"
            onClick={handleRemoveShape}
            >
            Delete shape
          </span>
        </div>
            <div onClick={() => dispatch(wireframeToggle())} className="border-2 cursor-help border-red-400 p-1 hover:border-yellow-400">Toggle wireframe</div>

      </div>

      {/* Tutaj możesz renderować informacje o kształtach */}
      <div className="grid grid-cols-2 gap-1 m-2">
        {shapes.value.map((shape, key) => (
          <div
            key={key}
            className="flex items-center justify-center border-2 border-red-400 p-1 min-w-12"
          >
            {`Shape ${key}: ${shape.shape}`}
            <input
              type="color"
              onChange={(e) => handleColorChange(e, key)}
              value={shape.color}
            />
            
          </div>
        ))}
      </div>
    </>
  );
}

export default ShapeCollection;
