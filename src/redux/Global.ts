import { createSlice } from "@reduxjs/toolkit";


export interface IShape {
    wireframe: boolean;
}

// Define the initial state using that type
const initialState = {
  wireframe: false 
};

export const GlobalSettings = createSlice({
  name: "global",
  initialState,
  reducers: {
    wireframeToggle: (state) => {
    state.wireframe = !state.wireframe 
    }
  },
});

export const {  wireframeToggle } = GlobalSettings.actions;

export default GlobalSettings.reducer;
