import * as React from 'react';
import { Box, Collapse, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, useMediaQuery, useTheme } from "@mui/material";
import PaperCard from '../../styled/paper-card/paper-card.styled';
import { KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material';


function createData(
  // date: string,
  name: string,
  category: string,
  subcategory: string,
  price: number,
) {
  return {
    // date,
    name,
    category,
    subcategory,
    price,
    history: [
      {
        customerId: '11091700',
        amount: 3,
      },
      {
        customerId: 'Anonymous',
        amount: 1,
      },
    ],
  };
}

function Row(props: { row: ReturnType<typeof createData>, isSmallScreen: boolean }) {
  const { row, isSmallScreen } = props;
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
          </IconButton>
        </TableCell>
        {/* <TableCell component="th" scope="row">
          {row.date}
        </TableCell> */}
        <TableCell align="right">{row.name}</TableCell>
        {!isSmallScreen && (
          <>
        <TableCell align="right">{row.category}</TableCell>
        <TableCell align="right">{row.subcategory}</TableCell>
          </>
        )}
        <TableCell align="right">{row.price}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                History
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Customer</TableCell>
                    <TableCell align="right">Amount</TableCell>
                    <TableCell align="right">Total price ($)</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.history.map((historyRow) => (
                    <TableRow key={historyRow.customerId}>
                      <TableCell>{historyRow.customerId}</TableCell>
                      <TableCell align="right">{historyRow.amount}</TableCell>
                      <TableCell align="right">
                        {Math.round(historyRow.amount * row.price * 100) / 100}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

const rows = [
  createData('Sandwich', 'Grocery', 'Meal', 25.99),
  createData('Fuel', 'Transport', 'Car', 5.00),
  createData('Glass', 'Home', 'Dish', 18.99),
  createData('Chair', 'Home', 'Furniture', 6.99),
  createData('Sandwich', 'Grocery', 'Meal', 10.00),
  createData('Sandwich', 'Grocery', 'Meal', 21.50),
];

const HistoryView: React.FC  = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <PaperCard>
      <TableContainer>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell />
              {/* <TableCell>Date</TableCell> */}
              <TableCell align="right">Name</TableCell>
              {isSmallScreen ? null : (<>
                <TableCell align="right">Category</TableCell>
                <TableCell align="right">Subcategory</TableCell>
              </>
              )}
              <TableCell align="right">Price</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <Row key={row.name} row={row} isSmallScreen={isSmallScreen}/>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </PaperCard>
  );
}

export default HistoryView