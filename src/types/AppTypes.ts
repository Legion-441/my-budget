import { APP_THEME_OPTIONS } from "../constants/constants";
//* Firebase
import { Timestamp } from "firebase/firestore";
//* MUI type
import { AlertColor } from "@mui/material";
//* Utils
import { iconComponentDictionary } from "../utils/icon-utils";

//? Budget

export type BudgetState = "active" | "archived"

export type IconKey = keyof typeof iconComponentDictionary;

export type BudgetIcon = keyof typeof iconComponentDictionary | "None";

export type Owner = {
  id: string;
  username: string;
};

export type BudgetsListItem = {
  name: string;
  icon: BudgetIcon;
  owner: Owner;
  id: string;
};

export type BudgetFormData = {
  name: string;
  icon: BudgetIcon;
  memberIDs: string[];
  description: string;
  state: BudgetState;
};

export type FirebaseBudgetMetaData = BudgetFormData & {
  owner: Owner;
  createdAt: Timestamp;
};

export type AppBudgetMetaData = BudgetFormData & {
  owner: Owner;
  createdAt: number;
  id: string;
};

//? User & Account

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

export type AlertState = {
  severity: AlertColor;
  title?: string;
  message?: React.ReactNode;
};


