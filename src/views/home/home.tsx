import { useState } from "react";
import { useAppSelector } from "../../app/hooks";
import { selectAccountInfo } from "../../slices/account/account.slice";
//* Firebase
import { auth } from "../../firebase";
//* MUI & Icons
import { Box, Button, Dialog, Stack } from "@mui/material";
import { Group, Person } from "@mui/icons-material";
//* Components
import CreateOrEditBudgetDialog from "../../components/budget-settings/budget-create-or-edit-dialog";
//* Styled Components
import PaperCard from "../../styled/paper-card/paper-card.styled";

const HomeView: React.FC = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { data } = useAppSelector(selectAccountInfo);
  const { budgetsList } = data;
  const user = auth.currentUser;

  const handleOpenDialog = () => {
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  const noBudgetInfo = (
    <>
      <h1>Witaj{user?.displayName ? `, ${user?.displayName}` : ""}!</h1>
      <p>Wygląda na to, że nie masz jeszcze żadnego założonego budżetu.</p>
      <h2>Aby rozpocząć, wybierz jedną z opcji:</h2>
    </>
  );

  const noSelectedBudgetInfo = (
    <>
      <h1>Witaj ponownie{user?.displayName ? `, ${user?.displayName}` : ""}!</h1>
      <h2>Wybierz budżet</h2>
      <br />
      <br />
    </>
  );

  return (
    <Box component={"main"}>
      <PaperCard>
        {budgetsList.length > 0 ? noSelectedBudgetInfo : noBudgetInfo}
        <Stack spacing={2} direction="row">
          <Button variant="contained" startIcon={<Person />} onClick={handleOpenDialog}>
            Stwórz nowy
          </Button>
          <Button variant="outlined" startIcon={<Group />}>
            Dołącz do kooperacji
          </Button>
        </Stack>
        <br />
        <br />
        <p>Dziękujemy za korzystanie z naszej strony do śledzenia budżetu i życzymy Ci sukcesów w zarządzaniu finansami!</p>
      </PaperCard>
      {isDialogOpen && (
        <Dialog onClose={handleCloseDialog} open={isDialogOpen}>
          <CreateOrEditBudgetDialog budget={null} onClose={handleCloseDialog} />
        </Dialog>
      )}
      {/* <CreateBudgetDialog isOpen={isDialogOpen} onClose={handleCloseDialog} /> */}
    </Box>
  );
};

export default HomeView;
