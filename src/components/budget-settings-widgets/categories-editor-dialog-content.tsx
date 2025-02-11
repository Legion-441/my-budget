import { useState } from "react";
import { useDispatch } from "react-redux";
import { updateBudgetCategories } from "../../slices/app/app.slice";
//* MUI & icons
import { Alert, Button, DialogActions, DialogContent } from "@mui/material";
import { Close, Refresh, Save } from "@mui/icons-material";
//* Components
import CategoriesListItem from "./categories-editor-listItem";
//* Services
import { updateFirestoreBudgetCategories } from "../../services/budget-operations";
//* Utils
import { getFirestoreErrorText } from "../../utils/firestoreErrorHandling";
//* Types
import { CategoriesTypeName, Category } from "../../types/AppTypes";
//* Lodash
import cloneDeep from "lodash/cloneDeep";
import CategoryEditorActions from "./categories-editor-actions";

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
      <CategoryEditorActions setCategories={setCategories} />
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