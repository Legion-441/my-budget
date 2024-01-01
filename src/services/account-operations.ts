import { AppThunkDispatch } from "../app/store";
import { setBudgetsList, setFetchError, startFetchingAccountData } from "../slices/account/account.slice";
import { setAppColorMode } from "../slices/app/app.slice";
//* Constants
import { FIREBASE_COLLECTIONS } from "../constants/constants";
//* Firebase
import { arrayUnion, doc, updateDoc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
//* Utils
import { transformFetchedAccountData } from "../utils/transform-fetched-data";
import checkAuthentication from "../utils/checkAuthentication";
import { getFirestoreErrorText } from "../utils/firestoreErrorHandling";
//* Types
import { BudgetsListItem } from "../types/AppTypes";

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
  const currentUser = checkAuthentication();
  const { uid: currentUserUid } = currentUser;
  await updateDoc(doc(db, FIREBASE_COLLECTIONS.accounts, currentUserUid), { budgetsList: arrayUnion(budgetData) });
};
