import { useState } from "react";
import { useDispatch } from "react-redux";
import { addBudgetToList } from "../../slices/account/account.slice";
//* MUI
import { Alert, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
//* Components
import IconSelector from "./Icon-selector";
import MembersSelector from "./members-selector";
//* Services
import { createBudget } from "../../services/budget-list-operations";
import { updateAccount } from "../../services/account-operations";
//* Types
import { BudgetIcon, BudgetFormData } from "../../types/AppTypes";
import { getFirestoreErrorText } from "../../utils/firestoreErrorHandling";

const INITIAL_BUDGET_FORM_DATA: BudgetFormData = {
  name: "",
  icon: "none",
  memberIDs: [],
  description: "",
  state: "active",
};

interface CreateBudgetDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

const CreateBudgetDialog = ({ isOpen, onClose }: CreateBudgetDialogProps) => {
  const [budgetFormData, setBudgetFormData] = useState<BudgetFormData>({ ...INITIAL_BUDGET_FORM_DATA });
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [creatingErrors, setCreatingErrors] = useState<string>("");
  const [updatingListError, setUpdatingListError] = useState<string>("");
  const dispatch = useDispatch();

  const { name, icon, memberIDs, description } = budgetFormData;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setCreatingErrors("");
    setUpdatingListError("");

    try {
      const budgetData = await createBudget(budgetFormData);
      setIsSuccess(true);
      updateAccount(budgetData)
        .then(() => {
          dispatch(addBudgetToList(budgetData));
        })
        .catch((error) => {
          const errorText = getFirestoreErrorText(error);
          setUpdatingListError(errorText);
        });
    } catch (error) {
      const errorText = getFirestoreErrorText(error);
      setCreatingErrors(errorText);
    } finally {
      setIsLoading(false);
      setBudgetFormData({ ...INITIAL_BUDGET_FORM_DATA });
    }
  };

  const clearErrors = () => {
    setCreatingErrors("");
    setUpdatingListError("");
  };

  const handleTextInputChange = (event: React.ChangeEvent<HTMLInputElement>, input: keyof BudgetFormData) => {
    clearErrors();
    setBudgetFormData({ ...budgetFormData, [input]: event.target.value });
  };

  const handleIconChange = (newIcon: BudgetIcon) => {
    clearErrors();
    setBudgetFormData({ ...budgetFormData, icon: newIcon });
  };

  const handleMembersChange = (newMemberIDs: string[]) => {
    clearErrors();
    setBudgetFormData({ ...budgetFormData, memberIDs: newMemberIDs });
  };

  const handleClose = () => {
    onClose();
    setBudgetFormData({ ...INITIAL_BUDGET_FORM_DATA });
    clearErrors();
    setIsSuccess(false);
  };

  return (
    <Dialog onClose={handleClose} open={isOpen} fullWidth>
      <form onSubmit={handleSubmit}>
        <DialogTitle>Utwórz nowy budżet</DialogTitle>
        <DialogContent>
          <TextField
            id="budgetNameInput"
            value={name}
            autoFocus
            label="Nazwa"
            type="text"
            autoComplete="off"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleTextInputChange(e, "name")}
            error={Boolean(creatingErrors)}
            helperText={creatingErrors}
            required
            variant="outlined"
            margin="normal"
            fullWidth
          />
          <IconSelector value={icon} onChange={(newIcon) => handleIconChange(newIcon)} />
          <TextField
            value={description}
            autoFocus
            label="Opis"
            type="text"
            autoComplete="off"
            multiline
            minRows={2}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleTextInputChange(e, "description")}
            error={Boolean(creatingErrors)}
            helperText={creatingErrors}
            variant="outlined"
            margin="normal"
            fullWidth
          />
          {/* //TODO: Add this feature when ready. (create friends list, adding friends, sending ivitation to budget). consider moving this feature to budget managment page */}
          {/* <MembersSelector value={memberIDs} onChange={(newMemberIDs) => handleMembersChange(newMemberIDs)} /> */}

          {isSuccess ? (
            <Alert style={{ marginTop: 16 }} severity="success" variant="outlined">
              Sukces! Stworzyłeś nowy budżet {name}
            </Alert>
          ) : null}
          {!isLoading && creatingErrors !== "" ? (
            <Alert style={{ marginTop: 16 }} severity="error" variant="outlined">
              Wystąpił błąd podczas tworzenia tego budżetu: <br />
              {creatingErrors}
            </Alert>
          ) : null}
          {!isLoading && updatingListError !== "" ? (
            <Alert style={{ marginTop: 16 }} severity="error" variant="outlined">
              Wystąpił błąd podczas dodawania tego budżetu do listy przypiętych: <br />
              {updatingListError}
            </Alert>
          ) : null}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} type="button" disabled={isLoading}>
            {isSuccess ? "Gotowe" : "Anuluj"}
          </Button>
          {!isSuccess ? (
            <Button type="submit" disabled={isLoading}>
              Stwórz
            </Button>
          ) : null}
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default CreateBudgetDialog;
