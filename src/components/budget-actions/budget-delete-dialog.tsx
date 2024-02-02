import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
//* MUI
import { Alert, Button, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, useTheme } from "@mui/material";
//* Services
import { deleteBudget } from "../../services/budget-meta-operations";
//* Utils
import { getFirestoreErrorText } from "../../utils/firestoreErrorHandling";
//* Types
import { BudgetDialogProps } from "../../types/AppTypes";

const DeleteBudgetDialog: React.FC<BudgetDialogProps> = ({ budget, onClose }) => {
  const [inputValue, setInputValue] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [validationError, setValidationError] = useState<string>("");
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setValidationError("");

    if (inputValue !== budget.name) {
      return setValidationError("Nazwa jest niezgodna");
    }

    deleteBudget(budget.id)
      .then(() => {
        setIsSuccess(true);
      })
      .catch((error) => {
        setIsSuccess(false);
        const errorText = getFirestoreErrorText(error);
        setError(errorText);
      });
  };

  const handleConfirm = () => {
    handleCloseDialog();
    const isBudgetPage = location.pathname.startsWith(`/budget/${budget.id}`);
    if (isBudgetPage) {
      navigate("/");
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
    setValidationError("");
  };

  const handleCloseDialog = () => {
    onClose();
    setInputValue("");
    setValidationError("");
    setError("");
    setIsSuccess(false);
  };

  const titleBgColor = theme.palette.error.main;
  const titleTextColor = theme.palette.getContrastText(titleBgColor);

  return (
    <form onSubmit={handleSubmit}>
      <DialogTitle color={titleTextColor} bgcolor={titleBgColor} mb={2}>
        Usuwanie budżetu!
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          Uwaga, usunięcia budżetu nie da się cofnąć! <br />
          Jeśli mimo to nadal chcesz usunąć ten budżet, przepisz jego nazwę.
        </DialogContentText>
        <TextField
          value={inputValue}
          id="name"
          label={"Nazwa: " + budget.name}
          type="text"
          onChange={handleChange}
          error={Boolean(validationError)}
          helperText={validationError}
          required
          variant="outlined"
          margin="normal"
          fullWidth
        />
        {error ? (
          <Alert style={{ marginTop: 16 }} severity="error" variant="outlined">
            Usuwanie budżetu "{budget.name}" nieudane. {error}
          </Alert>
        ) : null}
        {isSuccess ? (
          <Alert style={{ marginTop: 16 }} severity="success" variant="outlined">
            Budżet {budget.name} został pomyślnie usunięty.
          </Alert>
        ) : null}
      </DialogContent>
      <DialogActions>
        {isSuccess ? (
          <Button onClick={handleConfirm} type="button" variant="contained">
            Gotowe
          </Button>
        ) : (
          <>
            <Button onClick={handleCloseDialog} type="button">
              Anuluj
            </Button>
            <Button type="submit" color="error" variant="contained">
              Usuń
            </Button>
          </>
        )}
      </DialogActions>
    </form>
  );
};

export default DeleteBudgetDialog;
