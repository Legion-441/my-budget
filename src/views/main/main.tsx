import * as React from "react";
import { Outlet } from "react-router-dom";
//* MUI
import { Container, Box, Toolbar } from "@mui/material";
import { PageContainer } from "../../styled/page-container/page-container.styled";
//* Components
import AppHeader from "../../components/app-header/app-header";

const MainView: React.FC = () => {
  return (
    <Box
      display={'flex'}
      minHeight={'100vh'}
      bgcolor={'background.default'}
    >
      <AppHeader />
      <Box sx={{ flexGrow: 1, pt: { sm: 2, xs: 1 }, px: { sm: 2, xs: 1 } }}>
        <Toolbar />
        <Container disableGutters maxWidth="xl">
          <PageContainer>
            <Outlet />
          </PageContainer>
        </Container>
        <Toolbar />
      </Box>
    </Box>
  );
};

export default MainView;
