//* MUI & icons
import { Box, FormControl, FormHelperText, IconButton, ListItem, OutlinedInput, useTheme } from "@mui/material";
import { Close, DragIndicator, RestoreFromTrashOutlined } from "@mui/icons-material";
//* Styled components
import CategoryColorSelector from "./category-color-selector";
//* Types
import { Category } from "../../types/AppTypes";

interface CategoriesListItemProps {
  category: Category;
  index: number;
  setSortedCategories: React.Dispatch<React.SetStateAction<Category[]>>;
  setHiddenCategories: React.Dispatch<React.SetStateAction<Category[]>>;
}

const CategoriesListItem: React.FC<CategoriesListItemProps> = ({ category, index, setSortedCategories, setHiddenCategories }) => {
  const theme = useTheme();

  const handleTextChange = (value: string, index: number) => {
    const updateCategories = (prevCategories: Category[]) => prevCategories.map((cat, i) => (i === index ? { ...cat, name: value } : cat));

    if (category.hidden) {
      setHiddenCategories(updateCategories);
    } else {
      setSortedCategories(updateCategories);
    }
  };

  const handleTextOnBlur = (value: string, index: number) => {
    handleTextChange(value.trim(), index);
  };

  const handleColorChange = (color: number, index: number) => {
    const updateCategories = (prevCategories: Category[]) => prevCategories.map((cat, i) => (i === index ? { ...cat, color: color } : cat));

    if (category.hidden) {
      setHiddenCategories(updateCategories);
    } else {
      setSortedCategories(updateCategories);
    }
  };

  const handleHide = (category: Category, index: number) => {
    setSortedCategories((prevCategories) => prevCategories.filter((_, i) => i !== index).map((cat, i) => ({ ...cat, order: i })));
    setHiddenCategories((prevCategories) => [...prevCategories, { ...category, hidden: true, order: -1 }]);
  };

  const handleUnhide = (category: Category, index: number) => {
    setHiddenCategories((prevCategories) => prevCategories.filter((_, i) => i !== index));
    setSortedCategories((prevCategories) => [...prevCategories, { ...category, hidden: false, order: prevCategories.length }]);
  };

  return (
    <ListItem disableGutters>
      <Box bgcolor="inherit" flexDirection="row" display="flex" alignItems="center">
        <IconButton sx={{ mr: 1, cursor: category.hidden ? "default" : "grab", visibility: category.hidden ? "hidden" : "visible" }}>
          <DragIndicator />
        </IconButton>
        <FormControl variant="outlined">
          <OutlinedInput
            disabled={category.hidden}
            autoFocus={!category.name}
            required
            id={`category-${category.id}-name`}
            aria-label={`Nazwa kategorii ${category.id}`}
            size="small"
            error={category.name.length === 0}
            onBlur={(event) => handleTextOnBlur(event.target.value, index)}
            onChange={(event) => handleTextChange(event.target.value, index)}
            value={category.name}
            endAdornment={<CategoryColorSelector category={category} onChange={(color) => handleColorChange(color, index)} />}
            sx={{
              color: `hsl(${category.color}, ${category.hidden ? "0%" : "80%"}, ${theme.palette.mode === "light" ? "20%" : "60%"})`,
            }}
          />
          <FormHelperText hidden={category.name.length !== 0} error>
            Pole wymagane
          </FormHelperText>
        </FormControl>
        {category.hidden ? (
          <IconButton sx={{ mx: 1 }} onClick={() => handleUnhide(category, index)}>
            <RestoreFromTrashOutlined />
          </IconButton>
        ) : (
          <IconButton sx={{ mx: 1 }} onClick={() => handleHide(category, index)}>
            <Close />
          </IconButton>
        )}
      </Box>
    </ListItem>
  );
};

export default CategoriesListItem;
