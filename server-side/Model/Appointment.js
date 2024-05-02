const mongoose = require ('mongoose')
const mongoUri = process.env.MONGODB_URI;
mongoose.connect(mongoUri)
.then(() =>{
    console.log("connected");
})
.catch(() => {
    console.log('failedd');
})

const appointmentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    age: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    reason: {
        type: String,
        required: true
    }
});

const Appointment = mongoose.model('Appointment', appointmentSchema);
module.exports = Appointment
