import * as React from "react";
import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import { selectPickedBudget } from "../../slices/app/app.slice";
//* MUI & Icons
import { Box } from "@mui/material";
//* Styled Components
import { PageContainer } from "../../styled/page-container/page-container.styled";
//* Components
import { navLinks } from "../../components/nav-bar/nav-pages";
import { ExtendableNavBar } from "../../components/nav-bar/extendable-nav-bar";
import MobileBottomNavigation from "../../components/nav-bar/bottom-nav-bar";
import BudgetViewSkeleton from "../../components/budget-page/denied-access-skeleton";
import DeniedAccessCard from "../../components/budget-page/denied-access-card";

const BudgetView: React.FC = () => {
  const [selectedSubPage, setSelectedSubPage] = React.useState<number>();
  const location = useLocation();
  const {
    isFetching: isFetchingPickedBudget,
    data: pickedBudgetData,
    fetchError: pickedBudgetFetchError,
  } = useAppSelector(selectPickedBudget);

  const CurrentSubPageName = location.pathname.split("/").filter(Boolean)[2];

  useEffect(() => {
    const indexOfPage = navLinks.findIndex((obj: { subPath: string }) => obj.subPath === CurrentSubPageName);
    setSelectedSubPage(indexOfPage);
  }, [CurrentSubPageName]);

  if (isFetchingPickedBudget) return <BudgetViewSkeleton />;

  return (
    <>
      {pickedBudgetData && !pickedBudgetFetchError ? (
        <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: "background.default" }}>
          {pickedBudgetData && <ExtendableNavBar selectedSubPage={selectedSubPage} pickedBudgetID={pickedBudgetData.id} />}
          <Box component="main" sx={{ flexGrow: 1 }}>
            <PageContainer>
              <Outlet />
            </PageContainer>
          </Box>
          {pickedBudgetData && <MobileBottomNavigation selectedSubPage={selectedSubPage} pickedBudgetID={pickedBudgetData.id} />}
        </Box>
      ) : (
        <DeniedAccessCard errorMessage={pickedBudgetFetchError} />
      )}
    </>
  );
};

export default BudgetView;
