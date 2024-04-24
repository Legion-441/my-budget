import { Slider, styled } from "@mui/material";

const colorGradient = new Array(37)
  .fill(0)
  .map((_, index) => `hsl(${index * 10}, 80%, 60%)`)
  .join(", ");

const ColorHueSlider = styled(Slider)(({ theme, value }) => ({
  maxWidth: `calc(100% - ${theme.spacing(6)})`,
  marginInline: theme.spacing(3),
  marginBlock: theme.spacing(1),
  color: theme.palette.background.default,
  "& .MuiSlider-rail": {
    background: `linear-gradient(to right, ${colorGradient})`,
    opacity: 1,
    height: 6,
    border: `1px inset #${theme.palette.mode === "light" ? "000000" : "FFFFFF"}33`,
  },
  "& .MuiSlider-thumb": {
    border: `1px outset #00000011`,
    backgroundColor: `hsl(${value}, 80%, ${theme.palette.mode === "light" ? "50%" : "60%"})`,
  },
}));

export default ColorHueSlider;
