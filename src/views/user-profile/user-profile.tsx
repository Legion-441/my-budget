//* Firebase
import { auth } from '../../firebase';
//* MUI
import { Box, Button } from "@mui/material"
//* Styled Components
import PaperCard from "../../styled/paper-card/paper-card.styled"
import { useNavigate } from 'react-router-dom';


const UserProfileView: React.FC = () => {
  const navigate = useNavigate()
  const user = auth.currentUser
  
  //TODO: It's dummy component, extend it
  return (
    <Box component={'main'}>
        <Button variant="text" onClick={() => {navigate(-1)}}>Cofnij</Button>
      <PaperCard>
        <h1>Twoje dane:</h1>
        <p>Email: {user?.email}</p>
        <p>Nazwa użytkownika: {user?.displayName || "Brak"}</p>
        <p>Nr tel.: {user?.phoneNumber || "Brak"}</p>
      </PaperCard>
    </Box> 
  )
}

export default UserProfileView