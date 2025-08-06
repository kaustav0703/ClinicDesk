// ****** Imports ****** //
import express from 'express';
const router = express.Router();
import {create_report, report_by_status} from "../../../controllers/api/v1/report_controller.js";
import {verifyToken} from "../../../config/middleware.js";

// ****** Defining Routes ****** //
router.post('/:id/create_report', verifyToken, create_report);
router.get('/:status',  report_by_status);

export default router;