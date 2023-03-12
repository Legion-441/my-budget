//! Icons
import DashboardIcon from '@mui/icons-material/Dashboard';
import HistoryIcon from '@mui/icons-material/History';
import SettingsIcon from '@mui/icons-material/Settings';

export const pathListArr = [
  '/',
  '/dash',
  '/dash/details',
  '/history',
  '/settings',
  '/profile',
  '/sign-in',
  '/log-in'
] as const;

export type PathList = typeof pathListArr extends readonly (infer V)[] ? V : never;
export type Path = `/${string}`;
export interface navLinksItem {
  label: string;
  icon: JSX.Element;
  path?: PathList & Path;
}

export type navLinksItemsDto = navLinksItem[]


export const navLinks: navLinksItemsDto = [
  { label: 'Dashboard', icon: <DashboardIcon />, path: '/dash' },
  { label: 'History', icon: <HistoryIcon />, path: '/history' },
  { label: 'Settings', icon: <SettingsIcon />, path: '/settings' }
]