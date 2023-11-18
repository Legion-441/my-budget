import { FIREBASE_COLLECTIONS } from "../constants/constants";
//* Firebase
import { Timestamp, addDoc, collection, deleteDoc, doc, getDoc, getDocs, or, query, updateDoc, where } from "firebase/firestore";
import { db } from "../firebase";
//* Utils
import { transformFetchedBudgetsData } from "../utils/transform-fetched-data";
import checkAuthentication from "../utils/checkAuthentication";
import getChangedBudgetData from "../utils/get-budget-changes";
//* Types
import { BudgetFormData, FirebaseBudgetMetaData, BudgetsListItem, AppBudgetMetaData, BudgetState } from "../types/AppTypes";

export const fetchBudgetMetadataByID = async (budgetID: string): Promise<AppBudgetMetaData> => {
  checkAuthentication();

  const docRef = doc(db, FIREBASE_COLLECTIONS.budgets, budgetID);
  const docSnapshot = await getDoc(docRef);
  if (!docSnapshot.exists()) throw new Error("not-found");
  const finalAccountData = transformFetchedBudgetsData(docSnapshot);

  return finalAccountData;
};

export const fetchUserBudgetsMetadata = async (): Promise<AppBudgetMetaData[]> => {
  const currentUser = checkAuthentication();
  const { uid: currentUserUid } = currentUser;

  const budgetsQuery = query(
    collection(db, FIREBASE_COLLECTIONS.budgets),
    or(where("owner.id", "==", currentUserUid), where("memberIDs", "array-contains", currentUserUid))
  );

  const querySnapshot = await getDocs(budgetsQuery);
  const budgetsArray: AppBudgetMetaData[] = [];

  querySnapshot.forEach((docSnapshot) => {
    const budgetData = transformFetchedBudgetsData(docSnapshot);
    budgetsArray.push(budgetData);
  });

  return budgetsArray;
};

export const createBudget = async (budgetFormData: BudgetFormData): Promise<BudgetsListItem> => {
  const currentUser = checkAuthentication();
  const { displayName: currentUserDisplayName, email: currentUserEmail, uid: currentUserUid } = currentUser;
  const { memberIDs } = budgetFormData;
  const currentUserUsername = currentUserDisplayName || currentUserEmail || ""; // TODO: make function to convert email into displayName
  const currentDate = new Date();
  const newBudgetInfo: FirebaseBudgetMetaData = {
    ...budgetFormData,
    memberIDs: memberIDs, // TODO: add feature: sending invitations, add membersIDs when invitations are accepted by users
    owner: { username: currentUserUsername, id: currentUserUid },
    createdAt: Timestamp.fromDate(currentDate),
  };
  const docRef = await addDoc(collection(db, FIREBASE_COLLECTIONS.budgets), newBudgetInfo);

  const { icon, name, owner } = newBudgetInfo;
  const budgetData: BudgetsListItem = {
    icon,
    id: docRef.id,
    name,
    owner,
  };

  console.log("Document written with ID: ", docRef.id);
  return budgetData;
};

export const updateBudget = async (originalBudgetData: AppBudgetMetaData, newBudgetData: BudgetFormData) => {
  const currentUser = checkAuthentication();
  const updatedData = getChangedBudgetData(originalBudgetData, newBudgetData)
  if (Object.keys(updatedData).length === 0) throw new Error("no-data-changed");
  
  const budgetID = originalBudgetData.id
  
  await updateDoc(doc(db, FIREBASE_COLLECTIONS.budgets, budgetID), updatedData);
  // TODO: change also from budgetsList colection & redux
};

export const archiveBudget = async (budget: AppBudgetMetaData) => {
  checkAuthentication();

  const isArchived = budget.state === "archived";
  const newBudgetState = isArchived ? "active" : "archived";

  const newData: { state: BudgetState } = { state: newBudgetState } as const;
  await updateDoc(doc(db, FIREBASE_COLLECTIONS.budgets, budget.id), newData);
  // TODO: delete also from budgetsList colection & redux
  console.log("Document with ID:", budget.id, `successfully ${isArchived && "un"}archived`);
};

export const deleteBudget = async (budgetID: string) => {
  checkAuthentication();

  await deleteDoc(doc(db, FIREBASE_COLLECTIONS.budgets, budgetID));
  // TODO: delete also from budgetsList colection & redux
  console.log("Document with ID:", budgetID, "successfully deleted");
};
