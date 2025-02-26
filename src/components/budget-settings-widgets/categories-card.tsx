//* MUI & icons
import { Card, CardContent, CardHeader, Chip, List, ListItem, Typography, useTheme } from "@mui/material";
//* Components
import CategoryEditorDialog from "./categories-editor-dialog";
//* Types
import { CategoriesTypeName, Category, GroupedCategories } from "../../types/AppTypes";

interface CategoriesCardProps {
  budgetID: string;
  categoriesList: Category[];
  categoriesType: CategoriesTypeName;
}

export const CategoriesCard: React.FC<CategoriesCardProps> = ({ budgetID, categoriesList, categoriesType }) => {
  const groupedCategories: GroupedCategories = categoriesList.reduce(
    (acc, category) => {
      category.hidden ? acc.hidden.push(category) : acc.sorted.push(category);
      return acc;
    },
    { sorted: [], hidden: [] } as { sorted: Category[]; hidden: Category[] }
  );

  groupedCategories.sorted.sort((a, b) => a.order - b.order);

  const theme = useTheme();

  return (
    <Card>
      <CardHeader
        title={categoriesType === "expenseCategories" ? "Kategorie wydatków" : "Kategorie przychodów"}
        action={<CategoryEditorDialog budgetID={budgetID} groupedCategories={groupedCategories} categoriesType={categoriesType} />}
      />
      <CardContent>
        <List dense sx={{ maxHeight: "80vh", overflow: "auto" }}>
          {groupedCategories.sorted.length === 0 ? (
            <Typography variant="body2" color={"text.disabled"}>
              Brak
            </Typography>
          ) : (
            <>
              {groupedCategories.sorted.map((category, index) => {
                return (
                  <ListItem disableGutters key={`${categoriesType}_${index}`}>
                    <Chip
                      label={category.order + " " + category.name}
                      size="small"
                      variant="outlined"
                      sx={{
                        backgroundColor: `hsl(${category.color}, 80%, ${theme.palette.mode === "light" ? "50%" : "60%"})`,
                        borderColor: `hsl(${category.color}, ${theme.palette.mode === "light" ? "50%, 40%" : "50%, 30%"})`,
                        color: theme.palette.getContrastText(
                          `hsl(${category.color}, 80%, ${theme.palette.mode === "light" ? "50%" : "60%"})`
                        ),
                      }}
                    />
                  </ListItem>
                );
              })}
              {groupedCategories.hidden.length > 0 && (
                <ListItem disableGutters key={`${categoriesType}_disabled`}>
                  <Chip
                    label={`Wyłączone: ${groupedCategories.hidden.length}`}
                    size="small"
                    variant="outlined"
                    sx={{
                      backgroundColor: `hsl(0, 0%, ${theme.palette.mode === "light" ? "80%" : "30%"})`,
                      borderColor: `hsl(0, 0%, 40%)`,
                      color: theme.palette.getContrastText(`hsl(0, 0%, ${theme.palette.mode === "light" ? "80%" : "30%"})`),
                    }}
                  />
                </ListItem>
              )}
            </>
          )}
        </List>
      </CardContent>
    </Card>
  );
};
