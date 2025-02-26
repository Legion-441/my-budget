import { useState, useEffect } from "react";
//* MUI
import { Box, Button, IconButton, Menu, Stack, Typography, useTheme } from "@mui/material";
import { ChevronLeft, ChevronRight, PaletteTwoTone } from "@mui/icons-material";
//* Styled Components
import ColorHueSlider from "../../styled/color-hue-slider.ts/color-hue-slider.styled";
//* Components
import { Category } from "../../types/AppTypes";

interface CategoryColorSelectorProps {
  category: Category;
  onChange: (color: number) => void;
}

const CategoryColorSelector: React.FC<CategoryColorSelectorProps> = ({ category, onChange }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [hueValue, setHueValue] = useState<number>(category.color);
  const theme = useTheme();
  const bgColor = `hsl(${hueValue}, 80%, ${theme.palette.mode === "light" ? "50%" : "60%"})`;

  useEffect(() => {
    setHueValue(category.color);
  }, [category.color]);

  const handleMenuOpen = (event: { currentTarget: React.SetStateAction<any> }) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setHueValue(category.color);
  };

  const handleChange = (_: Event, newValue: number | number[]) => {
    setHueValue(newValue as number);
  };

  const handleConfirm = () => {
    setAnchorEl(null);
    onChange(hueValue);
  };

  const incrementHueValue = () => {
    setHueValue((prevValue) => (prevValue + 1) % 360);
  };

  const decrementHueValue = () => {
    setHueValue((prevValue) => (prevValue > 0 ? (prevValue - 1) % 360 : 359));
  };

  return (
    <>
      <IconButton size="small" onClick={handleMenuOpen} disabled={category.hidden}>
        <PaletteTwoTone
          sx={{ color: `hsl(${category.color}, ${category.hidden ? "0%" : "100%"}, ${theme.palette.mode === "light" ? "40%" : "60%"})` }}
          fontSize="medium"
        />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        sx={{
          "& .MuiPaper-root": {
            "& .MuiMenu-list": {
              width: 250,
              display: "flex",
              flexDirection: "column",
              padding: 1,
              gap: 1,
            },
          },
        }}
      >
        <Box
          borderRadius={1}
          sx={{ backgroundColor: bgColor }}
          height={"3rem"}
          color={theme.palette.getContrastText(bgColor)}
          display="flex"
          alignItems="center"
          justifyContent="space-evenly"
        >
          <IconButton color="inherit" onClick={decrementHueValue}>
            <ChevronLeft />
          </IconButton>
          <Typography variant="body1" width={"2rem"} align="center">
            {hueValue}
          </Typography>
          <IconButton color="inherit" onClick={incrementHueValue}>
            <ChevronRight />
          </IconButton>
        </Box>
        <Stack direction="row">
          <ColorHueSlider
            value={hueValue}
            track={false}
            onChange={handleChange}
            aria-label="Odcień"
            aria-valuetext={`${hueValue}°`}
            defaultValue={hueValue}
            step={5}
            min={0}
            max={359}
          />
        </Stack>
        <Button variant="outlined" onClick={handleMenuClose}>
          Anuluj
        </Button>
        <Button variant="contained" onClick={handleConfirm}>
          Potwierdź
        </Button>
      </Menu>
    </>
  );
};

export default CategoryColorSelector;
