import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import "./App.css";
//* Hooks
import useAppTheme from "./hooks/useTheme";
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
//* Utils
import ProtectedRoute from "./utils/protected-route";

const App: React.FC = () => {
  const theme = useAppTheme();

  return (
    <ThemeProvider theme={theme}>
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
