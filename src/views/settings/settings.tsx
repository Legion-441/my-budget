import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import { selectPickedBudgetId } from "../../slices/app/app.slice";
//* MUI
import { Alert, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from "@mui/material";
//* Styled Components
import PaperCard from "../../styled/paper-card/paper-card.styled";
//* Services
import { deleteBudget } from "../../services/budget-list-operations";

const SettingsView: React.FC = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const budgetId = useAppSelector(selectPickedBudgetId);
  const [inputValue, setInputValue] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [isBudgetDeleted, setIsBudgetDeleted] = useState<boolean>(false);
  const navigate = useNavigate();

  const dummyName = "Dummy name";

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
    if (inputValue === dummyName) {
      deleteBudget(budgetId)
        .then((isDeleted) => {
          setError("");
          setIsBudgetDeleted(isDeleted);
        })
        .catch((error) => {
          setError(error.message === "Missing or insufficient permissions." ? "Brak uprawnień do wykonania tej operacji" : error.message);
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
        ID: {budgetId}
        <br />
        {/* ikona: <br />
        Nazwa: <br />
        Opis: <br />
        Właściciel: <br />
        Data utworzenia: <br />
        Członkowie: <br /> */}
      </PaperCard>
      {/* //TODO: disable this button when user isnt owner of selected budget */}
      <Button color="error" variant="outlined" size="small" onClick={handleOpenDialog}>
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
              label={"Nazwa: " + dummyName}
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
                Budżet {budgetId} został pomyślnie usunięty
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
