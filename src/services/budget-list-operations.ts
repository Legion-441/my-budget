import { FIREBASE_COLLECTIONS } from "../constants/constants";
//* Firebase
import { collection, doc, getDoc, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase";
//* Utils
import { transformFetchedBudgetsData } from "../utils/transform-fetched-data";
import checkAuthentication from "../utils/checkAuthentication";
//* Types
import { AppBudgetMetaData } from "../types/AppTypes";

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
