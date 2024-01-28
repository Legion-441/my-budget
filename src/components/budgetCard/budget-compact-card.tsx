import { useState } from "react";
//* MUI
import { Avatar, Box, Card, CardActionArea, CardActions, CardContent, IconButton, Typography, styled } from "@mui/material";
import { Group, MoreVert } from "@mui/icons-material";
//* Styled Components
import HiddenOverflowCardHeader from "../../styled/budget-card-subcomponents/hidden-overflow-card-header";
//* Styled components
import UnstyledLink from "../../styled/unstyled-link/unstyled-link.styled";
//* Components
import BudgetIconComponent from "../budgetInfo/budget-icon";
import BudgetPinButton from "./budget-card-pin-button";
//* Types
import { AppBudgetMetaData } from "../../types/AppTypes";

const LineClampTypography = styled(Typography)({
  display: "-webkit-box",
  WebkitLineClamp: 2,
  lineClamp: 2,
  WebkitBoxOrient: "vertical",
  overflow: "hidden",
});

interface BudgetCompactCardProps {
  budget: AppBudgetMetaData;
  handleMenuOpen: (event: React.MouseEvent<HTMLElement>, pickedBudget: AppBudgetMetaData) => void;
}

const BudgetCompactCard: React.FC<BudgetCompactCardProps> = ({ budget, handleMenuOpen }) => {
  const [isHover, setIsHover] = useState(false);

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
    <Box display="flex" gap={1} alignItems="center" fontSize={"small"}>
      <Group fontSize="inherit" />
      Ty i {budget.members.length} {budget.members.length === 1 ? "inny członek" : "innych członków"}
    </Box>
  );

  return (
    <Card elevation={6} onPointerOver={() => setIsHover(true)} onPointerOut={() => setIsHover(false)}>
      <CardActionArea component={UnstyledLink} to={`/budget/${budget.id}/dash`}>
        <HiddenOverflowCardHeader
          avatar={
            <Avatar aria-label="icon" variant="rounded" sx={{ bgcolor: "secondary.main" }}>
              <BudgetIconComponent iconName={budget.icon} />
            </Avatar>
          }
          action={actionButton}
          title={budget.name}
          subheader={`${budget.owner.username} • ${new Date(budget.createdAt).toLocaleDateString()}`}
        />
        <CardContent>
          <Box gap={1}>
            <LineClampTypography variant="body2" color={budget.description ? "text.secondary" : "text.disabled"}>
              {budget.description ? budget.description : "Brak opisu"}
            </LineClampTypography>
          </Box>
        </CardContent>
        <CardActions sx={{ pl: 2, pt: 0 }}>{budget.members.length > 0 && <MembersCountInfo />}</CardActions>
      </CardActionArea>
    </Card>
  );
};

export default BudgetCompactCard;
