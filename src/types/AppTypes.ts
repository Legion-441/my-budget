//* Firebase
import { Timestamp } from "firebase/firestore";
//* MUI type
import { AlertColor } from "@mui/material";
//* Utils
import { iconMapping } from "../utils/icon-utils";

export type Owner = {
  ownerID: string;
  ownerUsername: string;
};

export type BudgetsListItem = {
  budgetName: string | undefined;
  createdAt: Date | undefined;
  description: string;
  id: string;
  icon: string | undefined;
  memberIDs: string[];
  owner: Owner;
};

export type BudgetIcon = keyof typeof iconMapping;

export type BudgetInfoFormData = {
  budgetName: string;
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
