import { useState } from "react";
import { useDispatch } from "react-redux";
import { addBudgetToList } from "../../slices/account/account.slice";
//* MUI
import { Alert, Button, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
//* Components
import IconSelector from "../budgetInfo/Icon-selector";
import MembersSelector from "../budgetInfo/members-selector";
//* Services
import { createBudget, updateBudget } from "../../services/budget-list-operations";
import { updateAccount } from "../../services/account-operations";
//* Types
import { BudgetIcon, BudgetFormData, AppBudgetMetaData, MemberOrOwner } from "../../types/AppTypes";
import { getFirestoreErrorText } from "../../utils/firestoreErrorHandling";

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
  const [budgetFormData, setBudgetFormData] = useState<BudgetFormData>(extractBudgetFormData(budget));
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [creatingErrors, setCreatingErrors] = useState<string>("");
  const [updatingListError, setUpdatingListError] = useState<string>("");
  const dispatch = useDispatch();
  const isCreateForm = !budget;

  const { name, icon, members, description } = budgetFormData;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setCreatingErrors("");
    setUpdatingListError("");

    try {
      if (isCreateForm) {
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
      } else {
        await updateBudget(budget, budgetFormData);
        setIsSuccess(true);
        // todo: delete olso in budget list and redux
      }
    } catch (error) {
      setIsSuccess(false);
      const errorText = getFirestoreErrorText(error);
      setCreatingErrors(errorText);
    } finally {
      setIsLoading(false);
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

  const handleMembersChange = (newMembers: MemberOrOwner[]) => {
    clearErrors();
    setBudgetFormData({ ...budgetFormData, members: newMembers });
  };

  const handleClose = () => {
    onClose();
    setBudgetFormData({ ...INITIAL_BUDGET_FORM_DATA });
    clearErrors();
    setIsSuccess(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <DialogTitle>{isCreateForm ? "Utwórz nowy budżet" : "Edycja budżetu!"}</DialogTitle>
      <DialogContent>
        <TextField
          id="budgetNameInput"
          value={name}
          autoFocus
          label="Nazwa"
          type="text"
          autoComplete="off"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleTextInputChange(e, "name")}
          // error={Boolean(creatingErrors)}
          // helperText={creatingErrors}
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
          // error={Boolean(creatingErrors)}
          // helperText={creatingErrors}
          variant="outlined"
          margin="normal"
          fullWidth
        />
        {/* //TODO: Add this feature when ready. (create friends list, adding friends, sending ivitation to budget). consider moving this feature to budget managment page */}
        {/* <MembersSelector value={memberIDs} onChange={(newMemberIDs) => handleMembersChange(newMemberIDs)} /> */}

        {isSuccess ? (
          <Alert style={{ marginTop: 16 }} severity="success" variant="outlined">
            Sukces! {isCreateForm ? "Stworzyłeś nowy" : "Zaktualizowałeś"} budżet {name}
          </Alert>
        ) : null}
        {!isLoading && creatingErrors !== "" ? (
          <Alert style={{ marginTop: 16 }} severity="error" variant="outlined">
            Wystąpił błąd podczas zapisywania tego budżetu: <br />
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
        {isSuccess ? (
          <Button onClick={handleClose} type="button" variant="contained">
            Gotowe
          </Button>
        ) : (
          <>
            <Button onClick={handleClose} disabled={isLoading} type="button">
              Anuluj
            </Button>
            <Button type="submit" disabled={isLoading} variant="contained">
              {isCreateForm ? "Stwórz" : "Zaktualizuj"}
            </Button>
          </>
        )}
      </DialogActions>
    </form>
  );
};

export default CreateOrEditBudgetDialog;
