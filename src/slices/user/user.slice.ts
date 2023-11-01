import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk, RootState } from "../../app/store";
import { setAppColorMode } from "../app/app.slice";
//* Services
import { fetchAccountData } from "../../services/fetch-account-data";
//* Types
import { BudgetsListItem } from "../../types/AppTypes";

type BudgetsLists = {
  budgetsList: BudgetsListItem[];
};

type UserState = {
  data: BudgetsLists;
  isFetching: boolean;
  fetchError: string | null;
};

const INITIAL_USER_STATE: UserState = {
  data: {
    budgetsList: [],
  },
  isFetching: false,
  fetchError: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState: INITIAL_USER_STATE,
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
      state = INITIAL_USER_STATE;
    },
  },
});

//! Actions
export const { startFetchingAccountData, setFetchError, setBudgetsList, addBudgetToList, clearAccountData } = userSlice.actions;
export const fetchAndSetAccountData = (): AppThunk => async (dispatch) => {
  dispatch(startFetchingAccountData());
  fetchAccountData()
    .then((data) => {
      dispatch(setBudgetsList(data.budgetsList));
      dispatch(setAppColorMode(data.appTheme));
    })
    .catch((error) => {
      dispatch(setFetchError(error.message));
    });
};

//! Selector
export const selectUserInfo = (state: RootState): UserState => state.user;

export default userSlice.reducer;
