import * as React from "react";
//* Constant
import { VALIDATED_ICON_MAPPING } from "../../constants/constants";
//* MUI
import { ImageNotSupported } from "@mui/icons-material";
import { SvgIconProps } from "@mui/material";

interface BudgetIconProps extends SvgIconProps {
  iconName: string;
}

const BudgetIcon: React.FC<BudgetIconProps> = ({ iconName, color, ...props }) => {
  const Icon = VALIDATED_ICON_MAPPING[iconName || "none"];
  const iconColor: SvgIconProps["color"] = Icon ? color || "inherit" : "disabled";

  const IconComponent: React.ElementType = Icon || ImageNotSupported;
  return <IconComponent color={iconColor} {...props} />;
};

export default BudgetIcon;
