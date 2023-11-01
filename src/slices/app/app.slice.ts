import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
//* Types
import { AppTheme, BudgetsListItem } from "../../types/AppTypes";

interface AppState {
  appColorMode: AppTheme;
  isDrawerOpen: boolean;
  isTempDrawerOpen: boolean;
  pickedBudgetId: string;
  budgetsList: BudgetsListItem[];
}

const INITIAL_APP_STATE: AppState = {
  appColorMode: "dark",
  isDrawerOpen: true,
  isTempDrawerOpen: false,
  pickedBudgetId: "",
  budgetsList: [],
};

export const appSlice = createSlice({
  name: "app",
  initialState: INITIAL_APP_STATE,
  reducers: {
    setAppColorMode: (state, action: PayloadAction<AppTheme>) => {
      state.appColorMode = action.payload;
    },
    toggleDrawer: (state) => {
      state.isDrawerOpen = !state.isDrawerOpen;
    },
    toggleTempDrawer: (state) => {
      state.isTempDrawerOpen = !state.isTempDrawerOpen;
    },
    setPickedBudgetId: (state, action: PayloadAction<string>) => {
      state.pickedBudgetId = action.payload;
    },
  },
});

//! Actions
export const { setAppColorMode, toggleDrawer, toggleTempDrawer, setPickedBudgetId } = appSlice.actions;

//! Selector
export const selectAppColorMode = (state: RootState): AppTheme => state.app.appColorMode;
export const selectIsDrawerOpen = (state: RootState): boolean => state.app.isDrawerOpen;
export const selectIsTempDrawerOpen = (state: RootState): boolean => state.app.isTempDrawerOpen;
export const selectPickedBudgetId = (state: RootState): string => state.app.pickedBudgetId;

export default appSlice.reducer;
