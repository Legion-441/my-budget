import { FIREBASE_COLLECTIONS } from "../constants/constants";
//* Firebase
import { arrayRemove, arrayUnion, collection, doc, runTransaction, writeBatch } from "firebase/firestore";
import { db } from "../firebase";
//* Utils
import { transformBudgetFormDataToFirebaseMetaData } from "../utils/transform-fetched-data";
import checkAuthentication from "../utils/checkAuthentication";
//* Types
import { BudgetFormData, BudgetsListItem, AppBudgetMetaData, BudgetState } from "../types/AppTypes";

export const createBudget = async (budgetFormData: BudgetFormData, pin: boolean) => {
  const currentUser = checkAuthentication();
  const newBudgetInfo = transformBudgetFormDataToFirebaseMetaData(budgetFormData, currentUser);
  const budgetRef = doc(collection(db, FIREBASE_COLLECTIONS.budgets));
  const accountRef = doc(db, FIREBASE_COLLECTIONS.accounts, currentUser.uid);

  const batch = writeBatch(db);
  batch.set(budgetRef, newBudgetInfo);
  if (pin) {
    const { name, icon } = budgetFormData;
    const budgetItem: BudgetsListItem = {
      icon,
      id: budgetRef.id,
      name,
      owner: { id: currentUser.uid, username: currentUser.displayName || currentUser.email?.split("@")[0].split(".")[0] || "" },
    };

    batch.update(accountRef, { budgetsList: arrayUnion(budgetItem) });
  }

  await batch.commit();
};

export const updateBudget = async (budget: AppBudgetMetaData, updatedData: Partial<BudgetFormData>) => {
  if (Object.keys(updatedData).length === 0) throw new Error("no-data-changed");
  const currentUser = checkAuthentication();
  const budgetRef = doc(db, FIREBASE_COLLECTIONS.budgets, budget.id);
  const accountRef = doc(db, FIREBASE_COLLECTIONS.accounts, currentUser.uid);

  await runTransaction(db, async (transaction) => {
    const accountDoc = await transaction.get(accountRef);
    const budgetsList: BudgetsListItem[] = accountDoc.data()?.budgetsList;
    const isPinned = budget && budgetsList.some((item) => item.id === budget.id);

    transaction.update(budgetRef, updatedData);
    if (isPinned) {
      const itemIndex = budgetsList.findIndex((item) => item.id === budget.id);

      let defaultBudgetsListItem: BudgetsListItem = {
        name: updatedData.name || budget.name,
        icon: updatedData.icon || budget.icon,
        owner: budget.owner,
        id: budget.id,
      };
      const newBudgetsList = [...budgetsList];
      newBudgetsList[itemIndex] = {
        ...budgetsList[itemIndex],
        ...defaultBudgetsListItem,
      };

      transaction.update(accountRef, { budgetsList: newBudgetsList });
    }
  });
};

export const toggleArchiveBudget = async (budget: AppBudgetMetaData) => {
  const currentUser = checkAuthentication();
  const isArchived = budget.state === "archived";
  const newBudgetState = isArchived ? "active" : "archived";
  const budgetRef = doc(db, FIREBASE_COLLECTIONS.budgets, budget.id);
  const accountRef = doc(db, FIREBASE_COLLECTIONS.accounts, currentUser.uid);
  const newData: { state: BudgetState } = { state: newBudgetState } as const;

  await runTransaction(db, async (transaction) => {
    const accountDoc = await transaction.get(accountRef);
    const budgetsList: BudgetsListItem[] = accountDoc.data()?.budgetsList;
    const budgetToRemove: BudgetsListItem | null = budgetsList.find((item) => item.id === budget.id) || null;

    transaction.update(budgetRef, newData);
    if (!isArchived && budgetToRemove) {
      transaction.update(accountRef, { budgetsList: arrayRemove(budgetToRemove) });
    }
  });
};

export const deleteBudget = async (budgetID: string) => {
  const currentUser = checkAuthentication();
  const budgetRef = doc(db, FIREBASE_COLLECTIONS.budgets, budgetID);
  const accountRef = doc(db, FIREBASE_COLLECTIONS.accounts, currentUser.uid);

  await runTransaction(db, async (transaction) => {
    const accountDoc = await transaction.get(accountRef);
    const budgetsList: BudgetsListItem[] = accountDoc.data()?.budgetsList;
    const budgetToRemove: BudgetsListItem | null = budgetsList.find((item) => item.id === budgetID) || null;

    transaction.delete(budgetRef);
    if (budgetToRemove) {
      transaction.update(accountRef, { budgetsList: arrayRemove(budgetToRemove) });
    }
  });
};
