//* MUI & Icons
import { Button, ListItemIcon, MenuItem } from "@mui/material";
import { Edit, Archive, Delete, ExitToApp, Unarchive } from "@mui/icons-material";
//* Types
import { AppBudgetMetaData, BudgetActions } from "../../types/AppTypes";
import { ButtonProps } from "@mui/material/Button";

type ButtonColor = ButtonProps["color"];

type ActionAttributes = {
  text: string;
  icon: JSX.Element;
  color: ButtonColor;
};

interface ActionButtonProps {
  budget: AppBudgetMetaData;
  variant: "button" | "menu-item";
  action: BudgetActions;
  openDialog: (dialogType: BudgetActions) => void;
}

const ActionButton: React.FC<ActionButtonProps> = ({ budget, variant, action, openDialog }) => {
  const isButtonType = variant === "button";

  const actionConfig: Record<string, ActionAttributes> = {
    edit: {
      text: "Edytuj",
      icon: <Edit color={"primary"} />,
      color: "primary",
    },
    archive: {
      text: budget.state === "active" ? "Archiwizuj" : "Odarchiwizuj",
      icon: budget.state === "active" ? <Archive color={"warning"} /> : <Unarchive color={"warning"} />,
      color: "warning",
    },
    delete: {
      text: "Usuń",
      icon: <Delete color={"error"} />,
      color: "error",
    },
    leave: {
      text: "Opuść",
      icon: <ExitToApp color={"primary"} />,
      color: "primary",
    },
  };

  const { text, icon, color } = actionConfig[action];

  const ActionButton = () => (
    <Button onClick={() => openDialog(action)} color={color} variant="outlined" startIcon={icon}>
      {text}
    </Button>
  );

  const ActionListItem = () => (
    <MenuItem onClick={() => openDialog(action)}>
      <ListItemIcon>{icon}</ListItemIcon>
      {text}
    </MenuItem>
  );

  return isButtonType ? <ActionButton /> : <ActionListItem />;
};

export default ActionButton;
