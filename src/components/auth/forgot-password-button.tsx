import { useState } from "react";
//* MUI
import { Alert, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from "@mui/material";
//* firebase
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../firebase";
//* utils
import { getInputError } from "../../utils/errorHandling";

interface ForgotPasswordButtonProps {
  disabled: boolean;
}
interface ForgotPasswordDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

const ForgotPasswordDialog = ({ isOpen, onClose }: ForgotPasswordDialogProps) => {
  const [email, setEmail] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [isEmailSend, setIsEmailSend] = useState<boolean>(false);

  const handleSubmit = () => {
    sendPasswordResetEmail(auth, email)
      .then(() => {
        setError("");
        setIsEmailSend(true);
      })
      .catch((error) => {
        const inputError = getInputError(error);
        setError(inputError.emailError);
      });
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handleClose = () => {
    onClose();
    setEmail("");
    setError("");
    setIsEmailSend(false);
  };

  return (
    <Dialog onClose={handleClose} open={isOpen}>
      <DialogTitle>Zapomniałeś hasła?</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Czasem się to zdarza. Wprowadź adres email, a wyślemy Ci instrukcję odzyskania dostępu do konta.
        </DialogContentText>
        <TextField
          value={email}
          autoFocus
          id="name"
          label="Email"
          type="email"
          onChange={handleChange}
          error={Boolean(error)}
          helperText={error}
          required
          variant="outlined"
          margin="normal"
          fullWidth
        />
        {isEmailSend ? (
          <Alert style={{ marginTop: 16 }} severity="success" variant="outlined">
            Żądanie zmiany hasła zostało wysłane. Sprawdź skrzynkę mailową. Jeżeli wiadomość nie dotarła, sprawdź folder spam lub wprowadź
            adres email ponownie
          </Alert>
        ) : null}
      </DialogContent>
      <DialogActions>
        {isEmailSend ? (
          <Button onClick={handleClose}>Gotowe</Button>
        ) : (
          <>
            <Button onClick={handleClose}>Anuluj</Button>
            <Button onClick={handleSubmit} disabled={isEmailSend}>
              Wyślij
            </Button>
          </>
        )}
      </DialogActions>
    </Dialog>
  );
};

const ForgotPasswordButton: React.FC<ForgotPasswordButtonProps> = ({ disabled }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleOpenDialog = () => {
    setIsDialogOpen(true);
  };
  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  return (
    <>
      <Button
        disabled={disabled}
        variant="text"
        type="button"
        onClick={handleOpenDialog}
        style={{ marginLeft: "auto", marginTop: "8px" }}
        size="small"
      >
        Odzyskaj hasło.
      </Button>
      <ForgotPasswordDialog isOpen={isDialogOpen} onClose={handleCloseDialog} />
    </>
  );
};

export default ForgotPasswordButton;
