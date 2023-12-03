import { useEffect } from "react";
import { useAppSelector } from "../app/hooks";
import { selectAppColorMode } from "../slices/app/app.slice";
//* MUI & styles
import { darkTheme, lightTheme } from "../styled/theme";
//* Types
import { AppTheme } from "../types/AppTypes";

const useAppTheme = () => {
  const appColorMode: AppTheme = useAppSelector(selectAppColorMode);
  const theme = appColorMode === "light" ? lightTheme : darkTheme;

  useEffect(() => {
    document.body.style.backgroundColor = theme.palette.background.default;
    document.body.style.color = theme.palette.text.primary;
  }, [theme]);

  return theme;
};

export default useAppTheme;
