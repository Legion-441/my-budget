import { useEffect, useState } from "react";
//* MUI & Icons
import { Alert, AlertTitle, Button, Divider, Stack, Typography } from "@mui/material";
import { Google } from "@mui/icons-material";
//* Types
import { AlertState } from "../../types/AppTypes";

type AuthFooterProps = {
  isLoginForm: boolean;
  isSending: boolean;
  externalProviderError: string;
  providerClick: () => Promise<void>;
};

const AuthFooter: React.FC<AuthFooterProps> = ({ isLoginForm, isSending, externalProviderError, providerClick }) => {
  const [externalProviderAlert, setExternalProviderAlert] = useState<AlertState | null>(null);

  useEffect(() => {
    if (externalProviderError) {
      setExternalProviderAlert({
        severity: "error",
        message: externalProviderError,
      });
    } else {
      setExternalProviderAlert(null);
    }
  }, [externalProviderError]);

  return (
    <Stack
      direction="column"
      justifyContent="flex-start"
      alignItems="stretch"
      spacing={2}
      style={{ width: "100%", maxWidth: "360px", marginInline: "auto" }}
    >
      <Divider style={{ marginTop: "24px" }} />
      {externalProviderAlert ? (
        <Alert severity={externalProviderAlert.severity} variant="outlined">
          {externalProviderAlert.title && <AlertTitle>{externalProviderAlert.title}</AlertTitle>}
          {externalProviderAlert.message}
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
