//* MUI & icons
import { Box } from "@mui/material";
//* Components
import { CategoriesCard } from "./categories-card";
//* Types
import { AppBudgetMetaData } from "../../types/AppTypes";

interface CategoriesSectionProps {
  budgetData: AppBudgetMetaData;
}

const CategoriesSection: React.FC<CategoriesSectionProps> = ({ budgetData }) => {
  const { expenseCategories, incomeCategories } = budgetData;

  return (
    <>
      <Box display={"flex"} gap={5} flexDirection={{ xs: "column", sm: "row" }}>
        <CategoriesCard categoriesList={expenseCategories} categoriesType="expenseCategories" />
        <CategoriesCard categoriesList={incomeCategories} categoriesType="incomeCategories" />
      </Box>
    </>
  );
};

export default CategoriesSection;
