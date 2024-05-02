// index.js
const express = require('express');
const session = require('express-session');
const path = require('path');
const cors = require("cors");

const app = express();
const allowCors = (req, res, next) => {
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin','https://healthtech.vercel.app'); // Consider restricting this for production
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }
  next(); // Call the next middleware in the chain
};

// Apply the CORS middleware globally
app.use(allowCors);
// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Initialize session middleware
app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: true,
}));

// Serve static files from the React build folder
app.use(express.static(path.join(__dirname, 'client-side', 'build')));

// Import controllers
const UserController = require('./Controller/UserController')
const AppointmentController = require('./Controller/AppointmentController');

// User routes
app.post("/register", UserController.registerUser);
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
