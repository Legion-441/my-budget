import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk, RootState } from "../../app/store";
//* Services
import { fetchBudgetMetadataByID } from "../../services/budget-list-operations";
//* Utils
import { getFirestoreErrorText } from "../../utils/firestoreErrorHandling";
//* Types
import { AppTheme, BudgetMetaData, BudgetsListItem } from "../../types/AppTypes";

type SelectedBudget = {
  data: BudgetMetaData | null;
  isFetching: boolean;
  fetchError: string | null;
};
interface AppState {
  appColorMode: AppTheme;
  isDrawerOpen: boolean;
  isTempDrawerOpen: boolean;
  pickedBudget: SelectedBudget;
  budgetsList: BudgetsListItem[];
}

const INITIAL_APP_STATE: AppState = {
  appColorMode: "dark",
  isDrawerOpen: true,
  isTempDrawerOpen: false,
  pickedBudget: {
    data: null,
    isFetching: false,
    fetchError: null,
  },
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
    setPickedBudget: (state, action: PayloadAction<BudgetMetaData>) => {
      state.pickedBudget.data = action.payload;
    },
    startFetchingBudgetMetadata: (state) => {
      state.pickedBudget.isFetching = true;
      state.pickedBudget.fetchError = null;
    },
    setBudgetMetadataError: (state, action: PayloadAction<string>) => {
      state.pickedBudget.isFetching = false;
      state.pickedBudget.fetchError = action.payload;
    },
  },
});

//! Actions
export const { setAppColorMode, toggleDrawer, toggleTempDrawer, setPickedBudget, startFetchingBudgetMetadata, setBudgetMetadataError } =
  appSlice.actions;
export const fetchAndSetSelectedBudget =
  (budgetID: string): AppThunk =>
  async (dispatch) => {
    dispatch(startFetchingBudgetMetadata());
    fetchBudgetMetadataByID(budgetID)
      .then((data) => {
        console.log(data.name);
        dispatch(setPickedBudget(data));
      })
      .catch((error) => {
        const errorText = getFirestoreErrorText(error);
        console.error(errorText);
        dispatch(setBudgetMetadataError(errorText));
      });
  };

//! Selector
export const selectAppColorMode = (state: RootState): AppTheme => state.app.appColorMode;
export const selectIsDrawerOpen = (state: RootState): boolean => state.app.isDrawerOpen;
export const selectIsTempDrawerOpen = (state: RootState): boolean => state.app.isTempDrawerOpen;
export const selectPickedBudget = (state: RootState): BudgetMetaData | null => state.app.pickedBudget.data;

export default appSlice.reducer;
