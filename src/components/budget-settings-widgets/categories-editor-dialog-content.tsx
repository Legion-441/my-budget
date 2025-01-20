import { useState } from "react";
import { useDispatch } from "react-redux";
import { updateBudgetCategories } from "../../slices/app/app.slice";
//* MUI & icons
import { Alert, Button, DialogActions, DialogContent } from "@mui/material";
import { Add, Close, Gradient, Refresh, Save, Shuffle } from "@mui/icons-material";
//* Components
import CategoriesListItem from "./categories-editor-dialog-listItem";
//* Services
import { updateFirestoreBudgetCategories } from "../../services/budget-meta-operations";
//* Utils
import { getFirestoreErrorText } from "../../utils/firestoreErrorHandling";
//* Types
import { CategoriesTypeName, Category } from "../../types/AppTypes";
//* Lodash
import cloneDeep from "lodash/cloneDeep";

interface CategoriesEditorDialogContentProps {
  budgetID: string;
  categories: Category[];
  categoriesType: CategoriesTypeName;
  closeDialog: () => void;
}

const CategoryEditorDialogContent: React.FC<CategoriesEditorDialogContentProps> = ({
  budgetID,
  categories: categoriesData,
  categoriesType,
  closeDialog,
}) => {
  const InitialCategories = cloneDeep(categoriesData);
  const [categories, setCategories] = useState<Category[]>(InitialCategories);
  const [updateCategoryError, setUpdateCategoryError] = useState<string | null>(null);
  const dispatch = useDispatch();

  const addCategory = () => {
    setCategories((prevCategories) => {
      let updatedCategories = cloneDeep(prevCategories);
      updatedCategories.push({ id: (updatedCategories.length + 1).toString(), name: "", color: 0, order: updatedCategories.length });
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

  const handleConfirm = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await updateFirestoreBudgetCategories(budgetID, categoriesType, categories);
      setUpdateCategoryError(null);
      dispatch(updateBudgetCategories({ data: cloneDeep(categories), type: categoriesType }));
      closeDialog();
    } catch (error) {
      setUpdateCategoryError(getFirestoreErrorText(error));
    }
  };

  return (
    <form onSubmit={handleConfirm}>
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
      <DialogContent dividers>
        {categories.length === 0 && "Brak kategorii"}
        {categories.map((category, index) => (
          <CategoriesListItem key={`EditMode_${categoriesType}_${index}`} category={category} index={index} setCategories={setCategories} />
        ))}
      </DialogContent>
      {updateCategoryError ? (
        <Alert severity="error" variant="outlined" sx={{ m: 1 }}>
          {updateCategoryError}
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
