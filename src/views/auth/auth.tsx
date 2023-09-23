import * as React from "react";
import { Outlet } from "react-router-dom";
//* MUI
import { Container, Box } from "@mui/material";
import { PageContainer } from "../../styled/page-container/page-container.styled";

const AuthView: React.FC = () => {
  return (
    <Box display="flex" minHeight="100vh" bgcolor="background.default">
      <Box sx={{ flexGrow: 1, pt: { sm: 2, xs: 1 }, px: { sm: 2, xs: 1 } }}>
        <Container disableGutters maxWidth="xl">
          <PageContainer>
            <Outlet />
          </PageContainer>
        </Container>
      </Box>
    </Box>
  );
};

export default AuthView;
