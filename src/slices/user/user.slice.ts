import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk, RootState } from "../../app/store";
//* Utils
import { fetchUserBudgetsList } from "../../services/fetch-budgets-list";
//* Types
import { BudgetsListItem } from "../../types/AppTypes";


type BudgetsLists = {
  budgetsList: BudgetsListItem[]
}

type UserState = {
  data: BudgetsLists
  isFetching: boolean
  fetchError: string | null
}

const INITIAL_USER_STATE: UserState = {
  data: {
    budgetsList: [],
  },
  isFetching: false,
  fetchError: null,
}

export const userSlice = createSlice({
  name: 'user',
  initialState: INITIAL_USER_STATE,
  reducers: {
    startFetchingUserInfo: (state) => {
      state.isFetching = true;
      state.fetchError = null
    },
    setFetchError: (state, action: PayloadAction<string>) => {
      state.isFetching = false;
      state.fetchError = action.payload
    },
    setBudgetsList: (state, action: PayloadAction<BudgetsListItem[]>) => {
      state.isFetching = false;
      state.fetchError = null;
      state.data.budgetsList = action.payload
    },
    clearUserInfo: (state) => {
      state.isFetching = false;
      state.fetchError = null;
      state = INITIAL_USER_STATE
    },
  }
})


//! Actions
export const { startFetchingUserInfo, setFetchError, setBudgetsList, clearUserInfo } = userSlice.actions;
export const fetchUserData = (): AppThunk => async (dispatch) => {
  dispatch(startFetchingUserInfo())
  fetchUserBudgetsList()
    .then((data) => {
      dispatch(setBudgetsList(data || INITIAL_USER_STATE));
    })
    .catch((error) => {
      dispatch(setFetchError(error.message))
    });
};

//! Selector
export const selectUserInfo = (state: RootState): UserState => state.user

export default userSlice.reducer