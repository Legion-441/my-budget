import * as React from "react";
import { Outlet } from "react-router-dom";
//* MUI
import { Container } from "@mui/material";
//* Components
import AppHeader from "../../components/app-header/app-header";

const MainView: React.FC = () => {
  return (
    <>
      <AppHeader />
      <Container sx={{ pt: { xs: 1, sm: 2 }, px: { xs: 1, sm: 2 } }} maxWidth="xl">
        <Outlet />
      </Container>
    </>
  );
};

export default MainView;
