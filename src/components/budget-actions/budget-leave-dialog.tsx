import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
//* MUI
import { Alert, Button, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
//* Types
import { BudgetDialogProps } from "../../types/AppTypes";

const LeaveBudgetDialog: React.FC<BudgetDialogProps> = ({ budget, onClose }) => {
  const [error, setError] = useState<string>("");
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleCloseDialog = () => {
    setError("");
    setIsSuccess(false);
    onClose();
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    alert("W tym momencie opuściłbyś budżet. Ta funkcjonalność nie została jeszcze wprowadzona");
    console.log("bum, stuku, puk...");
    console.log("Pomyślnie opuściłeś budżet ", budget.name);

    // deleteBudget(budget.id)
    //   .then(() => {
    //     setIsSuccess(true);
    //     dispatch(removeBudgetFromList(budget.id));
    //     // todo: delete olso in firestore budget list
    //     navigate("/");
    //   })
    //   .catch((error) => {
    //     setIsSuccess(false);
    //     const errorText = getFirestoreErrorText(error);
    //     setError(errorText);
    //   });
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
      <DialogTitle>Opuszczanie budżetu!</DialogTitle>
      <DialogContent>
        <DialogContentText>Czy napewno chcesz opuścić ten budżet?</DialogContentText>
        <Alert style={{ marginTop: 16 }} severity="warning" variant="outlined">
          Ta funkcjonalność nie została jeszcze wprowadzona
        </Alert>
        {error ? (
          <Alert style={{ marginTop: 16 }} severity="error" variant="outlined">
            Opuszczanie budżetu "{budget.name}" nieudane. {error}
          </Alert>
        ) : null}
        {isSuccess ? (
          <Alert style={{ marginTop: 16 }} severity="success" variant="outlined">
            Pomyślnie opuściłeś budżet "{budget.name}".
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
              Opuść
            </Button>
          </>
        )}
      </DialogActions>
    </form>
  );
};

export default LeaveBudgetDialog;
