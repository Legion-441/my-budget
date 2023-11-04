import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { fetchAndSetAccountData, selectAccountInfo } from "../../slices/account/account.slice";
//* MUI
import { ExpandLess, ExpandMore, Refresh } from "@mui/icons-material";
import { Box, Button, IconButton, Typography } from "@mui/material";
//* Styled Components
import CustomAlert from "../../styled/budgetList-alert/budgetList-alert.styled";
//* Utils
import { getIconComponent } from "../../utils/icon-utils";
//* Types
import { BudgetsListItem } from "../../types/AppTypes";

interface BudgetListButtonProps {
  isOpen: boolean;
  handleToggleBudgetsMenu: () => void;
  selectedBudget: null | BudgetsListItem;
}

const BudgetListButton: React.FC<BudgetListButtonProps> = ({ isOpen, handleToggleBudgetsMenu, selectedBudget }) => {
  const { isFetching, fetchError } = useAppSelector(selectAccountInfo);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const controller = new AbortController();
    return () => {
      controller.abort();
    };
  }, []);

  if (fetchError) {
    return (
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
            <IconButton aria-label="refresh" size="small" onClick={() => dispatch(fetchAndSetAccountData())}>
              <Refresh fontSize="small" />
            </IconButton>
          }
        >
          <Typography noWrap={true} variant="body1" fontSize={"medium"} overflow="hidden" textOverflow="ellipsis">
            {fetchError}
          </Typography>
        </CustomAlert>
      </Box>
    );
  }

  return (
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
      startIcon={selectedBudget?.icon && getIconComponent(selectedBudget.icon)}
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
        {isFetching ? "Pobieram listę..." : selectedBudget?.name || "Wybierz budżet..."}
      </Typography>
    </Button>
  );
};

export default BudgetListButton;
