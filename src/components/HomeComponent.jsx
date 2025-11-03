import React, { useState, useEffect } from "react";
import { useNavigate} from "react-router-dom";
import AddExpense from "./AddExpense";
import ExpenseList from "./ExpenseList";
import { Box, Paper, Typography, AppBar, Toolbar, Button, Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import StakeHolderComponent from "./StakeHolderComponent";
import BillUpload from "./BillUpload";

// ...existing code...
function HomeComponent({ setToken }) {
  const [expenses, setExpenses] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false); // State to track if the user is an Admin
  const [showExpenses, setShowExpenses] = useState(false); // State to toggle expense list visibility
  const [showStakeHolder, setShowStakeHolder] = useState(false);
  const [stakeHolders, setStakeHolders] = useState([]);
  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false); // new state for logout confirmation
  const [showBillUpload, setShowBillUpload] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      const payload = JSON.parse(atob(token.split(".")[1])); // Decode JWT payload
      setIsAdmin(
        payload.authorities && payload.authorities.includes("ROLE_ADMIN")
      );
    }
  }, []);

  const handleLogout = () => {
    // open confirmation dialog instead of immediate logout
    setLogoutDialogOpen(true);
  };

  const handleConfirmLogout = () => {
    // perform actual logout
    localStorage.removeItem("authToken");
    if (setToken) setToken(null); // update App state so route guard triggers
    setLogoutDialogOpen(false);
    navigate("/auth", { replace: true });
  };

  const handleCancelLogout = () => {
    setLogoutDialogOpen(false);
  };

  const fetchExpenses = async () => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch("/expense/get-all-expenses", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setExpenses(data);
      } else {
        console.error("Failed to fetch expenses:", response.status);
      }
    } catch (error) {
      console.error("Error fetching expenses:", error);
    }
  };

  const addExpense = (expense) => {
    setExpenses((prevExpenses) => [...prevExpenses, expense]);
  };
  const fetchStakeHolders = async () => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch("/expense/generate-stakeholder-expense", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        console.log("Data:", data);
        setStakeHolders(data);
      } else {
        console.error("Failed to fetch stakeholders:", response.status);
      }
    } catch (error) {
      console.error("Error fetching stakeholders:", error);
    }
  };
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        backgroundColor: "#f5f5f5",
      }}
    >
      {/* Header */}
      <AppBar position="static" sx={{ backgroundColor: "#007bff" }}>
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Box
            component="img"
            src="/DurgaMaImage.jpg"
            alt="Durga Ma"
            sx={{
              height: { xs: 40, sm: 50 }, // Responsive height
              width: { xs: 40, sm: 50 }, // Responsive width
              borderRadius: "50%",
              marginRight: 2,
            }}
          />
          <Typography
            variant="h6"
            sx={{
              flexGrow: 1,
              fontWeight: "bold",
              fontSize: { xs: "1.2rem", sm: "1.5rem" }, // Responsive font size
              color: "#fff",
              textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
              fontFamily: "'Roboto', sans-serif",
            }}
          >
            Jadavpur Durga Puja Expense
          </Typography>
          <Button
            variant="text"
            sx={{
              color: "#fff",
              fontSize: "16px",
              padding: "8px 16px",
              borderRadius: "4px",
            }}
            onClick={handleLogout}
          >
            Logout
          </Button>
        </Toolbar>
      </AppBar>

      {/* Buttons */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          padding: 2,
          backgroundColor: "#e0e0e0",
          flexWrap: "wrap", // Allow wrapping for smaller screens
          gap: 2, // Add spacing between buttons
        }}
      >
        {isAdmin && (
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#007bff",
              color: "#fff",
              width: { xs: "100%", sm: "auto" }, // Full width on small screens
            }}
            onClick={() => {
              setShowExpenses(false);
              setShowStakeHolder(false); // <-- Add this line
              setShowBillUpload(false);
            }}
          >
            Add Expense
          </Button>
        )}
        <Button
          variant="contained"
          sx={{
            backgroundColor: "#28a745",
            color: "#fff",
            width: { xs: "100%", sm: "auto" },
          }}
          onClick={() => {
            setShowExpenses(true);
            setShowStakeHolder(false);
             setShowBillUpload(false);
            fetchExpenses();
          }}
        >
          Show All Expenses
        </Button>
        <Button
          variant="contained"
          sx={{
            backgroundColor: "#28a745",
            color: "#fff",
            width: { xs: "100%", sm: "auto" },
          }}
          onClick={() => {
            setShowStakeHolder(true);
            setShowExpenses(false);
             setShowBillUpload(false);
            fetchStakeHolders();
          }}
        >
          Stake Holder Expense
        </Button>
       <Button
  variant="contained"
  sx={{
    backgroundColor: "#dc3545",
    color: "#fff",
    width: { xs: "100%", sm: "auto" },
  }}
  onClick={() => {
    setShowBillUpload(true);
    setShowExpenses(false);
    setShowStakeHolder(false);
  }}
>
  Upload Bills
</Button>

  

      </Box>

      {/* Main Content */}
      
{/* Remove the Paper component that's currently after the Upload Bills button */}

{/* Main Content */}
<Box
  sx={{
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    padding: 3,
  }}
>
  {isAdmin && !showExpenses && !showStakeHolder && !showBillUpload && (
    <Paper
      elevation={3}
      sx={{
        padding: { xs: 2, sm: 3 },
        backgroundColor: "#ffffff",
        borderRadius: 2,
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        maxWidth: "900px",
        width: "100%",
        border: "10px solid #ccc",
      }}
    >
      <AddExpense addExpense={addExpense} />
    </Paper>
  )}
  {showExpenses && !showBillUpload && (
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
      <ExpenseList expenses={expenses} />
    </Paper>
  )}
  {showStakeHolder && !showBillUpload && (
    <StakeHolderComponent
      stakeHolders={stakeHolders}
      isAdmin={isAdmin}
      onGenerateExpense={() => {
        setShowStakeHolder(true);
        setShowExpenses(false);
        fetchStakeHolders();
      }}
    />
  )}
  {showBillUpload && (
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

      <BillUpload />
    </Paper>
  )}
</Box>

      {/* Footer */}
      <Box
        sx={{
          textAlign: "center",
          padding: 2,
          backgroundColor: "#007bff",
          color: "#ffffff",
        }}
      >
        <Typography
          variant="body2"
          sx={{
            fontSize: { xs: "0.8rem", sm: "1rem" }, // Responsive font size
          }}
        >
          © 2025 Jadavpur Durga Puja. All rights reserved.
        </Typography>
      </Box>

      {/* Logout confirmation dialog */}
      <Dialog open={logoutDialogOpen} onClose={handleCancelLogout}>
        <DialogTitle>Confirm Logout</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to logout?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelLogout} color="primary">
            No
          </Button>
          <Button onClick={handleConfirmLogout} color="primary" autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default HomeComponent;
