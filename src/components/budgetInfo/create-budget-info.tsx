import { useState } from "react";
import { useDispatch } from "react-redux";
import { addBudgetToList } from "../../slices/user/user.slice";
//* MUI
import { Alert, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
//* Components
import IconSelector from "./Icon-selector";
import MembersSelector from "./members-selector";
//* Utils
import { createBudget } from "../../services/budget-list-operations";
//* Types
import { BudgetIcon, BudgetInfoFormData } from "../../types/AppTypes";

const INITIAL_BUDGET_FORM_DATA: BudgetInfoFormData = {
  budgetName: "",
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
  const [error, setError] = useState<string>("");
  const [isDataSend, setIsDataSend] = useState<boolean>(false);
  const dispatch = useDispatch();

  const { budgetName, icon, memberIDs, description } = budgetFormData;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    createBudget(budgetFormData)
      .then(({ docRef, budgetData }) => {
        setError("");
        setIsDataSend(true);
        dispatch(addBudgetToList(budgetData));
      })
      .catch((error) => {
        setError(error);
      });
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
    setError("");
    setIsDataSend(false);
  };

  return (
    <Dialog onClose={handleClose} open={isOpen} fullWidth>
      <form onSubmit={handleSubmit}>
        <DialogTitle>Utwórz nowy budżet</DialogTitle>
        <DialogContent>
          <TextField
            id="budgetNameInput"
            value={budgetName}
            autoFocus
            label="Nazwa"
            type="text"
            autoComplete="off"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleTextInputChange(e, "budgetName")}
            error={Boolean(error)}
            helperText={error}
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
            error={Boolean(error)}
            helperText={error}
            variant="outlined"
            margin="normal"
            fullWidth
          />
          <MembersSelector value={memberIDs} onChange={(newMemberIDs) => handleMembersChange(newMemberIDs)} />
          {isDataSend ? (
            <Alert style={{ marginTop: 16 }} severity="success" variant="outlined">
              Sukces! Stworzyłeś nowy budżet {budgetName}
            </Alert>
          ) : null}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} type="button">
            {isDataSend ? "Gotowe" : "Anuluj"}
          </Button>
          {!isDataSend ? (
            <Button type="submit" disabled={isDataSend}>
              Stwórz
            </Button>
          ) : null}
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default CreateBudgetDialog;
