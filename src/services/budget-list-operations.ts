import { FIREBASE_COLLECTIONS } from "../constants/constants";
//* Firebase
import { Timestamp, addDoc, collection, deleteDoc, doc, getDoc, getDocs, query, updateDoc, where } from "firebase/firestore";
import { db } from "../firebase";
//* Utils
import { transformFetchedBudgetsData } from "../utils/transform-fetched-data";
import checkAuthentication from "../utils/checkAuthentication";
//* Types
import { BudgetFormData, FirebaseBudgetMetaData, BudgetsListItem, AppBudgetMetaData, BudgetState, MemberOrOwner } from "../types/AppTypes";

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

  const ownerBudgetsQuery = query(collection(db, FIREBASE_COLLECTIONS.budgets), where(`owner.${currentUserUid}`, ">=", ""));
  const memberBudgetsQuery = query(collection(db, FIREBASE_COLLECTIONS.budgets), where(`members.${currentUserUid}`, ">=", ""));

  const [ownerQuerySnapshot, memberQuerySnapshot] = await Promise.all([getDocs(ownerBudgetsQuery), getDocs(memberBudgetsQuery)]);
  const snapshotArray = [...ownerQuerySnapshot.docs, ...memberQuerySnapshot.docs];
  const budgetsArray: AppBudgetMetaData[] = [];

  snapshotArray.forEach((docSnapshot) => {
    const budgetData = transformFetchedBudgetsData(docSnapshot);
    budgetsArray.push(budgetData);
  });

  return budgetsArray;
};

export const createBudget = async (budgetFormData: BudgetFormData): Promise<BudgetsListItem> => {
  const currentUser = checkAuthentication();
  const { displayName: currentUserDisplayName, email: currentUserEmail, uid: currentUserUid } = currentUser;
  const members = budgetFormData.members.reduce((acc, member) => {
    return { ...acc, [member.id]: member.username };
  }, {});
  const currentUserUsername = currentUserDisplayName || currentUserEmail?.split("@")[0].split(".")[0] || "";
  const currentDate = new Date();
  const newBudgetInfo: FirebaseBudgetMetaData = {
    ...budgetFormData,
    members, // TODO: add feature: sending invitations, add members when invitations are accepted by users
    owner: { [currentUserUid]: currentUserUsername },
    createdAt: Timestamp.fromDate(currentDate),
  };

  const docRef = await addDoc(collection(db, FIREBASE_COLLECTIONS.budgets), newBudgetInfo);
  const { icon, name } = newBudgetInfo;
  const owner: MemberOrOwner = { id: currentUserUid, username: currentUserUsername };
  const budgetData: BudgetsListItem = {
    icon,
    id: docRef.id,
    name,
    owner,
  };

  console.log("Document written with ID: ", docRef.id);
  return budgetData;
};

export const updateBudget = async (budgetID: string, updatedData: Partial<BudgetFormData>) => {
  checkAuthentication();
  if (Object.keys(updatedData).length === 0) throw new Error("no-data-changed");

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
  console.log("Document with ID:", budget.id, `successfully ${isArchived ? "un" : null}archived`);
};

export const deleteBudget = async (budgetID: string) => {
  checkAuthentication();

  await deleteDoc(doc(db, FIREBASE_COLLECTIONS.budgets, budgetID));
  // TODO: delete also from budgetsList colection & redux
  console.log("Document with ID:", budgetID, "successfully deleted");
};
