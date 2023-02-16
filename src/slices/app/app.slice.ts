import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

export type AppColor = 'light' | "dark"

export interface AppState {
  appColorMode: AppColor;
}

const initialState: AppState = {
  appColorMode: 'light',
}

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setAppColorMode: (state, action: PayloadAction<AppColor>) => {
      state.appColorMode = action.payload
    }
  }
})

//! Actions
export const { setAppColorMode } = appSlice.actions;

//! Selector
export const selectAppColorMode = (state: RootState): AppColor => state.app.appColorMode;

export default appSlice.reducer