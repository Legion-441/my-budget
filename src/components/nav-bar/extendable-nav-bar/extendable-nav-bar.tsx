import * as React from 'react';
import { Link } from 'react-router-dom';

import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
//! PAGES
import { pages } from '../nav-pages';
//! ICONS
import InboxIcon from '@mui/icons-material/MoveToInbox';
import { CustomLink } from '../../../styled/custom-link/custom-link.styled';



const drawerWidth = [240, 60];

interface Props {
  drawerOpen: boolean;
  handleDrawerToggle: () => void;
}

export const ExtendableNavBar: React.FC<Props> = (props: Props) => {
  const { drawerOpen, handleDrawerToggle } = props;

  return(
    <Drawer
        variant="permanent"
        sx={{
          display: { xs: 'none', sm: 'inherit' },
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth[Number(drawerOpen)], boxSizing: 'border-box' },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto' }}>
          <List>
            {['Inbox'].map((text) => (
              <ListItem key={text} disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <InboxIcon />
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <Divider />
          <List>
            {pages.map((item) => (
              <CustomLink to={item.path}>
                <ListItem key={item.label} disablePadding >
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
        </Box>
      </Drawer>
  )
}