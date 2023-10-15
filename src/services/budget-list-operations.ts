//* Firebase
import { DocumentReference, Timestamp, addDoc, collection } from "firebase/firestore";
import { auth, db } from "../firebase";
//* Types
import { BudgetInfoFormData, BudgetsListItem, FirebaseBudgetInfo } from "../types/AppTypes";

type CreateBudgetReturn = {
  docRef: DocumentReference;
  budgetData: BudgetsListItem;
};

export const createBudget = async (budgetFormData: BudgetInfoFormData): Promise<CreateBudgetReturn> => {
  const { memberIDs } = budgetFormData;
  const currentUserUid = auth.currentUser?.uid || "";
  const currentUserUsername = auth.currentUser?.displayName || auth.currentUser?.email || "";
  const currentDate = new Date();
  const newBudgetInfo: FirebaseBudgetInfo = {
    ...budgetFormData,
    memberIDs: memberIDs, // TODO: add feature: sending invitations, add membersIDs when invitations are accepted by users
    owner: { ownerUsername: currentUserUsername, ownerID: currentUserUid },
    createdAt: Timestamp.fromDate(currentDate),
  };
  try {
    const docRef = await addDoc(collection(db, "budgets"), newBudgetInfo);
    const budgetData = {
      ...newBudgetInfo,
      createdAt: currentDate.getTime(),
      id: docRef.id,
    };
    console.log("Document written with ID: ", docRef.id);
    return { docRef, budgetData };
  } catch (error) {
    console.error("Error adding document: ", error);
    throw error;
  }
};

const editBudget = async () => { };

const deleteBudget = async () => { };
