const express = require('express');
const session = require('express-session');
const path = require('path');
const cors = require("cors");

const app = express();

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

// CORS configuration
const corsOptions = {
  origin: 'https://healthtech.vercel.app',
  methods: 'GET,POST,PUT,DELETE,PATCH,OPTIONS',
  allowedHeaders: 'Origin,X-Requested-With,Content-Type,Accept,Authorization',
  credentials: true
};
app.use(cors(corsOptions));

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

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Handling OPTIONS requests
app.options('*', (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', 'https://healthtech.vercel.app');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,PATCH,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Authorization');
  res.sendStatus(200);
});
