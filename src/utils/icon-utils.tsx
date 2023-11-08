import * as React from "react";
//* Constant
import { ICON_COMPONENT_DICTIONARY } from "../constants/constants";
//* MUI icons
import { ImageNotSupported } from "@mui/icons-material";

type IconMapping = Record<string, React.ElementType>;
export const validatedIconMapping: IconMapping = ICON_COMPONENT_DICTIONARY;

export const getIconComponent = (iconName: string | null): React.ReactNode => {
  const Icon = validatedIconMapping[iconName || "none"];
  const iconColor = Icon ? "inherit" : "disabled";

  const IconComponent: React.ElementType = Icon || ImageNotSupported;
  return <IconComponent color={iconColor} fontSize="small" />;
};
