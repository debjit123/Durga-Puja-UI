// ...existing code...
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Typography, Container, Alert } from '@mui/material';

function SignupPage({ setToken }) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    try {
      // Call backend signup endpoint
      const response = await axios.post('/signup', { username, email, password });
      // If backend returns a token (auto-login), save it and update App state
      if (response.status === 201 || response.status === 200) {
        setSuccess('Signup successful. Please sign in.');
        navigate('/auth');
      } else {
        setError('Signup failed. Please try again.' + response.data.message || '');
      }
    } catch (err) {
      setError(err.response?.data || 'Signup failed. Please try again.');
    }
  };

  return (
    <Container>
      <Typography variant="h5" align="center" gutterBottom>
        Jadavpur Durga Puja
      </Typography>
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}
      <form onSubmit={handleSignup}>
        <TextField
          label="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          fullWidth
          margin="normal"
        />
        <TextField
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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
          Sign Up
        </Button>
      </form>
    </Container>
  );
}

export default SignupPage;
