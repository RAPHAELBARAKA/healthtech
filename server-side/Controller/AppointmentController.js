// AppointmentController.js
const Appointment = require("../Model/Appointment");

exports.bookAppointment = async (req, res) => {
  // Controller logic for booking appointment try {
    try {
    const { name,email, phoneNumber, age, gender, date, time, reason } = req.body;

    // Create new appointment instance
    const newAppointment = new Appointment({
      name,
      email,
      phoneNumber,
      age,
      gender,
      date,
      time,
      reason
    });

    // Save appointment to the database
    await newAppointment.save();

    res.status(201).json({ message: 'Appointment booked successfully' });
  } catch (error) {
    console.error('Error booking appointment:', error);
    res.status(500).json({ message: 'An error occurred while booking appointment' });
  }
};

exports.getAdminAppointments = async (req, res) => {
  // Controller logic for fetching admin appointments
  try {
    // Query appointments from the database
    const appointments = await Appointment.find();

    res.status(200).json(appointments);
  } catch (error) {
    console.error('Error fetching appointments:', error);
    res.status(500).json({ message: 'An error occurred while fetching appointments' });
  }
};
