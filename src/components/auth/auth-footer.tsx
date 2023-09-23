//* MUI & Icons
import { Button, Divider, Stack, Typography } from "@mui/material";
import { Google } from "@mui/icons-material";

type AuthFooterProps = {
  isLoginForm: boolean;
  isSending: boolean;
  providerClick: () => Promise<void>;
};

const AuthFooter: React.FC<AuthFooterProps> = ({ isLoginForm, isSending, providerClick }) => {
  return (
    <Stack
      direction="column"
      justifyContent="flex-start"
      alignItems="stretch"
      spacing={2}
      style={{ width: "100%", maxWidth: "360px", marginInline: "auto" }}
    >
      <Divider style={{ marginTop: "24px" }} />
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
