import PersonIcon from '@mui/icons-material/Person';
import GroupsIcon from '@mui/icons-material/Groups';
import SurfingIcon from '@mui/icons-material/Surfing';


export interface BudgetsListItem {
  name: string,
  id: string,
  icon: JSX.Element
}

export const budgetsListPlaceholder: BudgetsListItem[] = [
  { name: 'Personal', id: '1', icon: <PersonIcon />},
  { name: 'Family', id: '2', icon: <GroupsIcon />},
  { name: 'Holiday', id: '3', icon: <SurfingIcon />},
]