// ****** Imports ****** //
import express from 'express';
const router = express.Router();
import { register, login, upload, cookieUserLogin, getDoctorToken } from '../../../controllers/api/v1/doctor_controller.js';


// ****** Defining Routes ****** //
router.post('/register', upload.single("image"), register);
router.post('/login', login);
router.post('/cookieLogin', cookieUserLogin);
router.get('/doctor_token', getDoctorToken);

export default router;