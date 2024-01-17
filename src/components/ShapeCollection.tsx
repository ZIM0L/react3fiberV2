import React, { useState } from "react";
import { useAppSelector, useAppDispatch } from "../hooks/hooks";
import { removeShape, changeShapeColor } from "../redux/Shapes";
import { wireframeToggle } from "../redux/Global";
// Component od pokazywania ksztaltow wystepujacych i usuwania
function ShapeCollection() {
  //Pobierania z reduxa wartosci z obiektow
  const shapes = useAppSelector((state) => state.Shapes);
  // dispatch jest potrzebny aby wywolywac metody globalnych z reduxa

  const dispatch = useAppDispatch();
  // zmiena z reacta aby dalo sie usunac ksztalt o danym indexie
  const [shapeIndexToRemove, setShapeIndexToRemove] = useState<number>(0);
  // funcka odpowiedzialna za usuniecie ksztaltu
  const handleRemoveShape = () => {
    dispatch(removeShape(shapeIndexToRemove));
  };
  // funkcja od zmiany koloru ksztaltow
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
        {/* input od wyboru indexu */}
        <div className=" space-x-1">
          <label>Index to delete:</label>
          <input
            type="number"
            value={shapeIndexToRemove}
            onChange={(e) => setShapeIndexToRemove(Number(e.target.value))}
          />
          {/* span od usuniecia */}
          <span
            className="hover:text-red-400 hover:cursor-pointer border-2 border-red-500 p-1"
            onClick={handleRemoveShape}
          >
            Delete shape
          </span>
        </div>
        {/* div odpowiedzialny za wlaczenie/wylaczenie wireframe */}
        <div
          onClick={() => dispatch(wireframeToggle())}
          className="border-2 cursor-help border-red-400 p-1 hover:border-yellow-400"
        >
          Toggle wireframe
        </div>
      </div>

      <div className="grid grid-cols-2 gap-1 m-2">
        {/* wypisanie wszystkich istniejacych ksztaltow z tablicy */}
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
