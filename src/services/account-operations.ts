import { FIREBASE_COLLECTIONS } from "../constants/constants";
//* Firebase
import { arrayUnion, doc, updateDoc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../firebase";
//* Utils
import { transformFetchedAccountData } from "../utils/transform-fetched-data";
import checkAuthentication from "../utils/checkAuthentication";
//* Types
import { BudgetsListItem } from "../types/AppTypes";
import { AccountData } from "../types/AppTypes";

export const fetchAccountData = async (): Promise<AccountData> => {
  const currentUser = checkAuthentication();
  const { uid: currentUserUid } = currentUser;
  const docRef = doc(db, FIREBASE_COLLECTIONS.accounts, currentUserUid);
  const docSnapshot = await getDoc(docRef);
  const finalAccountData = transformFetchedAccountData(docSnapshot);

  if (!docSnapshot.exists()) {
    await setDoc(docRef, { ...finalAccountData });
  }

  return finalAccountData;
};

export const updateAccount = async (budgetData: BudgetsListItem) => {
  const currentUser = checkAuthentication();
  const { uid: currentUserUid } = currentUser;
  await updateDoc(doc(db, FIREBASE_COLLECTIONS.accounts, currentUserUid), { budgetsList: arrayUnion(budgetData) });
};
