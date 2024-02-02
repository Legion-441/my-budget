import * as React from "react";
import { Outlet } from "react-router-dom";
//* MUI
import { Container } from "@mui/material";

const AuthView: React.FC = () => {
  return (
    <Container sx={{ pt: { sm: 2, xs: 1 }, px: { sm: 2, xs: 1 } }} maxWidth="xl">
      <Outlet />
    </Container>
  );
};

export default AuthView;
