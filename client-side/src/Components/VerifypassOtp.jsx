import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Typography, Box } from '@mui/material';
import PasswordReset from './PasswordReset';

function VerifypassOtp({ email }) {
    const [passOtp, setPassOtp] = useState('');
    const [loadingVerify, setLoadingVerify] = useState(false);
    const [loadingResend, setLoadingResend] = useState(false);
    const [otpVerified, setOtpVerified] = useState(false);

    const handleInputChange = (value) => {
        setPassOtp(value);
    };

    const handleVerifyPassOTP = async (e) => {
        e.preventDefault();
        setLoadingVerify(true);

        try {
            const response = await axios.post("http://localhost:3000/verifypassword-otp", { enteredPassOTP: passOtp });

            if (response.status === 200) { 
                alert('OTP verified');
                setOtpVerified(true);
                
            } else {
                alert(response.data.message);
            }
        } catch (error) {
            console.error("Error verifying OTP:", error);
            alert("An error occurred during OTP verification. Please try again later.");
        }
    
        setLoadingVerify(false);
    };

    const handleResendPassOTP = async () => {
        setLoadingResend(true);
        
        try {
            const response = await axios.post("http://localhost:3000/resendpass-otp", { email });

            alert(response.data.message);
  
            if (response.status === 200) {
            
            }
          } catch (error) {
            alert('Password reset failed. Please check your email.');
            console.error('Password Reset Error:', error);
          }

        setLoadingResend(false);
    };
    if (otpVerified) {
        return <PasswordReset />;
      }
    
        
    return (
        
        <Box sx={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Box className='ver2' sx={{ padding: 3, borderRadius: 3, backgroundColor: 'white', textAlign: 'center',width:'400px',height:'500px' }}>
                <Typography variant="h3" color='primary' gutterBottom sx={{ fontWeight: 'bold',color:'blue' }}>Be Happy</Typography>
                <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold',marginBottom:'30px' }}>OTP Verification</Typography>
                <Typography gutterBottom sx={{marginTop:'20px',marginBottom:'10px'}}>Enter OTP sent to your email here</Typography>
                <form onSubmit={handleVerifyPassOTP}>
                    <TextField
                        label="OTP"
                        variant="outlined"
                        type="text"
                        value={passOtp}
                        onChange={(e) => handleInputChange(e.target.value)}
                        fullWidth
                        sx={{ mb: 2 }}
                    />
                    <Button type="submit" variant="contained" disabled={loadingVerify} sx={{ mr: 0,backgroundColor:'blue' }}>
                        {loadingVerify ? 'Loading...' : 'Verify OTP'}
                    </Button>
                </form>
                <Button onClick={handleResendPassOTP} disabled={loadingResend} sx={{marginTop:'20px',border: '1px solid black',backgroundColor: 'white', }}>
                    {loadingResend ? 'Loading...' : 'Resend OTP'}
                </Button>
            </Box>
        </Box>
    );
}

export default VerifypassOtp;
