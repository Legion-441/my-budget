import * as React from "react";
import { useEffect } from "react";
import { Outlet, useLocation, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { fetchAndSetSelectedBudget, selectPickedBudget, setPickedBudget } from "../../slices/app/app.slice";
//* MUI & Icons
import { Box } from "@mui/material";
//* Components
import { navLinks } from "../../components/nav-bar/nav-pages";
import { ExtendableNavBar } from "../../components/nav-bar/extendable-nav-bar";
import MobileBottomNavigation from "../../components/nav-bar/bottom-nav-bar";
import BudgetViewSkeleton from "../../components/budget-page/denied-access-skeleton";
import DeniedAccessCard from "../../components/budget-page/denied-access-card";

const BudgetView: React.FC = () => {
  const [selectedSubPageIndex, setSelectedSubPageIndex] = React.useState<number>();
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const location = useLocation();
  const pickedBudget = useAppSelector(selectPickedBudget);

  const CurrentSubPageName = location.pathname.split("/").filter(Boolean)[2];

  useEffect(() => {
    const currentSubPageIndex = navLinks.findIndex((obj: { subPath: string }) => obj.subPath === CurrentSubPageName);
    setSelectedSubPageIndex(currentSubPageIndex);
  }, [CurrentSubPageName]);

  useEffect(() => {
    if (id && pickedBudget.fetchError?.id !== id && pickedBudget.data?.id !== id) {
      dispatch(fetchAndSetSelectedBudget(id));
    }
  }, [pickedBudget, id, dispatch]);

  useEffect(() => {
    return () => {
      dispatch(setPickedBudget(null));
    };
  }, [dispatch]);

  if (pickedBudget.isFetching) return <BudgetViewSkeleton />;

  return (
    <>
      {pickedBudget.data && !pickedBudget.fetchError ? (
        <Box display={"flex"} flexDirection={{ xs: "column", sm: "row" }}>
          <ExtendableNavBar selectedSubPage={selectedSubPageIndex} pickedBudgetID={pickedBudget.data.id} />
          <Box component="main" flexGrow={1}>
            <Outlet />
          </Box>
          <MobileBottomNavigation selectedSubPage={selectedSubPageIndex} pickedBudgetID={pickedBudget.data.id} />
        </Box>
      ) : (
        <DeniedAccessCard errorMessage={pickedBudget.fetchError?.message || null} />
      )}
    </>
  );
};

export default BudgetView;
