import * as React from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import { selectUserInfo } from "../../slices/user/user.slice";
//* MUI
import { Menu } from "@mui/material";
//* Components
import BudgetsMenuList from "./budgets-menu-list";

interface AppMenuProps {
  anchorEl: null | HTMLElement;
  handleToggleBudgetsMenu: () => void;
}

const AppBudgetsMenu: React.FC<AppMenuProps> = ({ anchorEl, handleToggleBudgetsMenu }) => {
  const isMenuOpen: boolean = Boolean(anchorEl);
  const navigate = useNavigate();
  const { data } = useAppSelector(selectUserInfo);
  const { budgetsList } = data;
  const menuId = "primary-search-budget-menu";

  function onBudgetListItemClick(itemID: string) {
    handleToggleBudgetsMenu();
    navigate(`/budget/${itemID}/dash`);
  }

  return (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={() => handleToggleBudgetsMenu()}
      PaperProps={{
        elevation: 15,
        sx: {
          overflow: "visible",
          filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
          mt: 1.5,
          alignItems: "center",
          minWidth: 200,
          maxWidth: "100%",
        },
      }}
    >
      <BudgetsMenuList budgets={budgetsList} onClick={(itemID) => onBudgetListItemClick(itemID)} />
    </Menu>
  );
};

export default AppBudgetsMenu;
