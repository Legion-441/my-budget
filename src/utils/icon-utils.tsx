import * as React from "react";
//* MUI & Icons
import {
  Cottage,
  DirectionsCar,
  Fastfood,
  Groups,
  ImageNotSupported,
  Kayaking,
  Luggage,
  Person,
  Sailing,
  School,
  SportsBasketball,
  TwoWheeler,
  Work,
} from "@mui/icons-material";

export const iconComponentDictionary = {
  Person: Person,
  Cottage: Cottage,
  School: School,
  Luggage: Luggage,
  Groups: Groups,
  Work: Work,
  DirectionsCar: DirectionsCar,
  TwoWheeler: TwoWheeler,
  Fastfood: Fastfood,
  SportsBasketball: SportsBasketball,
  Kayaking: Kayaking,
  Sailing: Sailing,
} as const;

type IconMapping = Record<string, React.ElementType>;
export const validatedIconMapping: IconMapping = iconComponentDictionary;

export const getIconComponent = (iconName: string | null): React.ReactNode => {
  const Icon = validatedIconMapping[iconName || "None"];
  const iconColor = Icon ? "inherit" : "disabled";

  const IconComponent: React.ElementType = Icon || ImageNotSupported;
  return <IconComponent color={iconColor} fontSize="small" />;
};
