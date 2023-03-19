import * as React from "react";
//! MUI
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { useMediaQuery, useTheme } from "@mui/material";
import Typography from "@mui/material/Typography";
import Collapse from '@mui/material/Collapse';
//! Icons
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import BrokenImageIcon from '@mui/icons-material/BrokenImage';
//!
import { navLinks } from "../nav-pages";
import { BudgetsListItem, budgetsListPlaceholder } from "../../budgets-list-placeholder/budgets-list-placeholder";
import { useNavigate } from "react-router-dom";
import Icon from "@mui/material/Icon";
//! Test

const drawerWidth = [240, 80];

interface Props {
  drawerOpen: boolean;
  handleDrawerToggle: () => void;
  temporaryDrawerOpen: boolean;
  handleTemporaryDrawerToggle: () => void;
  budgetId: string | undefined
}

export const ExtendableNavBar: React.FC<Props> = (props: Props) => {
  const { drawerOpen, handleDrawerToggle } = props;
  const { temporaryDrawerOpen, handleTemporaryDrawerToggle } = props;
  const { budgetId } = props;
  const [listOpen, setListOpen] = React.useState(false);
    
  const navigate = useNavigate();

  const handleListClick = () => {
    setListOpen(!listOpen);
  };
  
  const theme = useTheme();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up("lg"));

  const selectedBudget = budgetsListPlaceholder.find((budget) => budget.id === budgetId)

  const budgetList: JSX.Element = (
    <>
      <ListItemButton onClick={handleListClick}>
        <ListItemIcon>
          <Icon style={{color: 'orange'}}>
            {selectedBudget ? selectedBudget.icon : <BrokenImageIcon /> }
          </Icon>
        </ListItemIcon>
        <ListItemText primary={
          <Typography variant="body1" style={{ fontSize: drawerOpen ? "16px" : "12px" }}>
            {selectedBudget ? selectedBudget.name : "Not found" }
          </Typography>
        } />
        {listOpen ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={listOpen} timeout="auto" unmountOnExit>
        <List component="div" disablePadding dense={true} >
          {budgetsListPlaceholder.map((item) => (
            <ListItemButton sx={{ pl: 4 }} key={item.id} onClick={() => navigate(`/budget/${item.id}/dash`)}>
              <ListItemIcon>
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={
                <Typography variant="body1" style={{ fontSize: drawerOpen ? "16px" : "12px" }}>
                  {item.name}
                </Typography>
              } />
            </ListItemButton>
          ))}
        </List>
      </Collapse>
    </>
  );

  const drawer: JSX.Element = (
    <>
      <Toolbar />
      <List component="nav" >
        {budgetList}
        <Divider />
        {budgetId ?
          navLinks.map((item) => (
            <ListItem disablePadding key={item.label} onClick={() => navigate(item.path ? `/budget/${budgetId}${item.path}` : "#")}>
              <ListItemButton>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText
                    primary={
                      <Typography variant="body1" style={{ fontSize: drawerOpen ? "16px" : "12px" }}>
                        {item.label}
                      </Typography>
                    }
                  />
              </ListItemButton>
            </ListItem>
        )) : null}
      </List>
    </>
  );

  return (
    <Box component="nav" sx={{ display: { xs: "none", sm: "block" } }}>
      <Drawer
        variant="permanent"
        anchor="left"
        sx={{
          width: drawerWidth[isLargeScreen ? Number(!drawerOpen) : 1],
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth[isLargeScreen ? Number(!drawerOpen) : 1],
            boxSizing: "border-box",
          },
        }}
      >
        {drawer}
      </Drawer>
      <Drawer
        //TODO: make drawer close on button click
        variant="temporary"
        open={temporaryDrawerOpen}
        onClose={handleTemporaryDrawerToggle}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: "none", sm: "block", lg: "none" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: drawerWidth[0],
          },
        }}
      >
        {drawer}
      </Drawer>
    </Box>
  );
};
