import * as React from "react";
//* MUI & Icons
import { Box, Skeleton, Typography } from "@mui/material";
//* Styled Components
import PaperCard from "../../styled/paper-card/paper-card.styled";

const BudgetViewSkeleton: React.FC = () => {
  return (
    <Box component="main" sx={{ flexGrow: 1 }}>
      <PaperCard>
        <Typography variant="h1">
          <Skeleton />
        </Typography>
        <Typography variant="body1">
          <Skeleton />
        </Typography>
        <Typography variant="body1">
          <Skeleton />
        </Typography>
        <Typography variant="body1">
          <Skeleton />
        </Typography>
      </PaperCard>
    </Box>
  );
};

export default BudgetViewSkeleton;
