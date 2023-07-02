import * as React from 'react';
import { useEffect } from 'react';
import { Outlet, useLocation, useNavigate, useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../app/hooks';
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
  const [isGrantedAccess, setIsGrantedAccess] = React.useState<boolean | undefined>(undefined); //TODO: change this, its ugly
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const location = useLocation();
  const budgetId = useAppSelector(selectPickedBudgetId);
  const { budgetsList } = useAppSelector(selectUserInfo)
  
  const CurrentSubPageName = location.pathname.split('/').filter(Boolean)[2]

  useEffect(() => {
    const indexOfPage = navLinks.findIndex((obj: { subPath: string; }) => obj.subPath === CurrentSubPageName);
    setSelectedSubPage(indexOfPage)
  }, [CurrentSubPageName])

  useEffect(() => {
    const selectedBudget: boolean = budgetsList.some((budget) => budget.id === budgetId)
    setIsGrantedAccess(selectedBudget)
  }, [budgetId, budgetsList, dispatch]);


  const undefinedBudget: JSX.Element = (
    <Box component="main" sx={{ flexGrow: 1 }}>
      <PaperCard>
        <h1>Nieprawidłowy identyfikator budżetu</h1>
        <p>Wygląda na to, że podany budżet <Chip component={"span"} color="secondary" variant="outlined" size="small" label={id}/> nie istnieje.</p>
      </PaperCard>
    </Box>
  )
  
  const deniedAccessBudget: JSX.Element = (
    <Box component="main" sx={{ flexGrow: 1 }}>
      <PaperCard>
        <h1>Odmowa dostępu</h1>
        <p>Wygląda na to, że nie masz uprawnień do wyświetlenia budżetu <Chip component={"span"} color="secondary" variant="outlined" size="small" label={id}/> lub budżet nie istnieje.</p>
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
  
  //TODO: consider creating separate components
  if (isGrantedAccess === undefined) {
    return <></>
  }
  
  if (budgetId && isGrantedAccess) {
    return budgetPage
  } else {
    return deniedAccessBudget
  }
}

export default BudgetView