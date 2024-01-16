import { APP_THEME_OPTIONS, BUDGET_LIST_ITEM_INITIAL, VALIDATED_ICON_MAPPING } from "../constants/constants";
//* Firebase
import { User } from "firebase/auth";
import { DocumentData, DocumentSnapshot, Timestamp } from "firebase/firestore";
//* Types
import {
  AccountData,
  BudgetsListItem,
  AppBudgetMetaData,
  MemberOrOwner,
  FirebaseMember,
  BudgetFormData,
  FirebaseBudgetMetaData,
} from "../types/AppTypes";

export const validateBudgetsListData = (budgetsList: any): BudgetsListItem[] => {
  let budgetData: BudgetsListItem[] = [];
  if (Array.isArray(budgetsList)) {
    budgetsList.forEach((budgetItem) => {
      if (budgetItem) {
        const { icon, id, name, owner = {} } = budgetItem;
        const budget: BudgetsListItem = {
          icon: icon && icon in VALIDATED_ICON_MAPPING ? icon : BUDGET_LIST_ITEM_INITIAL.icon,
          id: id ? String(id) : BUDGET_LIST_ITEM_INITIAL.id,
          name: name ? String(name) : BUDGET_LIST_ITEM_INITIAL.name,
          owner: {
            id: owner.id ? String(owner.id) : BUDGET_LIST_ITEM_INITIAL.owner.id,
            username: owner.username ? String(owner.username) : BUDGET_LIST_ITEM_INITIAL.owner.username,
          },
        };
        budgetData.push(budget);
      } else {
        // TODO: usuń pozycję z listy jeśli nie jest objektem
      }
    });
  }
  return budgetData;
};

export const transformFetchedAccountData = (documentSnapshot: DocumentSnapshot<DocumentData>): AccountData => {
  const docData = documentSnapshot.data();

  const accountData: AccountData = {
    appTheme: APP_THEME_OPTIONS.includes(docData?.appTheme) ? docData?.appTheme : "system",
    budgetsList: validateBudgetsListData(docData?.budgetsList),
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

export const transformBudgetFormDataToFirebaseMetaData = (budgetFormData: BudgetFormData, currentUser: User): FirebaseBudgetMetaData => {
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

  return newBudgetInfo;
};
