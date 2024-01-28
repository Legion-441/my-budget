import * as React from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { selectIsDrawerOpen, selectIsTempDrawerOpen, toggleTempDrawer } from "../../slices/app/app.slice";
//* MUI
import { Box, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, Typography } from "@mui/material";
import { useMediaQuery, useTheme } from "@mui/material";
//* Styled components
import UnstyledLink from "../../styled/unstyled-link/unstyled-link.styled";
//* Components
import { navLinks } from "./nav-pages";

// TODO: Implement temporary drawer toggle on screen size change.

const drawerWidth = [240, 60];

interface ExtNavBarProps {
  selectedSubPage: number | undefined;
  pickedBudgetID: string;
}

export const ExtendableNavBar: React.FC<ExtNavBarProps> = ({ selectedSubPage, pickedBudgetID }) => {
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const isDrawerOpen = useAppSelector(selectIsDrawerOpen);
  const isTempDrawerOpen = useAppSelector(selectIsTempDrawerOpen);

  const isLargeScreen = useMediaQuery(theme.breakpoints.up("lg"));

  const drawer: JSX.Element = (
    <>
      <Toolbar />
      <Box>
        <List>
          {navLinks.map((item, index) => (
            <ListItem
              component={UnstyledLink}
              to={`/budget/${pickedBudgetID}/${item.subPath}`}
              disablePadding
              key={item.label}
              onClick={() => isTempDrawerOpen && dispatch(toggleTempDrawer())}
            >
              <ListItemButton selected={selectedSubPage === index} sx={{ overflow: "hidden" }}>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.label} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
    </>
  );

  return (
    <Box component="nav" sx={{ display: { xs: "none", sm: "block" } }}>
      <Drawer
        PaperProps={{ elevation: 4 }}
        variant="permanent"
        anchor="left"
        sx={{
          width: drawerWidth[isLargeScreen && isDrawerOpen ? 0 : 1],
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth[isLargeScreen && isDrawerOpen ? 0 : 1],
            boxSizing: "border-box",
          },
        }}
      >
        {drawer}
      </Drawer>
      <Drawer
        PaperProps={{ elevation: 4 }}
        variant="temporary"
        open={isTempDrawerOpen}
        onClose={() => dispatch(toggleTempDrawer())}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: "none", sm: "block", lg: "none" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: drawerWidth[0],
          },
        }}
      >
        {drawer}
      </Drawer>
    </Box>
  );
};
