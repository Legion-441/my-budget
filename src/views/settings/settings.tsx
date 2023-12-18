import { useState } from "react";
import { useAppSelector } from "../../app/hooks";
import { selectPickedBudget } from "../../slices/app/app.slice";
//* Firebase
import { auth } from "../../firebase";
//* MUI
import { Stack } from "@mui/material";
//* Components
import BudgetFullCard from "../../components/budgetCard/budget-full-card";
import ActionButton from "../../components/budget-settings/budget-actions-button";
import BudgetActionDialog from "../../components/budget-settings/budget-actions-dialog";
//* Types
import { BudgetActions } from "../../types/AppTypes";

const SettingsView: React.FC = () => {
  const [dialogType, setDialogType] = useState<BudgetActions | null>(null);

  const pickedBudget = useAppSelector(selectPickedBudget);
  const { data: pickedBudgetData } = pickedBudget;

  if (!pickedBudgetData) return <>Nie wybrano żadnego budżetu</>;

  const isOwner = pickedBudgetData.owner.id === auth.currentUser?.uid;
  const isArchived = pickedBudgetData.state === "archived";

  const handleOpenDialog = (dialogType: BudgetActions) => {
    setDialogType(dialogType);
  };
  const handleCloseDialog = () => {
    setDialogType(null);
  };

  return (
    <>
      <BudgetFullCard budget={pickedBudgetData} />
      {isOwner ? (
        <Stack direction={"row"} margin={2} gap={2} rowGap={3} justifyContent={"space-between"} flexWrap={"wrap"}>
          <Stack direction={"row"} gap={1}>
            {!isArchived && <ActionButton variant={"button"} budget={pickedBudgetData} action={"edit"} openDialog={handleOpenDialog} />}
          </Stack>
          <Stack direction={"row"} gap={1}>
            <ActionButton variant={"button"} budget={pickedBudgetData} action={"archive"} openDialog={handleOpenDialog} />
            <ActionButton variant={"button"} budget={pickedBudgetData} action={"delete"} openDialog={handleOpenDialog} />
          </Stack>
        </Stack>
      ) : (
        <Stack direction={"row"} margin={2} justifyContent={"flex-end"}>
          <ActionButton variant={"button"} budget={pickedBudgetData} action={"leave"} openDialog={handleOpenDialog} />
        </Stack>
      )}
      <BudgetActionDialog budget={pickedBudgetData} type={dialogType} handleClose={handleCloseDialog} />
    </>
  );
};

export default SettingsView;
