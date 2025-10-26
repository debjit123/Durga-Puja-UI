import { useState, useEffect } from "react";

function AddExpense({ addExpense }) {
  const [expenseType, setExpenseType] = useState("");
  const [expenseAmount, setExpenseAmount] = useState("");
  const [expenseItem, setExpenseItem] = useState("");
  const [snackbar, setSnackbar] = useState({ visible: false, message: "" });
  const [isAdmin, setIsAdmin] = useState(false); // State to track if the user is an Admin

  useEffect(() => {
    // Simulate fetching user role from a token or API
    const token = localStorage.getItem("authToken");
    if (token) {
      const payload = JSON.parse(atob(token.split(".")[1])); // Decode JWT payload
      console.log("Decoded Payload:", payload); // Debugging line
      // Check if the user has Admin authority
      setIsAdmin(
        payload.authorities && payload.authorities.includes("ROLE_ADMIN")
      );
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (expenseAmount && expenseType && expenseItem) {
      const expense = {
        expenseType,
        expenseAmount: parseFloat(expenseAmount),
        expenseItem,
      };

      try {
        const token = localStorage.getItem("authToken");
        console.log("Token:", token); // Debugging line
        const response = await fetch("/expense/add-expense", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(expense),
        });

        if (response.ok) {
          const savedExpense = await response.json();
          addExpense(savedExpense);

          // Show success snackbar
          setSnackbar({
            visible: true,
            message: "Expense successfully added!",
          });
          console.log("Snackbar state:", snackbar);
          // Reset form values
          setExpenseType("");
          setExpenseAmount("");
          setExpenseItem("");

          // Hide snackbar after 3 seconds
          setTimeout(() => setSnackbar({ visible: false, message: "" }), 3000);
        } else {
          const errorText = await response.text();
          console.error(
            "Failed to save expense: " + response.status,
            errorText
          );
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

  // Inline styles
  const styles = {
    container: {
      //maxWidth: "900px !important", // Increased width
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
      flexDirection: "column",
      gap: "15px",
    },
    formGroup: {
      display: "flex",
      flexDirection: "column",
    },
    label: {
      fontSize: "1rem",
      marginBottom: "5px",
      color: "#555",
    },
    input: {
      padding: "10px",
      fontSize: "1rem",
      border: "1px solid #ccc",
      borderRadius: "4px",
    },
    button: {
      padding: "10px 15px",
      fontSize: "1rem",
      color: "#fff",
      backgroundColor: "#007bff",
      border: "none",
      borderRadius: "4px",
      cursor: "pointer",
      transition: "background-color 0.3s ease",
    },
    buttonHover: {
      backgroundColor: "#0056b3",
    },
    snackbar: {
      position: "fixed",
      bottom: "50px",
      left: "50%",
      transform: "translateX(-50%)",
      backgroundColor: "#4caf50",
      color: "#fff",
      padding: "10px 20px",
      borderRadius: "4px",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
      zIndex: 1000,
    },
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Add New Expense</h2>
      {isAdmin ? (
        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.formGroup}>
            <label style={styles.label}>Expense Type:</label>
            <select
              value={expenseType}
              onChange={(e) => setExpenseType(e.target.value)}
              style={styles.input} // Reuse the input styles for consistency
            >
              <option value="" disabled>
                Select expense type
              </option>
              <option value="Pooja Purpose">Pooja Purpose</option>
              <option value="Binodon">Binodon</option>
            </select>
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Expense Amount:</label>
            <input
              type="number"
              placeholder="Enter amount"
              value={expenseAmount}
              onChange={(e) => setExpenseAmount(e.target.value)}
              style={styles.input}
            />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Expense Item:</label>
            <input
              type="text"
              placeholder="Enter item description"
              value={expenseItem}
              onChange={(e) => setExpenseItem(e.target.value)}
              style={styles.input}
            />
          </div>
          <button
            type="submit"
            style={styles.button}
            onMouseOver={(e) =>
              (e.target.style.backgroundColor =
                styles.buttonHover.backgroundColor)
            }
            onMouseOut={(e) =>
              (e.target.style.backgroundColor = styles.button.backgroundColor)
            }
          >
            Add Expense
          </button>
        </form>
      ) : (
        <p style={{ textAlign: "center", color: "#555" }}>
          You do not have permission to add expenses.
        </p>
      )}

      {/* Snackbar */}
      {snackbar.visible && (
        <div style={styles.snackbar}>{snackbar.message}</div>
      )}
    </div>
  );
}

export default AddExpense;
