//* MUI
import { Box } from "@mui/material";
//* Styled Components
import PaperCard from "../../styled/paper-card/paper-card.styled";
import { useLocation } from "react-router-dom";

const ErrorView: React.FC = () => {

  const location = useLocation();
  const { state } = location;

  return (
    <Box component={'main'}>
      <PaperCard>
        <h1>{"Wystąpił nieoczekiwany problem :("}</h1>
        <p>Przepraszamy</p>
        <p>{state?.error}</p>
        <p>Spróbuj ponownie później</p>
      </PaperCard>
    </Box>
  );
};

export default ErrorView;
