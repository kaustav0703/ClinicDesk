// ****** Importing ****** //
import mongoose from 'mongoose';

// ****** Defining Patient Schema ****** //
const patientSchema = new mongoose.Schema({

  phone: {
    type: Number,
    maxlength: 10,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  doctor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Doctor'
  },
  status: {
    type: String,
    required: true,
    enum: ['Under Observation', 'Discharged', 'Admitted']
  },
  email: {
    type: String,
    required: true,
    match: [/.+@.+\..+/, 'Please enter a valid email address'],
    unique: true
  },
  gender:{
    type:String,
    required:true,
    emun:['Male','Female','Others']
  }
}, {
  timestamps: true
});

// ****** Exports ****** //
const Patient = mongoose.model('Patient', patientSchema);
export default Patient;