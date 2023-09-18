import { useState } from "react";
//* MUI
import { Alert, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from "@mui/material";
//* Firebase
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../firebase";
//* Utils
import { getInputError } from "../../utils/errorHandling";


interface ForgotPasswordDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

const ForgotPasswordDialog = ({ isOpen, onClose }: ForgotPasswordDialogProps) => {
  const [email, setEmail] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [isEmailSend, setIsEmailSend] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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
        <form onSubmit={handleSubmit}>
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
          <Button onClick={handleClose} type="button">Gotowe</Button>
        ) : (
          <>
            <Button onClick={handleClose} type="button">Anuluj</Button>
            <Button type="submit"  disabled={isEmailSend}>
              Wyślij
            </Button>
          </>
        )}
      </DialogActions>
        </form>
    </Dialog>
  );
};

export default ForgotPasswordDialog;
