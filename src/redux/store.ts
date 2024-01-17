import { configureStore } from "@reduxjs/toolkit";
import Shapes from "./Shapes";
import GlobalSettings from "./Global";

// zmiene do odwolywanian sie 
export const store = configureStore({
  reducer: {
    Shapes: Shapes,
    GlobalSettings: GlobalSettings,
  },
});

//  Potrzebne dla TS
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
