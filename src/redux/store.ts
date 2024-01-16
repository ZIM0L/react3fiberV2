import { configureStore } from "@reduxjs/toolkit";
import Shapes from "./Shapes";
import GlobalSettings from "./Global";
// ...

export const store = configureStore({
  reducer: {
    Shapes: Shapes,
    GlobalSettings: GlobalSettings,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
