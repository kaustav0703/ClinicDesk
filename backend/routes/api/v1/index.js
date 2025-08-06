import express from 'express';
const router = express.Router();
import {getUser} from "../../../middlewares/config.js";
import doctorRoutes from "./doctors.js";
import patientRoutes from "./patients.js";
import reportsRoutes from "./reports.js";

// ****** Defining Routes for doctors, patients and reports ****** //
router.use('/doctors', doctorRoutes);
router.use('/patients', patientRoutes);
router.use('/reports', reportsRoutes);
router.get('/', getUser);

export default router;