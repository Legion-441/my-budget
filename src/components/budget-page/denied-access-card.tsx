import * as React from "react";
//* MUI & Icons
import { Box, Typography } from "@mui/material";
//* Styled Components
import PaperCard from "../../styled/paper-card/paper-card.styled";

interface DeniedAccessCardProps {
  errorMessage: string | null;
}
const DeniedAccessCard: React.FC<DeniedAccessCardProps> = ({ errorMessage }) => {
  return (
    <Box component="main" sx={{ flexGrow: 1 }}>
      <PaperCard>
        <h1>Odmowa dostępu</h1>
        <Typography>{errorMessage}</Typography>
      </PaperCard>
    </Box>
  );
};

export default DeniedAccessCard;
