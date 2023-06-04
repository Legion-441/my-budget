import { useAppSelector } from './app/hooks';
import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom';
import './App.css';
//* Views
import HomeView from './views/home/home';
import MainView from './views/main/main';
import DashboardDetailsView from './views/dashboard/dashboard-details';
import DashboardMainView from './views/dashboard/dashboard';
import NotFoundView from './views/not-found/notFound';
import HistoryView from './views/history/history';
import SettingsView from './views/settings/settings';
//* MUI & styles
import { ThemeProvider } from '@mui/material/styles';
import { AppColor, selectAppColorMode } from './slices/app/app.slice';
import { darkTheme, lightTheme } from './styled/theme';

const App: React.FC = () => {
  const appColorMode: AppColor = useAppSelector(selectAppColorMode)
  
  
  return (
    <ThemeProvider theme={appColorMode === 'light' ? lightTheme : darkTheme}>
      <BrowserRouter>
        <Routes>
          <Route element={<MainView />} >
            <Route index element={<HomeView />} />
            <Route path='budget/:id' element={<Outlet />} >
              <Route path='dash' element={<Outlet />}>
                <Route index element={<DashboardMainView />} />
                <Route path='details' element={<DashboardDetailsView />} />
              </Route>
              <Route path='history' element={<HistoryView/>} />
              <Route path='settings' element={<SettingsView/>} />
            </Route>
            <Route path='profile' element={<>PROFILE</>} />
          </Route>
            <Route path='*' element={<NotFoundView />} />
            <Route path='login' element={<>LOGIN</>} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
