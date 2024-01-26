//* MUI
import { Avatar, Box, Card, CardActions, CardContent, CardHeader, Chip, List, ListItem, Typography, useTheme } from "@mui/material";
//* Styled Components
import HiddenOverflowCardHeader from "../../styled/budget-card-subcomponents/hidden-overflow-card-header";
//* Components
import BudgetIconComponent from "../budgetInfo/budget-icon";
import BudgetPinButton from "./budget-card-pin-button";
//* Types
import { AppBudgetMetaData } from "../../types/AppTypes";

interface BudgetFullCardProps {
  budget: AppBudgetMetaData;
}

const BudgetFullCard: React.FC<BudgetFullCardProps> = ({ budget }) => {
  const theme = useTheme();

  return (
    <Card>
      <HiddenOverflowCardHeader
        avatar={
          <Avatar aria-label="icon" variant="rounded" sx={{ bgcolor: theme.palette.secondary.main }}>
            <BudgetIconComponent iconName={budget.icon} />
          </Avatar>
        }
        title={budget.name}
        subheader={`${budget.owner.username} • ${new Date(budget.createdAt).toLocaleDateString()}`}
        action={<BudgetPinButton budget={budget} />}
      />
      <CardContent>
        <Typography paddingBottom={2} variant="body1" color={budget.description ? "text.secondary" : "text.disabled"}>
          {budget.description || "Brak opisu"}
        </Typography>
        <List dense subheader={<Typography>Członkowie:</Typography>}>
          {budget.members.length === 0 && (
            <Typography variant="body2" color={"text.disabled"}>
              Brak
            </Typography>
          )}
          {budget.members.map((member) => (
            <ListItem disableGutters key={member.id}>
              <Chip avatar={<Avatar>{member.username[0].toUpperCase()}</Avatar>} label={member.username} variant="outlined" />
            </ListItem>
          ))}
        </List>
      </CardContent>
      <CardActions disableSpacing>
        <Typography variant="caption" fontStyle={"italic"} noWrap marginLeft={"auto"}>
          #{budget.id}
        </Typography>
      </CardActions>
    </Card>
  );
};

export default BudgetFullCard;
