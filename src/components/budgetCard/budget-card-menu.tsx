import * as React from "react";
//* Firebase
import { auth } from "../../firebase";
//* MUI & Icons
import { Menu, Divider } from "@mui/material";
//* Components
import ActionButton from "../budget-settings/budget-actions-button";
//* Types
import { AppBudgetMetaData, BudgetActions } from "../../types/AppTypes";

interface BudgetCardMenuProps {
  budget: AppBudgetMetaData;
  anchorEl: HTMLElement;
  handleMenuClose: () => void;
}

const BudgetCardMenu: React.FC<BudgetCardMenuProps> = ({ budget, anchorEl, handleMenuClose }) => {
  const menuId = "";
  const isMenuOpen: boolean = Boolean(anchorEl);
  const isOwner = budget.owner.id === auth.currentUser?.uid;
  const isArchived = budget.state === "archived";

  const menuList: (BudgetActions | "divider")[] = [];
  if (isOwner) {
    if (!isArchived) {
      menuList.push("edit");
      menuList.push("divider");
    }
    menuList.push("archive");
    menuList.push("delete");
  } else {
    menuList.push("leave");
  }

  const actionButtons = menuList.map((itemName) => {
    if (itemName !== "divider") {
      return <ActionButton variant={"menu-item"} budget={budget} action={itemName} key={itemName} />;
    } else {
      return <Divider key={itemName} />;
    }
  });

  return (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      id={menuId}
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      {actionButtons}
    </Menu>
  );
};

export default BudgetCardMenu;
