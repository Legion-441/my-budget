import * as React from 'react';
import { CustomLink } from '../../../styled/custom-link/custom-link.styled';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import Paper from '@mui/material/Paper';
//! PAGES
import { pages } from '../nav-pages';
//! ICONS
import HistoryIcon from '@mui/icons-material/History';
import DonutLargeIcon from '@mui/icons-material/DonutLarge';
import SettingsIcon from '@mui/icons-material/Settings';

import { useNavigate } from 'react-router-dom';


const MobileBottomNavigation: React.FC = () => {
  // TODO: przenieś state Value aby móc z niej korzystać w każdym navbarze, propozycja chatGPT poniżej
  // import { useLocation } from "react-router-dom"; main.tsx:13
  //
  // const [selectedSubPage, setSelectedSubPage] = useState(""); main.tsx:18
  //! tak
  // const location = useLocation();
  // useEffect(() => {
  //   const path = location.pathname;
  //   if (path.includes("/home")) {
  //     setSelectedSubPage("home");
  //   } else if (path.includes("/about")) {
  //     setSelectedSubPage("about");
  //   } else if (path.includes("/contact")) {
  //     setSelectedSubPage("contact");
  //   }
  // }, [location]);
  //! lub tak
  // const location = useLocation();
  // useEffect(() => {
  //   const pathArray = location.pathname.split('/').filter((item) => item !== '');
  //   if (pathArray.length > 0) {
  //     setSelectedSubPage(pathArray);
  //   }
  // }, [location]);
  //! wtedy
  // setValue(pathArray[0])

  const [value, setValue] = React.useState(0);
  const ref = React.useRef<HTMLDivElement>(null);
  const navigate = useNavigate();


  return (
    <Box sx={{
        display: { xs: 'block', sm: 'none' },
        pb: 7 
      }} ref={ref}>
      <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
        <BottomNavigation
          showLabels
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
        >
          {pages.map((item) => (
              <BottomNavigationAction label={item.label} icon={item.icon} onClick={() => navigate(item.path)} />
          ))}
        </BottomNavigation>
      </Paper>
    </Box>
  );
}

export default MobileBottomNavigation