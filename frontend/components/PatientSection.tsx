import { useAuth } from "@/context/AuthContext";
import { motion } from "framer-motion";
import {
    User,
    Phone,
    Mail,
    CalendarCheck,
    CalendarClock,
    FileText,
    Venus,
    ArrowLeft,
} from "lucide-react";

export default function PatientSection({ patientData }: { patientData: any }) {
    const { setIsCurrentPatientSelected, loggedInDoctor } = useAuth();

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-16 bg-gradient-to-br from-gray-800 via-gray-900 to-black text-white rounded-3xl px-6 py-10 shadow-2xl border border-indigo-500/20 max-w-4xl mx-auto mt-10"
        >
            <h2 className="text-4xl font-bold text-indigo-400 mb-10 text-center">
                Patient Details
            </h2>

            {/* Two-column layout */}
            <div className="flex flex-col md:flex-row items-center md:items-start gap-10 max-w-4xl mx-auto px-4">
                {/* Left Column - Huge Icon */}
                <div className="flex-shrink-0">
                    <User size={140} className="text-indigo-500" />
                </div>

                {/* Right Column - Patient Info */}
                <div className="space-y-6 text-gray-300 text-xl text-left w-full">
                    <p className="flex items-center gap-4">
                        <User className="text-indigo-400" />
                        <span><strong>Name:</strong> {patientData?.name || "N/A"}</span>
                    </p>
                    <p className="flex items-center gap-4">
                        <Phone className="text-indigo-400" />
                        <span><strong>Phone:</strong> {patientData?.phone || "N/A"}</span>
                    </p>
                    <p className="flex items-center gap-4">
                        <Venus className="text-indigo-400" />
                        <span><strong>Gender:</strong> {patientData?.gender || "N/A"}</span>
                    </p>
                    <p className="flex items-center gap-4">
                        <Mail className="text-indigo-400" />
                        <span><strong>Email:</strong> {patientData?.email || "N/A"}</span>
                    </p>
                    <p className="flex items-center gap-4">
                        <Mail className="text-indigo-400" />
                        <span><strong>Assigned Doctor:</strong> {loggedInDoctor?.name || "N/A"}</span>
                    </p>
                    <p className="flex items-center gap-4">
                        <CalendarCheck className="text-indigo-400" />
                        <span>
                            <strong>Created At:</strong>{" "}
                            {patientData?.createdAt
                                ? new Date(patientData.createdAt).toLocaleString()
                                : "N/A"}
                        </span>
                    </p>
                    <p className="flex items-center gap-4">
                        <CalendarClock className="text-indigo-400" />
                        <span>
                            <strong>Updated At:</strong>{" "}
                            {patientData?.updatedAt
                                ? new Date(patientData.updatedAt).toLocaleString()
                                : "N/A"}
                        </span>
                    </p>
                    <p className="flex items-center gap-4">
                        <FileText className="text-indigo-400" />
                        <span>
                            <strong>Reports:</strong>{" "}
                            {patientData?.reports?.length
                                ? `${patientData.reports.length} report(s)`
                                : "No reports available"}
                        </span>
                    </p>
                </div>
            </div>

            <div className="mt-14 text-center">
                <button
                    onClick={() => setIsCurrentPatientSelected(false)}
                    className="px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xl transition cursor-pointer inline-flex items-center gap-3"
                >
                    <ArrowLeft size={22} /> Back to Patients
                </button>
            </div>
        </motion.div>
    );
}
