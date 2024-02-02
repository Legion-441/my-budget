import { AppThunkDispatch } from "../app/store";
import { setBudgetsList, setFetchError, startFetchingAccountData } from "../slices/account/account.slice";
import { setAppColorMode } from "../slices/app/app.slice";
//* Constants
import { FIREBASE_COLLECTIONS } from "../constants/constants";
//* Firebase
import { arrayUnion, doc, updateDoc, onSnapshot, arrayRemove, setDoc } from "firebase/firestore";
import { db } from "../firebase";
//* Utils
import { transformFetchedAccountData } from "../utils/transform-fetched-data";
import checkAuthentication from "../utils/checkAuthentication";
import { getFirestoreErrorText } from "../utils/firestoreErrorHandling";
//* Types
import { AccountData, AppBudgetMetaData, BudgetsListItem } from "../types/AppTypes";

export const subscribeToAccountData = (dispatch: AppThunkDispatch) => {
  dispatch(startFetchingAccountData());
  const currentUserUid = checkAuthentication().uid;
  const docRef = doc(db, FIREBASE_COLLECTIONS.accounts, currentUserUid);
  const unsubscribe = onSnapshot(
    docRef,
    (doc) => {
      const finalAccountData = transformFetchedAccountData(doc);
      dispatch(setBudgetsList(finalAccountData.budgetsList));
      dispatch(setAppColorMode(finalAccountData.appTheme));

      if (!doc.exists()) {
        createAccountDoc(finalAccountData).catch((error) => console.error(error)); // TODO: handle error
      }
    },
    (error) => {
      const errorText = getFirestoreErrorText(error);
      dispatch(setFetchError(errorText));
    }
  );
  return unsubscribe;
};

export const createAccountDoc = async (accountData: AccountData) => {
  const currentUserUid = checkAuthentication().uid;

  await setDoc(doc(db, FIREBASE_COLLECTIONS.accounts, currentUserUid), accountData);
};

export const pinToBudgetList = async (budget: AppBudgetMetaData) => {
  const currentUserUid = checkAuthentication().uid;
  const accountRef = doc(db, FIREBASE_COLLECTIONS.accounts, currentUserUid);

  const { name, icon, owner, id } = budget;
  const budgetsListItemToPin: BudgetsListItem = { name, icon, owner, id };

  await updateDoc(accountRef, { budgetsList: arrayUnion(budgetsListItemToPin) });
};

export const unpinFromBudgetList = async (budget: AppBudgetMetaData, budgetsList: BudgetsListItem[]) => {
  const currentUserUid = checkAuthentication().uid;
  const accountRef = doc(db, FIREBASE_COLLECTIONS.accounts, currentUserUid);

  const budgetsListItemToUnpin: BudgetsListItem | null = budgetsList.find((item) => item.id === budget.id) || null;

  if (budgetsListItemToUnpin) {
    await updateDoc(accountRef, { budgetsList: arrayRemove(budgetsListItemToUnpin) });
  }
};
