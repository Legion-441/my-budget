import * as React from 'react';
import { Groups, ImageNotSupported, Person, Surfing } from "@mui/icons-material";

type BudgetIcon = "Person" | "Groups" | "Surfing"

const iconMapping: Record<BudgetIcon, React.ElementType> = {
  "Person": Person,
  "Groups": Groups,
  "Surfing": Surfing,
};

export const getIconComponent = (icon: string): React.ReactNode => {
  const IconComponent: React.ElementType = iconMapping[icon as BudgetIcon] || ImageNotSupported;
  return <IconComponent fontSize="small" />;
}