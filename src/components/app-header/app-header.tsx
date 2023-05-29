import * as React from 'react';
import { AppBar, Box, Toolbar, IconButton, Typography, Badge, Button } from '@mui/material';
import { useMediaQuery, useTheme } from '@mui/material';
import { ExpandMore, ExpandLess, Menu, Mail, Notifications, AccountCircle } from '@mui/icons-material';
import { useAppDispatch } from '../../app/hooks';
import { toggleDrawer, toggleTempDrawer } from '../../slices/app/app.slice';
import AppProfileMenu from './profile-menu';
import { budgetsListPlaceholder } from '../budgets-list-placeholder/budgets-list-placeholder';
import AppBudgetsMenu from './budgets-menu';

interface AppHeaderProps {
  budgetId: string | undefined
}
const AppHeader: React.FC<AppHeaderProps> = ({budgetId}) => {
  const [profileAnchorEl, setProfileAnchorEl] = React.useState<null | HTMLElement>(null);
  const [budgetAnchorEl, setBudgetAnchorEl] = React.useState<null | HTMLElement>(null);
  
  const dispatch = useAppDispatch()
  
  const selectedBudget = budgetsListPlaceholder.find((budget) => budget.id === budgetId)

  const theme = useTheme();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up('lg'));
  
  const handleDrawerToggle = () => {
    dispatch(isLargeScreen ? toggleDrawer() : toggleTempDrawer())
  };

  const handleToggleProfileMenu = (event?: React.MouseEvent<HTMLElement>) => {
    setProfileAnchorEl(!profileAnchorEl && event ? event.currentTarget : null)
  };
  
  const handleToggleBudgetsMenu = (event?: React.MouseEvent<HTMLElement>) => {
    setBudgetAnchorEl(!budgetAnchorEl && event ? event.currentTarget : null)
  };

  const menuId = 'primary-search-account-menu';

  return (
    <>
      <Box sx={{ flexGrow: 0 }}>
        <AppBar position="fixed" sx={{zIndex: (theme) => theme.zIndex.drawer + 1}}>
          <Toolbar>
            <Box sx={{
                display: { sm: 'flex', xs: 'none' },
                alignItems: 'center'
              }}>
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="open drawer"
                onClick={handleDrawerToggle}
                sx={{ mr: 2 }}
              >
                <Menu />
              </IconButton>
              <img src="/Logo.svg" alt="Logo" style={{ height: '40px', marginRight: '10px' }} />
              <Typography
                variant="h6"
                noWrap
                component="div"
                sx={{ display: 'block' }}
              >
                myBudget
              </Typography>
            </Box>
            <Button
              onClick={handleToggleBudgetsMenu}
              sx={{
                display: { sm: 'none', xs: 'flex' },
                alignItems: 'center'
              }}
              startIcon={selectedBudget?.icon}>
                <Typography
                  variant="body1"
                  fontSize={"medium"}
                >
                  {selectedBudget ? selectedBudget.name : 'Wybierz budżet...'}
                </Typography>
                {!budgetAnchorEl===null ? <ExpandLess /> : <ExpandMore />}
            </Button>
            <Box sx={{ flexGrow: 1 }} />
            <Box sx={{ display: 'flex' }}>
              <IconButton size="large" aria-label="show 4 new mails" color="inherit">
                <Badge badgeContent={4} color="error">
                  <Mail />
                </Badge>
              </IconButton>
              <IconButton
                size="large"
                aria-label="show 17 new notifications"
                color="inherit"
              >
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
        <AppBudgetsMenu anchorEl={budgetAnchorEl} handleToggleBudgetsMenu={handleToggleBudgetsMenu}/>
        <AppProfileMenu anchorEl={profileAnchorEl} handleToggleProfileMenu={handleToggleProfileMenu}/>
      </Box>
    </>
  );
}

export default AppHeader;