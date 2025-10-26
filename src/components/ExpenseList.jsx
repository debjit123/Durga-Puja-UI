import React, { useState } from "react";
import { TablePagination, Button } from "@mui/material";
import * as XLSX from "xlsx";

function ExpenseList({ expenses }) {
  const [page, setPage] = useState(0); // Current page
  const [rowsPerPage, setRowsPerPage] = useState(5); // Rows per page
  const [filters, setFilters] = useState({
    createUser: "",
    expenseType: "",
    startDate: "",
    endDate: "",
  });

  const styles = {
    container: {
      maxWidth: "900px",
      margin: "20px auto",
      padding: "20px",
      border: "1px solid #ccc",
      borderRadius: "8px",
      backgroundColor: "#f9f9f9",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    },
    title: {
      textAlign: "center",
      fontSize: "1.5rem",
      marginBottom: "20px",
      color: "#333",
    },
    form: {
      display: "flex",
      gap: "10px",
      marginBottom: "20px",
      flexWrap: "wrap",
    },
    input: {
      padding: "10px",
      fontSize: "1rem",
      border: "1px solid #ccc",
      borderRadius: "4px",
    },
    table: {
      width: "100%",
      borderCollapse: "collapse",
    },
    th: {
      backgroundColor: "#007bff",
      color: "#fff",
      padding: "10px",
      textAlign: "left",
      borderBottom: "2px solid #ddd",
    },
    td: {
      padding: "10px",
      borderBottom: "1px solid #ddd",
      textAlign: "left",
    },
    noExpenses: {
      textAlign: "center",
      color: "#555",
      fontSize: "1rem",
      marginTop: "20px",
    },
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // Reset to the first page
  };

  const formatDateTime = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      dateStyle: "medium",
      timeStyle: "short",
    }).format(date);
  };

  const filteredExpenses = expenses.filter((expense) => {
    const matchesCreateUser =
      !filters.createUser ||
      expense.createUser
        ?.toLowerCase()
        .includes(filters.createUser.toLowerCase());
    const matchesExpenseType =
      !filters.expenseType || expense.expenseType === filters.expenseType;
    const matchesStartDate =
      !filters.startDate ||
      new Date(expense.purchaseDate) >= new Date(filters.startDate);
    const matchesEndDate =
      !filters.endDate ||
      new Date(expense.purchaseDate) <= new Date(filters.endDate);

    return (
      matchesCreateUser &&
      matchesExpenseType &&
      matchesStartDate &&
      matchesEndDate
    );
  });

  const paginatedExpenses = filteredExpenses.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  // Export to Excel
  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(filteredExpenses);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Expenses");
    XLSX.writeFile(workbook, "expenses.xlsx");
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>All Expenses</h2>

      {/* Advanced Search Form */}
      <form style={styles.form}>
        <input
          type="text"
          placeholder="Search by Create User"
          value={filters.createUser}
          onChange={(e) =>
            setFilters({ ...filters, createUser: e.target.value })
          }
          style={styles.input}
        />
        <select
          value={filters.expenseType}
          onChange={(e) =>
            setFilters({ ...filters, expenseType: e.target.value })
          }
          style={styles.input}
        >
          <option value="">All Expense Types</option>
          <option value="Pooja Purpose">Pooja Purpose</option>
          <option value="Binodon">Binodon</option>
        </select>
        <input
          type="date"
          placeholder="Start Date"
          value={filters.startDate}
          onChange={(e) =>
            setFilters({ ...filters, startDate: e.target.value })
          }
          style={styles.input}
        />
        <input
          type="date"
          placeholder="End Date"
          value={filters.endDate}
          onChange={(e) => setFilters({ ...filters, endDate: e.target.value })}
          style={styles.input}
        />
        <button
          type="button"
          onClick={() =>
            setFilters({
              createUser: "",
              expenseType: "",
              startDate: "",
              endDate: "",
            })
          }
          style={{
            padding: "10px 15px",
            fontSize: "1rem",
            color: "#fff",
            backgroundColor: "#007bff",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            transition: "background-color 0.3s ease",
          }}
        >
          Reset
        </button>
      </form>

      {/* Export Button */}
      <Button
        variant="contained"
        color="primary"
        onClick={exportToExcel}
        sx={{ marginBottom: "20px" }}
      >
        Export to Excel
      </Button>

      {filteredExpenses.length > 0 ? (
        <>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Expense Type</th>
                <th style={styles.th}>Amount</th>
                <th style={styles.th}>Item Name</th>
                <th style={styles.th}>Create User</th>
                <th style={styles.th}>Created Date</th>
              </tr>
            </thead>
            <tbody>
              {paginatedExpenses.map((expense, index) => (
                <tr key={index}>
                  <td style={styles.td}>{expense.expenseType}</td>
                  <td style={styles.td}>₹{expense.expenseAmount}</td>
                  <td style={styles.td}>{expense.expenseItem}</td>
                  <td style={styles.td}>{expense.createUser || "N/A"}</td>
                  <td style={styles.td}>
                    {formatDateTime(expense.purchaseDate)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {/* Pagination */}
          <TablePagination
            component="div"
            count={filteredExpenses.length} // Total number of rows
            page={page} // Current page
            onPageChange={handleChangePage} // Handle page change
            rowsPerPage={rowsPerPage} // Rows per page
            onRowsPerPageChange={handleChangeRowsPerPage} // Handle rows per page change
            rowsPerPageOptions={[5, 10, 15]} // Options for rows per page
          />
        </>
      ) : (
        <p style={styles.noExpenses}>No expenses match your search criteria.</p>
      )}
    </div>
  );
}

export default ExpenseList;
