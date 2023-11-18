import { FIREBASE_COLLECTIONS } from "../constants/constants";
//* Firebase
import { Timestamp, addDoc, collection, deleteDoc, doc, getDoc, getDocs, or, query, updateDoc, where } from "firebase/firestore";
import { auth, db } from "../firebase";
//* Utils
import { transformFetchedBudgetsData } from "../utils/transform-fetched-data";
//* Types
import { BudgetFormData, FirebaseBudgetMetaData, BudgetsListItem, AppBudgetMetaData, BudgetState } from "../types/AppTypes";

export const fetchBudgetMetadataByID = async (budgetID: string): Promise<AppBudgetMetaData> => {
  if (!auth.currentUser?.uid) throw new Error("unauthenticated");

  try {
    const docRef = doc(db, FIREBASE_COLLECTIONS.budgets, budgetID);
    const docSnapshot = await getDoc(docRef);
    const finalAccountData = transformFetchedBudgetsData(docSnapshot);

    if (!docSnapshot.exists()) throw new Error("not-found");

    return finalAccountData;
  } catch (error) {
    throw error;
  }
};

export const fetchUserBudgetsMetadata = async (): Promise<AppBudgetMetaData[]> => {
  if (!auth.currentUser?.uid) throw new Error("unauthenticated");
  const currentUserUid = auth.currentUser?.uid;

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
  if (!auth.currentUser?.uid) throw new Error("unauthenticated");
  const currentUserUid = auth.currentUser?.uid;
  const { memberIDs } = budgetFormData;
  const currentUserUsername = auth.currentUser.displayName || auth.currentUser.email || ""; // TODO: make function to convert email into displayName
  const currentDate = new Date();
  const newBudgetInfo: FirebaseBudgetMetaData = {
    ...budgetFormData,
    memberIDs: memberIDs, // TODO: add feature: sending invitations, add membersIDs when invitations are accepted by users
    owner: { username: currentUserUsername, id: currentUserUid },
    createdAt: Timestamp.fromDate(currentDate),
  };

  try {
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
  } catch (error) {
    throw error;
  }
};

const editBudget = async () => {};

export const archiveBudget = async (budget: AppBudgetMetaData) => {
  if (!auth.currentUser?.uid) throw new Error("unauthenticated");
  const isArchived = budget.state === "archived";
  const newBudgetState = isArchived ? "active" : "archived";

  try {
    const newData: { state: BudgetState } = { state: newBudgetState } as const;
    await updateDoc(doc(db, FIREBASE_COLLECTIONS.budgets, budget.id), newData);
    // TODO: delete also from budgetsList colection & redux
    console.log("Document with ID:", budget.id, `successfully ${isArchived && "un"}archived`);
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const deleteBudget = async (budgetID: string) => {
  if (!auth.currentUser?.uid) throw new Error("unauthenticated");
  try {
    await deleteDoc(doc(db, FIREBASE_COLLECTIONS.budgets, budgetID));
    // TODO: delete also from budgetsList colection & redux
    console.log("Document with ID:", budgetID, "successfully deleted");
  } catch (error) {
    console.error(error);
    throw error;
  }
};
