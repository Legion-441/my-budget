import * as React from "react";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
//* Utils
import { INITIAL_AUTH_ERRORS } from "../../utils/errorHandling";
//* Components
import AuthForm from "../../components/auth/auth-form";
//* Services
import handleAuth, { handleOAuth } from "../../services/authService";
//* Types
import { AlertState, AuthData, AuthErrors } from "../../types/type";

const LogInView: React.FC = () => {
  const [authFormData, setAuthFormData] = useState<AuthData>({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [alert, setAlert] = useState<AlertState | null>(null);
  const [loginInputErrors, setLoginInputErrors] = useState<AuthErrors>({ ...INITIAL_AUTH_ERRORS });
  const [isSending, setIsSending] = useState<boolean>(false);
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from;

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

  const handleSignWithGoogle = async () => {
    handleOAuth(navigate, setLoginInputErrors, from);
  };

  return (
    <AuthForm
      formType="login"
      onSubmit={handleLoginFormSubmit}
      onOAuth={handleSignWithGoogle}
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
