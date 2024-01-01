import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
//* Types
import { BudgetsListItem } from "../../types/AppTypes";
//* Utils

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
    removeBudgetFromList: (state, action: PayloadAction<string>) => {
      state.data.budgetsList = state.data.budgetsList.filter((budget) => budget.id !== action.payload);
    },
    clearAccountData: (state) => {
      state = INITIAL_ACCOUNT_STATE;
    },
  },
});

//! Actions
export const { startFetchingAccountData, setFetchError, setBudgetsList, addBudgetToList, removeBudgetFromList, clearAccountData } =
  accountSlice.actions;

//! Selector
export const selectAccountInfo = (state: RootState): AccountState => state.user;

export default accountSlice.reducer;
