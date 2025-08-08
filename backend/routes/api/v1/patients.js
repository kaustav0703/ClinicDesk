import express from "express";
const router = express.Router();
import { register } from "../../../controllers/api/v1/patient_controller.js";
import { create_report, all_reports } from "../../../controllers/api/v1/report_controller.js";
import { allPatients, deletePatient } from "../../../controllers/api/v1/patient_controller.js";
import { verifyToken } from '../../../config/middleware.js';

router.post('/register', register);
//- /patients/:id/create_report
router.post('/:id/create_report', verifyToken, create_report);
router.get('/:id/all_reports', all_reports);
router.get('/all_patients', allPatients);
router.delete('/delete/:id', deletePatient);

export default router;