import { FIREBASE_COLLECTIONS } from "../constants/constants";
//* Firebase
import { Timestamp, addDoc, collection, deleteDoc, doc, getDocs, or, query, where } from "firebase/firestore";
import { auth, db } from "../firebase";
//* Utils
import { transformFetchedBudgetsData } from "../utils/transform-fetched-data";
//* Types
import { BudgetInfoFormData, FirebaseBudgetInfo, BudgetsListItem, BudgetMetaData } from "../types/AppTypes";

export const fetchUserBudgetsMetadata = async (): Promise<BudgetMetaData[]> => {
  if (!auth.currentUser?.uid) throw new Error("unauthenticated");
  const currentUserUid = auth.currentUser?.uid;

  const budgetsQuery = query(
    collection(db, FIREBASE_COLLECTIONS.budgets),
    or(where("owner.id", "==", currentUserUid), where("memberIDs", "array-contains", currentUserUid))
  );

  const querySnapshot = await getDocs(budgetsQuery);
  const budgetsArray: BudgetMetaData[] = [];

  querySnapshot.forEach((documentSnapshot) => {
    const budgetData = transformFetchedBudgetsData(documentSnapshot);
    budgetsArray.push(budgetData);
  });

  return budgetsArray;
};

export const createBudget = async (budgetFormData: BudgetInfoFormData): Promise<BudgetsListItem> => {
  if (!auth.currentUser?.uid) throw new Error("unauthenticated");
  const currentUserUid = auth.currentUser?.uid;
  const { memberIDs } = budgetFormData;
  const currentUserUsername = auth.currentUser.displayName || auth.currentUser.email || ""; // TODO: make function to convert email into displayName
  const currentDate = new Date();
  const newBudgetInfo: FirebaseBudgetInfo = {
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

export const deleteBudget = async (budgetID: string): Promise<boolean> => {
  if (!auth.currentUser?.uid) throw new Error("unauthenticated");
  try {
    await deleteDoc(doc(db, FIREBASE_COLLECTIONS.budgets, budgetID));
    // TODO: delete also from budgetsList colection & redux
    console.log("Document with ID:", budgetID, "successfully deleted");
    return true;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
