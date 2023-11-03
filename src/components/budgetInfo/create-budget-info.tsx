import { useState } from "react";
import { useDispatch } from "react-redux";
import { addBudgetToList } from "../../slices/user/user.slice";
//* MUI
import { Alert, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
//* Components
import IconSelector from "./Icon-selector";
import MembersSelector from "./members-selector";
//* Services
import { createBudget } from "../../services/budget-list-operations";
import { updateAccount } from "../../services/account-operations";
//* Types
import { BudgetIcon, BudgetInfoFormData } from "../../types/AppTypes";
import { FirebaseError } from "firebase/app";

const INITIAL_BUDGET_FORM_DATA: BudgetInfoFormData = {
  name: "",
  icon: "None",
  memberIDs: [],
  description: "",
};

interface CreateBudgetDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

const CreateBudgetDialog = ({ isOpen, onClose }: CreateBudgetDialogProps) => {
  const [budgetFormData, setBudgetFormData] = useState<BudgetInfoFormData>({ ...INITIAL_BUDGET_FORM_DATA });
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
          setUpdatingListError(error.code);
        });
    } catch (error) {
      if (error instanceof FirebaseError) {
        setCreatingErrors(error.code);
      } else if (error instanceof Error) {
        setCreatingErrors(error.message);
      }
    } finally {
      setIsLoading(false);
      setBudgetFormData({ ...INITIAL_BUDGET_FORM_DATA });
    }
  };

  const handleTextInputChange = (event: React.ChangeEvent<HTMLInputElement>, input: keyof BudgetInfoFormData) => {
    setBudgetFormData({ ...budgetFormData, [input]: event.target.value });
  };

  const handleIconChange = (newIcon: BudgetIcon) => {
    setBudgetFormData({ ...budgetFormData, icon: newIcon });
  };

  const handleMembersChange = (newMemberIDs: string[]) => {
    setBudgetFormData({ ...budgetFormData, memberIDs: newMemberIDs });
  };

  const handleClose = () => {
    onClose();
    setBudgetFormData({ ...INITIAL_BUDGET_FORM_DATA });
    setCreatingErrors("");
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
              Podczas tworzenia budżetu wystąpił błąd: {creatingErrors}
            </Alert>
          ) : null}
          {!isLoading && updatingListError !== "" ? (
            <Alert style={{ marginTop: 16 }} severity="error" variant="outlined">
              Podczas dodawania do listy przypiętych budżetów wystąpił błąd: {updatingListError}
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
