import { useState } from "react";
import { useAppSelector, useAppDispatch } from "../hooks/hooks";
import { removeShape } from "../redux/Shapes";

function ShapeCollection() {
  const shapes = useAppSelector((state) => state.Shapes);
  const dispatch = useAppDispatch();
  const [shapeIndexToRemove, setShapeIndexToRemove] = useState<number>(0);

  const handleRemoveShape = () => {
    dispatch(removeShape(shapeIndexToRemove));
  };

  return (
    <>
      <div className=" space-x-2">
        <label>Index to delete:</label>
        <input
          type="number"
          value={shapeIndexToRemove}
          onChange={(e) => setShapeIndexToRemove(Number(e.target.value))}
        />
        <button
          className="hover:text-red-400 hover:cursor-pointer border-2 border-red-500 p-1"
          onClick={handleRemoveShape}
        >
          Delete shape
        </button>
      </div>


      {/* Tutaj możesz renderować informacje o kształtach */}
      <ul className="flex flex-row space-x-1 m-2">
        {shapes.value.map((shape, key) => (
          <li key={key} className="border-2 border-red-400 p-1">
            {`Shape ${key}: ${shape.shape}, Color: ${shape.color}`}
          </li>
        ))}
      </ul>
    </>
  );
}

export default ShapeCollection;
