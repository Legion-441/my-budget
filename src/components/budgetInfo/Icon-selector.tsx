import * as React from "react";
import { useState } from "react";
//* Constants
import { VALIDATED_ICON_MAPPING } from "../../constants/constants";
//* MUI
import { Box, Divider, Grid, InputAdornment, ListItemIcon, ListItemText, Menu, MenuItem, TextField } from "@mui/material";
import { ArrowDropDown, ArrowDropUp } from "@mui/icons-material";
//* Components
import BudgetIconComponent from "../budgetInfo/budget-icon";
//* Types
import { BudgetIconName } from "../../types/AppTypes";

interface IconSelectorProps {
  value: BudgetIconName;
  onChange: (newIcon: BudgetIconName) => void;
}

const IconSelector: React.FC<IconSelectorProps> = ({ value, onChange }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const isOpen = Boolean(anchorEl);
  const iconKeys = Object.keys(VALIDATED_ICON_MAPPING);

  const handleClick = (event: { currentTarget: React.SetStateAction<any> }) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (option: React.SetStateAction<any>) => {
    setAnchorEl(null);
    onChange(option);
  };

  return (
    <>
      <TextField
        id="icon-input"
        label="Ikona"
        value={value}
        onClick={handleClick}
        margin="normal"
        InputProps={{
          startAdornment: <BudgetIconComponent iconName={value} />,
          endAdornment: <InputAdornment position="end">{isOpen ? <ArrowDropUp /> : <ArrowDropDown />}</InputAdornment>,
          readOnly: true,
          style: { cursor: "pointer" },
          inputProps: { style: { width: "0" } },
        }}
        sx={{ minWidth: "fit-content" }}
      />
      <Menu anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={() => handleClose(value)}>
        <Grid container spacing={1} justifyContent="flex-start" maxWidth={192}>
          <Grid item xs={12}>
            <MenuItem onClick={() => handleClose("none")} selected={value === "none"}>
              <Box display={"flex"} marginX={"auto"}>
                <ListItemIcon>
                  <BudgetIconComponent iconName={"none"} />
                </ListItemIcon>
                <ListItemText>Brak</ListItemText>
              </Box>
            </MenuItem>
            <Divider />
          </Grid>
          {iconKeys.map((iconKey) => (
            <Grid key={iconKey} item xs={4}>
              <MenuItem selected={value === iconKey} onClick={() => handleClose(iconKey)}>
                <BudgetIconComponent iconName={iconKey} />
              </MenuItem>
            </Grid>
          ))}
        </Grid>
      </Menu>
    </>
  );
};

export default IconSelector;
