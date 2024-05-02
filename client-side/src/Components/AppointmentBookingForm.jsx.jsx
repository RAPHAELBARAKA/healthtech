import React, { useState } from 'react';
import { TextField, Button, Typography, Box } from '@mui/material';
import axios from 'axios'; // Import Axios

function BookingForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [reason, setReason] = useState('');

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePhoneNumberChange = (event) => {
    setPhoneNumber(event.target.value);
  };

  const handleAgeChange = (event) => {
    setAge(event.target.value);
  };

  const handleGenderChange = (event) => {
    setGender(event.target.value);
  };

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  const handleTimeChange = (event) => {
    setSelectedTime(event.target.value);
  };

  const handleReasonChange = (event) => {
    setReason(event.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://healthtech-server.vercel.app/book-appointment', {
        name,
        email,
        phoneNumber,
        age,
        gender,
        date: selectedDate,
        time: selectedTime,
        reason
      });
      console.log('Response:', response.data);
      // Handle response from the server
    } catch (error) {
      console.error('Error submitting form:', error);
      // Handle error
    }
  };

  return (
    <Box sx={{ textAlign: 'center', backgroundColor: '#add8e6', paddingTop: '10px' }}>
      <Box sx={{ width: '800px', backgroundColor: 'white', marginLeft: '230px', padding: '20px', borderRadius: '5px', border: '1px solid blue', marginTop: '20px' }} >
        <Typography variant="h6" gutterBottom sx={{ marginBottom: '10px', color: 'blue', fontWeight: 'bold' }}>Appointment Booking Form</Typography>
        <form onSubmit={handleSubmit}>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <TextField
              label="Name"
              value={name}
              onChange={handleNameChange}
              fullWidth
              sx={{ marginBottom: '20px' }}
            />
            <TextField
              label="Email"
              value={email}
              onChange={handleEmailChange}
              fullWidth
              sx={{ marginBottom: '20px' }}
            />
            <TextField
              label="Phone Number"
              value={phoneNumber}
              onChange={handlePhoneNumberChange}
              fullWidth
              sx={{ marginBottom: '20px' }}
            />
            <TextField
              label="Age"
              type="number"
              value={age}
              onChange={handleAgeChange}
              fullWidth
              sx={{ marginBottom: '20px' }}
            />
            <TextField
              label="Gender"
              value={gender}
              onChange={handleGenderChange}
              fullWidth
              sx={{ marginBottom: '20px' }}
            />
            <TextField
              label="Date you want to meet Therapist (YYYY-MM-DD)"
              value={selectedDate}
              onChange={handleDateChange}
              fullWidth
              sx={{ marginBottom: '20px' }}
            />
            <TextField
              label="Time you want to meet Therapist (HH:MM)"
              value={selectedTime}
              onChange={handleTimeChange}
              fullWidth
              sx={{ marginBottom: '20px' }}
            />
            <TextField
              label="Reason for Booking"
              multiline
              rows={4}
              value={reason}
              onChange={handleReasonChange}
              fullWidth
              sx={{ marginBottom: '20px' }}
            />
            <Button type="submit" variant="contained" sx={{ backgroundColor: 'blue', color: 'white', '&:hover': { backgroundColor: 'darkblue' }, marginTop: '20px' }}>
              Book Appointment
            </Button>
          </Box>
        </form>
      </Box>
    </Box>
  );
}

export default BookingForm;
