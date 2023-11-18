import { useState } from "react";
//* MUI & Icons
import { Button, Dialog, ListItemIcon, MenuItem } from "@mui/material";
import { Edit, Archive, Delete, ExitToApp, Unarchive } from "@mui/icons-material";
//* Components
import EditBudgetDialog from "./budget-edit-dialog";
import ArchiveBudgetDialog from "./budget-archive-dialog";
import DeleteBudgetDialog from "./budget-delete-dialog";
import LeaveBudgetDialog from "./budget-leave-dialog";
//* Types
import { AppBudgetMetaData, BudgetActions } from "../../types/AppTypes";
import { ButtonProps } from "@mui/material/Button";

type ButtonColor = ButtonProps["color"];

type ActionAttributes = {
  text: string;
  icon: JSX.Element;
  color: ButtonColor;
  dialog: JSX.Element;
};

interface ActionButtonProps {
  budget: AppBudgetMetaData;
  variant: "button" | "menu-item";
  action: BudgetActions;
}

const ActionButton: React.FC<ActionButtonProps> = ({ budget, variant, action }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const isButtonType = variant === "button";

  const handleOpenDialog = () => {
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  const actionConfig: Record<string, ActionAttributes> = {
    edit: {
      text: "Edytuj",
      icon: <Edit color={"primary"} />,
      color: "primary",
      dialog: <EditBudgetDialog budget={budget} onClose={handleCloseDialog} />,
    },
    archive: {
      text: budget.state === "active" ? "Archiwizuj" : "Odarchiwizuj",
      icon: budget.state === "active" ? <Archive color={"warning"} /> : <Unarchive color={"warning"} />,
      color: "warning",
      dialog: <ArchiveBudgetDialog budget={budget} onClose={handleCloseDialog} />,
    },
    delete: {
      text: "Usuń",
      icon: <Delete color={"error"} />,
      color: "error",
      dialog: <DeleteBudgetDialog budget={budget} onClose={handleCloseDialog} />,
    },
    leave: {
      text: "Opuść",
      icon: <ExitToApp color={"primary"} />,
      color: "primary",
      dialog: <LeaveBudgetDialog budget={budget} onClose={handleCloseDialog} />,
    },
  };

  const { text, icon, color, dialog } = actionConfig[action];

  const ActionButton = () => (
    <Button onClick={handleOpenDialog} color={color} variant="outlined">
      {text}
    </Button>
  );

  const ActionListItem = () => (
    <MenuItem onClick={handleOpenDialog}>
      <ListItemIcon>{icon}</ListItemIcon>
      {text}
    </MenuItem>
  );

  return (
    <>
      {isButtonType ? <ActionButton /> : <ActionListItem />}
      {isDialogOpen && (
        <Dialog onClose={handleCloseDialog} open={isDialogOpen}>
          {dialog}
        </Dialog>
      )}
    </>
  );
};

export default ActionButton;
