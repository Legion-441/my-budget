//* Constants
import { VALIDATED_ICON_MAPPING } from "../../constants/constants";
//* MUI
import { Box, ToggleButton, Typography } from "@mui/material";
//* Styled Components
import StyledToggleButtonGroup from "../../styled/custom-toggle-button-group/custom-toggle-button-group.styled";
//* Types
import { BudgetIcon } from "../../types/AppTypes";

interface IconSelectorProps {
  value: BudgetIcon;
  onChange: (newIcon: BudgetIcon) => void;
}

const IconSelector = (props: IconSelectorProps) => {
  const { value, onChange } = props;

  const iconKeys = Object.keys(VALIDATED_ICON_MAPPING);

  const handleChange = (event: React.MouseEvent<HTMLElement>, newIcon: BudgetIcon | null) => {
    if (newIcon !== null) {
      onChange(newIcon);
    }
  };

  return (
    <>
      <Typography>Ikona:</Typography>
      <StyledToggleButtonGroup
        value={value}
        onChange={handleChange}
        exclusive
        style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}
        aria-label="Budget icon"
      >
        {iconKeys.map((iconKey) => {
          const IconComponent = VALIDATED_ICON_MAPPING[iconKey];
          return (
            <ToggleButton key={iconKey} value={iconKey} aria-label={iconKey}>
              <IconComponent />
            </ToggleButton>
          );
        })}
      </StyledToggleButtonGroup>
    </>
  );
};

export default IconSelector;
