import { useState } from "react";
import { useNavigate } from "react-router-dom";
//* MUI
import { Alert, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
//* Services
import { archiveBudget } from "../../services/budget-list-operations";
//* Utils
import { getFirestoreErrorText } from "../../utils/firestoreErrorHandling";
//* Types
import { AppBudgetMetaData } from "../../types/AppTypes";

interface ArchiveBudgetButtonProps {
  pickedBudget: AppBudgetMetaData;
  isReadOnly: boolean;
}

const ArchiveBudgetButton: React.FC<ArchiveBudgetButtonProps> = ({ pickedBudget, isReadOnly }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [error, setError] = useState<string>("");
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleOpenDialog = () => {
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setError("");
    setIsSuccess(false);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    archiveBudget(pickedBudget)
      .then(() => {
        setIsSuccess(true);
        // todo: delete in budget list and redux
        navigate("/");
      })
      .catch((error) => {
        setIsSuccess(false);
        const errorText = getFirestoreErrorText(error);
        setError(errorText);
      });
  };

  return (
    <>
      <Button variant="outlined" size="small" onClick={handleOpenDialog} disabled={isReadOnly}>
        Zarchiwizuj ten budżet
      </Button>
      <Dialog onClose={handleCloseDialog} open={isDialogOpen}>
        <form onSubmit={handleSubmit}>
          <DialogTitle>Archiwizacja budżetu!</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Jesteś pewien, że chcesz zarchiwizować ten budżet?
            </DialogContentText>
            {error ? (
              <Alert style={{ marginTop: 16 }} severity="error" variant="outlined">
                Archiwizacja budżetu "{pickedBudget.id}" nieudana. {error}
              </Alert>
            ) : null}
            {isSuccess ? (
              <Alert style={{ marginTop: 16 }} severity="success" variant="outlined">
                Budżet {pickedBudget.id} został pomyślnie zarchiwizowany
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
                <Button type="submit" variant="contained">
                  Zarchiwizuj
                </Button>
              </>
            )}
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
};

export default ArchiveBudgetButton;
