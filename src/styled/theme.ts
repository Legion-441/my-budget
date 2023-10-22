import { createTheme } from "@mui/material/styles";
import { plPL } from '@mui/material/locale';

const themeComponents = createTheme({
  components: {
    MuiPaper: {
      defaultProps: {
        elevation: 2
      }
    }
  }
}, plPL);

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