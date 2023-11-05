import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import { selectPickedBudget } from "../../slices/app/app.slice";
//* MUI
import { Alert, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Stack, TextField } from "@mui/material";
//* Styled Components
import PaperCard from "../../styled/paper-card/paper-card.styled";
//* Services
import { deleteBudget } from "../../services/budget-list-operations";
//* Utils
import { getFirestoreErrorText } from "../../utils/firestoreErrorHandling";

const SettingsView: React.FC = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const pickedBudget = useAppSelector(selectPickedBudget);
  const [inputValue, setInputValue] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [isBudgetDeleted, setIsBudgetDeleted] = useState<boolean>(false);
  const navigate = useNavigate();
  

  useEffect(() => {}, []);

  const handleOpenDialog = () => {
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setInputValue("");
    setError("");
    setIsBudgetDeleted(false);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    if (pickedBudget && inputValue === pickedBudget?.name) {
      deleteBudget(pickedBudget.id)
        .then((isDeleted) => {
          setIsBudgetDeleted(isDeleted);
          // todo: delete olso in budget list and redux
          navigate("/");
        })
        .catch((error) => {
          const errorText = getFirestoreErrorText(error);
          setError(errorText);
        });
    } else {
      setError("Nazwa jest niezgodna");
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
    setError("");
  };

  return (
    <>
      <PaperCard>
        ID: {pickedBudget?.id} <br />
        Nazwa: {pickedBudget?.name} <br />
        ikona: {pickedBudget?.icon} <br />
        Opis: {pickedBudget?.description} <br />
        Właściciel: {pickedBudget?.owner?.username} <br />
        Data utworzenia: {pickedBudget ? new Date(pickedBudget.createdAt).toLocaleString() : ''} <br />
        Członkowie: {pickedBudget?.memberIDs?.join(', ')} <br />
      </PaperCard>
      {/* //TODO: disable this button when user isnt owner of selected budget */}
      <Stack spacing={1} direction="row">
        <Button variant="outlined" size="small">
          Archiwizuj ten budżet
        </Button>
        <Button color="error" variant="outlined" size="small" onClick={handleOpenDialog}>
          Usuń ten budżet
        </Button>
      </Stack>
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
              label={"Nazwa: " + pickedBudget?.name}
              type="text"
              onChange={handleChange}
              error={Boolean(error)}
              helperText={error}
              required
              variant="outlined"
              margin="normal"
              fullWidth
            />
            {isBudgetDeleted ? (
              <Alert style={{ marginTop: 16 }} severity="success" variant="outlined">
                Budżet {pickedBudget?.id} został pomyślnie usunięty
              </Alert>
            ) : null}
          </DialogContent>
          <DialogActions>
            {isBudgetDeleted ? (
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

export default SettingsView;
