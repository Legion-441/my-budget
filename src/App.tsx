import { useAppDispatch, useAppSelector } from './app/hooks';
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
import { AppColor, selectAppColorMode, setBudgetsList } from './slices/app/app.slice';
import { darkTheme, lightTheme } from './styled/theme';
import BudgetView from './views/budget/budget';
import { useEffect } from 'react';

const App: React.FC = () => {
  const appColorMode: AppColor = useAppSelector(selectAppColorMode)
  const dispatch = useAppDispatch()

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    
    fetch('http://192.168.0.4:3004/budgetlist', { signal })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! ${res.url} ${res.status} (${res.statusText})`);
        }
        return res.json()
      })
      .then((data) => {
        dispatch(setBudgetsList(data.budgetsList));
      }).catch(err => {
        if (err.name === "AbortError") {
          // console.error(err);
        } else {
          //TODO: handle errors
          console.error(err);   
        }
      });
      return () => controller.abort();
  }, [dispatch])


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
          <Route path='login' element={<>LOGIN</>} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
