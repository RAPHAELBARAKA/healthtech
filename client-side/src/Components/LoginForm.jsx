import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import Checkbox from '@mui/material/Checkbox';
import ForgotPassword from './ForgotPassword'; // Import the ForgotPasswordForm component
import { Link, useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [showForgotPasswordForm, setShowForgotPasswordForm] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3000/login', {
        email,
        password
      });

      alert(response.data.message);

      if (response.status === 200) {
        if (response.data.isAdmin) {
          navigate('/admin-dash');
        } else {
          if (rememberMe) {
            localStorage.setItem('rememberedEmail', email);
            localStorage.setItem('rememberedPassword', password);
          } else {
            localStorage.removeItem('rememberedEmail');
            localStorage.removeItem('rememberedPassword');
          }
          navigate('/dash');
        }
      }
    } catch (error) {
      setErrorMessage('Login failed. Please check your credentials.');
      console.error('Login Error:', error);
    }
  };

  const handleForgotPasswordClick = () => {
    setShowForgotPasswordForm(true);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}
    >
      {showForgotPasswordForm ? (
        <ForgotPassword />
      ) : (
        <Box
          sx={{
            width: 400,
            p: 4,
            borderRadius: 3,
            bgcolor: 'white',
            textAlign: 'center',
          }}
        >
          <Typography variant="h3" gutterBottom sx={{ color: 'blue', fontWeight: 'bold', marginBottom: 4 }}>Be Happy</Typography>
          <Typography variant="h5" gutterBottom sx={{ marginBottom: '35px', fontWeight: 'bold' }}>Login</Typography>
          <form onSubmit={handleSubmit}>
            <div>
              <TextField
                type='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                label="Email"
                variant="outlined"
                placeholder='Enter your email'
                required
                fullWidth
              /><br /><br />
            </div>
            <div>
              <TextField
                type='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                label="Password"
                variant="outlined"
                placeholder='Enter your password'
                required
                fullWidth
              /><br /><br />
            </div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <Checkbox
                checked={rememberMe}
                onChange={() => setRememberMe(!rememberMe)}
                inputProps={{ 'aria-label': 'Remember me' }}
              />
              <Typography>Remember me</Typography>
              <Typography style={{ cursor: 'pointer', marginLeft: 'auto', color: '#c00100' }} onClick={handleForgotPasswordClick}>Forgot password?</Typography>
            </div>
            <br />
            <Button type='submit' variant="contained" sx={{ backgroundColor: 'blue', width: '300px' }}>Login</Button>
            {errorMessage && <div className="error-message">{errorMessage}</div>}
          </form><br />
          <div>
            <Link to='/register' style={{ textDecoration: 'none', color: '#c00100' }}> Don't have an account? Sign Up </Link>
          </div>
        </Box>
      )}
    </Box>
  );
}

export default Login;
