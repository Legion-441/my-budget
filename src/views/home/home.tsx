import { useAppSelector } from "../../app/hooks"
import { selectUserInfo } from "../../slices/user/user.slice"
//* Firebase
import { auth } from "../../firebase"
//* MUI & Icons
import { Box, Button, Stack } from "@mui/material"
import { Group, Person } from "@mui/icons-material"
//* Styled Components
import PaperCard from "../../styled/paper-card/paper-card.styled"

const HomeView: React.FC  = () => {
  const { data } = useAppSelector(selectUserInfo)
  const { budgetsList } = data
  const user = auth.currentUser
  
  const noBudgetInfo = (
    <PaperCard>
      <h1>Witaj{user?.displayName ? `, ${user?.displayName}` : ""}!</h1>
      <p>Wygląda na to, że nie masz jeszcze żadnego założonego budżetu.</p>
      <h2>Aby rozpocząć, wybierz jedną z opcji:</h2>
      <Stack spacing={2} direction="row">
        <Button variant="contained" startIcon={<Person/>}>Stwórz nowy</Button>
        <Button variant="outlined" startIcon={<Group/>}>Dołącz do kooperacji</Button>
      </Stack>
      <br/>
      <br/>
      <p>Dziękujemy za korzystanie z naszej strony do śledzenia budżetu i życzymy Ci sukcesów w zarządzaniu finansami!</p>
    </PaperCard>
  );
  
  const noSelectedBudgetInfo = (
    <PaperCard>
      <h1>Witaj ponownie{user?.displayName ? `, ${user?.displayName}` : ""}!</h1>
      <h2>Wybierz budżet</h2>
      <br/>
      <br/>
      <p>Dziękujemy za korzystanie z naszej strony do śledzenia budżetu i życzymy Ci sukcesów w zarządzaniu finansami!</p>
    </PaperCard>
  );

  return (
    <Box component={'main'}>
      {budgetsList.length > 0 ? noSelectedBudgetInfo : noBudgetInfo}
    </Box>
  ) 
}

export default HomeView