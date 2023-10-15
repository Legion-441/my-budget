//* Firebase
import { collection, getDocs, or, query, where } from "firebase/firestore";
import { auth, db } from "../firebase";
//* Utils
import transformBudgetFromFirebaseToApp from "../utils/transform-budget";
//* Types
import { BudgetsListItem } from "../types/AppTypes";

export const fetchUserBudgetsList = async (): Promise<BudgetsListItem[]> => {
  const userUid = auth.currentUser?.uid;
  if (!userUid) throw new Error("Authentication required");

  const budgetsQuery = query(
    collection(db, "budgets"),
    or(where("owner.ownerID", "==", userUid), where("memberIDs", "array-contains", userUid))
  );

  const querySnapshot = await getDocs(budgetsQuery);
  const budgetsArray: BudgetsListItem[] = [];

  querySnapshot.forEach((documentSnapshot) => {
    const budgetData = transformBudgetFromFirebaseToApp(documentSnapshot);
    budgetsArray.push(budgetData);
  });

  return budgetsArray;
};
