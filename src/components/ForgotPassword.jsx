import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import {
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Alert,
  CircularProgress,
  Fade
} from "@mui/material";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [countdown, setCountdown] = useState(5);
  const navigate = useNavigate();

  useEffect(() => {
    let timer;
    if (successMsg) {
      timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev === 1) {
            clearInterval(timer);
            navigate("/auth");
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [successMsg]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email.trim()) {
      setErrorMsg("Email is required.");
      return;
    }

    setLoading(true);
    setSuccessMsg("");
    setErrorMsg("");

    try {
      await axios.post("/forgot-password", {
        email,
      });

      setSuccessMsg("Reset link sent! Please check your email.");
      setEmail("");
      setCountdown(5);
    } catch (error) {
      setErrorMsg("Failed to send reset link. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        bgcolor: "#f4f6f9",
        px: 2,
      }}
    >
      <Card
        sx={{
          width: "100%",
          maxWidth: 420,
          boxShadow: 4,
          borderRadius: 3,
          animation: "fadeIn 0.5s ease-in-out",
        }}
      >
        <CardContent sx={{ p: 4 }}>
          
          <Typography variant="h4" textAlign="center" fontWeight={700} mb={1}>
            Forgot Password
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
            textAlign="center"
            mb={3}
          >
            Enter your registered email to receive a password reset link.
          </Typography>

          {successMsg ? (
  <Fade in={true}>
    <Alert severity="success" sx={{ mb: 2 }}>
      {successMsg}
      <Typography variant="body2" sx={{ mt: 1 }}>
        Redirecting in <b>{countdown}</b> seconds…
      </Typography>
    </Alert>
  </Fade>
) : errorMsg ? (
  <Fade in={true}>
    <Alert severity="error" sx={{ mb: 2 }}>
      {errorMsg}
    </Alert>
  </Fade>
) : null}


          <form onSubmit={handleSubmit}>
            <TextField
              label="Email Address"
              variant="outlined"
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              sx={{ mb: 3 }}
              disabled={loading}
            />

            <Button
              type="submit"
              variant="contained"
              fullWidth
              size="large"
              disabled={loading}
              sx={{
                py: 1.3,
                fontSize: "1rem",
                textTransform: "none",
                borderRadius: 2,
              }}
            >
              {loading ? (
                <CircularProgress size={24} sx={{ color: "white" }} />
              ) : (
                "Send Reset Link"
              )}
            </Button>
          </form>

          <Button
            fullWidth
            onClick={() => navigate("/auth")}
            sx={{ mt: 3, textTransform: "none" }}
          >
            ← Back to Login
          </Button>
        </CardContent>
      </Card>

      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}
      </style>
    </Box>
  );
};

export default ForgotPassword;
