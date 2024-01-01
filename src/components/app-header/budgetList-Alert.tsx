//* MUI
import { Refresh } from "@mui/icons-material";
import { Box, IconButton, Tooltip, Typography } from "@mui/material";
//* Styled Components
import CustomAlert from "../../styled/budgetList-alert/budgetList-alert.styled";

interface BudgetListAlertProps {
  error: string;
  handleRetry: () => void;
}

const BudgetListAlert: React.FC<BudgetListAlertProps> = ({ error, handleRetry }) => {
  return (
    <Tooltip title={error} enterTouchDelay={0}>
      <Box
        sx={{
          flexGrow: { sm: 0, xs: 1 },
          minWidth: { sm: 200, xs: 80 },
        }}
      >
        <CustomAlert
          variant="outlined"
          severity="error"
          sx={{
            flexGrow: { sm: 0, xs: 1 },
          }}
          action={
            <IconButton aria-label="refresh" size="small" onClick={handleRetry}>
              <Refresh fontSize="small" />
            </IconButton>
          }
        >
          <Typography noWrap={true} variant="body1" fontSize={"medium"} overflow="hidden" textOverflow="ellipsis">
            {error}
          </Typography>
        </CustomAlert>
      </Box>
    </Tooltip>
  );
};

export default BudgetListAlert;
