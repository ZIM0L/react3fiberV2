import { useState } from "react";
import { useAppDispatch } from "../hooks/hooks";
import { setShapeTexture } from "../redux/Shapes";

function TextureTab() {
    const dispatch = useAppDispatch();
    const [selectedTexture, setSelectedTexture] = useState<number | null>(null);
    const [selectedTextureURL, setSelectedTextureURL] = useState<string>("");
    const [indexToUpdate, setIndexToUpdate] = useState<number>(0)

    const handleTextureButton = (texture: number | null) => {
        setSelectedTexture(texture);
        dispatch(setShapeTexture({ index: indexToUpdate, texture })); // Zmienić 0 na odpowiedni indeks kształtu
    };


    return (
        <div className="flex-col justify-center">
            <div>Index to texture:</div>
            <input type="number"  value={indexToUpdate} onChange={(e) => setIndexToUpdate(Number(e.target?.value))}/>
            <div className="flex items-center flex-wrap justify-start min-w-10 py-2">
                <div
                    onClick={() => {handleTextureButton(10)
                         setSelectedTextureURL("stone.jpg")}}
                    className={`border-2 p-1 hover:border-blue-500 cursor-pointer ${
                        selectedTexture == 10 ? "selected" : ""
                    }`}
                >
                    Rock
                </div>
                <div
                    onClick={() => {handleTextureButton(11)
                     setSelectedTextureURL("low_poly.jpg")}}
                    className={`border-2 p-1 hover:border-blue-500 cursor-pointer ${
                        selectedTexture == 11 ? "selected" : ""
                    }`}
                >
                    Low Poly
                </div>
                <div
                    onClick={() => {handleTextureButton(12)
                     setSelectedTextureURL("black-polygon.jpg")}}
                    className={`border-2 p-1 hover:border-blue-500 cursor-pointer ${
                        selectedTexture == 12 ? "selected" : ""
                    }`}
                >
                    Black Polygon
                </div>
                <div
                    onClick={() => {handleTextureButton(13)
                     setSelectedTextureURL("grass.jpg")}}
                    className={`border-2 p-1 hover:border-blue-500 cursor-pointer ${
                        selectedTexture == 13 ? "selected" : ""
                    }`}
                >
                    grass
                </div>
                <div
                    onClick={() => {handleTextureButton(null)
                        setSelectedTextureURL("mesh.png")}}
                    className={`border-2 p-1 hover:border-blue-500 cursor-pointer ${
                        selectedTexture == null ? "selected" : ""
                    }`}
                >
                    Only Mesh
                </div>
            </div>
             <img className="w-w20 h-20" src={selectedTextureURL} alt="Selected Texture" />
        </div>
    );
}

export default TextureTab;
