import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// interface dla ksztaltow
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

// poczatkowe ksztalty
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
    {
      position: [0, 1, -3],
      size: [1, 1, 1],
      color: "#1574bc",
      shape: "Sphere",
      texture: null,
    },
  ],
};
// redux dla ksztaltow
export const Shape = createSlice({
  name: "shapes",
  initialState,
  // funkcje dla ksztaltow
  reducers: {
    addShape: (state, action: PayloadAction<IShapeInfo>) => {
      state.value.push(action.payload);
    },
    removeShape: (state, action: PayloadAction<number>) => {
      state.value.splice(action.payload, 1);
    },
    changeShapeColor: (
      state,
      action: PayloadAction<{ index: number; color: string }>
    ) => {
      const { index, color } = action.payload;
      if (state.value[index]) {
        state.value[index].color = color;
      }
    },
    setShapeTexture: (
      state,
      action: PayloadAction<{ index: number; texture: number | null }>
    ) => {
      const { index, texture } = action.payload;
      if (state.value[index]) {
        state.value[index].texture = texture;
      }
    },
  },
});

export const { addShape, removeShape, changeShapeColor, setShapeTexture } =
  Shape.actions;

export default Shape.reducer;
