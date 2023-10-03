import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk, RootState } from "../../app/store";
//* Utils
import { fetchFirebaseUserInfo } from "../../utils/userInfo";
import { Timestamp } from "firebase/firestore";

export interface BudgetsListItem {
  name: string,
  id: string,
  icon: string
  createdAt: Timestamp,
  ownerID: string
}

export interface UserBudgets {
  budgetsListAsOwner: BudgetsListItem[]
  budgetsListAsMember: BudgetsListItem[]
}

export interface UserState {
  data: UserBudgets
  isFetching: boolean
  fetchError: string | null
}

const INITIAL_USER_STATE: UserState = {
  data: {
    budgetsListAsOwner: [],
    budgetsListAsMember: [],
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
    setBudgetsList: (state, action: PayloadAction<UserBudgets>) => {
      state.isFetching = false;
      state.fetchError = null;
      state.data = action.payload
    },
    clearUserInfo: (state) => {
      state.isFetching = false;
      state.fetchError = null;
      state.data = INITIAL_USER_STATE.data
    },
  }
})


//! Actions
export const { startFetchingUserInfo, setFetchError, setBudgetsList, clearUserInfo } = userSlice.actions;
export const fetchUserData = (): AppThunk => async (dispatch) => {
  dispatch(startFetchingUserInfo())
  fetchFirebaseUserInfo()
    .then((data) => {
      dispatch(setBudgetsList(data || INITIAL_USER_STATE.data));
    })
    .catch((error) => {
      dispatch(setFetchError(error.message))
    });
};

//! Selector
export const selectUserInfo = (state: RootState): UserState => state.user

export default userSlice.reducer