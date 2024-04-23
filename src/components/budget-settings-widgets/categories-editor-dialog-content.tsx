import { useState } from "react";
import { useDispatch } from "react-redux";
import { updateBudgetCategories } from "../../slices/app/app.slice";
//* MUI & icons
import { Alert, Button, DialogActions, DialogContent } from "@mui/material";
import { Add, Close, Gradient, Refresh, Save, Shuffle } from "@mui/icons-material";
//* Components
import CategoriesListItem from "./categories-editor-dialog-listItem";
//* Utils
import { getFirestoreErrorText } from "../../utils/firestoreErrorHandling";
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
  const [updateCategoryError, setUpdateCategoryError] = useState<string | null>(null);
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

  const handleConfirm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // TODO: update DB
    dispatch(updateBudgetCategories({ data: cloneDeep(categories), type: categoriesType }));
    closeDialog();
  };

  return (
    <form onSubmit={handleConfirm}>
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
      {updateCategoryError ? (
        <Alert severity="error" variant="outlined" sx={{ m: 1 }}>
          {updateCategoryError} Lorem ipsum elit.
        </Alert>
      ) : null}
      <DialogActions>
        <Button variant="outlined" onClick={closeDialog} startIcon={<Close />}>
          Anuluj
        </Button>
        <Button type="submit" variant="contained" startIcon={updateCategoryError ? <Refresh /> : <Save />}>
          {updateCategoryError ? "Ponów" : "Zapisz"}
        </Button>
      </DialogActions>
    </form>
  );
};

export default CategoryEditorDialogContent;
