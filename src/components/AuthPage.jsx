import React, { useState } from 'react';
import LoginPage from './LoginPage';
import SignupPage from './SignupPage';
import { Container, Button, Typography, Box, Paper } from '@mui/material';

function AuthPage({ setToken }) {
  const [isLogin, setIsLogin] = useState(true);

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper elevation={3} style={{ padding: '20px', borderRadius: '10px' }}>
        <Typography variant="h4" align="center" gutterBottom>
          {isLogin ? 'Login' : 'Signup'}
        </Typography>
        {isLogin ? (
          <LoginPage setToken={setToken} />
        ) : (
          <SignupPage />
        )}
        <Box display="flex" justifyContent="center" marginTop={2}>
          <Button variant="outlined" onClick={toggleForm} fullWidth>
            {isLogin ? 'Switch to Signup' : 'Switch to Login'}
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}

export default AuthPage;