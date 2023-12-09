import { useEffect, useState } from "react";
import { useAppSelector } from "../../app/hooks";
import { selectAccountInfo } from "../../slices/account/account.slice";
//* Firebase
import { auth } from "../../firebase";
//* Components
import BudgetCompactCard from "../../components/budgetCard/budget-compact-card";
import { BudgetManagementPageSkeleton } from "../../components/budgetCard/budget-card-skeleton";
import BudgetCardMenu from "../../components/budgetCard/budget-card-menu";
//* Services
import { fetchUserBudgetsMetadata } from "../../services/budget-list-operations";
//* MUI
import { Alert, Box, Grid, Stack, Typography } from "@mui/material";
//* Utils
import { getFirestoreErrorText } from "../../utils/firestoreErrorHandling";
//* Types
import { AppBudgetMetaData } from "../../types/AppTypes";

interface BudgetCardsProps {
  header: string;
  budgetsList: AppBudgetMetaData[];
  handleMenuOpen: (event: React.MouseEvent<HTMLElement>, pickedBudget: AppBudgetMetaData) => void;
}

const BudgetsCards: React.FC<BudgetCardsProps> = ({ header, budgetsList, handleMenuOpen }) => {
  return (
    <Stack gap={2} marginBottom={5}>
      <Typography variant="h2" fontSize={"2.369rem"}>{`${header}:`}</Typography>
      {budgetsList.length > 0 ? (
        <Grid container spacing={2}>
          {budgetsList.map((budget) => (
            <Grid key={budget.id} item xs={12} sm={6} md={4} lg={3}>
              <BudgetCompactCard budget={budget} key={budget.id} handleMenuOpen={handleMenuOpen} />
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography paddingLeft={2}>Ta grupa jest pusta</Typography>
      )}
    </Stack>
  );
};

const BudgetManagementView: React.FC = () => {
  const [budgets, setBudgets] = useState<AppBudgetMetaData[]>([]);
  const [selectedBudget, setSelectedBudget] = useState<AppBudgetMetaData | null>(null);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [fetchingError, setFetchingError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { data } = useAppSelector(selectAccountInfo);
  const { budgetsList } = data;

  const userUid = auth.currentUser?.uid;

  useEffect(() => {
    fetchUserBudgetsMetadata()
      .then((fetchedBudgets) => {
        setFetchingError("");
        setIsLoading(false);
        setBudgets(fetchedBudgets);
      })
      .catch((error) => {
        const errorMessage = getFirestoreErrorText(error);
        setFetchingError(errorMessage);
        setIsLoading(false);
        console.error(error);
        console.error(errorMessage);
      });
  }, []);

  const handleOpenBudgetsMenu = (event: React.MouseEvent<HTMLElement>, pickedBudget: AppBudgetMetaData) => {
    setAnchorEl(event.currentTarget);
    setSelectedBudget(pickedBudget);
  };
  const handleCloseBudgetsMenu = () => {
    setAnchorEl(null);
  };

  const pinnedBudgets: AppBudgetMetaData[] = [];
  const asOwnerBudgets: AppBudgetMetaData[] = [];
  const asMemberbudgets: AppBudgetMetaData[] = [];
  const archivedBudgets: AppBudgetMetaData[] = [];

  budgets.forEach((item) => {
    if (item.state === "active") {
      if (budgetsList.some((budgetListItem) => budgetListItem.id === item.id)) {
        pinnedBudgets.push(item);
      } else if (item.owner.id === userUid) {
        asOwnerBudgets.push(item);
      } else {
        asMemberbudgets.push(item);
      }
    } else if (item.state === "archived") {
      archivedBudgets.push(item);
    }
  });

  const RenderMenu = () => {
    if (!(selectedBudget && anchorEl)) return null;
    return <BudgetCardMenu budget={selectedBudget} anchorEl={anchorEl} handleMenuClose={handleCloseBudgetsMenu} />;
  };

  return (
    <>
      <Box component={"main"}>
        <Typography variant="h1" fontSize={"3.158rem"} marginY={"1rem"}>
          Zarządzanie budżetami
        </Typography>
        {fetchingError ? (
          <Alert severity="error" variant="outlined">
            {fetchingError}
          </Alert>
        ) : isLoading ? (
          <BudgetManagementPageSkeleton />
        ) : (
          <>
            <BudgetsCards header="Przypięte" budgetsList={pinnedBudgets} handleMenuOpen={handleOpenBudgetsMenu} />
            <BudgetsCards header="Aktywne własne" budgetsList={asOwnerBudgets} handleMenuOpen={handleOpenBudgetsMenu} />
            <BudgetsCards header="Aktywne obce" budgetsList={asMemberbudgets} handleMenuOpen={handleOpenBudgetsMenu} />
            <BudgetsCards header="Archiwalne" budgetsList={archivedBudgets} handleMenuOpen={handleOpenBudgetsMenu} />
          </>
        )}
      </Box>
      <RenderMenu />
    </>
  );
};

export default BudgetManagementView;
