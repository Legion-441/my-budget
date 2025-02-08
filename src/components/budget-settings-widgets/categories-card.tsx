//* MUI & icons
import { Card, CardContent, CardHeader, Chip, List, ListItem, Typography, useTheme } from "@mui/material";
//* Components
import CategoryEditorDialog from "./categories-editor-dialog";
//* Types
import { CategoriesTypeName, Category } from "../../types/AppTypes";
//* Lodash
import cloneDeep from "lodash/cloneDeep";

interface CategoriesCardProps {
  budgetID: string;
  categoriesList: Category[];
  categoriesType: CategoriesTypeName;
}

export const CategoriesCard: React.FC<CategoriesCardProps> = ({ budgetID, categoriesList, categoriesType }) => {
  const sortedCategories: Category[] = cloneDeep(categoriesList).sort((a, b) => a.order - b.order);

  const theme = useTheme();

  return (
    <Card>
      <CardHeader
        title={categoriesType === "expenseCategories" ? "Kategorie wydatków" : "Kategorie przychodów"}
        action={<CategoryEditorDialog budgetID={budgetID} categories={sortedCategories} categoriesType={categoriesType} />}
      />
      <CardContent>
        <List dense sx={{ maxHeight: "80vh", overflow: "auto" }}>
          {sortedCategories.length === 0 ? (
            <Typography variant="body2" color={"text.disabled"}>
              Brak
            </Typography>
          ) : (
            <>
              {sortedCategories.map((category, index) => {
                return (
                  <ListItem disableGutters key={`${categoriesType}_${index}`}>
                    <Chip
                      label={category.name}
                      size="small"
                      variant="outlined"
                      sx={{
                        backgroundColor: `hsl(${category.color}, 80%, ${theme.palette.mode === "light" ? "50%" : "60%"})`,
                        borderColor: `hsl(${category.color}, ${theme.palette.mode === "light" ? "50%, 40%" : "50%, 30%"})`,
                        color: theme.palette.getContrastText(`hsl(${category.color}, 80%, ${theme.palette.mode === "light" ? "50%" : "60%"})`),
                      }}
                    />
                  </ListItem>
                );
              })}
            </>
          )}
        </List>
      </CardContent>
    </Card>
  );
};
