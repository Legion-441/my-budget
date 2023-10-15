//* Firebase
import { DocumentData, QueryDocumentSnapshot, Timestamp } from "firebase/firestore";
//* Types
import { Owner, BudgetsListItem } from "../types/AppTypes";

const transformBudgetFromFirebaseToApp = (documentSnapshot: QueryDocumentSnapshot<DocumentData>): BudgetsListItem => {
  const documentData = documentSnapshot.data();
  const budgetID = documentSnapshot.id;

  // Function to ensure memberIDs is an array of strings
  const memberIDsElements = (): string[] => {
    const memberIDs = documentData.memberIDs;
    if (!Array.isArray(memberIDs)) return [];
    return memberIDs.map((item) => (typeof item === "string" ? item : String(item)));
  };

  // Function to ensure owner is an object with specific properties
  const ownerProperties = (): Owner => {
    const owner = typeof documentData.owner === "object" ? documentData.owner : {};
    const { ownerID, ownerUsername } = owner;
    owner.ownerID = "ownerID" in owner ? String(ownerID) : null;
    owner.ownerUsername = "ownerUsername" in owner ? String(ownerUsername) : null;
    return owner;
  };

  // Transform Firestore data into the expected format
  const budgetData: BudgetsListItem = {
    budgetName: "budgetName" in documentData ? String(documentData.budgetName) : null,
    createdAt: documentData.createdAt instanceof Timestamp ? documentData.createdAt.toDate().getTime() : null,
    description: "description" in documentData ? String(documentData.description) : "",
    id: budgetID,
    icon: "icon" in documentData ? String(documentData.icon) : null,
    memberIDs: memberIDsElements(),
    owner: ownerProperties(),
  };

  return budgetData;
};

export default transformBudgetFromFirebaseToApp;
