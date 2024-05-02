import React, { useState } from 'react';
import axios from 'axios'; 
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import VerifypassOtp from './VerifypassOtp';

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading state to true when the form is submitted
    try {
      const response = await axios.post('https://healthtech-server.vercel.app/password-otp', {
        email
      });
 
      alert(response.data.message);
  
      if (response.status === 200) {
        setOtpSent(true);
      }
    } catch (error) {
      alert('Password reset failed. Please check your email.');
      console.error('Password Reset Error:', error);
    }
    finally {
      setLoading(false); // Set loading state to false regardless of success or failure
    }
  };

  return (
    <>
      {otpSent ? (
        <VerifypassOtp email={email} />
      ) : (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
          <Box sx={{ width: 400, p: 4, borderRadius: 3, bgcolor: 'white', textAlign: 'center', height:'400px' }}>
            <Typography variant='h3' sx={{color:"blue",fontWeight:'bold',marginBottom:"20px"}}>Be Happy</Typography>
            <Typography variant="h5" gutterBottom sx={{fontWeight:'bold',marginBottom:'40px'}}>Password Reset</Typography>
            <Typography variant="body1" gutterBottom>Enter your email address to receive a Verification Code</Typography>
            <form onSubmit={handleSubmit}>
              <TextField
                fullWidth
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                sx={{ mt: 2 }}
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                sx={{ mt: 2,backgroundColor:'blue',marginTop:'20px'}}
              >
                {loading ? 'Loading...' : 'Get code'}
              </Button>
            </form>
          </Box>
        </Box>
      )}
    </>
  );
}

export default ForgotPassword;
