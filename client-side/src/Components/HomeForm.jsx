import React, { useState } from 'react';
import { Box, Button, Typography, Modal, TextField } from '@mui/material';
import FlowersVideo from '../Flowers.mp4'; // Import the video file
import RegisterForm from './RegisterForm'; // Assuming RegisterForm handles registration
import LoginForm from './LoginForm'; // Assuming LoginForm handles login

function HomeForm() {
  const [open, setOpen] = useState(false);
  const [openl,setOpenl] = useState(false)
  const [formType, setFormType] = useState(''); // State to hold the desired form type ("register" or "login")

  const handleOpen = (form) => {
    setOpen(true);
    setFormType(form); // Set the form type based on the clicked button
  };

  const handleClose = () => {
    setOpen(false);
    setFormType(''); // Reset form type on modal close
  };
  const handleOpenl = (form) => {
    setOpenl(true);
    setFormType(form); // Set the form type based on the clicked button
  };

  const handleClosel = () => {
    setOpenl(false);
    setFormType(''); // Reset form type on modal close
  };
  
  return (
    <Box sx={{ position: 'relative', height: '100vh', overflow: 'hidden' }}>
      {/* Background Video */}
      <video autoPlay muted loop style={{ position: 'absolute', width: '100%', height: '100%', objectFit: 'cover', zIndex: -1 }}>
        <source src={FlowersVideo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <Box sx={{ display: 'flex' ,marginTop:'10px'}}>
        {/* Content Section 1 */}
        <Box sx={{ height: '400px', backgroundColor: 'whitesmoke', width: '300px', marginLeft: '80px', borderRadius: '15px', paddingLeft: '20px' }}>
          <Typography variant="h5" gutterBottom sx={{ paddingTop: '40px' }}>
            Welcome to Be Happy!
          </Typography>
          <Typography variant="body1" paragraph>
            At Be Happy, we're dedicated to helping you achieve mental wellness and happiness in your life. Our team of experts is here to provide you with the support and resources you need to thrive.
          </Typography>
          <h4>Interact with an Expert Below</h4>
        </Box>

        {/* Content Section 2 */}
        <Box sx={{ height: '400px', backgroundColor: 'whitesmoke', width: '300px', marginLeft: '80px', borderRadius: '15px', paddingLeft: '20px' }}>
          <Typography variant="h5" gutterBottom sx={{ paddingTop: '40px' }}>
            Live your Life!
          </Typography>
          <Typography variant="body1" paragraph>
            At Be Happy, we believe in the transformative power of self-care. Taking care of your mental, emotional, and physical well-being is essential for living a fulfilling and balanced life. We're here to remind you that prioritizing self-care isn't selfish—it's an act of love and compassion toward yourself.
          </Typography>
          <h4>Meet a Counselor Below</h4>
        </Box>

        {/* Content Section 3 */}
        <Box sx={{ height: '400px', backgroundColor: 'whitesmoke', width: '300px', marginLeft: '80px', borderRadius: '15px', paddingLeft: '20px' }}>
          <Typography variant="h5" gutterBottom sx={{ paddingTop: '40px' }}>
            Enjoy your Life!
          </Typography>
          <Typography variant="body1" paragraph>
            At Be Happy, we understand that happiness is not just a fleeting emotion but a state of being that encompasses mental wellness, inner peace, and fulfillment. Our mission is to empower you to cultivate lasting happiness and resilience in your life.
          </Typography>
          <h4>Book a session below</h4>
        </Box>
      </Box>

      {/* Book Now Section */}
      <Box sx={{ marginLeft: '480px' }}>
        <h4 style={{color:'white'}}>Book a virtual session to meet with a Counselor.</h4>
        <h4 style={{ marginLeft: '56px',color:'white' }}> Your Mental Health Matters</h4>
        <Button
          sx={{ marginLeft: '60px', backgroundColor: 'blue', color: 'white' }}
          onClick={handleOpen}
        >
          Register
        </Button>
        <Button
          sx={{ marginLeft: '8px', backgroundColor: 'brown',width:'90px', color: 'white'}}
          onClick={handleOpenl}
        >
          Login
        </Button>
      </Box>
      

      {/* Modal for Booking */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="booking-modal"
        aria-describedby="booking-modal-description"
      >
        <RegisterForm/>
      </Modal>
      <Modal
        open={openl}
        onClose={handleClosel}
        aria-labelledby="booking-modal"
        aria-describedby="booking-modal-description"
      >
        <LoginForm/>
      </Modal>
    </Box>
  );
}

export default HomeForm;


