import { useState } from "react";
import { useNavigate } from "react-router-dom";
//* MUI
import { Avatar, Box, Card, CardActions, CardContent, CardHeader, Divider, IconButton, Typography, styled, useTheme } from "@mui/material";
import { Group, MoreVert } from "@mui/icons-material";
//* Components
import BudgetIconComponent from "../budgetInfo/budget-icon";
import BudgetPinButton from "./budget-card-pin-button";
//* Types
import { AppBudgetMetaData } from "../../types/AppTypes";

const StyledCard = styled(Card)({
  cursor: "pointer",
  WebkitTapHighlightColor: "transparent",
  WebkitTouchCallout: "none",
  WebkitUserSelect: "none",
  KhtmlUserSelect: "none",
  MozUserSelect: "none",
  msUserSelect: "none",
  userSelect: "none",
});

interface BudgetCompactCardProps {
  budget: AppBudgetMetaData;
  handleMenuOpen: (event: React.MouseEvent<HTMLElement>, pickedBudget: AppBudgetMetaData) => void;
}

const BudgetCompactCard: React.FC<BudgetCompactCardProps> = ({ budget, handleMenuOpen }) => {
  const [isHover, setIsHover] = useState(false);
  const theme = useTheme();
  const navigate = useNavigate();

  const navigateToBudgetPage = () => navigate(`/budget/${budget.id}/dash`);

  const cardElevation = isHover ? 10 : 6;
  const cardBackgroundColor = isHover ? theme.palette.action.focus : "initial";

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

  const membersButton = (
    <Box display="flex" gap={1} alignItems="center" fontSize={"small"}>
      <Group fontSize="inherit" />
      {budget.members.length}
    </Box>
  );

  return (
    <StyledCard
      elevation={cardElevation}
      onClick={navigateToBudgetPage}
      sx={{ backgroundColor: cardBackgroundColor }}
      onPointerOver={() => setIsHover(true)}
      onPointerOut={() => setIsHover(false)}
    >
      <CardHeader
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

      <CardContent style={{ paddingBlock: 0 }}>
        <Typography variant="body2" color={budget.description ? "text.secondary" : "text.disabled"}>
          {budget.description ? budget.description : "Brak opisu"}
        </Typography>
      </CardContent>

      <CardActions sx={{ paddingInline: 2 }} disableSpacing>
        {budget.members.length > 0 && membersButton}
      </CardActions>
    </StyledCard>
  );
};

export default BudgetCompactCard;
