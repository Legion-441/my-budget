import { useEffect } from 'react';
import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { AppColor, selectAppColorMode } from './slices/app/app.slice';
import { fetchUserData } from './slices/user/user.slice';
import './App.css';
//* Views
import HomeView from './views/home/home';
import MainView from './views/main/main';
import DashboardDetailsView from './views/dashboard/dashboard-details';
import DashboardMainView from './views/dashboard/dashboard';
import NotFoundView from './views/not-found/notFound';
import HistoryView from './views/history/history';
import SettingsView from './views/settings/settings';
import BudgetView from './views/budget/budget';
//* MUI & styles
import { ThemeProvider } from '@mui/material/styles';
import { darkTheme, lightTheme } from './styled/theme';
import LogInView from './views/log-in/log-in';
import SignUpView from './views/sign-up/sign-up';


const App: React.FC = () => {
  const appColorMode: AppColor = useAppSelector(selectAppColorMode)
  const dispatch = useAppDispatch()
  
  useEffect(() => {
    const controller = new AbortController();

    dispatch(fetchUserData())

    return () => {
      controller.abort();
    };
  }, [dispatch]);

  
  return (
    <ThemeProvider theme={appColorMode === 'light' ? lightTheme : darkTheme}>
      <BrowserRouter>
        <Routes>
          <Route element={<MainView />} >
            <Route index element={<HomeView />} />
            <Route path='budget/:id' element={<BudgetView />} >
              <Route path='dash' element={<Outlet />}>
                <Route index element={<DashboardMainView />} />
                <Route path='details' element={<DashboardDetailsView />} />
              </Route>
              <Route path='history' element={<HistoryView/>} />
              <Route path='settings' element={<SettingsView/>} />
            </Route>
            <Route path='profile' element={<>PROFILE</>} />
            <Route path='*' element={<NotFoundView />} />
          </Route>
          <Route path='login' element={<LogInView/>} />
          <Route path='signup' element={<SignUpView/>} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
