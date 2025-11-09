import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Typography, Container, Alert } from '@mui/material';

function LoginPage({ setToken }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const forgetPassword = () => {
    navigate('/forgot-password');
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/login', { username, password });
      if (response.status === 200) {
        const token = response.data.token;
        localStorage.setItem('authToken', token);
        setToken(token);
        navigate('/');
      }
    } catch (err) {
      setError('Invalid username or password');
    }
  };

  return (
    <Container>
      <Typography variant="h5" align="center" gutterBottom>
        Jadavpur Durga Puja
      </Typography>

      {error && <Alert severity="error">{error}</Alert>}

      <form onSubmit={handleLogin}>
        <TextField
          label="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          fullWidth
          margin="normal"
        />

        <TextField
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          fullWidth
          margin="normal"
        />

        <Button type="submit" variant="contained" fullWidth>
          Sign In
        </Button>
      </form>

      <Button
        onClick={forgetPassword}
        color="primary"
        type="button"
        variant="text"
        fullWidth
        sx={{ mt: 2 }}
      >
        Forgot Password?
      </Button>
    </Container>
  );
}

export default LoginPage;
