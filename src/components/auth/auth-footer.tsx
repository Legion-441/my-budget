//* MUI & Icons
import { Alert, AlertTitle, Button, Divider, Stack, Typography } from "@mui/material";
import { Google } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { AlertState } from "../../types/AppTypes";

type AuthFooterProps = {
  isLoginForm: boolean;
  isSending: boolean;
  providerError: string;
  providerClick: () => Promise<void>;
};

const AuthFooter: React.FC<AuthFooterProps> = ({ isLoginForm, isSending, providerError, providerClick }) => {
  const [providerAlert, setProviderAlert] = useState<AlertState | null>({
    severity: "error",
    message: "this is a fckin error",
  });

  useEffect(() => {
    if (providerError) {
      setProviderAlert({
        severity: "error",
        message: providerError,
      });
    } else {
      setProviderAlert(null);
    }
  }, [providerError]);

  return (
    <Stack
      direction="column"
      justifyContent="flex-start"
      alignItems="stretch"
      spacing={2}
      style={{ width: "100%", maxWidth: "360px", marginInline: "auto" }}
    >
      <Divider style={{ marginTop: "24px" }} />
      {providerAlert ? (
        <Alert severity={providerAlert.severity} variant="outlined">
          {providerAlert.title && <AlertTitle>{providerAlert.title}</AlertTitle>}
          {providerAlert.message}
        </Alert>
      ) : null}
      <Button type="button" variant="contained" onClick={providerClick}>
        <Google />
        <Typography variant="button" marginLeft={2}>
          Kontynuuj z Google
        </Typography>
      </Button>
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
  );
};

export default AuthFooter;
