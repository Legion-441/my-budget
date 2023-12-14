import { APP_THEME_OPTIONS, ICON_COMPONENT_DICTIONARY } from "../constants/constants";
//* Firebase
import { Timestamp } from "firebase/firestore";
//* MUI type
import { AlertColor } from "@mui/material";

//? Budget

export type BudgetState = "active" | "archived";

export type BudgetIconName = keyof typeof ICON_COMPONENT_DICTIONARY | "none";

export type MemberOrOwner = {
  id: string;
  username: string;
};

export type BudgetsListItem = {
  name: string;
  icon: BudgetIconName;
  owner: MemberOrOwner;
  id: string;
};

export type BudgetFormData = {
  name: string;
  icon: BudgetIconName;
  members: MemberOrOwner[];
  description: string;
  state: BudgetState;
};

export type FirebaseMember = {
  [key: string]: string;
};

export type FirebaseBudgetMetaData = {
  name: string;
  icon: BudgetIconName;
  members: FirebaseMember;
  description: string;
  state: BudgetState;
  owner: FirebaseMember;
  createdAt: Timestamp;
};

export type AppBudgetMetaData = BudgetFormData & {
  owner: MemberOrOwner;
  createdAt: number;
  id: string;
};

//? User & Account

export type AppTheme = (typeof APP_THEME_OPTIONS)[number];

export type AccountData = {
  appTheme: AppTheme;
  budgetsList: BudgetsListItem[];
  friendsList: any[];
};

export type UserData = {
  displayName: string;
  userID: string;
  photoURL: string;
};

export type AlertState = {
  severity: AlertColor;
  title?: string;
  message?: React.ReactNode;
};

//? Budget Actions

export interface BudgetDialogProps {
  budget: AppBudgetMetaData;
  onClose: () => void;
}

export type BudgetActions = "edit" | "archive" | "delete" | "leave";
