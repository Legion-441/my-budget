import { useState } from "react";
import { useNavigate } from "react-router-dom";
//* MUI
import { Alert, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from "@mui/material";
//* Services
import { deleteBudget } from "../../services/budget-list-operations";
//* Utils
import { getFirestoreErrorText } from "../../utils/firestoreErrorHandling";
//* Types
import { AppBudgetMetaData } from "../../types/AppTypes";

interface DeleteBudgetButtonProps {
  pickedBudget: AppBudgetMetaData;
  isReadOnly: boolean;
}

const DeleteBudgetButton: React.FC<DeleteBudgetButtonProps> = ({ pickedBudget, isReadOnly }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [inputValue, setInputValue] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [validationError, setValidationError] = useState<string>("");
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleOpenDialog = () => {
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setInputValue("");
    setError("");
    setValidationError("");
    setIsSuccess(false);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setValidationError("");
    
    if (inputValue !== pickedBudget.name) {
      return setValidationError("Nazwa jest niezgodna");
    }

    deleteBudget(pickedBudget.id)
      .then(() => {
        setIsSuccess(true);
        // todo: delete olso in budget list and redux
        navigate("/");
      })
      .catch((error) => {
        setIsSuccess(false);
        const errorText = getFirestoreErrorText(error);
        setError(errorText);
      });
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
    setValidationError("");
  };

  return (
    <>
      <Button color="error" variant="outlined" size="small" onClick={handleOpenDialog} disabled={isReadOnly}>
        Usuń ten budżet
      </Button>
      <Dialog onClose={handleCloseDialog} open={isDialogOpen}>
        <form onSubmit={handleSubmit}>
          <DialogTitle>Usuwanie budżetu!</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Uwaga, operacja ta jest nieodwracalna! <br />
              Jeśli jesteś pewien, że chcesz usunąć ten budżet przepisz jego nazwę.
            </DialogContentText>
            <TextField
              value={inputValue}
              autoFocus
              id="name"
              label={"Nazwa: " + pickedBudget.name}
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
                Usuwanie budżetu "{pickedBudget.id}" nieudane. {error}
              </Alert>
            ) : null}
            {isSuccess ? (
              <Alert style={{ marginTop: 16 }} severity="success" variant="outlined">
                Budżet {pickedBudget.id} został pomyślnie usunięty
              </Alert>
            ) : null}
          </DialogContent>
          <DialogActions>
            {isSuccess ? (
              <Button onClick={() => navigate("/")} type="button" variant="contained">
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
      </Dialog>
    </>
  );
};

export default DeleteBudgetButton;
