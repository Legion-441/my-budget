//* Firebase
import { collection, getDocs, or, query, where } from "firebase/firestore";
import { auth, db } from "../firebase";
//* Utils
import { transformFetchedBudgetsData } from "../utils/transform-fetched-data";
//* Types
import { BudgetMetaData, BudgetsListItem } from "../types/AppTypes";

export const fetchUserBudgetsList = async (): Promise<BudgetMetaData[]> => {
  const userUid = auth.currentUser?.uid;
  if (!userUid) throw new Error("Authentication required");

  const budgetsQuery = query(
    collection(db, "budgets"),
    or(where("owner.ownerID", "==", userUid), where("memberIDs", "array-contains", userUid))
  );

  const querySnapshot = await getDocs(budgetsQuery);
  const budgetsArray: BudgetMetaData[] = [];

  querySnapshot.forEach((documentSnapshot) => {
    const budgetData = transformFetchedBudgetsData(documentSnapshot);
    budgetsArray.push(budgetData);
  });

  return budgetsArray;
};
