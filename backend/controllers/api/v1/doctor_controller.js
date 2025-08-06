// ****** Importing Dependencies ****** //
import Doctor from "../../../models/doctorModel.js";
import { setUser } from "../../../middlewares/config.js";
import multer from 'multer';
import cookie from 'cookie';

// Use memory storage to access image buffer
const storage = multer.memoryStorage();
export const upload = multer({ storage });

// ****** Doctor Registration ****** //
import streamifier from "streamifier";
import cloudinary from "../../../utils/cloudinary.js"; // make sure it's configured

export const register = async (req, res) => {
  try {
    const { name, email, password, phone, specialization } = req.body;
    let imageUrl = "";

    const saveDoctor = async () => {
      const doctor = await Doctor.create({
        name,
        email,
        password,
        phone,
        specialization,
        image: imageUrl || undefined,
      });

      return res.status(200).json({
        success: true,
        message: doctor,
      });
    };

    if (req.file) {
      const stream = cloudinary.uploader.upload_stream(
        { folder: "doctor-profiles" },
        async (error, result) => {
          if (error) {
            console.error("Cloudinary error:", error);
            return res.status(500).json({ success: false, message: "Image upload failed" });
          }

          imageUrl = result.secure_url;
          await saveDoctor();
        }
      );

      streamifier.createReadStream(req.file.buffer).pipe(stream);
    } else {
      await saveDoctor();
    }
  } catch (err) {
    console.error("Doctor registration error:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};


// ****** Doctor Signing In ****** //
export const login = async (req, res) => {
  try {
    let { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        msg: 'No email or password',
      });
    }

    const doctor = await Doctor.findOne({ email });

    if (!doctor) {
      return res.status(401).json({
        success: false,
        msg: "Invalid Username or Password!",
      });
    }

    const isMatch = await doctor.matchPassword(password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        msg: "Invalid Username or Password!",
      });
    }

    const token = setUser(res, doctor);

    res.status(200).json({
      success: true,
      token,
      msg: `Login successful, ${doctor.name}!`,
      doctor,
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({
      success: false,
      msg: 'Error occurred!',
    });
  }
};

export const cookieUserLogin = async (req, res) => {
  try {
    const { email } = req.body; // ✅ Define email before using it

    const doctor = await Doctor.findOne({ email });

    if (!doctor) {
      return res.status(401).json({
        success: false,
        msg: "Invalid Username or Password!",
      });
    }

    return res.status(200).json({
      success: true,
      msg: `Login successful, ${doctor.name}!`,
      doctor,
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({
      success: false,
      msg: 'Error occurred!',
    });
  }
};

export const getDoctorToken=(req, res)=> {
  const cookies = cookie.parse(req.headers.cookie || '');
  const doctorToken = cookies.doctorToken;

  if (doctorToken) {
    // Do something with doctorToken
    res.status(200).json({ message: 'Token received', token: doctorToken });
  } else {
    res.status(401).json({ message: 'No token found' });
  }
}