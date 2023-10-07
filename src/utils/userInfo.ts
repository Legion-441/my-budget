//* Firebase
import { DocumentData, Query, QuerySnapshot, collection, getDocs, or, query, where } from "firebase/firestore";
import { auth, db } from "../firebase";
//* Types
import { BudgetsListItem } from "../types/AppTypes";

const isValidBudgetItem = (documentData: any): documentData is BudgetsListItem => {
  return (
    typeof documentData === "object" &&
    typeof documentData.name === "string" &&
    typeof documentData.icon === "string" &&
    typeof documentData.owner === "object" &&
    typeof documentData.owner.ownerUsername === "string" &&
    typeof documentData.owner.ownerID === "string" &&
    Array.isArray(documentData.membersID) &&
    documentData.membersID.every((member: any) => typeof member === "string")
  );
};

const transformBudgetsSnapshotToItems = (snapshot: QuerySnapshot<DocumentData>) => {
  const budgetsArray: BudgetsListItem[] = [];

  snapshot.forEach((documentSnapshot) => {
    const documentData = documentSnapshot.data();    
    if (!isValidBudgetItem(documentData)) return;

    const budgetID = documentSnapshot.id;
    const budgetData = { ...documentData, id: budgetID };
    budgetsArray.push(budgetData);
  });

  return budgetsArray
};

export const fetchUserBudgetsList = async () => {
  const userUid = auth.currentUser?.uid;
  if (!userUid) throw new Error("Authentication required");

  const budgetsQuery = query(collection(db, "budgets"),  
    or(where("owner.ownerID", "==", userUid),
      where("membersID", "array-contains", userUid)
    )
  );

  const querySnapshot = await getDocs(budgetsQuery);
  const userBudgets = transformBudgetsSnapshotToItems(querySnapshot);
  return userBudgets;
};