import * as React from "react";
import { useState } from "react";
//* Firebase
import { auth } from "../../firebase";
//* MUI & Icons
import { Menu, Divider } from "@mui/material";
//* Components
import ActionButton from "../budget-actions/budget-actions-button";
import BudgetActionDialog from "../budget-actions/budget-actions-dialog";
//* Types
import { AppBudgetMetaData, BudgetActions } from "../../types/AppTypes";

interface BudgetCardMenuProps {
  budget: AppBudgetMetaData;
  anchorEl: HTMLElement | null;
  handleMenuClose: () => void;
}

const BudgetCardMenu: React.FC<BudgetCardMenuProps> = ({ budget, anchorEl, handleMenuClose }) => {
  const isMenuOpen: boolean = Boolean(anchorEl);
  const isOwner = budget.owner.id === auth.currentUser?.uid;
  const isArchived = budget.state === "archived";
  const [dialogType, setDialogType] = useState<BudgetActions | null>(null);

  const handleOpenDialog = (dialogType: BudgetActions) => {
    setDialogType(dialogType);
  };
  const handleCloseDialog = () => {
    setDialogType(null);
  };

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
      return <ActionButton variant={"menu-item"} budget={budget} action={itemName} key={itemName} openDialog={handleOpenDialog} />;
    } else {
      return <Divider key={itemName} />;
    }
  });

  return (
    <>
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={isMenuOpen}
        onClose={handleMenuClose}
      >
        {actionButtons}
      </Menu>
      <BudgetActionDialog budget={budget} type={dialogType} handleClose={handleCloseDialog} />
    </>
  );
};

export default BudgetCardMenu;
