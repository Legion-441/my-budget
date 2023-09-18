//! Icons
import DashboardIcon from '@mui/icons-material/Dashboard';
import HistoryIcon from '@mui/icons-material/History';
import SettingsIcon from '@mui/icons-material/Settings';

interface navLinksItem {
  label: string;
  icon: JSX.Element;
  subPath: string;
}

type navLinksItemsDto = navLinksItem[]


export const navLinks: navLinksItemsDto = [
  { label: 'Pulpit', icon: <DashboardIcon />, subPath: 'dash' },
  { label: 'Historia', icon: <HistoryIcon />, subPath: 'history' },
  { label: 'Ustawienia', icon: <SettingsIcon />, subPath: 'settings' }
]