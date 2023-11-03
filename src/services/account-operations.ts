import { FIREBASE_COLLECTIONS } from "../constants/constants";
//* Firebase
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { auth, db } from "../firebase";
//* Types
import { BudgetsListItem } from "../types/AppTypes";

export const updateAccount = async (budgetData: BudgetsListItem) => {
  if (!auth.currentUser?.uid) throw new Error(""); // TODO: throw error
  const currentUserUid = auth.currentUser?.uid;
  try {
    const accountDocRef = await updateDoc(doc(db, FIREBASE_COLLECTIONS.accounts, currentUserUid), { budgetsList: arrayUnion(budgetData) });
  } catch (error) {
    throw error;
  }
};
