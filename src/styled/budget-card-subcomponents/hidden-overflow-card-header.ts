//* MUI
import { CardHeader, styled } from "@mui/material";

const HiddenOverflowCardHeader = styled(CardHeader)({
  "& .MuiCardHeader-content": {
    overflow: "hidden",
  },
  paddingBottom: 0,
  "& .MuiCardHeader-title": {
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },
});

export default HiddenOverflowCardHeader;
