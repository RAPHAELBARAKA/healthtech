import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Login from './LoginForm';

function PasswordReset() {
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();
  const [passwordError, setPasswordError] = useState('');
  const [passReset, setPassReset] = useState(false);

  const handlePasswordChange = (value) => {
    // Check password requirements
    const regex = /^(?=.*\d)(?=.*[!@#$%^&*])(?!.*\s).{5,15}$/;
    if (!regex.test(value)) {
      setPasswordError("Password must be between 5 to 15 characters, contain at least one number, one symbol, and no spaces");
    } else {
      setPasswordError("");
    }

    setNewPassword(value);
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post('http://localhost:3000/resetpassword', {
        email,
        newPassword,
      });

      setSuccessMessage(response.data.message);
      setPassReset(true)
    } catch (error) {
      console.error('Error resetting password:', error.response.data);
      setError(error.response.data.message || 'An error occurred while resetting password.');
    }

    setLoading(false);
  };
  if (passReset) {
    return <Login />;
  }

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        
      }}
    >
      <Box
        sx={{
          width: 400,
          p: 4,
          borderRadius: 3,
          bgcolor: 'white',
          textAlign: 'center',
          height:'450px'
        }}
      >
        <Typography variant="h3" gutterBottom sx={{ color: 'blue',fontWeight:'bold' }}>Be Happy</Typography>
        <Typography variant="h6" gutterBottom sx={{fontWeight:'bold'}}>Reset Password</Typography>
        <form onSubmit={handleResetPassword}>
          <TextField
            fullWidth
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
            sx={{ mt: 2 }}
          />
          <TextField
            fullWidth
            type="password"
            value={newPassword}
            onChange={(e) => handlePasswordChange(e.target.value)}
            placeholder="New Password"
            required
            sx={{ mt: 2 }}
          />
          {passwordError && <Typography variant="body2" sx={{ color: 'red', mt: 1 }}>{passwordError}</Typography>}
          <TextField
            fullWidth
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm New Password"
            required
            sx={{ mt: 2 }}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={loading}
            sx={{ mt: 8, backgroundColor: 'blue',width:250}}
          >
            {loading ? 'Resetting...' : 'Reset'}
          </Button>
        </form>
        {error && <Typography variant="body2" sx={{ color: 'red', mt: 2 }}>{error}</Typography>}
        {successMessage && <Typography variant="body2" sx={{ color: 'green', mt: 2 }}>{successMessage}</Typography>}
      </Box>
    </Box>
  );
}

export default PasswordReset;
