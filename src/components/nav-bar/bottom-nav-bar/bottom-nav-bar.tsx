import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import Paper from '@mui/material/Paper';
//! PAGES
import { navLinks } from '../nav-pages';


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
  const NavActionButtons: JSX.Element[] = navLinks.map((item) => (
    <BottomNavigationAction key={item.label} label={item.label} icon={item.icon} onClick={() => item.path && navigate(item.path)} />
  ))


  return (
    <Box sx={{
        display: { xs: 'inherit', sm: 'none' },
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
          {NavActionButtons}
        </BottomNavigation>
      </Paper>
    </Box>
  );
}

export default MobileBottomNavigation