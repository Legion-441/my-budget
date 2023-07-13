import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

export interface BudgetsListItem {
  name: string,
  id: string,
  icon: string
}

export interface UserInfo {
  username: string
  budgetsList: BudgetsListItem[]
}

export interface UserState {
  data: UserInfo
  isFetching: boolean
  fetchError: string | null
}

const initialState: UserState = {
  data: {
    username: "",
    budgetsList: [],
  },
  isFetching: false,
  fetchError: null,
}

export const userSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    startFetchingUserInfo: (state) => {
      state.isFetching = true;
      state.fetchError = null
    },
    setFetchError: (state, action: PayloadAction<string>) => {
      state.isFetching = false;
      state.fetchError = action.payload
    },
    setUsername: (state, action: PayloadAction<string>) => {
      state.isFetching = false;
      state.fetchError = null;
      state.data.username = action.payload
    },
    setBudgetsList: (state, action: PayloadAction<BudgetsListItem[]>) => {
      state.isFetching = false;
      state.fetchError = null;
      state.data.budgetsList = action.payload
    },
  }
})

//! Actions
export const { startFetchingUserInfo, setFetchError, setUsername, setBudgetsList, } = userSlice.actions;

//! Selector
export const selectUserInfo = (state: RootState): UserState => state.user

export default userSlice.reducer