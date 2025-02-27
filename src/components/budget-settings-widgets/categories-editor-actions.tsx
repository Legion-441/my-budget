import { nanoid } from "nanoid";
//* MUI & icons
import { Button, DialogActions } from "@mui/material";
import { Add, Gradient, Shuffle } from "@mui/icons-material";
//* Types
import { Category } from "../../types/AppTypes";

interface CategoriesEditorActionsProps {
  setSortedCategories: React.Dispatch<React.SetStateAction<Category[]>>;
}

const CategoryEditorActions: React.FC<CategoriesEditorActionsProps> = ({ setSortedCategories }) => {
  const addCategory = () => {
    setSortedCategories((prevCategories) => [
      ...prevCategories,
      { id: nanoid(6), name: "", color: 0, order: prevCategories.length, hidden: false },
    ]);
  };

  const handleSpreadColor = () => {
    setSortedCategories((prevCategories) =>
      prevCategories.map((category, index, array) => ({
        ...category,
        color: Math.round((360 / array.length) * index),
      }))
    );
  };

  const handleShuffleColor = () => {
    setSortedCategories((prevCategories) =>
      prevCategories
        .sort(() => Math.random() - 0.5)
        .map((category, index) => ({
          ...category,
          color: Math.round((360 / prevCategories.length) * index),
        }))
        .sort((a, b) => a.order - b.order)
    );
  };

  return (
    <>
      <DialogActions sx={{ justifyContent: "space-evenly" }}>
        <Button onClick={addCategory} variant="outlined" startIcon={<Add />} size="small" sx={{ textTransform: "none" }}>
          Dodaj kategorię
        </Button>
        <Button
          onClick={handleSpreadColor}
          variant="outlined"
          endIcon={<Gradient />}
          color="secondary"
          size="small"
          sx={{ textTransform: "none" }}
        >
          Rozłóż kolory
        </Button>
        <Button
          onClick={handleShuffleColor}
          variant="outlined"
          endIcon={<Shuffle />}
          color="secondary"
          size="small"
          sx={{ textTransform: "none" }}
        >
          Losowo
        </Button>
      </DialogActions>
    </>
  );
};

export default CategoryEditorActions;
