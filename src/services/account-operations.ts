import { FIREBASE_COLLECTIONS } from "../constants/constants";
//* Firebase
import { arrayUnion, doc, updateDoc, getDoc, setDoc } from "firebase/firestore";
import { auth, db } from "../firebase";
//* Utils
import { transformFetchedAccountData } from "../utils/transform-fetched-data";
//* Types
import { BudgetsListItem } from "../types/AppTypes";
import { AccountData } from "../types/AppTypes";

export const fetchAccountData = async (): Promise<AccountData> => {
  if (!auth.currentUser?.uid) throw new Error("unauthenticated");
  const currentUserUid = auth.currentUser?.uid;
  try {
    const docRef = doc(db, FIREBASE_COLLECTIONS.accounts, currentUserUid);
    const docSnapshot = await getDoc(docRef);
    const finalAccountData = transformFetchedAccountData(docSnapshot);
    
    if (!docSnapshot.exists()) {
      await setDoc(docRef, {...finalAccountData})
    }
    
    return finalAccountData;
  } catch (error) {
    throw error;
  }
  
};

export const updateAccount = async (budgetData: BudgetsListItem) => {
  if (!auth.currentUser?.uid) throw new Error("unauthenticated");
  const currentUserUid = auth.currentUser?.uid;
  try {
    const accountDocRef = await updateDoc(doc(db, FIREBASE_COLLECTIONS.accounts, currentUserUid), { budgetsList: arrayUnion(budgetData) });
  } catch (error) {
    throw error;
  }
};
