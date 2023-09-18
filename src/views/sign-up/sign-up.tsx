import * as React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
//* Utils
import { INITIAL_AUTH_ERRORS } from "../../utils/errorHandling";
import { configureFirebaseUI } from "../../utils/firebaseUIAuthConfig";
//* Components
import AuthForm from "../../components/auth/auth-form";
//* Services
import handleAuth from "../../services/authService";
//* Types
import { AlertState, AuthData, AuthErrors } from "../../types/type";


const SignUpView: React.FC = () => {
  const [authFormData, setAuthFormData] = useState<AuthData>({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [alert, setAlert] = useState<AlertState | null>(null);
  const [signupInputErrors, setSignupInputErrors] = useState<AuthErrors>({ ...INITIAL_AUTH_ERRORS });
  const [isSending, setIsSending] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    configureFirebaseUI();
  }, []);

  const { generalError } = signupInputErrors;

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

  const handleSignUpFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleAuth("signup", navigate, setIsSending, setSignupInputErrors, authFormData);
  };

  return (
    <AuthForm
      formType="sign-up"
      onSubmit={handleSignUpFormSubmit}
      alert={alert}
      isSending={isSending}
      authFormData={authFormData}
      errors={signupInputErrors}
      setErrors={setSignupInputErrors}
      setAuthFormData={setAuthFormData}
    />
  );
};

export default SignUpView;