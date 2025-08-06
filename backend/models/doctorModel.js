// ****** Importing ****** //
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// ****** Defining Doctor Schema ****** //
const SPECIALIZATIONS = [
  "Dermatology",
  "Gastroenterologist",
  "Oncologist",
  "Family medicine",
  "Neurology",
  "Internal medicine",
  "Cardiologist",
  "Ophthalmologist",
  "Pediatrics",
  "Geriatric medicine",
  "Immunology",
  "Obstetrics and gynaecology",
  "Anesthesiology",
  "Endocrinologist",
  "General Surgery",
  "Infectious disease physician",
  "Orthopaedist",
  "Colorectal surgery",
  "Emergency medicine",
  "Hematology",
  "Pathology",
  "Psychiatry",
  "Radiology",
  "Hospice and palliative medicine",
];

const doctorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  phone: {
    type: Number,
    required: true,
    unique: true
  },
  image: {
    type: String, // Will hold Cloudinary image URL
    default: "", // optional
  },
  specialization: {
    type: String,
    enum: SPECIALIZATIONS,
    required: true
  }
}, {
  timestamps: true
});


// ****** Password Hashing ****** //
doctorSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// ****** JWT Token Method ****** //
doctorSchema.methods.getSignedJwtToken = function () {
  return jwt.sign({ id: this._id }, 'secret', {
    expiresIn: '120m'
  });
};

// ****** Password Matching ****** //
doctorSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const Doctor = mongoose.model('Doctor', doctorSchema);

export default Doctor;
