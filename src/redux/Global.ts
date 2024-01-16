import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface IGlobalSettings {
  wireframe: boolean;
  Lights: {
    directLight: {
      position: number[];
      args: [string, number];
      toggle: boolean;
    };
    spotLight: {
      position: number[];
      args: [string, number];
      distance: number;
      toggle: boolean;
    };
  };
}

// Define the initial state using that type
const initialState: IGlobalSettings = {
  wireframe: false,
  Lights: {
    directLight: {
      position: [0, 1, 0],
      args: ["#ffffaa", 1],
      toggle: true,
    },
    spotLight: {
      position: [0, 1, 0],
      distance: 5,
      args: ["#ffffaa", 1],
      toggle: false,
    },
  },
};

export const GlobalSettings = createSlice({
  name: "global",
  initialState,
  reducers: {
    wireframeToggle: (state) => {
      state.wireframe = !state.wireframe;
    },
    directionalLightToggle: (state) => {
      state.Lights.directLight.toggle = !state.Lights.directLight.toggle;
    },
    directionalLightColorChange: (state, action: PayloadAction<string>) => {
      state.Lights.directLight.args[0] = action.payload;
    },
  },
});

export const {
  wireframeToggle,
  directionalLightToggle,
  directionalLightColorChange,
} = GlobalSettings.actions;

export default GlobalSettings.reducer;
