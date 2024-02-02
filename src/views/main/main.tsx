import * as React from "react";
import { useEffect } from "react";
import { Outlet, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { fetchAndSetSelectedBudget, selectPickedBudget } from "../../slices/app/app.slice";
//* MUI
import { Container } from "@mui/material";
//* Components
import AppHeader from "../../components/app-header/app-header";

const MainView: React.FC = () => {
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const pickedBudget = useAppSelector(selectPickedBudget);

  useEffect(() => {
    const { data: pickedBudgetData } = pickedBudget;
    if (id && pickedBudget.fetchError?.id !== id && pickedBudgetData?.id !== id) {
      dispatch(fetchAndSetSelectedBudget(id));
    }
  }, [pickedBudget, id, dispatch]);

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
