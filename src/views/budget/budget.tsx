import * as React from 'react';
import { useEffect } from 'react';
import { Outlet, useLocation, useNavigate, useParams } from 'react-router-dom'
import { useAppSelector } from '../../app/hooks';
import { selectPickedBudgetId, setPickedBudgetId } from '../../slices/app/app.slice';
//* MUI & Icons
import { Box, Container } from '@mui/material';
//* Styled Components
import { PageContainer } from '../../styled/page-container/page-container.styled';
//* Components
import { navLinks } from '../../components/nav-bar/nav-pages';
import { ExtendableNavBar } from '../../components/nav-bar/extendable-nav-bar';
import MobileBottomNavigation from '../../components/nav-bar/bottom-nav-bar';
import { useDispatch } from 'react-redux';


const BudgetView: React.FC = () => {
  const [selectedSubPage, setSelectedSubPage] = React.useState<number>();
  const { id } = useParams()
  const dispatch = useDispatch()
  const location = useLocation();
  const navigate = useNavigate();
  const budgetId = useAppSelector(selectPickedBudgetId)


  useEffect(() => {
    const paramBudgetId = !id || id === 'undefined' ? null : id
    dispatch(setPickedBudgetId(paramBudgetId))

    if (!paramBudgetId) {
      navigate('/');
    }

    const pathArray = location.pathname.split('/').filter((item) => item !== '');
    const subPage = pathArray[2]
    const indexOfPage = navLinks.findIndex((obj: { subPath: string; }) => obj.subPath === subPage);
    setSelectedSubPage(indexOfPage)

  }, [id, dispatch, navigate, location.pathname]);
  

  const budgetPage = (
    <Box sx={{ display: 'flex', minHeight: "100vh", bgcolor: 'background.default' }}>
      {budgetId && (
        <ExtendableNavBar
          selectedSubPage = {selectedSubPage}
        />
      )}
      <Box component="main" sx={{ flexGrow: 1 }}>
        <Container disableGutters maxWidth="xl">
          <PageContainer>
            <Outlet />
          </PageContainer>
        </Container>
      </Box>
      {budgetId && (
        <MobileBottomNavigation
          selectedSubPage={selectedSubPage}
        />
      )}
    </Box>
  )

  return budgetId ? budgetPage : null
}

export default BudgetView