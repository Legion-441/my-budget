import * as React from 'react';
import { Outlet } from 'react-router-dom'
import { useLocation } from "react-router-dom";
//! Material
import { Container } from '@mui/material'
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useMediaQuery, useTheme } from '@mui/material';
import { PageContainer } from '../../styled/page-container/page-container.styled'
//! Components
import AppHeader from '../../components/app-header/app-header'
import MobileBottomNavigation from '../../components/nav-bar/bottom-nav-bar/bottom-nav-bar';
import { ExtendableNavBar } from '../../components/nav-bar/extendable-nav-bar/extendable-nav-bar';
import Toolbar from '@mui/material/Toolbar';



const MainView: React.FC = () => {
    // console.log(useLocation().pathname.split('/').filter((item) => item !== ''));
    const [drawerOpen, setDrawerOpen] = React.useState(true);
    const [temporaryDrawerOpen, setTemporaryDrawerOpen] = React.useState(false);
    // const [selectedSubPage, setSelectedSubPage] = useState("");

    const theme = useTheme();
    const isLargeScreen = useMediaQuery(theme.breakpoints.up('lg'));

    console.log("temp drawer "+temporaryDrawerOpen);  
    const handleTemporaryDrawerToggle = () => {
        setTemporaryDrawerOpen(!temporaryDrawerOpen);
        console.log("temp drawer "+temporaryDrawerOpen);  
    };

    const handleDrawerToggle = () => {
        setDrawerOpen(!drawerOpen);
        console.log("drawer "+drawerOpen);
    };

    return <Box sx={{ display: 'flex' }}>
        <AppHeader handleDrawerToggle={isLargeScreen ? handleDrawerToggle : handleTemporaryDrawerToggle} />
        <ExtendableNavBar 
            drawerOpen={drawerOpen}
            handleDrawerToggle={handleDrawerToggle}
            temporaryDrawerOpen={temporaryDrawerOpen}
            handleTemporaryDrawerToggle={handleTemporaryDrawerToggle}
            />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
            <Toolbar />
            <Container>
                <PageContainer>
                    <Outlet />
                </PageContainer>
            </Container>
        </Box>
        <MobileBottomNavigation/>
    </Box>
}

export default MainView