import * as React from 'react';
//! MUI & styles
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { useMediaQuery, useTheme } from '@mui/material';
//! PAGES
import { navLinks } from '../nav-pages';
import { CustomLink } from '../../../styled/custom-link/custom-link.styled';

const drawerWidth = [240, 60];

interface Props {
  drawerOpen: boolean;
  handleDrawerToggle: () => void;
  temporaryDrawerOpen: boolean;
  handleTemporaryDrawerToggle: () => void;
}

export const ExtendableNavBar: React.FC<Props> = (props: Props)=> {
  const { drawerOpen, handleDrawerToggle } = props;
  const { temporaryDrawerOpen, handleTemporaryDrawerToggle } = props;

  const theme = useTheme();  
  const isLargeScreen = useMediaQuery(theme.breakpoints.up('lg'));
  
  
  const drawer: JSX.Element = (
      <>
        <Toolbar />
        <Divider />
        <List>
          {navLinks.map((item) => (
            <CustomLink to={item.path ?? "#"} key={item.label} >
              <ListItem disablePadding >
                <ListItemButton>
                  <ListItemIcon>
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText primary={item.label} />
                </ListItemButton>
              </ListItem>
            </CustomLink>
          ))}
        </List>
      </>
    )
  
  return(
    <Box
      component="nav"
      sx={{display: { xs: 'none', sm: 'block' }}}
    >
        <Drawer
            variant="permanent"
            anchor="left"
            sx={{
              width: drawerWidth[isLargeScreen? Number(!drawerOpen) : 1],
              flexShrink: 0,
              [`& .MuiDrawer-paper`]: { width: drawerWidth[isLargeScreen? Number(!drawerOpen) : 1], boxSizing: 'border-box'},
            }}
          >
          {drawer}
        </Drawer>
      <Drawer
      //TODO: make drawer close on button click
          variant="temporary"
          open={temporaryDrawerOpen}
          onClose={handleTemporaryDrawerToggle}
          ModalProps={{keepMounted: true}}
          sx={{
            display: {xs: 'none', sm : 'block', lg: 'none'},
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth[0] },
          }}
        >
        {drawer}
      </Drawer>
    </Box>
  )
}