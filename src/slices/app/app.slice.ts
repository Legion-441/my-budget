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
  fetching: boolean,
  fetchError: string | null
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
    budgetsList: [],
    fetching: false,
    fetchError: null
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
    startFetchingUserInfo: (state) => {
      state.userInfo.fetching = true;
      state.userInfo.fetchError = null
    },
    setFetchError: (state, action: PayloadAction<string>) => {
      state.userInfo.fetching = false;
      state.userInfo.fetchError = action.payload
    },
    setUsername: (state, action: PayloadAction<string>) => {
      state.userInfo.fetching = false;
      state.userInfo.fetchError = null;
      state.userInfo.username = action.payload
    },
    setBudgetsList: (state, action: PayloadAction<BudgetsListItem[]>) => {
      state.userInfo.fetching = false;
      state.userInfo.fetchError = null;
      state.userInfo.budgetsList = action.payload
    },
    setPickedBudgetId: (state, action: PayloadAction<string>) => {
      state.pickedBudgetId = action.payload
    },
  }
})

//! Actions
export const { setAppColorMode, toggleDrawer, toggleTempDrawer, startFetchingUserInfo, setFetchError, setUsername, setBudgetsList, setPickedBudgetId } = appSlice.actions;

//! Selector
export const selectAppColorMode = (state: RootState): AppColor => state.app.appColorMode;
export const selectIsDrawerOpen = (state: RootState): boolean => state.app.isDrawerOpen
export const selectIsTempDrawerOpen = (state: RootState): boolean => state.app.isTempDrawerOpen
export const selectUserInfo = (state: RootState): UserInfo => state.app.userInfo
export const selectPickedBudgetId = (state: RootState): string => state.app.pickedBudgetId

export default appSlice.reducer