import { useState } from "react";
import { useNavigate } from "react-router-dom";
//* MUI
import { Avatar, Box, Card, CardContent, CardHeader, Divider, IconButton, Typography, styled, useTheme } from "@mui/material";
import { Group, MoreVert } from "@mui/icons-material";
//* Components
import BudgetIconComponent from "../budgetInfo/budget-icon";
import BudgetPinButton from "./budget-card-pin-button";
//* Types
import { AppBudgetMetaData } from "../../types/AppTypes";

interface BudgetCompactCardProps {
  budget: AppBudgetMetaData;
  handleMenuOpen: (event: React.MouseEvent<HTMLElement>, pickedBudget: AppBudgetMetaData) => void;
}

const BudgetCompactCard: React.FC<BudgetCompactCardProps> = ({ budget, handleMenuOpen }) => {
  const [isHover, setIsHover] = useState(false);
  const theme = useTheme();
  const navigate = useNavigate();

  const navigateToBudgetPage = () => navigate(`/budget/${budget.id}/dash`);

  const actionButton = (
    <>
      <BudgetPinButton budget={budget} isHover={isHover} />
      <IconButton
        aria-label="opcje"
        size="small"
        onClick={(e) => {
          e.stopPropagation();
          handleMenuOpen(e, budget);
        }}
        onMouseDown={(e) => e.stopPropagation()}
        onMouseUp={(e) => e.stopPropagation()}
        onTouchStart={(e) => e.stopPropagation()}
        onTouchEnd={(e) => e.stopPropagation()}
      >
        <MoreVert />
      </IconButton>
    </>
  );

  const MembersCountInfo = () => (
    <Box display="flex" gap={1} alignItems="center" fontSize={"small"} paddingTop={1}>
      <Group fontSize="inherit" />
      Ty i {budget.members.length} {budget.members.length === 1 ? "inny członek" : "innych członków"}
    </Box>
  );

  return (
    <Card
      elevation={6}
      onClick={navigateToBudgetPage}
      onPointerOver={() => setIsHover(true)}
      onPointerOut={() => setIsHover(false)}
    >
      <CardActionArea>
        <CardHeader
          sx={{ paddingBottom: 0 }}
          avatar={
            <Avatar aria-label="icon" variant="rounded" sx={{ bgcolor: theme.palette.secondary.main }}>
              <BudgetIconComponent iconName={budget.icon} />
            </Avatar>
          }
          action={actionButton}
          title={budget.name}
          subheader={
            <Box display={"flex"} gap={1}>
              {budget.owner.username}
              <Divider orientation="vertical" flexItem />
              {new Date(budget.createdAt).toLocaleDateString()}
            </Box>
          }
        />

        <CardContent>
          <Box gap={1}>
            <Typography component={"span"} variant="body2" color={budget.description ? "text.secondary" : "text.disabled"}>
              {budget.description ? budget.description : "Brak opisu"}
            </Typography>
            {budget.members.length > 0 && <MembersCountInfo />}
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default BudgetCompactCard;
