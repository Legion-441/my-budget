//* MUI
import {
  Avatar,
  Box,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Chip,
  Divider,
  List,
  ListItem,
  Typography,
  useTheme,
} from "@mui/material";
//* Components
import BudgetIcon from "../budgetInfo/budget-icon";
//* Types
import { AppBudgetMetaData } from "../../types/AppTypes";

interface BudgetFullCardProps {
  budget: AppBudgetMetaData;
}

const BudgetFullCard: React.FC<BudgetFullCardProps> = ({ budget }) => {
  const theme = useTheme();

  return (
    <Card>
      <CardHeader
        avatar={
          <Avatar aria-label="icon" variant="rounded" sx={{ bgcolor: theme.palette.secondary.main }}>
            <BudgetIcon iconName={budget.icon} />
          </Avatar>
        }
        title={budget.name}
        subheader={
          <Box display={"flex"} gap={1}>
            {budget.owner.username}
            <Divider orientation="vertical" flexItem />
            {new Date(budget.createdAt).toLocaleDateString()}
          </Box>
        }
      />
      <CardContent style={{ paddingBlock: 0 }}>
        <Typography variant="body1">{budget.description || "Brak opisu"}</Typography>
        <br />
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
