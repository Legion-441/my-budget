import { Alert, styled } from "@mui/material";

const StyledAlert = styled(Alert)`
  align-items: center;

.MuiAlert-icon {
  padding: 0;
}
.MuiAlert-message {
  padding: 0;
  text-transform: uppercase;
  font-size: 16px
}
.MuiAlert-action {
  padding: 0;
  margin-left: 7px;
}
`;

export default StyledAlert;