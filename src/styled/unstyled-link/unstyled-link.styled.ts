import { styled } from "@mui/material";
import { Link } from "react-router-dom";

const UnstyledLink = styled(Link)`
  color: inherit ;
  text-decoration: inherit;
  -webkit-tap-highlight-color: transparent;
`;

export default UnstyledLink;
