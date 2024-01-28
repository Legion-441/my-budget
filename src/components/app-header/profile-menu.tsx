import * as React from "react";
import { clearAccountData } from "../../slices/account/account.slice";
import { useDispatch } from "react-redux";
//* Firebase
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";
//* MUI & Icons
import { Menu, MenuItem, Divider, ListItemIcon } from "@mui/material";
import { AccountCircle, Settings, Logout } from "@mui/icons-material";
//* Styled components
import UnstyledLink from "../../styled/unstyled-link/unstyled-link.styled";
//* Components
import { DarkModeSwitch } from "./darkModeSwitch";

interface AppMenuProps {
  anchorEl: null | HTMLElement;
  handleToggleProfileMenu: () => void;
}

const AppProfileMenu: React.FC<AppMenuProps> = ({ anchorEl, handleToggleProfileMenu }) => {
  const dispatch = useDispatch();
  const isMenuOpen: boolean = Boolean(anchorEl);

  const handleLogout = async () => {
    handleToggleProfileMenu();
    try {
      await signOut(auth);
      dispatch(clearAccountData());
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      id={"account-menu"}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={() => handleToggleProfileMenu()}
      PaperProps={{
        elevation: 15,
        sx: {
          overflow: "visible",
          filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
          mt: 1.5,
        },
      }}
    >
      <MenuItem component={UnstyledLink} to={"/profile"} onClick={handleToggleProfileMenu}>
        <ListItemIcon>
          <AccountCircle />
        </ListItemIcon>
        Profil
      </MenuItem>
      <DarkModeSwitch />
      <Divider />
      <MenuItem component={UnstyledLink} to={"/app-settings"} onClick={handleToggleProfileMenu}>
        <ListItemIcon>
          <Settings fontSize="small" />
        </ListItemIcon>
        Ustawienia
      </MenuItem>
      <MenuItem onClick={handleLogout}>
        <ListItemIcon>
          <Logout fontSize="small" />
        </ListItemIcon>
        Wyloguj
      </MenuItem>
    </Menu>
  );
};

export default AppProfileMenu;
