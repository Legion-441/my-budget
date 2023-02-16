import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';

//! Reducers
import appReducer from './../slices/app/app.slice'

export const store = configureStore({
  reducer: {
    app: appReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
