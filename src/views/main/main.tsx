import * as React from 'react';
import { useEffect } from 'react';
import { Outlet, useLocation, useParams } from 'react-router-dom'
//! Material
import { Container, Box } from '@mui/material'
import { PageContainer } from '../../styled/page-container/page-container.styled'
//! Components
import AppHeader from '../../components/app-header/app-header'
import MobileBottomNavigation from '../../components/nav-bar/bottom-nav-bar';
import { ExtendableNavBar } from '../../components/nav-bar/extendable-nav-bar';
import { navLinks } from '../../components/nav-bar/nav-pages';


const MainView: React.FC = () => {
    const { id: budgetId } = useParams()
    const [selectedSubPage, setSelectedSubPage] = React.useState<number>();
    const location = useLocation();

    useEffect(() => {
        if (budgetId) {
            const pathArray = location.pathname.split('/').filter((item) => item !== '');
            const subPage = pathArray[pathArray.length-1]
            const indexOfPage = navLinks.findIndex((obj: { subPath: string; }) => obj.subPath === subPage);
            setSelectedSubPage(indexOfPage)
        }
    }, [location, budgetId]);

    return <Box sx={{ display: 'flex', minHeight: "100vh", bgcolor: 'background.default' }}>
        <AppHeader budgetId = {budgetId} />
        <ExtendableNavBar 
            budgetId = {budgetId}
            selectedSubPage = {selectedSubPage}
            />
        <Box component="main" sx={{ flexGrow: 1, p: 2, my: 8}}>
            <Container disableGutters maxWidth="xl">
                <PageContainer>
                    <Outlet />
                </PageContainer>
            </Container>
        </Box>
        {budgetId && <MobileBottomNavigation budgetId={budgetId} selectedSubPage={selectedSubPage}/>}
    </Box>
}

export default MainView