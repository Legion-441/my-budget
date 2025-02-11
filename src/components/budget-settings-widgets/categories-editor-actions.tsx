//* MUI & icons
import { Button, DialogActions } from "@mui/material";
import { Add, Gradient, Shuffle } from "@mui/icons-material";
//* Types
import { Category } from "../../types/AppTypes";
//* Lodash
import cloneDeep from "lodash/cloneDeep";

interface CategoriesEditorActionsProps {
  setCategories: React.Dispatch<React.SetStateAction<Category[]>>;
}

const CategoryEditorActions: React.FC<CategoriesEditorActionsProps> = ({ setCategories }) => {
  const addCategory = () => {
    setCategories((prevCategories) => {
      let updatedCategories = cloneDeep(prevCategories);
      let newCategory: Category = { id: (updatedCategories.length + 1).toString(), name: "", color: 0, order: updatedCategories.length };
      updatedCategories.push(newCategory);
      return updatedCategories;
    });
  };

  const handleSpreadColor = () => {
    setCategories((prevCategories) => {
      let updatedCategories = cloneDeep(prevCategories);

      updatedCategories.forEach((category, index) => {
        category.color = Math.round((360 / updatedCategories.length) * index);
      });

      return updatedCategories;
    });
  };

  const handleShuffleColor = () => {
    setCategories((prevCategories) => {
      let updatedCategories = cloneDeep(prevCategories);

      updatedCategories
        .sort(() => Math.random() - 0.5)
        .forEach((category, index) => {
          category.color = Math.round((360 / updatedCategories.length) * index);
        });
      updatedCategories.sort((a, b) => a.order - b.order);
      return updatedCategories;
    });
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