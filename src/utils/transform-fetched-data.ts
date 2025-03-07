import { APP_THEME_OPTIONS, BUDGET_INITIAL, BUDGET_LIST_ITEM_INITIAL, VALIDATED_ICON_MAPPING } from "../constants/constants";
import { CategoriesSchema, StrictCategorySchema } from "../zod-schemas/dataZodSchemas";
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
  Category,
} from "../types/AppTypes";

// todo: Use zod schemas to validate this data
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
  const docData = documentSnapshot.data();
  const budgetID = documentSnapshot.id;
  if (!docData) return { ...BUDGET_INITIAL, id: budgetID };

  const validateMembers = (membersObject: FirebaseMember): MemberOrOwner[] => {
    if (typeof membersObject !== "object") return [];

    return Object.keys(membersObject).map((memberID) => {
      return {
        id: memberID,
        username: membersObject[memberID],
      };
    });
  };

  // todo: in the future add functionality to approve/reject proposed data fixes by user
  const validateCategoriesList = (dataCategories: unknown): Category[]  => {
    const result = CategoriesSchema.safeParse(dataCategories);
    if (result.success) return result.data;

    if (!Array.isArray(dataCategories)) return [];
    if (result.error.errors.some(error => JSON.stringify(error.path) === JSON.stringify([]))) return [];

    const filteredDataCategories = dataCategories.filter((category: unknown) => StrictCategorySchema.safeParse(category).data);

    const validatedData = CategoriesSchema.safeParse(filteredDataCategories).data || [];
  
    return validatedData;

  }

  // Transform Firestore data into the expected format
  const budgetData: AppBudgetMetaData = {
    // todo: Use zod schemas to validate this data
    id: budgetID,
    name: docData.name ? String(docData.name) : BUDGET_INITIAL.name,
    createdAt: docData.createdAt instanceof Timestamp ? docData.createdAt.toDate().getTime() : BUDGET_INITIAL.createdAt,
    description: docData.description ? String(docData.description) : BUDGET_INITIAL.description,
    icon: docData.icon in VALIDATED_ICON_MAPPING ? docData.icon : BUDGET_INITIAL.icon,
    members: validateMembers(docData.members),
    owner: validateMembers(docData.owner)[0],
    state: docData.state === "archived" || docData.state === "active" ? docData.state : BUDGET_INITIAL.state,
    expenseCategories: validateCategoriesList(docData.expenseCategories),
    incomeCategories: validateCategoriesList(docData.incomeCategories),
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
