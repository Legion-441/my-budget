import { useState } from "react";
//* MUI
import { IconButton, InputAdornment, TextField } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

export type PasswordType = "password" | "confirm password";

interface PasswordInputProps {
  passwordType: PasswordType;
  isLoginForm: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
  errorAlert: string;
}

const PasswordInput: React.FC<PasswordInputProps> = ({ passwordType, isLoginForm, onChange, value, errorAlert }) => {
  const [showPassword, setShowPassword] = useState(false);

  const isPasswordType = passwordType === "password";
  const renderShowPasswordButton = !isPasswordType || isLoginForm;

  const type = renderShowPasswordButton && showPassword ? "text" : "password";
  const label = isPasswordType ? "Hasło" : "Potwierdź hasło";
  const autoComplete = isLoginForm ? "current-password" : "new-password";
  const helperText = isPasswordType && errorAlert === "Hasła nie są identyczne." ? "" : errorAlert;

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  return (
    <TextField
      error={Boolean(errorAlert)}
      type={type}
      label={label}
      value={value}
      onChange={onChange}
      autoComplete={autoComplete}
      required
      helperText={helperText}
      style={{ width: "100%" }}
      InputProps={
        renderShowPasswordButton
          ? {
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }
          : undefined
      }
    />
  );
};

export default PasswordInput;
