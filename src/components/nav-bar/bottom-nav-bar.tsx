import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import Paper from '@mui/material/Paper';
//! PAGES
import { navLinks } from './nav-pages';

interface MobileNavBarProps {
  budgetId: string | undefined
  selectedSubPage: number | undefined
}

const MobileBottomNavigation: React.FC<MobileNavBarProps> = (props: MobileNavBarProps) => {
  const { budgetId } = props;
  const { selectedSubPage } = props;
  const [value, setValue] = React.useState(0);
  const ref = React.useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const NavActionButtons: JSX.Element[] = navLinks.map((item) => (
    <BottomNavigationAction 
      key={item.label}
      label={item.label}
      icon={item.icon}
      onClick={() => item.subPath && navigate(`/budget/${budgetId}/${item.subPath}`)} />
  ))
  
// TODO: Implement elevation of bottom navbar in dark mode
  return (
    <Box sx={{
        display: { xs: 'inherit', sm: 'none' },
        pb: 7 
      }} ref={ref}>
      <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
        <BottomNavigation
          showLabels
          value={selectedSubPage}
        >
          {NavActionButtons}
        </BottomNavigation>
      </Paper>
    </Box>
  );
}

export default MobileBottomNavigation