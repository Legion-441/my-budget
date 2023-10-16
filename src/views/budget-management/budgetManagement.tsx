import { useAppSelector } from "../../app/hooks";
import { selectUserInfo } from "../../slices/user/user.slice";
//* MUI
import { Box } from "@mui/material"


const BudgetManagementView: React.FC = () => {
  const { data } = useAppSelector(selectUserInfo);
  const { budgetsList } = data;

  return (
    <Box component={'main'}>
      <h1>Zarządzanie budżetami</h1>
      <h2>Przypięte:</h2>
      {/* Table with pinned budgets */}
      <h2>Aktywne:</h2>
      {/* Table with all active budgets */}
      <h2>Archiwalne:</h2>      
      {/* Table with all archived budgets */}
    </Box> 
  )
}

export default BudgetManagementView