import * as React from "react";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { selectPickedBudgetId, toggleDrawer, toggleTempDrawer } from "../../slices/app/app.slice";
import { selectUserInfo } from "../../slices/user/user.slice";
//* MUI
import { AppBar, Box, Toolbar, IconButton, Typography, Badge } from "@mui/material";
import { useMediaQuery, useTheme } from "@mui/material";
import { Menu, Mail, Notifications, AccountCircle } from "@mui/icons-material";
//* Components
import AppProfileMenu from "./profile-menu";
import AppBudgetsMenu from "./budgets-menu";
import BudgetListButton from "./budgetList-Button";
//* Types
import { BudgetsListItem } from "../../types/AppTypes";

const AppHeader: React.FC = () => {
  const [profileAnchorEl, setProfileAnchorEl] = React.useState<null | HTMLElement>(null);
  const [budgetAnchorEl, setBudgetAnchorEl] = React.useState<null | HTMLElement>(null);
  const [selectedBudget, setSelectedBudget] = React.useState<null | BudgetsListItem>(null);
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const budgetId = useAppSelector(selectPickedBudgetId);
  const { data } = useAppSelector(selectUserInfo);
  const { budgetsList } = data;

  useEffect(() => {
    const selectedBudget = budgetsList.find((budget) => budget.id === budgetId) || null;
    setSelectedBudget(selectedBudget);
  }, [budgetsList, budgetId]);

  const isLargeScreen = useMediaQuery(theme.breakpoints.up("lg"));

  const handleDrawerToggle = () => {
    dispatch(isLargeScreen ? toggleDrawer() : toggleTempDrawer());
  };

  const handleToggleProfileMenu = (event?: React.MouseEvent<HTMLElement>) => {
    setProfileAnchorEl(!profileAnchorEl && event ? event.currentTarget : null);
  };

  const handleToggleBudgetsMenu = (event?: React.MouseEvent<HTMLElement>) => {
    setBudgetAnchorEl(!budgetAnchorEl && event ? event.currentTarget : null);
  };

  const menuId = "primary-search-account-menu";

  return (
    <Box sx={{ flexGrow: 0 }}>
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <Box
            sx={{
              display: { sm: "flex", xs: "none" },
              alignItems: "center",
            }}
          >
            {budgetId && (
              <IconButton size="large" edge="start" color="inherit" aria-label="open drawer" onClick={handleDrawerToggle} sx={{ mr: 2 }}>
                <Menu />
              </IconButton>
            )}
            <img src="/Logo.svg" alt="Logo" style={{ height: "40px", marginRight: "10px" }} />
            <Typography variant="h6" noWrap component="div" sx={{ display: "block" }} marginRight={2}>
              myBudget
            </Typography>
          </Box>
          <Box sx={{ flexGrow: { sm: 1, xs: 0 } }} />
          <BudgetListButton
            disabled={budgetsList.length === 0}
            isOpen={budgetAnchorEl !== null}
            handleToggleBudgetsMenu={handleToggleBudgetsMenu}
            selectedBudget={selectedBudget}
          />
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
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleToggleProfileMenu}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      <AppBudgetsMenu anchorEl={budgetAnchorEl} handleToggleBudgetsMenu={handleToggleBudgetsMenu} />
      <AppProfileMenu anchorEl={profileAnchorEl} handleToggleProfileMenu={handleToggleProfileMenu} />
    </Box>
  );
};

export default AppHeader;
