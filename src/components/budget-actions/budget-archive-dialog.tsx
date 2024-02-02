import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
//* MUI
import { Alert, Button, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
//* Services
import { toggleArchiveBudget } from "../../services/budget-meta-operations";
//* Utils
import { getFirestoreErrorText } from "../../utils/firestoreErrorHandling";
//* Types
import { BudgetDialogProps } from "../../types/AppTypes";

const ArchiveBudgetDialog: React.FC<BudgetDialogProps> = ({ budget, onClose }) => {
  const [error, setError] = useState<string>("");
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const navigate = useNavigate();
  const location = useLocation();

  const archiveConfig = {
    archived: {
      titleText: `Przywracanie budżetu!`,
      questionText: `Jesteś pewien, że chcesz przywrócić budżet "${budget.name}" z archiwum?`,
      errorText: `Przywracanie budżetu "${budget.name}" nieudane. ${error}.`,
      successText: `Budżet "${budget.name}" został pomyślnie przywrócony.`,
      buttonText: `Przywróć`,
    },
    active: {
      titleText: `Archiwizacja budżetu!`,
      questionText: `Jesteś pewien, że chcesz przenieść budżet "${budget.name}" do archiwum?`,
      errorText: `Archiwizacja budżetu "${budget.name}" nieudana. ${error}.`,
      successText: `Budżet "${budget.name}" został pomyślnie zarchiwizowany.`,
      buttonText: "Zarchiwizuj",
    },
  };

  const { titleText, questionText, errorText, successText, buttonText } = archiveConfig[budget.state];

  const handleCloseDialog = () => {
    onClose();
    setError("");
    setIsSuccess(false);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    toggleArchiveBudget(budget)
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

  return (
    <form onSubmit={handleSubmit}>
      <DialogTitle>{titleText}</DialogTitle>
      <DialogContent>
        <DialogContentText>{questionText}</DialogContentText>
        {error ? (
          <Alert style={{ marginTop: 16 }} severity="error" variant="outlined">
            {errorText}
          </Alert>
        ) : null}
        {isSuccess ? (
          <Alert style={{ marginTop: 16 }} severity="success" variant="outlined">
            {successText}
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
            <Button type="submit" variant="contained">
              {buttonText}
            </Button>
          </>
        )}
      </DialogActions>
    </form>
  );
};

export default ArchiveBudgetDialog;
