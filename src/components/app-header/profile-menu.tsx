import * as React from 'react';
import { Menu, MenuItem, Divider, ListItemIcon } from '@mui/material';
import { AccountCircle, Settings, Logout } from '@mui/icons-material'

interface AppMenuProps {
  anchorEl: null | HTMLElement;
  handleToggleProfileMenu: () => void;
}

const AppProfileMenu: React.FC<AppMenuProps> = ({anchorEl, handleToggleProfileMenu}) => {
  const isMenuOpen: boolean = Boolean(anchorEl);
  const menuId = 'primary-search-account-menu';

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
      onClose={handleToggleProfileMenu}
      PaperProps={{
        elevation: 15,
        sx: {
          overflow: 'visible',
          filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
          mt: 1.5,
        },
      }}
    >
      <MenuItem onClick={handleToggleProfileMenu}>
        <ListItemIcon>
          <AccountCircle />
        </ListItemIcon>
        Profile
      </MenuItem>
      <Divider />
      <MenuItem onClick={handleToggleProfileMenu}>
        <ListItemIcon>
          <Settings fontSize="small" />
        </ListItemIcon>
        App settings
      </MenuItem>
      <MenuItem onClick={handleToggleProfileMenu}>
        <ListItemIcon>
          <Logout fontSize="small" />
        </ListItemIcon>
        Logout
      </MenuItem>
    </Menu>
  );
}

export default AppProfileMenu;