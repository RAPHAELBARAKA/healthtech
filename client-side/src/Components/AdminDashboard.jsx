import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Typography, Button } from '@mui/material';

function AdminDashboard() {
    const [appointments, setAppointments] = useState([]);

    useEffect(() => {
      // Fetch appointments when the component mounts
      const fetchAppointments = async () => {
        try {
          const response = await axios.get('http://localhost:3000/admin-appointments');
          setAppointments(response.data);
        } catch (error) {
          console.error('Error fetching appointments:', error);
        }
      };
  
      fetchAppointments();
    }, []); // Run once when the component mounts

    const handleDeleteAppointment = (id) => {
      // Remove the appointment from the local state without making a request to the server
      setAppointments(appointments.filter(appointment => appointment._id !== id));
    };

    const handleApproveAppointment = async (id) => {
      try {
        // Implement your approve logic here
        await axios.put(`http://localhost:3000/admin-appointments/${id}`, { status: 'Approved' });
        setAppointments(appointments.map(appointment => appointment._id === id ? { ...appointment, status: 'Approved' } : appointment));
      } catch (error) {
        console.error('Error approving appointment:', error);
      }
    };

    const handleDeclineAppointment = async (id) => {
      try {
        // Implement your decline logic here
        await axios.put(`http://localhost:3000/admin-appointments/${id}`, { status: 'Declined' });
        setAppointments(appointments.map(appointment => appointment._id === id ? { ...appointment, status: 'Declined' } : appointment));
      } catch (error) {
        console.error('Error declining appointment:', error);
      }
    };
  
    return (
      <Box sx={{ textAlign: 'center', marginTop: '20px' }}>
        <Typography variant="h5" gutterBottom sx={{ color: 'blue', fontWeight: 'bold' }}>Admin Dashboard - Appointments</Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '20px' }}>
          {appointments.length === 0 ? (
            <Typography>No appointments found.</Typography>
          ) : (
            <table style={{ borderCollapse: 'collapse', border: '1px solid black', width: '100%' }}>
              <thead>
                <tr>
                  <th style={{ border: '1px solid black', padding: '8px' }}>Name</th>
                  <th style={{ border: '1px solid black', padding: '8px' }}>Email</th>
                  <th style={{ border: '1px solid black', padding: '8px' }}>Phone Number</th>
                  <th style={{ border: '1px solid black', padding: '8px' }}>Date</th>
                  <th style={{ border: '1px solid black', padding: '8px' }}>Time</th>
                  <th style={{ border: '1px solid black', padding: '8px' }}>Reason</th>
                  <th style={{ border: '1px solid black', padding: '8px' }}>Status</th>
                  <th style={{ border: '1px solid black', padding: '8px' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {appointments.map(appointment => (
                  <tr key={appointment._id}>
                    <td style={{ border: '1px solid black', padding: '8px' }}>{appointment.name}</td>
                    <td style={{ border: '1px solid black', padding: '8px' }}>{appointment.email}</td>
                    <td style={{ border: '1px solid black', padding: '8px' }}>{appointment.phoneNumber}</td>
                    <td style={{ border: '1px solid black', padding: '8px' }}>{appointment.date}</td>
                    <td style={{ border: '1px solid black', padding: '8px' }}>{appointment.time}</td>
                    <td style={{ border: '1px solid black', padding: '8px' }}>{appointment.reason}</td>
                    <td style={{ border: '1px solid black', padding: '8px' }}>{appointment.status || 'Pending'}</td>
                    <td style={{ border: '1px solid black', padding: '8px' }}>
                      <Button variant="contained" color="error" onClick={() => handleDeleteAppointment(appointment._id)}>Delete</Button>
                      <Button variant="contained" color="primary" onClick={() => handleApproveAppointment(appointment._id)}>Approve</Button>
                      <Button variant="contained" color="warning" onClick={() => handleDeclineAppointment(appointment._id)}>Decline</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </Box>
      </Box>
    );
  }
  

export default AdminDashboard;
