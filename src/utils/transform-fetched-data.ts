import { APP_THEME_OPTIONS } from "../constants/constants";
//* Firebase
import { DocumentData, DocumentSnapshot, Timestamp } from "firebase/firestore";
//* Types
import { AccountData, BudgetsListItem, AppBudgetMetaData, Owner } from "../types/AppTypes";
import { validatedIconMapping } from "./icon-utils";

export const transformFetchedAccountData = (documentSnapshot: DocumentSnapshot<DocumentData>): AccountData => {
  const docData = documentSnapshot.data();

  const validateBudgetData = (): BudgetsListItem[] => {
    let budgetData: BudgetsListItem[] = [];
    if (docData && Array.isArray(docData.budgetsList)) {
      docData.budgetsList.forEach((budgetItem) => {
        const budget: BudgetsListItem = {
          icon: "icon" in budgetItem && budgetItem.icon in validatedIconMapping ? budgetItem.icon : "None",
          id: "id" in budgetItem ? String(budgetItem.id) : "",
          name: "name" in budgetItem ? String(budgetItem.name) : "",
          owner: {
            id: budgetItem.owner && "id" in budgetItem.owner ? String(budgetItem.owner.id) : "",
            username: budgetItem.owner && "username" in budgetItem.owner ? String(budgetItem.owner.username) : "",
          },
        };
        budgetData.push(budget);
      });
    }
    return budgetData;
  };

  const accountData: AccountData = {
    appTheme: APP_THEME_OPTIONS.includes(docData?.appTheme) ? docData?.appTheme : "system",
    budgetsList: validateBudgetData(),
    friendsList: [],
  };

  return accountData;
};

export const transformFetchedBudgetsData = (documentSnapshot: DocumentSnapshot<DocumentData>): AppBudgetMetaData => {
  const documentData = documentSnapshot.data();
  const budgetID = documentSnapshot.id;

  // Function to ensure memberIDs is an array of strings
  const validateMemberIDsArray = (): string[] => {
    const memberIDs = documentData?.memberIDs;
    if (!Array.isArray(memberIDs)) return [];
    return memberIDs.map((item) => (typeof item === "string" ? item : String(item)));
  };

  // Function to ensure owner is an object with specific properties
  const validateOwnerProperties = (): Owner => {
    const owner = typeof documentData?.owner === "object" ? documentData.owner : {};
    const { id, username } = owner;
    owner.id = "id" in owner ? String(id) : "";
    owner.username = "username" in owner ? String(username) : "";
    return owner;
  };

  // Transform Firestore data into the expected format
  const budgetData: AppBudgetMetaData = {
    name: documentData && "name" in documentData ? String(documentData.name) : "",
    createdAt: documentData && documentData.createdAt instanceof Timestamp ? documentData.createdAt.toDate().getTime() : 0,
    description: documentData && "description" in documentData ? String(documentData.description) : "",
    id: budgetID,
    icon: documentData && "icon" in documentData && documentData.icon in validatedIconMapping ? documentData.icon : "None",
    memberIDs: validateMemberIDsArray(),
    owner: validateOwnerProperties(),
    state: documentData && (documentData.state === "archived" || documentData.state === "active") ? documentData.state : "active",
  };

  return budgetData;
};
