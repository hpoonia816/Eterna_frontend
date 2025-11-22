import { configureStore } from "@reduxjs/toolkit";
import tokenReducer from "./slices/tokenSlice";

export const store = configureStore({
  reducer: {
    tokens: tokenReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["tokens/setTokens", "tokens/updatePrice"],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

