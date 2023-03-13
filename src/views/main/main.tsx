import * as React from 'react';
import { Outlet } from 'react-router-dom'
//! Material
import { Container } from '@mui/material'
import Box from '@mui/material/Box';
import { useMediaQuery, useTheme } from '@mui/material';
import { PageContainer } from '../../styled/page-container/page-container.styled'
//! Components
import AppHeader from '../../components/app-header/app-header'
import MobileBottomNavigation from '../../components/nav-bar/bottom-nav-bar/bottom-nav-bar';
import { ExtendableNavBar } from '../../components/nav-bar/extendable-nav-bar/extendable-nav-bar';



const MainView: React.FC = () => {
    // console.log(useLocation().pathname.split('/').filter((item) => item !== ''));
    const [drawerOpen, setDrawerOpen] = React.useState(true);
    const [temporaryDrawerOpen, setTemporaryDrawerOpen] = React.useState(false);
    // const [selectedSubPage, setSelectedSubPage] = useState("");

    const theme = useTheme();
    const isLargeScreen = useMediaQuery(theme.breakpoints.up('lg'));
  
    const handleTemporaryDrawerToggle = () => {
        setTemporaryDrawerOpen(!temporaryDrawerOpen);
    };

    const handleDrawerToggle = () => {
        setDrawerOpen(!drawerOpen);
    };

    return <Box sx={{ display: 'flex', minHeight: "100vh", backgroundColor: "#fafafb" }}>
        <AppHeader handleDrawerToggle={isLargeScreen ? handleDrawerToggle : handleTemporaryDrawerToggle} />
        <ExtendableNavBar 
            drawerOpen={drawerOpen}
            handleDrawerToggle={handleDrawerToggle}
            temporaryDrawerOpen={temporaryDrawerOpen}
            handleTemporaryDrawerToggle={handleTemporaryDrawerToggle}
            />
        <Box component="main" sx={{ flexGrow: 1, p: 3, my: 8}}>
            <Container maxWidth="xl">
                <PageContainer>
                    <Outlet />
                </PageContainer>
            </Container>
        </Box>
        <MobileBottomNavigation/>
    </Box>
}

export default MainView