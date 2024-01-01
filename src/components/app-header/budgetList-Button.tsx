import { useCallback, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { selectAccountInfo } from "../../slices/account/account.slice";
import { selectPickedBudget } from "../../slices/app/app.slice";
//* MUI
import { ExpandLess, ExpandMore, Refresh } from "@mui/icons-material";
import { Box, Button, IconButton, Tooltip, Typography } from "@mui/material";
//* Components
import BudgetIconComponent from "../budgetInfo/budget-icon";
import AppBudgetsMenu from "./budgets-menu";
//* Styled Components
import CustomAlert from "../../styled/budgetList-alert/budgetList-alert.styled";
//* Services
import { subscribeToAccountData } from "../../services/account-operations";

const BudgetListButton: React.FC = () => {
  const [budgetAnchorEl, setBudgetAnchorEl] = useState<null | HTMLElement>(null);
  const { isFetching, fetchError } = useAppSelector(selectAccountInfo);
  const dispatch = useAppDispatch();
  const pickedBudget = useAppSelector(selectPickedBudget);
  const pickedBudgetIcon = pickedBudget.data?.icon || null;
  const pickedBudgetName = pickedBudget.data?.name || null;

  const isOpen = budgetAnchorEl !== null;

  const subscribe = useCallback(() => {
    const unsubscribe = subscribeToAccountData(dispatch);
    return () => {
      unsubscribe();
    };
  }, [dispatch]);

  useEffect(() => {
    const unsubscribe = subscribe();
    return () => {
      unsubscribe();
    };
  }, [subscribe]);

  const handleToggleBudgetsMenu = (event?: React.MouseEvent<HTMLElement>) => {
    setBudgetAnchorEl(!budgetAnchorEl && event ? event.currentTarget : null);
  };

  if (fetchError) {
    return (
      <Tooltip title={fetchError} enterTouchDelay={0}>
        <Box
          sx={{
            flexGrow: { sm: 0, xs: 1 },
            minWidth: { sm: 200, xs: 80 },
          }}
        >
          <CustomAlert
            variant="outlined"
            severity="error"
            sx={{
              flexGrow: { sm: 0, xs: 1 },
            }}
            action={
              <IconButton aria-label="refresh" size="small" onClick={subscribe}>
                <Refresh fontSize="small" />
              </IconButton>
            }
          >
            <Typography noWrap={true} variant="body1" fontSize={"medium"} overflow="hidden" textOverflow="ellipsis">
              {fetchError}
            </Typography>
          </CustomAlert>
        </Box>
      </Tooltip>
    );
  }

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
