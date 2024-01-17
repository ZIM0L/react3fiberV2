import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface IGlobalSettings {
  wireframe: boolean;
  EnvColor: {
    toogle: boolean;
    mesh: string;
  };
  Lights: {
    directLight: {
      position: number[];
      args: [string, number];
      toggle: boolean;
    };
    spotLight: {
      position: number[];
      color: string;
      distance: number;
      toggle: boolean;
    };
  };
}

// Define the initial state using that type
const initialState: IGlobalSettings = {
  wireframe: false,
  EnvColor: {
    toogle: true,
    mesh: "#00aaaa",
  },
  Lights: {
    directLight: {
      position: [0, 1, 0],
      args: ["#ffffaa", 1],
      toggle: true,
    },
    spotLight: {
      position: [0, 1, 0],
      distance: 5,
      color: "#bbff00",
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
    EnvironmentColorChange: (state, action: PayloadAction<string>) => {
      state.EnvColor.mesh = action.payload;
    },
    EnvironmentColorToggle: (state) => {
      state.EnvColor.toogle = !state.EnvColor.toogle;
    },
    directionalLightToggle: (state) => {
      state.Lights.directLight.toggle = !state.Lights.directLight.toggle;
    },
    directionalLightColorChange: (state, action: PayloadAction<string>) => {
      state.Lights.directLight.args[0] = action.payload;
    },
    spotLightToggle: (state) => {
      state.Lights.spotLight.toggle = !state.Lights.spotLight.toggle;
    },
    spotLightColorChange: (state, action: PayloadAction<string>) => {
      state.Lights.spotLight.color = action.payload;
    },
  },
});

export const {
  wireframeToggle,
  EnvironmentColorChange,
  EnvironmentColorToggle,
  directionalLightToggle,
  directionalLightColorChange,
  spotLightToggle,
  spotLightColorChange,
} = GlobalSettings.actions;

export default GlobalSettings.reducer;
