import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk, RootState } from "../../app/store";
import { setAppColorMode } from "../app/app.slice";
//* Services
import { fetchAccountData } from "../../services/account-operations";
//* Types
import { BudgetsListItem } from "../../types/AppTypes";
//* Utils
import { getFirestoreErrorText } from "../../utils/firestoreErrorHandling";

type BudgetsLists = {
  budgetsList: BudgetsListItem[];
};

type AccountState = {
  data: BudgetsLists;
  isFetching: boolean;
  fetchError: string | null;
};

const INITIAL_ACCOUNT_STATE: AccountState = {
  data: {
    budgetsList: [],
  },
  isFetching: false,
  fetchError: null,
};

export const accountSlice = createSlice({
  name: "account",
  initialState: INITIAL_ACCOUNT_STATE,
  reducers: {
    startFetchingAccountData: (state) => {
      state.isFetching = true;
      state.fetchError = null;
    },
    setFetchError: (state, action: PayloadAction<string>) => {
      state.isFetching = false;
      state.fetchError = action.payload;
    },
    setBudgetsList: (state, action: PayloadAction<BudgetsListItem[]>) => {
      state.isFetching = false;
      state.fetchError = null;
      state.data.budgetsList = action.payload;
    },
    addBudgetToList: (state, action: PayloadAction<BudgetsListItem>) => {
      state.data.budgetsList.push(action.payload);
    },
    clearAccountData: (state) => {
      state = INITIAL_ACCOUNT_STATE;
    },
  },
});

//! Actions
export const { startFetchingAccountData, setFetchError, setBudgetsList, addBudgetToList, clearAccountData } = accountSlice.actions;
export const fetchAndSetAccountData = (): AppThunk => async (dispatch) => {
  dispatch(startFetchingAccountData());
  fetchAccountData()
    .then((data) => {
      dispatch(setBudgetsList(data.budgetsList));
      dispatch(setAppColorMode(data.appTheme));
    })
    .catch((error) => {
      const errorText = getFirestoreErrorText(error);
      dispatch(setFetchError(errorText));
    });
};

//! Selector
export const selectAccountInfo = (state: RootState): AccountState => state.user;

export default accountSlice.reducer;
