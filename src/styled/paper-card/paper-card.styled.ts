import { Paper, styled } from "@mui/material";

const PaperCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  marginBottom: theme.spacing(2),
}));

export default PaperCard;
