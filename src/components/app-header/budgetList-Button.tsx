import { BudgetsListItem } from "../../slices/user/user.slice";
//* MUI
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { Button, Typography } from "@mui/material";
//* Utils
import { getIconComponent } from "../../utils/iconUtils";

interface BudgetListButtonProps {
  disabled: boolean;
  isOpen: boolean
  handleToggleBudgetsMenu: () => void;
  selectedBudget: null | BudgetsListItem;
}

const BudgetListButton: React.FC<BudgetListButtonProps> = ({disabled, isOpen, handleToggleBudgetsMenu, selectedBudget }) => {
  return (
    <Button
      id='BudgetButton'
      aria-label='Wybierz budżet'
      color="inherit"
      variant="outlined"
      disabled={disabled}
      onClick={handleToggleBudgetsMenu}
      sx={{
        display: 'flex',
        alignItems: 'center',
        flexGrow: {sm: 0, xs: 1},
        minWidth: {sm: 200, xs: 80}
      }}
      startIcon={selectedBudget?.icon && getIconComponent(selectedBudget.icon)}
      endIcon={isOpen ? <ExpandLess /> : <ExpandMore />}
    >
      <Typography
        noWrap={true}
        variant="body1"
        fontSize={"medium"}
        overflow='hidden'
        textOverflow='ellipsis'
        flexGrow={1}
        textAlign={'left'}
      >
        {selectedBudget?.name || 'Wybierz budżet...'}
      </Typography>
    </Button>
  )
}

export default BudgetListButton;