// ****** Importing Patient Model ****** //
import Patient from '../../../models/patientModel.js';

// register new patient
export const register = async (req, res) => {

  const doctor = req.body.doctor;


  try {
    const { name, phone, status, email, gender } = req.body;

    if (!name || !phone || !doctor || !status || !email || !gender) {
      return res.status(400).json({ success: false, msg: 'Missing required fields' });
    }

    // Check if phone exist in database
    let patient = await Patient.find({ phone });

    if (patient.length > 0) {
      return res.status(200).json({ success: true, body: patient[0] });
    }

    // Check if email exist in database
    patient = await Patient.find({ email });
    if (patient.length > 0) {
      return res.status(200).json({ success: true, body: patient[0] });
    }

    patient = await Patient.create({ name, phone, doctor, status, email, gender });

    return res.status(201).json({
      success: true,
      body: patient,
      msg: 'Patient Registered Successfully!'
    });

  } catch (err) {
    console.error("Error registering patient:", err);
    return res.status(500).json({ success: false, msg: 'Server Error', error: err.message });
  }
}

// get all patients
export const allPatients = async (req, res) => {
  try {
    const patients = await Patient.find({});
    res.status(200).json({ success: true, body: patients });
  } catch (error) {
    console.error('Error fetching patients:', error);
    throw error;
  }
}

// delete patient
export const deletePatient = async (req, res) => {
  try {
    const patient = await Patient.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, body: patient });
  } catch (error) {
    console.error('Error deleting patient:', error);
    throw error;
  }
}

// update patient details
export const updatePatient = async (req, res) => {
  const patientId = req.params.id;
  try{

    // Find and update patient
    const updatedPatient = await Patient.findByIdAndUpdate(patientId, req.body, { new: true });

    // Failed to update patient
    if(!updatedPatient) res.status(404).json({ success: false, msg: 'Failed to update patient' });

    // Updated patient successfully
    res.status(200).json({ success: true, msg: 'Patient updated successfully!' }); 

  }catch(err){
    res.status(404).json({success:false, msg: 'Failed to update patient', error: err.message});
  }
}