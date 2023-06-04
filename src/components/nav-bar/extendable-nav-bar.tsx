import * as React from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { selectIsDrawerOpen, selectIsTempDrawerOpen, toggleTempDrawer } from "../../slices/app/app.slice";
//* MUI
import { Box, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, Typography } from "@mui/material";
import { useMediaQuery, useTheme } from "@mui/material";
//* Components
import { navLinks } from "./nav-pages";
import { DarkModeSwitch } from "../app-header/darkModeSwitch";

// TODO: Implement temporary drawer toggle on screen size change.

const drawerWidth = [240, 60];

interface ExtNavBarProps {
  budgetId: string | undefined
  selectedSubPage: number | undefined
}

export const ExtendableNavBar: React.FC<ExtNavBarProps> = ({ budgetId, selectedSubPage }) => {
  const dispatch = useAppDispatch()
  const isDrawerOpen = useAppSelector(selectIsDrawerOpen)
  const isTempDrawerOpen = useAppSelector(selectIsTempDrawerOpen)
    
  const navigate = useNavigate();
  
  const theme = useTheme();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up("lg"));
  const drawerFontSize = isLargeScreen ? (isDrawerOpen ? "16px" : "12px") : (isTempDrawerOpen ? "16px" : "12px")

  const drawer: JSX.Element = (
    <>
    <Toolbar />
    <Box component='nav'>
      <List component="ul" >
        {budgetId ?
          navLinks.map((item, index) => (
            <ListItem disablePadding key={item.label} onClick={() => {
              navigate(item.subPath ? `/budget/${budgetId}/${item.subPath}` : "#");
              isTempDrawerOpen && dispatch(toggleTempDrawer())
            }}>
              <ListItemButton
                selected={selectedSubPage === index}
                sx={{ overflow: "hidden" }}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText
                  primary={
                    <Typography variant="body1" style={{ fontSize: drawerFontSize }}>
                      {item.label}
                    </Typography>
                  }
                />
              </ListItemButton>
            </ListItem>
          )) : null}
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
          width: drawerWidth[isLargeScreen ? Number(!isDrawerOpen) : 1],
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth[isLargeScreen ? Number(!isDrawerOpen) : 1],
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
        onClose={() => {dispatch(toggleTempDrawer())}}
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
