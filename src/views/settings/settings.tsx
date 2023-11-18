import { useAppSelector } from "../../app/hooks";
import { selectPickedBudget } from "../../slices/app/app.slice";
//* Firebase
import { auth } from "../../firebase";
//* MUI
import { Stack } from "@mui/material";
//* Components
import BudgetFullCard from "../../components/budgetCard/budget-full-card";
import ActionButton from "../../components/budget-settings/budget-actions-button";

const SettingsView: React.FC = () => {
  const pickedBudget = useAppSelector(selectPickedBudget);

  if (!pickedBudget) return <>Nie wybrano żadnego budżetu</>;

  const isOwner = pickedBudget.owner.id === auth.currentUser?.uid;
  const isArchived = pickedBudget.state === "archived";

  return (
    <>
      <BudgetFullCard budget={pickedBudget} />
      {isOwner ? (
        <Stack direction={"row"} margin={2} gap={2} rowGap={3} justifyContent={"space-between"} flexWrap={"wrap"}>
          <Stack direction={"row"} gap={1}>
            {!isArchived && <ActionButton variant={"button"} budget={pickedBudget} action={"edit"} />}
          </Stack>
          <Stack direction={"row"} gap={1}>
            <ActionButton variant={"button"} budget={pickedBudget} action={"archive"} />
            <ActionButton variant={"button"} budget={pickedBudget} action={"delete"} />
          </Stack>
        </Stack>
      ) : (
        <Stack direction={"row"} margin={2} justifyContent={"flex-end"}>
          <ActionButton variant={"button"} budget={pickedBudget} action={"leave"} />
        </Stack>
      )}
    </>
  );
};

export default SettingsView;
