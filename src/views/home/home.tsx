import { useAppSelector } from "../../app/hooks"
import { selectUserInfo } from "../../slices/app/app.slice"
//* MUI & Icons
import { Button, Stack } from "@mui/material"
import { Group, Person } from "@mui/icons-material"
//* Styled Components
import PaperCard from "../../styled/paper-card/paper-card.styled"

const HomeView: React.FC  = () => {
  const { username } = useAppSelector(selectUserInfo)
  
  return <PaperCard>
    <h1>Witaj{username ? `, ${username}` : ""}!</h1>
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
}

export default HomeView