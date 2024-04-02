//* MUI & icons
import { Card, CardContent, CardHeader, Chip, List, ListItem, Typography, useTheme } from "@mui/material";
//* Types
import { CategoriesTypeName, Category } from "../../types/AppTypes";
//* Lodash
import cloneDeep from "lodash/cloneDeep";

interface CategoriesCardProps {
  categoriesList: Category[];
  categoriesType: CategoriesTypeName;
}

export const CategoriesCard: React.FC<CategoriesCardProps> = ({ categoriesList, categoriesType }) => {
  const sortedCategories: Category[] = cloneDeep(categoriesList).sort((a, b) => a.order - b.order);

  const theme = useTheme();

  return (
    <Card>
      <CardHeader title={categoriesType === "expenseCategories" ? "Kategorie wydatków" : "Kategorie przychodów"} />
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
                        backgroundColor: `hsl(${category.color}, ${theme.palette.mode === "light" ? "100%, 85%" : "100%, 15%"})`,
                        borderColor: `hsl(${category.color}, ${theme.palette.mode === "light" ? "50%, 50%" : "50%, 30%"})`,
                        color: `hsl(${category.color}, ${theme.palette.mode === "light" ? "50%, 10%" : "50%, 90%"})`,
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
