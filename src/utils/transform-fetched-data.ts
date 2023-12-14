import { APP_THEME_OPTIONS, VALIDATED_ICON_MAPPING } from "../constants/constants";
//* Firebase
import { DocumentData, DocumentSnapshot, Timestamp } from "firebase/firestore";
//* Types
import { AccountData, BudgetsListItem, AppBudgetMetaData, BudgetIconName, MemberOrOwner, FirebaseMember } from "../types/AppTypes";

export const transformFetchedAccountData = (documentSnapshot: DocumentSnapshot<DocumentData>): AccountData => {
  const docData = documentSnapshot.data();

  const validateBudgetData = (): BudgetsListItem[] => {
    let budgetData: BudgetsListItem[] = [];
    if (docData && Array.isArray(docData.budgetsList)) {
      docData.budgetsList.forEach((budgetItem) => {
        const budget: BudgetsListItem = {
          icon: "icon" in budgetItem && budgetItem.icon in VALIDATED_ICON_MAPPING ? budgetItem.icon : "None",
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

  const validateMembers = (membersObject: FirebaseMember): MemberOrOwner[] => {
    if (typeof membersObject !== "object") return [];

    const members = Object.keys(membersObject).map((memberID) => {
      return {
        id: memberID,
        username: membersObject[memberID],
      };
    });

    return members;
  };

  const validateOwnerProperties = (): MemberOrOwner => validateMembers(documentData?.owner)[0];

  // Transform Firestore data into the expected format
  const budgetData: AppBudgetMetaData = {
    name: documentData && "name" in documentData ? String(documentData.name) : "",
    createdAt: documentData && documentData.createdAt instanceof Timestamp ? documentData.createdAt.toDate().getTime() : 0,
    description: documentData && "description" in documentData ? String(documentData.description) : "",
    id: budgetID,
    icon: documentData && "icon" in documentData && documentData.icon in VALIDATED_ICON_MAPPING ? documentData.icon as BudgetIconName : "none",
    members: validateMembers(documentData?.members),
    owner: validateOwnerProperties(),
    state: documentData && (documentData.state === "archived" || documentData.state === "active") ? documentData.state : "active",
  };

  return budgetData;
};
