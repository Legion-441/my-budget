import { AppThunkDispatch } from "../app/store";
import { setBudgetsList, setFetchError, startFetchingAccountData } from "../slices/account/account.slice";
import { setAppColorMode } from "../slices/app/app.slice";
//* Constants
import { FIREBASE_COLLECTIONS } from "../constants/constants";
//* Firebase
import { arrayUnion, doc, updateDoc, onSnapshot, arrayRemove } from "firebase/firestore";
import { db } from "../firebase";
//* Utils
import { transformFetchedAccountData } from "../utils/transform-fetched-data";
import checkAuthentication from "../utils/checkAuthentication";
import { getFirestoreErrorText } from "../utils/firestoreErrorHandling";
//* Types
import { FieldValue } from "firebase/firestore";
import { AppBudgetMetaData, BudgetsListItem } from "../types/AppTypes";

export const subscribeToAccountData = (dispatch: AppThunkDispatch) => {
  dispatch(startFetchingAccountData());
  const currentUserUid = checkAuthentication().uid;
  const docRef = doc(db, FIREBASE_COLLECTIONS.accounts, currentUserUid);
  const unsubscribe = onSnapshot(
    docRef,
    (doc) => {
      if (doc.exists()) {
        const finalAccountData = transformFetchedAccountData(doc);
        dispatch(setBudgetsList(finalAccountData.budgetsList));
        dispatch(setAppColorMode(finalAccountData.appTheme));
      } else {
        throw new Error("not-found");
      }
    },
    (error) => {
      const errorText = getFirestoreErrorText(error);
      dispatch(setFetchError(errorText));
    }
  );
  return unsubscribe;
};

export const updateAccount = async (budgetData: BudgetsListItem) => {
  const currentUserUid = checkAuthentication().uid;

  await updateDoc(doc(db, FIREBASE_COLLECTIONS.accounts, currentUserUid), { budgetsList: arrayUnion(budgetData) });
};

export const togglePinToBudgetList = async (budget: AppBudgetMetaData, budgetsList: BudgetsListItem[]) => {
  const currentUserUid = checkAuthentication().uid;
  const accountRef = doc(db, FIREBASE_COLLECTIONS.accounts, currentUserUid);

  const budgetsListItemToUnpin: BudgetsListItem | null = budgetsList.find((item) => item.id === budget.id) || null;
  let budgetsListFieldValue: FieldValue;

  if (budgetsListItemToUnpin) {
    budgetsListFieldValue = arrayRemove(budgetsListItemToUnpin);
  } else {
    const { name, icon, owner, id } = budget;
    const budgetsListItemToPin: BudgetsListItem = { name, icon, owner, id };
    budgetsListFieldValue = arrayUnion(budgetsListItemToPin);
  }

  await updateDoc(accountRef, { budgetsList: budgetsListFieldValue });
};
