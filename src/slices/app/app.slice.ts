import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

export type AppColor = 'light' | "dark"

export interface AppState {
  appColorMode: AppColor;
  isDrawerOpen: boolean;
  isTempDrawerOpen: boolean;
  username: string;
}

const initialState: AppState = {
  appColorMode: 'dark',
  isDrawerOpen: true,
  isTempDrawerOpen: false,
  username: "",
}

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setAppColorMode: (state, action: PayloadAction<AppColor>) => {
      state.appColorMode = action.payload
    },
    toggleDrawer: (state) => {
      state.isDrawerOpen = !state.isDrawerOpen
    },
    toggleTempDrawer: (state) => {
      state.isTempDrawerOpen = !state.isTempDrawerOpen
    },
    setUsername: (state, action: PayloadAction<string>) => {
      state.username = action.payload
    }
  }
})

//! Actions
export const { setAppColorMode, toggleDrawer, toggleTempDrawer } = appSlice.actions;

//! Selector
export const selectAppColorMode = (state: RootState): AppColor => state.app.appColorMode;
export const selectIsDrawerOpen = (state: RootState): boolean => state.app.isDrawerOpen
export const selectIsTempDrawerOpen = (state: RootState): boolean => state.app.isTempDrawerOpen
export const selectUsername = (state: RootState): string => state.app.username

export default appSlice.reducer