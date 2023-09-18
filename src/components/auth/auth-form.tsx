//* MUI & Icons
import { Alert, AlertTitle, Button, Divider, Stack, TextField, Typography } from "@mui/material";
//* Utils
import { AuthErrors } from "../../utils/errorHandling";
//* Components
import PasswordInput from "./password-input";
//* Styled Components
import PaperCard from "../../styled/paper-card/paper-card.styled";

import { AlertState, AuthFormData } from "../../views/log-in/log-in";

interface FormProps {
  formType: "login" | "sign-up";
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  alert: AlertState | null;
  isSending: boolean;
  authFormData: AuthFormData;
  errors: AuthErrors;
  setErrors: React.Dispatch<React.SetStateAction<AuthErrors>>;
  setAuthFormData: React.Dispatch<React.SetStateAction<AuthFormData>>;
}

const AuthForm: React.FC<FormProps> = ({ formType, onSubmit, alert, isSending, authFormData, errors, setErrors, setAuthFormData }) => {
  const { emailError, passwordError, confirmPasswordError } = errors;
  const isLoginForm = formType === "login";

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>, input: keyof AuthFormData) => {
    setAuthFormData({ ...authFormData, [input]: event.target.value });

    if ((input === "password" || input === "confirmPassword") && !isLoginForm) {
      const validateLengthPassword = (password: string) => {
        if (password.length < 6) {
          return "Hasło musi mieć conajmniej 6 znaków.";
        }
        return "";
      };
      const validateConfirmPassword = (password: string, confirmPassword: string) => {
        if (password !== confirmPassword) {
          return "Hasła nie są identyczne.";
        }
        return "";
      };

      const newPasswordError = input === "password" ? validateLengthPassword(event.target.value) : errors.passwordError;
      const newConfirmPasswordError = validateConfirmPassword(
        input === "password" ? event.target.value : authFormData.password,
        input === "confirmPassword" ? event.target.value : authFormData.confirmPassword
      );

      setErrors({
        ...errors,
        passwordError: newPasswordError,
        confirmPasswordError: newConfirmPasswordError,
      });
    }
  };

  return (
    <PaperCard>
      <Stack
        component={"form"}
        onSubmit={onSubmit}
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
          null
          // TODO: forgot password feature
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

      <Stack
        direction="column"
        justifyContent="flex-start"
        alignItems="stretch"
        spacing={2}
        style={{ width: "100%", maxWidth: "360px", marginInline: "auto" }}
      >
        <Divider style={{ marginTop: "24px" }} />
        <div id="firebaseui-auth-container"></div>
        <Stack direction="row" justifyContent="center" alignItems="center" spacing={1}>
          <Typography variant="body2">{isLoginForm ? "Nie masz jeszcze konta?" : "Masz już konto?"}</Typography>
          <Button
            disabled={isSending}
            variant="text"
            type="button"
            onClick={() => {
              window.location.replace(isLoginForm ? "/signup" : "/login");
            }}
            size="small"
          >
            {isLoginForm ? "Dołącz teraz." : "Zaloguj się teraz."}
          </Button>
        </Stack>
      </Stack>
    </PaperCard>
  );
};

export default AuthForm;
