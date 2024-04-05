import { useState } from "react";
import { useDispatch } from "react-redux";
import { updateBudgetCategories } from "../../slices/app/app.slice";
//* MUI & icons
import { Button, DialogActions, DialogContent } from "@mui/material";
import { Add, Close, Gradient, Save, Shuffle } from "@mui/icons-material";
//* Components
import CategoriesListItem from "./categories-editor-dialog-listItem";
//* Types
import { CategoriesTypeName, Category } from "../../types/AppTypes";
//* Lodash
import cloneDeep from "lodash/cloneDeep";

interface CategoriesEditorDialogContentProps {
  categories: Category[];
  categoriesType: CategoriesTypeName;
  closeDialog: () => void;
}

const CategoryEditorDialogContent: React.FC<CategoriesEditorDialogContentProps> = ({
  categories: categoriesData,
  categoriesType,
  closeDialog,
}) => {
  const InitialCategories = cloneDeep(categoriesData);
  const [categories, setCategories] = useState<Category[]>(InitialCategories);
  const dispatch = useDispatch();

  const handleTextChange = (value: string, index: number) => {
    setCategories((prevCategories) => {
      let updatedCategories = cloneDeep(prevCategories);
      updatedCategories[index].name = value;
      return updatedCategories;
    });
  };
  const handleTextOnBlur = (value: string, index: number) => {
    setCategories((prevCategories) => {
      let updatedCategories = cloneDeep(prevCategories);
      updatedCategories[index].name = value.trim();
      return updatedCategories;
    });
  };

  const handleSpreadColor = () => {
    setCategories((prevCategories) => {
      let updatedCategories = cloneDeep(prevCategories);

      updatedCategories.forEach((category, index) => {
        category.color = Math.round((360 / categories.length) * index);
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
          category.color = Math.round((360 / categories.length) * index);
        });
      updatedCategories.sort((a, b) => a.order - b.order);
      return updatedCategories;
    });
  };

  const handleConfirm = () => {
    // TODO: update DB
    dispatch(updateBudgetCategories({ data: cloneDeep(categories), type: categoriesType }));
    closeDialog();
  };

  return (
    <>
      <DialogActions sx={{ justifyContent: "space-evenly" }}>
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
      <DialogContent dividers>
        {categories.map((category, index) => (
          <CategoriesListItem
            key={`EditMode_${categoriesType}_${index}`}
            category={category}
            index={index}
            handleTextChange={handleTextChange}
            handleTextOnBlur={handleTextOnBlur}
          />
        ))}
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" onClick={closeDialog} startIcon={<Close />}>
          Anuluj
        </Button>
        <Button variant="contained" onClick={handleConfirm} startIcon={<Save />}>
          Zapisz
        </Button>
      </DialogActions>
    </>
  );
};

export default CategoryEditorDialogContent;
