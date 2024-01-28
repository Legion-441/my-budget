import * as React from "react";
//* Firebase
import { auth } from "../../firebase";
//* MUI
import { MenuItem, ListItemIcon, ListItemText, Divider } from "@mui/material";
//* Styled components
import UnstyledLink from "../../styled/unstyled-link/unstyled-link.styled";
//* Components
import BudgetIconComponent from "../budgetInfo/budget-icon";
//* Types
import { BudgetsListItem } from "../../types/AppTypes";

interface BudgetListProps {
  budgets: BudgetsListItem[];
  handleClick: () => void;
}

const BudgetsMenuList: React.FC<BudgetListProps> = ({ budgets, handleClick }) => {
  if (budgets.length === 0) return <MenuItem disabled>Lista jest pusta</MenuItem>;
  const userUid = auth.currentUser?.uid;

  const asOwnerBudgets = budgets.filter((item) => item.owner.id === userUid);
  const asMemberbudgets = budgets.filter((item) => item.owner.id !== userUid);

  const renderBudgetItems = (budgets: BudgetsListItem[], isOwner: boolean): JSX.Element[] => {
    return budgets.map((item) => (
      <MenuItem component={UnstyledLink} to={`/budget/${item.id}/dash`} key={item.id} onClick={handleClick}>
        <ListItemIcon>
          <BudgetIconComponent iconName={item.icon} />
        </ListItemIcon>
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
