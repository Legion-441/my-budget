import * as React from 'react';
import { AppBar, Box, Toolbar, IconButton, Typography, Badge, Button } from '@mui/material';
import { useMediaQuery, useTheme } from '@mui/material';
import { ExpandMore, ExpandLess, Menu, Mail, Notifications, AccountCircle } from '@mui/icons-material';
import { useAppDispatch } from '../../app/hooks';
import { toggleDrawer, toggleTempDrawer } from '../../slices/app/app.slice';
import AppProfileMenu from './profile-menu';
import BudgetsDrawer from './budgets-drawer';
import { budgetsListPlaceholder } from '../budgets-list-placeholder/budgets-list-placeholder';

interface AppHeaderProps {
  budgetId: string | undefined
}
const AppHeader: React.FC<AppHeaderProps> = ({budgetId}) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [isBudgetDrawerOpen, setIsBudgetDrawerOpen] = React.useState<boolean>(!budgetId);
  
  const dispatch = useAppDispatch()
  
  const selectedBudget = budgetsListPlaceholder.find((budget) => budget.id === budgetId)

  const handleBudgetDrawerToggle = () => {
    setIsBudgetDrawerOpen(!isBudgetDrawerOpen)
  };
  
  const theme = useTheme();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up('lg'));

  const handleDrawerToggle = () => {
    dispatch(isLargeScreen ? toggleDrawer() : toggleTempDrawer())
  };

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setAnchorEl(null);
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
              <img src="/favicon.ico" alt="Logo" style={{ height: '30px', marginRight: '10px' }} />
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
              onClick={handleBudgetDrawerToggle}
              sx={{
                display: { sm: 'none', xs: 'flex' },
                alignItems: 'center'
              }}
              startIcon={selectedBudget?.icon}>
              {/* <Box sx={{
                  display: { sm: 'none', xs: 'flex' },
                  alignItems: 'center'
                }}> */}
                <Typography
                  variant="body1"
                  fontSize={"medium"}
                >
                  {selectedBudget ? selectedBudget.name : 'Wybierz budżet...'}
                </Typography>
                {isBudgetDrawerOpen ? <ExpandLess /> : <ExpandMore />}
              {/* </Box> */}
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
                onClick={handleProfileMenuOpen}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
            </Box>
          </Toolbar>
        </AppBar>
        <AppProfileMenu anchorEl={anchorEl} handleProfileMenuClose={handleProfileMenuClose}/>
        <BudgetsDrawer isBudgetDrawerOpen={isBudgetDrawerOpen} handleBudgetDrawerToggle={handleBudgetDrawerToggle} />
      </Box>
    </>
  );
}

export default AppHeader;