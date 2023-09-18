//* MUI
import { Button } from "@mui/material";
//* Components
import ForgotPasswordDialog from "./forgot-password-dialog";

interface ForgotPasswordButtonProps {
  disabled: boolean;
  isOpen: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const ForgotPasswordButton: React.FC<ForgotPasswordButtonProps> = ({ disabled, isOpen, setOpen}) => {

  const handleOpenDialog = () => {
    setOpen(true)
  };

  const handleCloseDialog = () => {
    setOpen(false)
  };

  return (
    <>
      <Button
        disabled={disabled}
        variant="text"
        type="button"
        onClick={handleOpenDialog}
        style={{ marginLeft: "auto", marginTop: "8px" }}
        size="small"
      >
        Odzyskaj hasło.
      </Button>
      <ForgotPasswordDialog isOpen={isOpen} onClose={handleCloseDialog} />
    </>
  );
};

export default ForgotPasswordButton;
