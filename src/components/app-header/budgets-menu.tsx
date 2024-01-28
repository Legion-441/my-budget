import * as React from "react";
import { useAppSelector } from "../../app/hooks";
import { selectAccountInfo } from "../../slices/account/account.slice";
//* MUI
import { Button, Divider, Menu } from "@mui/material";
//* Styled components
import UnstyledLink from "../../styled/unstyled-link/unstyled-link.styled";
//* Components
import BudgetsMenuList from "./budgets-menu-list";

interface AppMenuProps {
  anchorEl: null | HTMLElement;
  handleToggleBudgetsMenu: () => void;
}

const AppBudgetsMenu: React.FC<AppMenuProps> = ({ anchorEl, handleToggleBudgetsMenu }) => {
  const isMenuOpen: boolean = Boolean(anchorEl);
  const { budgetsList } = useAppSelector(selectAccountInfo).data;

  return (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      id={"budgets-list-menu"}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleToggleBudgetsMenu}
      MenuListProps={{
        sx: { pb: 0 },
      }}
      PaperProps={{
        elevation: 15,
        sx: {
          overflow: "visible",
          filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
          mt: 0,
          alignItems: "center",
          minWidth: 200,
          maxWidth: "100%",
        },
      }}
    >
      <BudgetsMenuList budgets={budgetsList} handleClick={handleToggleBudgetsMenu} />
      <Divider style={{ marginBottom: 0 }} />
      <Button
        component={UnstyledLink}
        to={`/budget-management`}
        sx={{ borderRadius: 0 }}
        color="secondary"
        fullWidth
        onClick={handleToggleBudgetsMenu}
      >
        Zarządzaj
      </Button>
    </Menu>
  );
};

export default AppBudgetsMenu;
