//! Icons
import DashboardIcon from '@mui/icons-material/Dashboard';
import HistoryIcon from '@mui/icons-material/History';
import SettingsIcon from '@mui/icons-material/Settings';

export interface navLinksItem {
  label: string;
  icon: JSX.Element;
  subPath: string;
}

export type navLinksItemsDto = navLinksItem[]


export const navLinks: navLinksItemsDto = [
  { label: 'Dashboard', icon: <DashboardIcon />, subPath: 'dash' },
  { label: 'History', icon: <HistoryIcon />, subPath: 'history' },
  { label: 'Settings', icon: <SettingsIcon />, subPath: 'settings' }
]