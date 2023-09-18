import * as React from "react";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
//* MUI & Icons
import { AlertColor } from "@mui/material";
//* Utils
import { AuthErrors, initialAuthErrors } from "../../utils/errorHandling";
import { configureFirebaseUI } from "../../utils/firebaseUIAuthConfig";
//* Components
import AuthForm from "../../components/auth/auth-form";
//* Services
import handleAuth from "../../services/authService";

export interface AlertState {
  severity: AlertColor;
  title?: string;
  message?: React.ReactNode;
}

export type AuthFormData = {
  email: string;
  password: string;
  confirmPassword: string;
};

const LogInView: React.FC = () => {
  const [authFormData, setAuthFormData] = useState<AuthFormData>({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [alert, setAlert] = useState<AlertState | null>(null);
  const [loginInputErrors, setLoginInputErrors] = useState<AuthErrors>({ ...initialAuthErrors });
  const [isSending, setIsSending] = useState<boolean>(false);
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from;

  useEffect(() => {
    configureFirebaseUI(from);
  }, [from]);

  const { generalError } = loginInputErrors;

  useEffect(() => {
    if (generalError) {
      setAlert({
        severity: "error",
        message: generalError,
      });
    } else {
      setAlert(null);
    }
  }, [generalError]);

  const handleLoginFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleAuth("login", navigate, setIsSending, setLoginInputErrors, authFormData, from);
  };


  return (
    <AuthForm
      formType="login"
      onSubmit={handleLoginFormSubmit}
      alert={alert}
      isSending={isSending}
      authFormData={authFormData}
      errors={loginInputErrors}
      setErrors={setLoginInputErrors}
      setAuthFormData={setAuthFormData}
    />
  );
};

export default LogInView;
