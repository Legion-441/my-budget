import * as React from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { selectPickedBudget, toggleDrawer, toggleTempDrawer } from "../../slices/app/app.slice";
//* MUI
import { AppBar, Box, Toolbar, IconButton, Typography, Badge } from "@mui/material";
import { useMediaQuery, useTheme } from "@mui/material";
import { Menu, Mail, Notifications } from "@mui/icons-material";
//* Styled Components
import UnstyledLink from "../../styled/unstyled-link/unstyled-link.styled";
//* Components
import BudgetListButton from "./budgetList-Button";
import ProfileButton from "./profile-Button";

const AppHeader: React.FC = () => {
  const pickedBudget = useAppSelector(selectPickedBudget);
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up("lg"));

  const handleDrawerToggle = () => {
    dispatch(isLargeScreen ? toggleDrawer() : toggleTempDrawer());
  };

  return (
    <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
      <Toolbar>
        {pickedBudget.data ? (
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerToggle}
            sx={{ display: { sm: "flex", xs: "none" }, mr: 2 }}
          >
            <Menu />
          </IconButton>
        ) : null}
        <Box
          component={UnstyledLink}
          to="/"
          onClick={(e) => e.stopPropagation()}
          sx={{
            display: "flex",
            alignItems: "center",
            marginRight: "auto",
          }}
        >
          <img src="/Logo.svg" alt="Logo" style={{ height: "40px", marginRight: "10px" }} />
          <Typography variant="h6" noWrap component="div" sx={{ display: { sm: "block", xs: "none" } }} marginRight={2}>
            myBudget
          </Typography>
        </Box>
        <BudgetListButton />
        <Box sx={{ display: "flex" }}>
          <IconButton size="large" aria-label="show 4 new mails" color="inherit">
            <Badge badgeContent={4} color="error">
              <Mail />
            </Badge>
          </IconButton>
          <IconButton size="large" aria-label="show 17 new notifications" color="inherit">
            <Badge badgeContent={17} color="error">
              <Notifications />
            </Badge>
          </IconButton>
          <ProfileButton />
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default AppHeader;
