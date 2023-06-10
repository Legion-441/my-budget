import * as React from 'react';
import { Groups, Person, Surfing } from "@mui/icons-material";

export const iconMapping: { [key: string]: React.ElementType } = {
  Person: Person,
  Groups: Groups,
  Surfing: Surfing,
};

export const getIconComponent = (icon: string): React.ReactNode => {
  const IconComponent = iconMapping[icon];
  if (IconComponent) {
    return <IconComponent fontSize="small" />;
  }
  return null;
}