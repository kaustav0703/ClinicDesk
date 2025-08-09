import mongoose from 'mongoose';

const AppointmentSchema = new mongoose.Schema({
    date:{
        type: Date,
        required: true
    },
    time:{
        type: String,
        required: true
    },
    doctor:{
        type: String,
        required: true
    },
    patient:{
        type: String,
        required: true
    },
    status:{
        type: String,
        required: true,
    },
    symptoms:{
        type: String,
        required: true
    }
});

const Appointments = mongoose.model('Appointments', AppointmentSchema);
export default Appointments;