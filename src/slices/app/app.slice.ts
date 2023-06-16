import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

export type AppColor = 'light' | "dark"

export interface BudgetsListItem {
  name: string,
  id: string,
  icon: string
}

export interface UserInfo {
  username: string
  budgetsList: BudgetsListItem[]
}

export interface AppState {
  appColorMode: AppColor;
  isDrawerOpen: boolean;
  isTempDrawerOpen: boolean;
  userInfo: UserInfo
  pickedBudgetId: string
}

const initialState: AppState = {
  appColorMode: 'dark',
  isDrawerOpen: true,
  isTempDrawerOpen: false,
  userInfo: {
    username: "",
    budgetsList: [
      { name: 'Personal', id: '1', icon: 'Person'},
      { name: 'Family', id: '2', icon: 'Groups'},
      { name: 'Holiday', id: '3', icon: 'Surfing'},
    ]
  },
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
    setUsername: (state, action: PayloadAction<string>) => {
      state.userInfo.username = action.payload
    },
    setBudgetsList: (state, action: PayloadAction<BudgetsListItem[]>) => {
      state.userInfo.budgetsList = action.payload
    },
    setPickedBudgetId: (state, action: PayloadAction<string>) => {
      state.pickedBudgetId = action.payload
    },
  }
})

//! Actions
export const { setAppColorMode, toggleDrawer, toggleTempDrawer, setUsername, setBudgetsList, setPickedBudgetId } = appSlice.actions;

//! Selector
export const selectAppColorMode = (state: RootState): AppColor => state.app.appColorMode;
export const selectIsDrawerOpen = (state: RootState): boolean => state.app.isDrawerOpen
export const selectIsTempDrawerOpen = (state: RootState): boolean => state.app.isTempDrawerOpen
export const selectUserInfo = (state: RootState): UserInfo => state.app.userInfo
export const selectPickedBudgetId = (state: RootState): string => state.app.pickedBudgetId

export default appSlice.reducer