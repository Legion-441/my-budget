import * as React from 'react';
import { Menu, MenuItem, Divider, ListItemIcon, ListItemText, Typography } from '@mui/material';
import { AccountCircle, Settings, Logout } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom';
import { budgetsListPlaceholder } from '../budgets-list-placeholder/budgets-list-placeholder';

interface AppMenuProps {
  anchorEl: null | HTMLElement;
  handleToggleBudgetsMenu: () => void;
}

const AppBudgetsMenu: React.FC<AppMenuProps> = ({anchorEl, handleToggleBudgetsMenu}) => {
  const isMenuOpen: boolean = Boolean(anchorEl);
  const menuId = 'primary-search-account-menu';
  const navigate = useNavigate();

  return (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleToggleBudgetsMenu}
      PaperProps={{
        elevation: 15,
        sx: {
          overflow: 'visible',
          filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
          mt: 1.5,
        },
      }}
    >
      {budgetsListPlaceholder.map((item) => (
        <MenuItem key={item.id} onClick={() => {
          navigate(`/budget/${item.id}/dash`);
          handleToggleBudgetsMenu();
        }}>
          <ListItemIcon>
          {React.cloneElement(item.icon, { fontSize: 'small' })}
          </ListItemIcon>
          <ListItemText primary={
            <Typography variant="body1">
              {item.name}
            </Typography>
          } />
        </MenuItem>
      ))}
    </Menu>
  );
}

export default AppBudgetsMenu;