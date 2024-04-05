import { useState } from "react";
//* MUI & icons
import { Dialog, DialogTitle, IconButton, useMediaQuery, useTheme } from "@mui/material";
import { ModeEdit } from "@mui/icons-material";
//* Components
import CategoryEditorDialogContent from "./categories-editor-dialog-content";
//* Types
import { CategoriesTypeName, Category } from "../../types/AppTypes";

interface CategoriesEditorDialogProps {
  categories: Category[];
  categoriesType: CategoriesTypeName;
}

const CategoryEditorDialog: React.FC<CategoriesEditorDialogProps> = ({ categories: categoriesData, categoriesType }) => {
  const [open, setOpen] = useState(false);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const openDialog = () => {
    setOpen(true);
  };
  const closeDialog = () => {
    setOpen(false);
  };

  return (
    <>
      <IconButton aria-label="tryb edycji" onClick={openDialog}>
        <ModeEdit />
      </IconButton>
      <Dialog open={open} onClose={closeDialog} aria-labelledby="alert-dialog-title" fullScreen={isMobile}>
        <DialogTitle id="alert-dialog-title">
          Edycja - Kategorie {categoriesType === "expenseCategories" ? "wydatków" : "przychodów"}
        </DialogTitle>
        <CategoryEditorDialogContent categories={categoriesData} categoriesType={categoriesType} closeDialog={closeDialog} />
      </Dialog>
    </>
  );
};

export default CategoryEditorDialog;
