import * as React from "react";
//* MUI & Icons
import { Dialog, useMediaQuery, useTheme } from "@mui/material";
//* Components
import CreateOrEditBudgetDialog from "./budget-create-or-edit-dialog";
import ArchiveBudgetDialog from "./budget-archive-dialog";
import DeleteBudgetDialog from "./budget-delete-dialog";
import LeaveBudgetDialog from "./budget-leave-dialog";
//* Types
import { AppBudgetMetaData, BudgetActions } from "../../types/AppTypes";

interface BudgetCardMenuProps {
  budget: AppBudgetMetaData;
  type: BudgetActions | null;
  handleClose: () => void;
}

const BudgetActionDialog: React.FC<BudgetCardMenuProps> = ({ budget, type, handleClose }) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const RenderDialog = () => {
    switch (type) {
      case "edit":
        return <CreateOrEditBudgetDialog budget={budget} onClose={handleClose} />;
      case "archive":
        return <ArchiveBudgetDialog budget={budget} onClose={handleClose} />;
      case "delete":
        return <DeleteBudgetDialog budget={budget} onClose={handleClose} />;
      case "leave":
        return <LeaveBudgetDialog budget={budget} onClose={handleClose} />;
      default:
        return null;
    }
  };

  return (
    <Dialog onClose={handleClose} open={Boolean(type)} fullScreen={fullScreen}>
      <RenderDialog />
    </Dialog>
  );
};

export default BudgetActionDialog;
