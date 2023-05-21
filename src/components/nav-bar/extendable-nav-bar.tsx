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
import { navLinks } from "./nav-pages";
import { budgetsListPlaceholder } from "../budgets-list-placeholder/budgets-list-placeholder";
import { useNavigate } from "react-router-dom";
import Icon from "@mui/material/Icon";
import { DarkModeSwitch } from "./darkModeSwitch";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { selectIsDrawerOpen, selectIsTempDrawerOpen, toggleTempDrawer } from "../../slices/app/app.slice";

// TODO: Implement temporary drawer toggle on screen size change.

const drawerWidth = [240, 60];

interface ExtNavBarProps {
  budgetId: string | undefined
  selectedSubPage: number | undefined
}

export const ExtendableNavBar: React.FC<ExtNavBarProps> = (props: ExtNavBarProps) => {
  const dispatch = useAppDispatch()
  const isDrawerOpen = useAppSelector(selectIsDrawerOpen)
  const isTempDrawerOpen = useAppSelector(selectIsTempDrawerOpen)
  const { budgetId } = props;
  const { selectedSubPage } = props;
  const [listOpen, setListOpen] = React.useState(false);
    
  const navigate = useNavigate();

  const handleListClick = () => {
    setListOpen(!listOpen);
  };
  
  const theme = useTheme();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up("lg"));
  const drawerFontSize = isLargeScreen ? (isDrawerOpen ? "16px" : "12px") : (isTempDrawerOpen ? "16px" : "12px")

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
          <Typography variant="body1" style={{ fontSize: drawerFontSize}}>
            {selectedBudget ? selectedBudget.name : "Not selected" }
          </Typography>
        } />
        {listOpen ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={listOpen} timeout="auto" unmountOnExit>
        <List component="div" disablePadding dense={true} >
          {budgetsListPlaceholder.map((item) => (
            <ListItemButton sx={{ pl: 4 }} key={item.id} onClick={() => {
              navigate(`/budget/${item.id}/dash`);
              setListOpen(false);
              isTempDrawerOpen && dispatch(toggleTempDrawer());
            }}>
              <ListItemIcon>
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={
                <Typography variant="body1" style={{ fontSize: drawerFontSize }}>
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
          navLinks.map((item, index) => (
            <ListItem disablePadding key={item.label} onClick={() => {
              navigate(item.subPath ? `/budget/${budgetId}/${item.subPath}` : "#");
              isTempDrawerOpen && dispatch(toggleTempDrawer())
            }}>
              <ListItemButton
                selected={selectedSubPage === index}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText
                    primary={
                      <Typography variant="body1" style={{ fontSize: drawerFontSize }}>
                        {item.label}
                      </Typography>
                    }
                  />
              </ListItemButton>
            </ListItem>
        )) : null}
      </List>
      <DarkModeSwitch/>
    </>
  );

  return (
    <Box component="nav" sx={{ display: { xs: "none", sm: "block" } }}>
      <Drawer
        PaperProps={{ elevation: 3 }}
        variant="permanent"
        anchor="left"
        sx={{
          width: drawerWidth[isLargeScreen ? Number(!isDrawerOpen) : 1],
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth[isLargeScreen ? Number(!isDrawerOpen) : 1],
            boxSizing: "border-box",
          },
        }}
      >
        {drawer}
      </Drawer>
      <Drawer
        PaperProps={{ elevation: 3 }}
        variant="temporary"
        open={isTempDrawerOpen}
        onClose={() => {dispatch(toggleTempDrawer())}}
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