import * as React from "react";
//* Pages
import { navLinks } from "./nav-pages";
//* MUI
import { BottomNavigation, BottomNavigationAction, Paper } from "@mui/material";
//* Styled Components
import UnstyledLink from "../../styled/unstyled-link/unstyled-link.styled";

interface MobileNavBarProps {
  selectedSubPage: number | undefined;
  pickedBudgetID: string;
}

const MobileBottomNavigation: React.FC<MobileNavBarProps> = ({ selectedSubPage, pickedBudgetID }) => {
  // TODO: Implement elevation of bottom navbar in dark mode
  // !Fixme: no clickable navbar when page is scroll down
  return (
    <BottomNavigation
      component={Paper}
      sx={{ position: "fixed", bottom: 0, left: 0, right: 0, display: { xs: "inherit", sm: "none" } }}
      square={true}
      elevation={4}
      showLabels
      value={selectedSubPage}
    >
      {navLinks.map((item) => (
        <BottomNavigationAction
          component={UnstyledLink}
          to={`/budget/${pickedBudgetID}/${item.subPath}`}
          key={item.label}
          label={item.label}
          icon={item.icon}
        />
      ))}
    </BottomNavigation>
  );
};

export default MobileBottomNavigation;
