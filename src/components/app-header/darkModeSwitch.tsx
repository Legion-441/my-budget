import { Switch } from "@mui/material"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { selectAppColorMode, setAppColorMode } from "../../slices/app/app.slice"

export const DarkModeSwitch: React.FC = () => {
  const dispatch = useAppDispatch()
  const appColorMode = useAppSelector(selectAppColorMode)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setAppColorMode(event.target.checked ? 'dark' : 'light'));
  };


  return (<>
    <Switch
      checked={appColorMode === 'dark'}
      onChange={handleChange}
      inputProps={{ 'aria-label': 'toggle dark mode', 'id': 'darkModeSwitch' }}
    />
    {appColorMode} mode
    </>
  );

  
}

