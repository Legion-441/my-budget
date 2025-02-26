import { useState } from "react";
import { useDispatch } from "react-redux";
import { updateBudgetCategories } from "../../slices/app/app.slice";
//* MUI & icons
import { Alert, Button, DialogActions, DialogContent, Divider } from "@mui/material";
import { Close, Refresh, Save } from "@mui/icons-material";
//* Components
import CategoriesListItem from "./categories-editor-listItem";
//* Services
import { updateFirestoreBudgetCategories } from "../../services/budget-operations";
//* Utils
import { getFirestoreErrorText } from "../../utils/firestoreErrorHandling";
//* Types
import { CategoriesTypeName, Category, GroupedCategories } from "../../types/AppTypes";
//* Lodash
import cloneDeep from "lodash/cloneDeep";
import CategoryEditorActions from "./categories-editor-actions";

interface CategoriesEditorDialogContentProps {
  budgetID: string;
  groupedCategories: GroupedCategories;
  categoriesType: CategoriesTypeName;
  closeDialog: () => void;
}

const CategoryEditorDialogContent: React.FC<CategoriesEditorDialogContentProps> = ({
  budgetID,
  groupedCategories,
  categoriesType,
  closeDialog,
}) => {
  const [sortedCategories, setSortedCategories] = useState<Category[]>(cloneDeep(groupedCategories.sorted));
  const [disabledCategories, setHiddenCategories] = useState<Category[]>(cloneDeep(groupedCategories.hidden));
  const [updateCategoryError, setUpdateCategoryError] = useState<string | null>(null);
  const dispatch = useDispatch();
  const categories = [...sortedCategories, ...disabledCategories];

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
      <CategoryEditorActions setSortedCategories={setSortedCategories} />
      <DialogContent dividers>
        {sortedCategories.length === 0 && "Brak aktywnych kategorii"}
        {sortedCategories.map((category, index) => (
          <CategoriesListItem
            key={`EditMode_${categoriesType}_${index}_active`}
            category={category}
            index={index}
            setSortedCategories={setSortedCategories}
            setHiddenCategories={setHiddenCategories}
          />
        ))}
        {disabledCategories.length > 0 && <Divider />}
        {disabledCategories.map((category, index) => (
          <CategoriesListItem
            key={`EditMode_${categoriesType}_${index}_disabled`}
            category={category}
            index={index}
            setSortedCategories={setSortedCategories}
            setHiddenCategories={setHiddenCategories}
          />
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