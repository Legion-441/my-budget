import { useState } from "react";
//* MUI
import { Alert, Box, Button, Checkbox, DialogActions, DialogContent, DialogTitle, FormControlLabel, TextField } from "@mui/material";
//* Components
import IconSelector from "../budgetInfo/Icon-selector";
//* Services
import { createBudget, updateBudget } from "../../services/budget-meta-operations";
//* Utils
import { getFirestoreErrorText } from "../../utils/firestoreErrorHandling";
import getChangedBudgetData from "../../utils/get-budget-changes";
//* Types
import { BudgetIconName, BudgetFormData, AppBudgetMetaData } from "../../types/AppTypes";

const INITIAL_BUDGET_FORM_DATA: BudgetFormData = {
  name: "",
  icon: "none",
  members: [],
  description: "",
  state: "active",
};

const extractBudgetFormData = (budget: AppBudgetMetaData | null): BudgetFormData => {
  if (budget) {
    const { name, icon, members, description, state } = budget;
    return { name, icon, members, description, state };
  }
  return { ...INITIAL_BUDGET_FORM_DATA };
};

interface CreateBudgetDialogProps {
  budget: AppBudgetMetaData | null;
  onClose: () => void;
}

const CreateOrEditBudgetDialog: React.FC<CreateBudgetDialogProps> = ({ budget, onClose }) => {
  const isCreateForm = !budget;
  const [budgetFormData, setBudgetFormData] = useState<BudgetFormData>(extractBudgetFormData(budget));
  const [pinItCheckbox, setPinItCheckbox] = useState<boolean>(isCreateForm);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorAlertText, setErrorAlertText] = useState<string>("");

  const { name, icon, description } = budgetFormData;
  const changedFields: Partial<BudgetFormData> = !isCreateForm ? getChangedBudgetData(budget, budgetFormData) : {};
  const isChanged: boolean = Object.keys(changedFields).length > 0;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorAlertText("");

    try {
      if (isCreateForm) {
        await createBudget(budgetFormData, pinItCheckbox);
      } else {
        await updateBudget(budget, changedFields);
      }
      setIsSuccess(true);
    } catch (error) {
      setIsSuccess(false);
      const errorText = getFirestoreErrorText(error);
      setErrorAlertText(errorText);
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const clearErrors = () => {
    setErrorAlertText("");
  };

  const handleTextInputChange = (event: React.ChangeEvent<HTMLInputElement>, input: keyof BudgetFormData) => {
    clearErrors();
    setBudgetFormData({ ...budgetFormData, [input]: event.target.value });
  };

  const handleIconChange = (newIcon: BudgetIconName) => {
    clearErrors();
    setBudgetFormData({ ...budgetFormData, icon: newIcon });
  };

  const handleClose = () => {
    onClose();
    setBudgetFormData({ ...INITIAL_BUDGET_FORM_DATA });
    clearErrors();
    setIsSuccess(false);
  };

  const handlePin = () => {
    setPinItCheckbox(!pinItCheckbox);
  };

  return (
    <form onSubmit={handleSubmit}>
      <DialogTitle>{isCreateForm ? "Utwórz nowy budżet" : "Edycja budżetu!"}</DialogTitle>
      <DialogContent>
        <Box display={"flex"} gap={1}>
          <IconSelector value={icon} onChange={(newIcon) => handleIconChange(newIcon)} />
          <TextField
            id="budgetNameInput"
            value={name}
            autoFocus
            label="Nazwa"
            type="text"
            autoComplete="off"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleTextInputChange(e, "name")}
            required
            variant="outlined"
            margin="normal"
            fullWidth
          />
        </Box>
        <TextField
          value={description}
          label="Opis"
          type="text"
          autoComplete="off"
          multiline
          minRows={2}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleTextInputChange(e, "description")}
          variant="outlined"
          margin="normal"
          fullWidth
        />
        {isCreateForm ? (
          <FormControlLabel control={<Checkbox />} checked={pinItCheckbox} onChange={handlePin} label="Przypnij do szybkiego wyboru" />
        ) : null}
        {isSuccess ? (
          <Alert style={{ marginTop: 16 }} severity="success" variant="outlined">
            Sukces! {isCreateForm ? "Stworzyłeś nowy" : "Zaktualizowałeś"} budżet {name}
          </Alert>
        ) : null}
        {!isLoading && errorAlertText !== "" ? (
          <Alert style={{ marginTop: 16 }} severity="error" variant="outlined">
            Wystąpił błąd podczas zapisywania tego budżetu: <br />
            {errorAlertText}
          </Alert>
        ) : null}
      </DialogContent>
      <DialogActions>
        {isSuccess ? (
          <Button onClick={handleClose} type="button" variant="contained">
            Gotowe
          </Button>
        ) : (
          <>
            <Button onClick={handleClose} disabled={isLoading} type="button">
              Anuluj
            </Button>
            <Button type="submit" disabled={isLoading || (!isCreateForm && !isChanged)} variant="contained">
              {isCreateForm ? "Stwórz" : "Zaktualizuj"}
            </Button>
          </>
        )}
      </DialogActions>
    </form>
  );
};

export default CreateOrEditBudgetDialog;
