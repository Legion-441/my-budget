import { useNavigate } from "react-router-dom"
import PaperCard from "../../styled/paper-card/paper-card.styled"


const NotFoundView: React.FC = () => {
  const navigate = useNavigate()
  return <PaperCard>
    <h1>404</h1>
    <p>NOT FOUND</p>
    <button onClick={() => {navigate(-1)}}>Go back</button>
    </PaperCard>
}

export default NotFoundView