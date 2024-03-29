import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

export type AppColor = 'light' | "dark"

export interface AppState {
  appColorMode: AppColor;
  isDrawerOpen: boolean;
  isTempDrawerOpen: boolean;
  pickedBudgetId: string
}

const initialState: AppState = {
  appColorMode: 'dark',
  isDrawerOpen: true,
  isTempDrawerOpen: false,
  pickedBudgetId: "",
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
    setPickedBudgetId: (state, action: PayloadAction<string>) => {
      state.pickedBudgetId = action.payload
    },
  }
})

//! Actions
export const { setAppColorMode, toggleDrawer, toggleTempDrawer, setPickedBudgetId } = appSlice.actions;

//! Selector
export const selectAppColorMode = (state: RootState): AppColor => state.app.appColorMode;
export const selectIsDrawerOpen = (state: RootState): boolean => state.app.isDrawerOpen
export const selectIsTempDrawerOpen = (state: RootState): boolean => state.app.isTempDrawerOpen
export const selectPickedBudgetId = (state: RootState): string => state.app.pickedBudgetId

export default appSlice.reducer