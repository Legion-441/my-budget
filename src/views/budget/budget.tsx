import * as React from 'react';
import { useEffect } from 'react';
import { Outlet, useLocation, useNavigate, useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../app/hooks';
import { selectPickedBudgetId, selectUserInfo, setPickedBudgetId } from '../../slices/app/app.slice';
//* MUI & Icons
import { Box, Chip } from '@mui/material';
//* Styled Components
import { PageContainer } from '../../styled/page-container/page-container.styled';
import PaperCard from '../../styled/paper-card/paper-card.styled';
//* Components
import { navLinks } from '../../components/nav-bar/nav-pages';
import { ExtendableNavBar } from '../../components/nav-bar/extendable-nav-bar';
import MobileBottomNavigation from '../../components/nav-bar/bottom-nav-bar';


const BudgetView: React.FC = () => {
  const [selectedSubPage, setSelectedSubPage] = React.useState<number>();
  const [selectedBudget, setSelectedBudget] = React.useState<boolean>();
  const { id } = useParams();
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const budgetId = useAppSelector(selectPickedBudgetId);
  const { budgetsList } = useAppSelector(selectUserInfo)

  useEffect(() => {
    const selectedBudget = budgetsList.some((budget) => budget.id === budgetId)
    setSelectedBudget(selectedBudget)

  }, [budgetsList, budgetId])


  useEffect(() => {
    const paramBudgetId = !id || id === 'undefined' ? null : id
    dispatch(setPickedBudgetId(paramBudgetId))

    // if (!paramBudgetId) {
    //   navigate('/');
    // }

    const pathArray = location.pathname.split('/').filter((item) => item !== '');
    const subPage = pathArray[2]
    const indexOfPage = navLinks.findIndex((obj: { subPath: string; }) => obj.subPath === subPage);
    setSelectedSubPage(indexOfPage)

  }, [id, dispatch, navigate, location.pathname]);

  const undefinedBudget: JSX.Element = (
    <Box component="main" sx={{ flexGrow: 1 }}>
      <PaperCard>
        <h1>Nieprawidłowy identyfikator budżetu</h1>
        <p>Wygląda na to, że podany budżet <Chip color="secondary" variant="outlined" size="small" label={id}/> nie istnieje.</p>
      </PaperCard>
    </Box>
  )
  
  const deniedAccessBudget: JSX.Element = (
    <Box component="main" sx={{ flexGrow: 1 }}>
      <PaperCard>
        <h1>Odmowa dostępu</h1>
        <p>Wygląda na to, że nie masz uprawnień do edycji budżetu <Chip color="secondary" variant="outlined" size="small" label={id}/> .</p>
      </PaperCard>
    </Box>
  )

  const budgetPage: JSX.Element = (
    <Box sx={{ display: 'flex', minHeight: "100vh", bgcolor: 'background.default' }}>
      {budgetId && (
        <ExtendableNavBar
          selectedSubPage = {selectedSubPage}
        />
      )}
      <Box component="main" sx={{ flexGrow: 1 }}>
        <PageContainer>
          <Outlet />
        </PageContainer>
      </Box>
      {budgetId && (
        <MobileBottomNavigation
          selectedSubPage={selectedSubPage}
        />
      )}
    </Box>
  )
  
  return (
    <>
    {budgetId ? (selectedBudget ? budgetPage : deniedAccessBudget) : undefinedBudget}
    </>
  )
}

export default BudgetView