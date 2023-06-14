import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../app/hooks';
import { selectUserInfo } from '../../slices/app/app.slice';
//* Utils
import { getIconComponent } from '../../utils/iconUtils';
//* MUI
import { Menu, MenuItem, ListItemIcon, ListItemText, Typography } from '@mui/material';

interface AppMenuProps {
  anchorEl: null | HTMLElement;
  handleToggleBudgetsMenu: () => void;
}

const AppBudgetsMenu: React.FC<AppMenuProps> = ({anchorEl, handleToggleBudgetsMenu}) => {
  const isMenuOpen: boolean = Boolean(anchorEl);
  const navigate = useNavigate();
  const { budgetsList } = useAppSelector(selectUserInfo)
  
  const menuId = 'primary-search-budget-menu';

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
      onClose={() => handleToggleBudgetsMenu()}
      PaperProps={{
        elevation: 15,
        sx: {
          overflow: 'visible',
          filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
          mt: 1.5,
        },
      }}
    >
      {budgetsList.map((item) => (
        <MenuItem key={item.id} onClick={() => {
          handleToggleBudgetsMenu();
          navigate(`/budget/${item.id}/dash`);
        }}>
          <ListItemIcon>
            {getIconComponent(item.icon)}
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