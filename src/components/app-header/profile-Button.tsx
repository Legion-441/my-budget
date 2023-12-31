import { useState } from "react";
//* MUI
import { AccountCircle } from "@mui/icons-material";
import { IconButton } from "@mui/material";
//* Components
import AppProfileMenu from "./profile-menu";

const ProfileButton: React.FC = () => {
  const [profileAnchorEl, setProfileAnchorEl] = useState<null | HTMLElement>(null);

  const handleToggleProfileMenu = (event?: React.MouseEvent<HTMLElement>) => {
    setProfileAnchorEl(!profileAnchorEl && event ? event.currentTarget : null);
  };

  return (
    <>
      <IconButton
        size="large"
        edge="end"
        aria-label="account of current user"
        aria-controls={"account-menu"}
        aria-haspopup="true"
        onClick={handleToggleProfileMenu}
        color="inherit"
      >
        <AccountCircle />
      </IconButton>
      <AppProfileMenu anchorEl={profileAnchorEl} handleToggleProfileMenu={handleToggleProfileMenu} />
    </>
  );
};

export default ProfileButton;
