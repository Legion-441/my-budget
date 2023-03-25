import * as React from 'react';
import { useEffect } from 'react';
import { Outlet, useLocation, useParams } from 'react-router-dom'
//! Material
import { Container } from '@mui/material'
import Box from '@mui/material/Box';
import { useMediaQuery, useTheme } from '@mui/material';
import { PageContainer } from '../../styled/page-container/page-container.styled'
//! Components
import AppHeader from '../../components/app-header/app-header'
import MobileBottomNavigation from '../../components/nav-bar/bottom-nav-bar/bottom-nav-bar';
import { ExtendableNavBar } from '../../components/nav-bar/extendable-nav-bar/extendable-nav-bar';
import { navLinks, navLinksItem } from '../../components/nav-bar/nav-pages';

export type ToggleDrawerProps = "toggle" | "open" | "close"

const MainView: React.FC = () => {
    const { id } = useParams()
    const [selectedSubPage, setSelectedSubPage] = React.useState<number>();
    const location = useLocation();
    useEffect(() => {
        const pathArray = location.pathname.split('/').filter((item) => item !== '');
        if (pathArray.length > 1 && pathArray[0] === "budget") {
            const subPage = pathArray[pathArray.length-1]
            const indexOfPage = navLinks.findIndex((obj: { subPath: string; }) => obj.subPath === subPage);
            setSelectedSubPage(indexOfPage)
        }
    }, [location]);
    
    
    
    const [drawerOpen, setDrawerOpen] = React.useState(true);
    const [temporaryDrawerOpen, setTemporaryDrawerOpen] = React.useState(false);


    const theme = useTheme();
    const isLargeScreen = useMediaQuery(theme.breakpoints.up('lg'));
  
    const handleTemporaryDrawerToggle = (props: ToggleDrawerProps) => {
        switch (props) {
            case "open":
                setTemporaryDrawerOpen(true);
                break;
            case "close":
                setTemporaryDrawerOpen(false);
                break;
            default:
                setTemporaryDrawerOpen(!temporaryDrawerOpen);
                break;
        }
    };

    const handleDrawerToggle = () => {
        setDrawerOpen(!drawerOpen);
    };

    return <Box sx={{ display: 'flex', minHeight: "100vh", bgcolor: 'background.default' }}>
        <AppHeader handleDrawerToggle={isLargeScreen ? handleDrawerToggle : (() => handleTemporaryDrawerToggle("toggle"))} />
        <ExtendableNavBar 
            drawerOpen={drawerOpen}
            handleDrawerToggle={handleDrawerToggle}
            temporaryDrawerOpen={temporaryDrawerOpen}
            handleTemporaryDrawerToggle={handleTemporaryDrawerToggle}
            budgetId = {id}
            selectedSubPage = {selectedSubPage}
            />
        <Box component="main" sx={{ flexGrow: 1, p: 3, my: 8}}>
            <Container maxWidth="xl">
                <PageContainer>
                    <Outlet />
                </PageContainer>
            </Container>
        </Box>
        <MobileBottomNavigation budgetId = {id} selectedSubPage = {selectedSubPage}/>
    </Box>
}

export default MainView