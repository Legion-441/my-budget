import * as React from 'react';
import { Outlet } from 'react-router-dom'
//! Material
import { Container } from '@mui/material'
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { PageContainer } from '../../styled/page-container/page-container.styled'
//! Components
import AppHeader from '../../components/app-header/app-header'
import MobileBottomNavigation from '../../components/nav-bar/bottom-nav-bar/bottom-nav-bar';
import { ExtendableNavBar } from '../../components/nav-bar/extendable-nav-bar/extendable-nav-bar';

import { useLocation } from "react-router-dom";




const MainView: React.FC = () => {
    console.log(useLocation().pathname.split('/').filter((item) => item !== ''));
    const [drawerOpen, setDrawerOpen] = React.useState(false);
    // const [selectedSubPage, setSelectedSubPage] = useState("");

    const handleDrawerToggle = () => {
        setDrawerOpen(!drawerOpen);
        console.log(drawerOpen);
        
    };

    return <>
        <AppHeader handleDrawerToggle={handleDrawerToggle} />
        <ExtendableNavBar drawerOpen={drawerOpen} handleDrawerToggle={handleDrawerToggle} />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
            <Container>
                <PageContainer>
                    <Outlet />
                </PageContainer>
            </Container>
        </Box>
        <MobileBottomNavigation/>
    </>
}

export default MainView