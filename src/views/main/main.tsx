import * as React from "react";
import { useEffect } from "react";
import { Outlet, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { fetchAndSetSelectedBudget, selectPickedBudget } from "../../slices/app/app.slice";
import { fetchAndSetAccountData } from "../../slices/account/account.slice";
//* MUI
import { Container, Box, Toolbar } from "@mui/material";
import { PageContainer } from "../../styled/page-container/page-container.styled";
//* Components
import AppHeader from "../../components/app-header/app-header";

const MainView: React.FC = () => {
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const pickedBudget = useAppSelector(selectPickedBudget);

  useEffect(() => {
    const controller = new AbortController();
    dispatch(fetchAndSetAccountData());
    return () => {
      controller.abort();
    };
  }, [dispatch]);

  useEffect(() => {
    if (id && pickedBudget?.id !== id) {
      const paramBudgetId = id === "undefined" ? "" : id;
      dispatch(fetchAndSetSelectedBudget(paramBudgetId));
    }
  }, [pickedBudget, id, dispatch]);

  return (
    <>
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
    </>
  );
};

export default MainView;
