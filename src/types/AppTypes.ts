import { APP_THEME_OPTIONS } from "../constants/constants";
//* Firebase
import { Timestamp } from "firebase/firestore";
//* MUI type
import { AlertColor } from "@mui/material";
//* Utils
import { iconMapping } from "../utils/icon-utils";

export type Owner = {
  id: string;
  username: string;
};

export type BudgetsListItem = {
  icon: string;
  id: string;
  name: string;
  owner: Owner;
};

export type BudgetMetaData = {
  name: string;
  createdAt: number;
  description: string;
  id: string;
  icon: string;
  memberIDs: string[];
  owner: Owner;
};

export type AppTheme = typeof APP_THEME_OPTIONS[number];

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

export type BudgetIcon = keyof typeof iconMapping;

export type BudgetInfoFormData = {
  name: string;
  icon: BudgetIcon;
  memberIDs: string[];
  description: string;
};

export type FirebaseBudgetInfo = BudgetInfoFormData & {
  owner: Owner;
  createdAt: Timestamp;
};

export type AlertState = {
  severity: AlertColor;
  title?: string;
  message?: React.ReactNode;
};
