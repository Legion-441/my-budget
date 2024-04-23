//* MUI & icons
import { Box, FormControl, FormHelperText, IconButton, ListItem, OutlinedInput, useTheme } from "@mui/material";
import { DragIndicator } from "@mui/icons-material";
//* Types
import { Category } from "../../types/AppTypes";
import { cloneDeep } from "lodash";

interface CategoriesListItemProps {
  category: Category;
  index: number;
  setCategories: React.Dispatch<React.SetStateAction<Category[]>>;
}

const CategoriesListItem: React.FC<CategoriesListItemProps> = ({ category, index, setCategories }) => {
  const theme = useTheme();

  const handleTextChange = (value: string, index: number) => {
    setCategories((prevCategories) => {
      let updatedCategories = cloneDeep(prevCategories);
      updatedCategories[index].name = value;
      return updatedCategories;
    });
  };

  const handleTextOnBlur = (value: string, index: number) => {
    handleTextChange(value.trim(), index);
  };

  return (
    <ListItem disableGutters>
      <Box bgcolor="inherit" flexDirection="row" display="flex" alignItems="center">
        <IconButton sx={{ mr: 1, cursor: "grab" }}>
          <DragIndicator />
        </IconButton>
        <FormControl variant="outlined">
          <OutlinedInput
            autoFocus={!category.name}
            required
            id={`expenses-category-${category.id}-name`}
            aria-label={`Nazwa kategorii ${category.id}`}
            size="small"
            error={category.name.length === 0}
            onBlur={(event) => handleTextOnBlur(event.target.value, index)}
            onChange={(event) => handleTextChange(event.target.value, index)}
            value={category.name}
            sx={{
              color: `hsl(${category.color}, 80%, ${theme.palette.mode === "light" ? "30%" : "60%"})`,
            }}
          />
          <FormHelperText hidden={category.name.length !== 0} error>
            Pole wymagane
          </FormHelperText>
        </FormControl>
      </Box>
    </ListItem>
  );
};

export default CategoriesListItem;
