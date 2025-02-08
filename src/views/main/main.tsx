import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
//* MUI
import { Container } from "@mui/material";
//* Components
import AppHeader from "../../components/app-header/app-header";
//* Services
import { subscribeToAccountData } from "../../services/account-operations";
//* Slices
import { selectAccountInfo } from "../../slices/account/account.slice";

const MainView: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { fetchError } = useAppSelector(selectAccountInfo);

  useEffect(() => {
    if (fetchError) {
      navigate("/error", { state: { error: fetchError } });
    }
  }, [fetchError, navigate]);

  useEffect(() => {
    const unsubscribe = subscribeToAccountData(dispatch);

    return () => {
      unsubscribe();
    };
  }, [dispatch, navigate]);

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
