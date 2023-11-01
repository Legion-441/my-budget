import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import { useAppSelector } from "./app/hooks";
import { selectAppColorMode } from "./slices/app/app.slice";
import "./App.css";
//* Views
import AuthView from "./views/auth/auth";
import BudgetView from "./views/budget/budget";
import DashboardDetailsView from "./views/dashboard/dashboard-details";
import DashboardMainView from "./views/dashboard/dashboard";
import HistoryView from "./views/history/history";
import HomeView from "./views/home/home";
import LogInView from "./views/log-in/log-in";
import MainView from "./views/main/main";
import NotFoundView from "./views/not-found/notFound";
import SettingsView from "./views/settings/settings";
import SignUpView from "./views/sign-up/sign-up";
import UserProfileView from "./views/user-profile/user-profile";
import BudgetManagementView from "./views/budget-management/budgetManagement";
//* MUI & styles
import { ThemeProvider } from "@mui/material/styles";
import { darkTheme, lightTheme } from "./styled/theme";
//* Utils
import ProtectedRoute from "./utils/protected-route";
//* Types
import { AppTheme } from "./types/AppTypes";

const App: React.FC = () => {
  const appColorMode: AppTheme = useAppSelector(selectAppColorMode);

  return (
    <ThemeProvider theme={appColorMode === "light" ? lightTheme : darkTheme}>
      <BrowserRouter>
        <Routes>
          <Route element={<ProtectedRoute />}>
            <Route element={<MainView />}>
              <Route index element={<HomeView />} />
              <Route path="budget/:id" element={<BudgetView />}>
                <Route path="dash" element={<Outlet />}>
                  <Route index element={<DashboardMainView />} />
                  <Route path="details" element={<DashboardDetailsView />} />
                </Route>
                <Route path="history" element={<HistoryView />} />
                <Route path="settings" element={<SettingsView />} />
              </Route>
              <Route path="profile" element={<UserProfileView />} />
              <Route path="budget-management" element={<BudgetManagementView />} />
              <Route path="*" element={<NotFoundView />} />
            </Route>
          </Route>
          <Route element={<AuthView />}>
            <Route path="login" element={<LogInView />} />
            <Route path="signup" element={<SignUpView />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
