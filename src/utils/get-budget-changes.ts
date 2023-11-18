//* Types
import { AppBudgetMetaData, BudgetFormData } from "../types/AppTypes";

const getChangedBudgetData = (originalBudgetData: AppBudgetMetaData, newBudgetData: BudgetFormData): Partial<BudgetFormData> => {
  let updatedData: Partial<BudgetFormData> = {};
  Object.keys(newBudgetData).forEach((key) => {
    const keyOfBudgetFormData = key as keyof BudgetFormData;
    const newField = newBudgetData[keyOfBudgetFormData];
    const originalField = originalBudgetData[keyOfBudgetFormData];
    const isFieldsArrayOfString =
      Array.isArray(newField) &&
      newField.every((item) => typeof item === "string") &&
      Array.isArray(originalField) &&
      originalField.every((item) => typeof item === "string");

    if (isFieldsArrayOfString) {
      const newArray = newField as string[];
      const originalArray = originalField as string[];
      if (newArray.length !== originalArray.length || !newArray.every((value, index) => value === originalArray[index])) {
        updatedData = { ...updatedData, [keyOfBudgetFormData]: newField };
      }
    } else if (newField !== originalField) {
      updatedData = { ...updatedData, [keyOfBudgetFormData]: newField };
    }
    if (newField !== originalField) {
    }
  });
  return updatedData;
};

export default getChangedBudgetData;
