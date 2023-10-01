import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
//* MUI & Icons
import { Alert, AlertTitle, Button, Stack, TextField } from "@mui/material";
//* Utils
import { INITIAL_AUTH_ERRORS } from "../../utils/authErrorHandling";
import { validateConfirmPassword, validateLengthPassword } from "../../utils/authInputValidation";
//* Components
import PasswordInput from "./password-input";
import ForgotPasswordButton from "./forgot-password-button";
import AuthFooter from "./auth-footer";
//* Styled Components
import PaperCard from "../../styled/paper-card/paper-card.styled";
//* Services
import handleAuth, { handleOAuth } from "../../services/authService";
//* Types
import { AlertState } from "../../types/AppTypes";
import { AuthData, AuthErrors, FormType } from "../../types/authTypes";

const INITIAL_AUTH_FORM_DATA: AuthData = {
  email: "",
  password: "",
  confirmPassword: "",
};

type FormProps = { formType: FormType };

const AuthForm: React.FC<FormProps> = ({ formType }) => {
  const [authFormData, setAuthFormData] = useState<AuthData>({ ...INITIAL_AUTH_FORM_DATA });
  const [alert, setAlert] = useState<AlertState | null>(null);
  const [errors, setErrors] = useState<AuthErrors>({ ...INITIAL_AUTH_ERRORS });
  const [isSending, setIsSending] = useState<boolean>(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const { emailError, passwordError, confirmPasswordError, externalProviderError, generalError } = errors;
  const isLoginForm = formType === "login";
  const from = isLoginForm && location.state.from;

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

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>, input: keyof AuthData) => {
    setAuthFormData({ ...authFormData, [input]: event.target.value });
  };

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!isLoginForm) {
      const newPasswordError = validateLengthPassword(authFormData.password);
      const newConfirmPasswordError = validateConfirmPassword(authFormData.password, authFormData.confirmPassword);

      setErrors({
        ...INITIAL_AUTH_ERRORS,
        passwordError: newPasswordError,
        confirmPasswordError: newConfirmPasswordError,
      });

      if (newPasswordError || newConfirmPasswordError) {
        return;
      }
    }

    handleAuth(formType, navigate, setIsSending, setErrors, authFormData, from);
  };

  return (
    <PaperCard>
      <Stack
        component={"form"}
        onSubmit={!isDialogOpen ? handleFormSubmit : undefined}
        direction="column"
        justifyContent="flex-start"
        alignItems="stretch"
        spacing={2}
        style={{ width: "100%", maxWidth: "360px", marginInline: "auto" }}
      >
        <h1>{isLoginForm ? "Logowanie" : "Stwórz konto"}</h1>
        {alert ? (
          <Alert severity={alert.severity} variant="outlined">
            {alert.title && <AlertTitle>{alert.title}</AlertTitle>}
            {alert.message}
          </Alert>
        ) : null}
        <TextField
          autoFocus
          error={Boolean(emailError)}
          type="email"
          label="E-mail"
          value={authFormData.email}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange(e, "email")}
          autoComplete="email"
          required
          helperText={emailError}
          style={{ width: "100%" }}
        />
        <PasswordInput
          passwordType={"password"}
          isLoginForm={isLoginForm}
          value={authFormData.password}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange(e, "password")}
          errorAlert={passwordError || confirmPasswordError}
        />
        {isLoginForm ? (
          <ForgotPasswordButton disabled={isSending} isOpen={isDialogOpen} setOpen={setIsDialogOpen} />
        ) : (
          <PasswordInput
            passwordType={"confirm password"}
            isLoginForm={isLoginForm}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange(e, "confirmPassword")}
            value={authFormData.confirmPassword}
            errorAlert={confirmPasswordError}
          />
        )}

        <Stack spacing={1} paddingTop={2}>
          <Button disabled={isSending} variant="contained" type="submit">
            {isSending ? "Wysyłam..." : isLoginForm ? "Zaloguj" : "Zarejestruj się"}
          </Button>
        </Stack>
      </Stack>

      <AuthFooter
        isLoginForm={isLoginForm}
        isSending={isSending}
        externalProviderError={externalProviderError}
        providerClick={() => handleOAuth(navigate, setErrors)}
      />
    </PaperCard>
  );
};

export default AuthForm;
