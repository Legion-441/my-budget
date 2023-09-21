import { AlertColor } from "@mui/material";

/**
 * Data type representing user authentication credentials, i.e., email, password, confirm password.
 */
export type AuthData = {
  email: string;
  password: string;
  confirmPassword: string;
};

/**
 * Data type representing state data for alert.
 */
export type AlertState = {
  /**
   * Alert type with string value: "success" | "info" | "warning" | "error"
   */
  severity: AlertColor;
  title?: string;
  message?: React.ReactNode;
}

/**
 * Data type representing an object of received input errors.
 */
export type AuthErrors = {
  emailError: string;
  passwordError: string;
  confirmPasswordError: string;
  providerError: string;
  generalError: string;
}