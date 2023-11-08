import { useAppSelector } from "../../app/hooks";
import { selectPickedBudget } from "../../slices/app/app.slice";
//* Firebase
import { auth } from "../../firebase";
//* MUI
import { Stack, Typography } from "@mui/material";
//* Styled Components
import PaperCard from "../../styled/paper-card/paper-card.styled";
//* Components
import DeleteBudgetButton from "../../components/budget-settings/budgetDeleteButtonDialog";
import ArchiveBudgetButton from "../../components/budget-settings/budgetArchiveButtonDialog";

const SettingsView: React.FC = () => {
  const pickedBudget = useAppSelector(selectPickedBudget);
  const isReadOnly = pickedBudget?.owner.id !== auth.currentUser?.uid;

  if (!pickedBudget) return <PaperCard>Nie wybrano żadnego budżetu</PaperCard>;

  return (
    <>
      <PaperCard>
        <Typography>ID: {pickedBudget.id} </Typography>
        <Typography>Nazwa: {pickedBudget.name} </Typography>
        <Typography>ikona: {pickedBudget.icon} </Typography>
        <Typography>Opis: {pickedBudget.description} </Typography>
        <Typography>Właściciel: {pickedBudget.owner.username} </Typography>
        <Typography>Data utworzenia: {new Date(pickedBudget.createdAt).toLocaleString()} </Typography>
        <Typography>Członkowie: {pickedBudget.memberIDs.join(", ")} </Typography>
        <Typography>Status: {pickedBudget.state} </Typography>
      </PaperCard>
      <Stack spacing={1} direction="row">
        <ArchiveBudgetButton pickedBudget={pickedBudget} isReadOnly={isReadOnly} />
        <DeleteBudgetButton pickedBudget={pickedBudget} isReadOnly={isReadOnly} />
      </Stack>
    </>
  );
};

export default SettingsView;
