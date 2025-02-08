import { useState } from "react";
import { useAppSelector } from "../../app/hooks";
//* MUI
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { Button, Typography } from "@mui/material";
//* Components
import BudgetIconComponent from "../budgetInfo/budget-icon";
import AppBudgetsMenu from "./budgets-menu";
//* Slices
import { selectAccountInfo } from "../../slices/account/account.slice";
import { selectPickedBudget } from "../../slices/app/app.slice";

const BudgetListButton: React.FC = () => {
  const [budgetAnchorEl, setBudgetAnchorEl] = useState<null | HTMLElement>(null);
  const { isFetching } = useAppSelector(selectAccountInfo);
  const pickedBudget = useAppSelector(selectPickedBudget);
  const pickedBudgetIcon = pickedBudget.data?.icon || null;
  const pickedBudgetName = pickedBudget.data?.name || null;

  const isOpen = budgetAnchorEl !== null;

  const handleToggleBudgetsMenu = (event?: React.MouseEvent<HTMLElement>) => {
    setBudgetAnchorEl(!budgetAnchorEl && event ? event.currentTarget : null);
  };

  return (
    <>
      <Button
        id="BudgetButton"
        aria-label="Wybierz budżet"
        color="inherit"
        variant="outlined"
        disabled={isFetching}
        onClick={handleToggleBudgetsMenu}
        sx={{
          display: "flex",
          alignItems: "center",
          flexGrow: { sm: 0, xs: 1 },
          minWidth: { sm: 200, xs: 80 },
        }}
        startIcon={pickedBudgetIcon && <BudgetIconComponent iconName={pickedBudgetIcon} />}
        endIcon={isOpen ? <ExpandLess /> : <ExpandMore />}
      >
        <Typography
          noWrap={true}
          variant="body1"
          fontSize={"medium"}
          overflow="hidden"
          textOverflow="ellipsis"
          flexGrow={1}
          textAlign={"left"}
        >
          {isFetching ? "Pobieram listę..." : pickedBudgetName || "Wybierz budżet..."}
        </Typography>
      </Button>
      <AppBudgetsMenu anchorEl={budgetAnchorEl} handleToggleBudgetsMenu={handleToggleBudgetsMenu} />
    </>
  );
};

export default BudgetListButton;
