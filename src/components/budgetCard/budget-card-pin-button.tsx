import { useAppSelector } from "../../app/hooks";
import { selectAccountInfo } from "../../slices/account/account.slice";
//* MUI
import { IconButton } from "@mui/material";
import { PushPin, PushPinOutlined } from "@mui/icons-material";
//* Services
import { togglePinToBudgetList } from "../../services/account-operations";
//* Types
import { AppBudgetMetaData } from "../../types/AppTypes";

type BudgetPinButtonProps = {
  budget: AppBudgetMetaData;
  isHover?: boolean;
};

const BudgetPinButton: React.FC<BudgetPinButtonProps> = ({ budget, isHover = true }) => {
  const { budgetsList } = useAppSelector(selectAccountInfo).data;
  const isPinned = budgetsList.some((budgetListItem) => budgetListItem.id === budget.id);
  const isArchived = budget.state === "archived";
  const isVisible = isArchived || (!isHover && !isPinned);

  if (isVisible) return null;

  const handleTogglePin = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    try {
      await togglePinToBudgetList(budget, budgetsList);
    } catch (error) {
      console.error(error); // TODO: handle errors
    }
  };

  return (
    <IconButton
      aria-label={isPinned ? "Odepnij" : "Przypnij"}
      size="small"
      onClick={handleTogglePin}
      onMouseDown={(e) => e.stopPropagation()}
      onMouseUp={(e) => e.stopPropagation()}
      onTouchStart={(e) => e.stopPropagation()}
      onTouchEnd={(e) => e.stopPropagation()}
    >
      {isPinned ? <PushPin /> : <PushPinOutlined />}
    </IconButton>
  );
};

export default BudgetPinButton;
