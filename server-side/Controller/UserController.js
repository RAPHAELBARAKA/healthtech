// UserController.js
const bcrypt = require('bcrypt');
const collection = require("../Model/Mongo");

exports.registerUser = async (req, res) => {
  // Controller logic for user registration
  const { name, email, password} = req.body;

  try {
      const user = await collection.findOne({ email: email });
      if (user) {
          return res.status(400).json({ message: "User already exists" });
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Save user to the database
      const newUser = new collection({
          name,
          email,
          password: hashedPassword,
      });
      await newUser.save();

      // Send appropriate CORS headers
      res.setHeader('Access-Control-Allow-Origin', 'https://healthtech.vercel.app');
      res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
      res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
      res.setHeader('Access-Control-Allow-Credentials', true);

      // Return success message
      return res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
      console.error("Error during registration:", error);
      return res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.loginUser = async (req, res) => {
  // Controller logic for user login
  const { email, password } = req.body;

  try {
    const user = await collection.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Ensure that 'user.password' exists before comparing
    if (!user.password) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (passwordMatch) {
      // Check if the user is an admin
      if (user.role === 'admin') {
        req.session.isAdmin = true; // Set isAdmin flag in session
        return res.status(200).json({ message: 'Admin login successful', isAdmin: true });
      } else {
        return res.status(200).json({ message: 'Login successful', isAdmin: false });
      }
    } else {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    console.error('Login Error:', error);
    res.status(500).json({ message: 'An error occurred during login' });
  }
};

exports.sendPasswordOTP = async (req, res) => {
  // Controller logic for sending password OTP
  const { email } = req.body;

  try {
    const user = await collection.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    const passOtp = randomstring.generate(4);
    user.passOtp = passOtp;
    await user.save();

    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587, // Use the appropriate port for your setup
       secure: false, // Set to true for SSL/TLS, false for SMTP
       auth: {
          user: 'goldensilver424@gmail.com',
          pass: 'nyjq pfev nuen lpnm',
      },
  });

  const mailOptions = {
      from: 'goldensilver424@gmail.com',
      to: email,
      subject: 'OTP for password',
      text: `Your OTP for verification is: ${passOtp}`,
  };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal Server Error' });
      } else {
        console.log('Email sent: ' + info.response);
        return res.json({ message: 'OTP sent. Check your email for your password OTP.' });
      }
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.verifyPasswordOTP = async (req, res) => {
  // Controller logic for verifying password OTP
  const { enteredPassOTP } = req.body;

  try {
    const user = await collection.findOne({ passOtp: enteredPassOTP });

    if (!user || user.passOtp !== enteredPassOTP) {
      return res.status(400).json({ message: 'Invalid OTP' });
    }

    res.json({ message: 'OTP verified' });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.resendPasswordOTP = async (req, res) => {
  // Controller logic for resending password OTP
  const { email } = req.body;

  try {
    // Check if the user exists
    const user = await collection.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    // Generate a new password OTP
    const passOtp = randomstring.generate(4);
    user.passOtp = passOtp;
    await user.save();

    // Send the new password OTP via email
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: 'goldensilver424@gmail.com',
        pass: 'nyjq pfev nuen lpnm',
      },
    });

    const mailOptions = {
      from: 'goldensilver424@gmail.com',
      to: email,
      subject: 'OTP for password',
      text: `Your new OTP for verification is: ${passOtp}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal Server Error' });
      } else {
        console.log('Email sent: ' + info.response);
        return res.json({ message: 'New OTP sent. Check your email for your password OTP.' });
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'An error occurred while resending OTP. Please try again later.' });
  }
  
};

exports.resetPassword = async (req, res) => {
  // Controller logic for resetting password
  const { email, newPassword } = req.body;

  try {
    // Find user by email
    const user = await collection.findOne({ email });

    // Check if user exists
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update user's password
    user.password = hashedPassword;
    await user.save();

    res.status(200).json({ message: 'Password updated successfully' });
  } catch (error) {
    console.error('Error resetting password:', error);
    res.status(500).json({ message: 'An error occurred while resetting password. Please try again later.' });
  }
};
