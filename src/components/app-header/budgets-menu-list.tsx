import * as React from "react";
//* Firebase
import { auth } from "../../firebase";
//* Utils
import { getIconComponent } from "../../utils/icon-utils";
//* MUI
import { MenuItem, ListItemIcon, ListItemText, Divider } from "@mui/material";
//* Types
import { BudgetsListItem } from "../../types/AppTypes";

interface BudgetListProps {
  budgets: BudgetsListItem[];
  onClick: (id: string) => void;
}

const BudgetsMenuList: React.FC<BudgetListProps> = ({ budgets, onClick }) => {
  if (budgets.length === 0) return null;
  const userUid = auth.currentUser?.uid;

  const asOwnerBudgets = budgets.filter((item) => item.owner.id === userUid);
  const asMemberbudgets = budgets.filter((item) => item.owner.id !== userUid);

  const renderBudgetItems = (budgets: BudgetsListItem[], isOwner: boolean): JSX.Element[] => {
    return budgets.map((item) => (
      <MenuItem key={item.id} onClick={() => onClick(item.id)}>
        <ListItemIcon>{getIconComponent(item.icon)}</ListItemIcon>
        <ListItemText secondary={`(${isOwner ? "Własne" : item.owner.username})`} primary={item.name} />
      </MenuItem>
    ));
  };

  return (
    <>
      {renderBudgetItems(asOwnerBudgets, true)}
      {asOwnerBudgets.length !== 0 && asMemberbudgets.length !== 0 ? <Divider textAlign="left">Kooperacja:</Divider> : null}
      {renderBudgetItems(asMemberbudgets, false)}
    </>
  );
};

export default BudgetsMenuList;
