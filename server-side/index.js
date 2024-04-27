// index.js
const express = require('express');
const session = require('express-session');
const path = require('path');
const cors = require("cors");

const app = express();

// Import controllers
const UserController = require('./Controller/UserController')
const AppointmentController = require('./Controller/AppointmentController');


// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin:'https://healthtech-s2ay.vercel.app' // Replace with your actual Vercel client-side URL
}));
// Initialize session middleware
app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: true,
}));

// Serve static files from the React build folder
app.use(express.static(path.join(__dirname, 'client-side', 'build')));

// User routes
app.post("/", UserController.registerUser);
app.post("/login", UserController.loginUser);
app.post("/password-otp", UserController.sendPasswordOTP);
app.post("/verifypassword-otp", UserController.verifyPasswordOTP);
app.post("/resendpass-otp", UserController.resendPasswordOTP);
app.post("/resetpassword", UserController.resetPassword);

// Appointment routes
app.post('/book-appointment', AppointmentController.bookAppointment);
app.get('/admin-appointments', AppointmentController.getAdminAppointments);

// Authentication routes


// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
