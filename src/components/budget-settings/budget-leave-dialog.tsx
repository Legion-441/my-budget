import { useState } from "react";
import { useNavigate } from "react-router-dom";
//* MUI
import { Alert, Button, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
//* Types
import { BudgetDialogProps } from "../../types/AppTypes";

const LeaveBudgetDialog: React.FC<BudgetDialogProps> = ({ budget, onClose }) => {
  const [error, setError] = useState<string>("");
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleCloseDialog = () => {
    setError("");
    setIsSuccess(false);
    onClose();
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    console.log("bum, stuku, puk...");
    console.log("Pomyślnie opuściłeś budżet ", budget.name);

    // deleteBudget(budget.id)
    //   .then(() => {
    //     setIsSuccess(true);
    //     // todo: delete olso in budget list and redux
    //     navigate("/");
    //   })
    //   .catch((error) => {
    //     setIsSuccess(false);
    //     const errorText = getFirestoreErrorText(error);
    //     setError(errorText);
    //   });
  };

  return (
    <form onSubmit={handleSubmit}>
      <DialogTitle>Opuszczanie budżetu!</DialogTitle>
      <DialogContent>
        <DialogContentText>Czy napewno chcesz opuścić ten budżet?</DialogContentText>
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
          <Button onClick={handleCloseDialog} type="button" variant="contained">
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
