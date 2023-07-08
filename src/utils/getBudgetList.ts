import { Dispatch } from "redux";
import { setBudgetsList, setFetchError } from "../slices/app/app.slice";

export const fetchBudgetsListFromFirestore = async (dispatch: Dispatch, signal: AbortSignal) => {
  try {
    const res = await fetch('http://192.168.0.4:3004/budgetlist', { signal });

    if (!res.ok) {
      throw new Error(`HTTP error! ${res.url} ${res.status} (${res.statusText})`);
    }

    const data = await res.json();
    dispatch(setBudgetsList(data.budgetsList));
  } catch (error) {
    const err = error as Error
    if (err.name !== "AbortError") {
      console.error(err);
      dispatch(setFetchError(err.message))
    }
  }
};

