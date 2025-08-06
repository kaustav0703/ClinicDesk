// ****** Importing Patient Model ****** //
import Patient from '../../../models/patientModel.js';

// ****** Patient Registration ****** //
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

export const allPatients=async(req, res)=> {
  try {
    const patients = await Patient.find({});
    res.status(200).json({ success: true, body: patients });
  } catch (error) {
    console.error('Error fetching patients:', error);
    throw error;
  }
}