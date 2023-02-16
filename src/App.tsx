import { useAppDispatch, useAppSelector } from './app/hooks';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';

//! Views
import HomeView from './views/home/home';
import MainView from './views/main/main';

import { ThemeProvider } from '@mui/material/styles';
import { AppColor, selectAppColorMode } from './slices/app/app.slice';
import { darkTheme, lightTheme } from './styled/theme';

function App() {
  const dispatch = useAppDispatch()
  const appColorMode: AppColor = useAppSelector(selectAppColorMode)
  
  return (
    <ThemeProvider theme={appColorMode === 'light' ? lightTheme : darkTheme}>
      <BrowserRouter>
        <Routes>
          <Route element={<MainView />} >
            <Route index element={<HomeView />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
