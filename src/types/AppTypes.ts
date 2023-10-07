import { Timestamp } from "firebase/firestore";
import { AlertColor } from "@mui/material";

type Owner = {
  ownerID: string;
  ownerUsername: string;
};

export type BudgetsListItem = {
  name: string;
  id: string;
  icon: string;
  owner: Owner;
};

export type BudgetInfo = BudgetsListItem & {
  membersID: string[];
  createdAt: Timestamp;
  description: string;
}

export type AlertState = {
  severity: AlertColor;
  title?: string;
  message?: React.ReactNode;
};
