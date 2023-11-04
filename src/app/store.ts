import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
//* Reducers
import appReducer from "./../slices/app/app.slice";
import accountReducer from "../slices/account/account.slice";

export const store = configureStore({
  reducer: {
    app: appReducer,
    user: accountReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
