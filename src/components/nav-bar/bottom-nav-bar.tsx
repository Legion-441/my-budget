import * as React from 'react';
import { useNavigate } from 'react-router-dom';
//* PAGES
import { navLinks } from './nav-pages';
//* MUI
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';

interface MobileNavBarProps {
  selectedSubPage: number | undefined,
  pickedBudgetID: string
}

const MobileBottomNavigation: React.FC<MobileNavBarProps> = ({ selectedSubPage, pickedBudgetID}) => {
  const ref = React.useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  
  const NavActionButtons: JSX.Element[] = navLinks.map((item) => (
    <BottomNavigationAction 
      key={item.label}
      label={item.label}
      icon={item.icon}
      onClick={() => item.subPath && navigate(`/budget/${pickedBudgetID}/${item.subPath}`)} />
  ))
  
// TODO: Implement elevation of bottom navbar in dark mode
  return (
    <Box sx={{
        display: { xs: 'inherit', sm: 'none' },
        pb: 7 
      }} ref={ref}>
      <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} square={true} elevation={4}>
        <BottomNavigation
          showLabels
          value={selectedSubPage}
          sx={{
            bgcolor: 'transparent',
            color: "red"
          }}
        >
          {NavActionButtons}
        </BottomNavigation>
      </Paper>
    </Box>
  );
}

export default MobileBottomNavigation