import { PayloadAction, createSlice } from "@reduxjs/toolkit";
// interface dla globacl
interface IGlobalSettings {
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

// Poczatkowe wartosci
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
// redux dla glodabi
export const GlobalSettings = createSlice({
  name: "global",
  initialState,
  // funckje dla swiatla, wireframa, mesha swiata
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
