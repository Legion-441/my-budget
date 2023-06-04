import { createTheme } from "@mui/material/styles";

const themeComponents = createTheme({
  components: {
    MuiPaper: {
      defaultProps: {
        elevation: 2
      }
    }
  }
});

export const darkTheme = createTheme({
  ...themeComponents,
  palette: {
    mode: 'dark',
    background: {
      default: '#1f1f1f'
    }
  },
});

export const lightTheme = createTheme({
  ...themeComponents,
  palette: {
    mode: 'light',
    background: {
      default: '#f0f0f0'
    }
  },
});