import { AlertColor } from "@mui/material";

export type AlertState = {
  severity: AlertColor;
  title?: string;
  message?: React.ReactNode;
};
