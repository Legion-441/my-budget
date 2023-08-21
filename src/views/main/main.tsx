import * as React from "react";
import { useEffect } from 'react';
import { Outlet, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { selectPickedBudgetId, setPickedBudgetId } from "../../slices/app/app.slice";
import { fetchUserData } from "../../slices/user/user.slice";
//* MUI
import { Container, Box, Toolbar } from "@mui/material";
import { PageContainer } from "../../styled/page-container/page-container.styled";
//* Components
import AppHeader from "../../components/app-header/app-header";

const MainView: React.FC = () => {
  const dispatch = useAppDispatch()
  const { id } = useParams();
  const budgetId = useAppSelector(selectPickedBudgetId);

  useEffect(() => {      
      const controller = new AbortController();
      dispatch(fetchUserData())
      return () => {
        controller.abort()
      };
  }, [dispatch]);

  useEffect(() => {    
    if (budgetId !== id) {
      const paramBudgetId = !id || id === 'undefined' ? "" : id
      dispatch(setPickedBudgetId(paramBudgetId))
    }
  }, [budgetId, id, dispatch]);

  return (
    <Box
      display='flex'
      minHeight='100vh'
      bgcolor='background.default'
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
