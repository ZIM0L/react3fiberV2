import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define a type for the slice state
interface IShapeInfo {
  position: number[];
  size: number[];
  color: string;
  shape: string;
  texture: number | null;
}

export interface IShape {
  value: IShapeInfo[];
}

// Define the initial state using that type
const initialState: IShape = {
  value: [
    {
      position: [1, 1, 1],
      size: [1, 1, 1],
      color: "#ffffaa",
      shape: "Box",
      texture: 10,
    },
    {
      position: [-1, 1, 1],
      size: [1, 1, 1],
      color: "#003344",
      shape: "Box",
      texture: null,
    },
    {
      position: [0, 1, 2],
      size: [1, 1, 1],
      color: "#ad0033",
      shape: "Box",
      texture: null,
    },
  ],
};

export const Shape = createSlice({
  name: "shapes",
  initialState,
  reducers: {
    addShape: (state, action: PayloadAction<IShapeInfo>) => {
      state.value.push(action.payload);
    },
    removeShape: (state, action: PayloadAction<number>) => {
      state.value.splice(action.payload, 1);
    },
    changeShapeColor: (state, action: PayloadAction<{ index: number; color: string }>) => {
      const { index, color } = action.payload;
      if (state.value[index]) {
        state.value[index].color = color;
      }
    },
    setShapeTexture: (state, action: PayloadAction<{ index: number; texture: number | null }>) => {
      const { index, texture } = action.payload;
      if (state.value[index]) {
        state.value[index].texture = texture;
      }
    },
  },
});

export const { addShape, removeShape, changeShapeColor, setShapeTexture } = Shape.actions;

export default Shape.reducer;
