import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define a type for the slice state
interface IShapeInfo {
  position: number[];
  size: number[];
  color: string;
  shape: string;
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
      color: "red",
      shape: "Box",
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
      // Action.payload powinien zawierać indeks kształtu do usunięcia
      state.value.splice(action.payload, 1);
    },
  },
});

export const { addShape, removeShape } = Shape.actions;

export default Shape.reducer;
