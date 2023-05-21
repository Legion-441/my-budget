import * as React from 'react';
import { Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, Typography } from '@mui/material';
import { budgetsListPlaceholder } from '../budgets-list-placeholder/budgets-list-placeholder';
import { useNavigate } from 'react-router-dom';

interface BudgetsDrawerProps {
  isBudgetDrawerOpen: boolean
  handleBudgetDrawerToggle: () => void
}

const BudgetsDrawer: React.FC<BudgetsDrawerProps> = (props) => {
  const { isBudgetDrawerOpen, handleBudgetDrawerToggle } = props
  const navigate = useNavigate();

  const budgetList: JSX.Element = (
    <>
      <Toolbar />
      <List component="div">
        {budgetsListPlaceholder.map((item) => (
          <ListItem key={item.id} disablePadding>
            <ListItemButton sx={{ pl: 4 }} onClick={() => {
              navigate(`/budget/${item.id}/dash`);
              handleBudgetDrawerToggle();
            }}>
              <ListItemIcon>
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={
                <Typography variant="body1">
                  {item.name}
                </Typography>
              } />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </>
  );

  return (
    <Drawer
      sx={{
        display: { xs: 'inherit', sm: 'none' },
        pb: 7 
      }}
      anchor={'top'}
      open={isBudgetDrawerOpen}
      onClose={handleBudgetDrawerToggle}
    >
      {budgetList}
    </Drawer>
  );
}

export default BudgetsDrawer;