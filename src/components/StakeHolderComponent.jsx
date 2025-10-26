import React from "react";
import {
  Paper,
  Typography,
  Button,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
} from "@mui/material";

function StakeHolderComponent({ stakeHolders, onGenerateExpense, isAdmin }) {
  return (
    <Paper
      elevation={3}
      sx={{
        padding: { xs: 2, sm: 3 },
        backgroundColor: "#ffffff",
        borderRadius: 2,
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        maxWidth: "900px",
        width: "100%",
      }}
    >
      <Typography variant="h6" sx={{ mb: 2 }}>
        Stake Holders Expense
      </Typography>
      {isAdmin && onGenerateExpense && (
        <Button
          variant="contained"
          color="secondary"
          sx={{ mb: 2 }}
          onClick={onGenerateExpense}
        >
          Generate Expense
        </Button>
      )}
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <b>Stake Holder Name</b>
              </TableCell>
              <TableCell>
                <b>Total Expense</b>
              </TableCell>
              <TableCell>
                <b>Binidon Expense</b>
              </TableCell>
              <TableCell>
                <b>Pooja Expense</b>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {stakeHolders.map((sh, idx) => (
              <TableRow key={idx}>
                <TableCell>{sh.stakeHolderName}</TableCell>
                <TableCell>{sh.stakeHolderExpenseTotal}</TableCell>
                <TableCell>{sh.stakeHolderExpenseOnBinodon}</TableCell>
                <TableCell>{sh.stakeHolderExpensePuja}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}

export default StakeHolderComponent;
