import { useNavigate } from "react-router-dom"
//* MUI
import { Box } from "@mui/material"
//* Styled Components
import PaperCard from "../../styled/paper-card/paper-card.styled"


const NotFoundView: React.FC = () => {
  const navigate = useNavigate()
  
  return (
    <Box component={'main'}>
      <PaperCard>
        <h1>404</h1>
        <p>NOT FOUND</p>
        <button onClick={() => {navigate(-1)}}>Go back</button>
      </PaperCard>
    </Box> 
  )
}

export default NotFoundView