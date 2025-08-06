"use client";
import { useEffect, useState } from "react";
import { User, Phone, Mail, Stethoscope } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import axios from "axios";

type PatientStatus = "Admitted" | "Discharged" | "Under Observation";
type Gender = "Male" | "Female" | "Others";

interface PatientFormProps {
    onSubmit?: (patient: any) => void;
    onCancel?: () => void;
    setShowForm: any;
}

export default function PatientForm({ onSubmit, onCancel, setShowForm }: PatientFormProps) {
    const { loggedInDoctor } = useAuth();
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const [doctorToken, setDoctorToken] = useState<string | null>(null);

    const [newPatient, setNewPatient] = useState({
        name: "",
        phone: "",
        email: "",
        doctor: "", // will be set to loggedInDoctor._id
        status: "Admitted" as PatientStatus,
        gender: "Male" as Gender,
    });

    // ✅ Extract cookie from client
    const getDoctorTokenFromClient = () => {
        if (typeof document !== "undefined") {
            const token = document.cookie
                .split("; ")
                .find((row) => row.startsWith("doctorToken="))
                ?.split("=")[1];
            return token || null;
        }
        return null;
    };

    // ✅ Set doctor token from cookies on load
    useEffect(() => {
        async function getDoctorToken() {
            try {
                const tokenResponse = await axios.get(`${apiUrl}/doctors/doctor_token`, {
                    withCredentials: true,
                });
                if(tokenResponse.status === 200) {
                    setDoctorToken(tokenResponse.data.token);
                }
            } catch (error) {
                console.log(error);
            }
        }
        getDoctorToken();
    }, []);

    // ✅ Set logged-in doctor to patient state
    useEffect(() => {
        if (loggedInDoctor?._id) {
            setNewPatient((prev) => ({ ...prev, doctor: loggedInDoctor._id }));
        }
    }, [loggedInDoctor]);

    // ✅ Handle input changes
    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        setNewPatient({ ...newPatient, [e.target.name]: e.target.value });
    };

    // ✅ Submit form
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!newPatient.doctor) {
            alert("Doctor is not assigned.");
            return;
        }

        if (!doctorToken) {
            alert("Doctor token not found. Please log in again.");
            return;
        }

        try {
            const response = await axios.post(
                `${apiUrl}/patients/register`,
                newPatient,
                {
                    withCredentials: true,
                    headers: {
                        Authorization: `Bearer ${doctorToken}`,
                    },
                }
            );

            onSubmit?.(newPatient);
            onCancel?.();
        } catch (error) {
            console.error("Failed to register patient:", error);
            alert("Patient registration failed. Check console for details.");
        }
        finally{
            setShowForm(false);
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="w-full max-w-lg bg-gray-800 p-8 rounded-2xl shadow-2xl border border-indigo-500/10 space-y-6 transition-all"
        >
            <h3 className="text-2xl font-semibold text-indigo-400 mb-2 text-center">
                Add New Patient
            </h3>

            {/* Name */}
            <div>
                <label className="block mb-1 text-sm text-gray-300">Full Name</label>
                <div className="flex items-center bg-gray-700 rounded px-3 py-2">
                    <User className="text-indigo-400 mr-2" size={18} />
                    <input
                        name="name"
                        type="text"
                        required
                        value={newPatient.name}
                        onChange={handleChange}
                        placeholder="John Doe"
                        className="w-full bg-transparent text-white outline-none"
                    />
                </div>
            </div>

            {/* Phone */}
            <div>
                <label className="block mb-1 text-sm text-gray-300">Phone Number</label>
                <div className="flex items-center bg-gray-700 rounded px-3 py-2">
                    <Phone className="text-indigo-400 mr-2" size={18} />
                    <input
                        name="phone"
                        type="tel"
                        required
                        maxLength={10}
                        pattern="[0-9]{10}"
                        value={newPatient.phone}
                        onChange={handleChange}
                        placeholder="10-digit number"
                        className="w-full bg-transparent text-white outline-none"
                    />
                </div>
            </div>

            {/* Email */}
            <div>
                <label className="block mb-1 text-sm text-gray-300">Email</label>
                <div className="flex items-center bg-gray-700 rounded px-3 py-2">
                    <Mail className="text-indigo-400 mr-2" size={18} />
                    <input
                        name="email"
                        type="email"
                        required
                        value={newPatient.email}
                        onChange={handleChange}
                        placeholder="email@example.com"
                        className="w-full bg-transparent text-white outline-none"
                    />
                </div>
            </div>

            {/* Gender */}
            <div>
                <label className="block mb-1 text-sm text-gray-300">Gender</label>
                <select
                    name="gender"
                    value={newPatient.gender}
                    onChange={handleChange}
                    className="w-full p-2 rounded bg-gray-700 text-white"
                >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Others">Others</option>
                </select>
            </div>

            {/* Doctor ID (readonly) */}
            {loggedInDoctor && (
                <div>
                    <label className="block mb-1 text-sm text-gray-300">Assigned Doctor ID</label>
                    <div className="flex items-center bg-gray-700 rounded px-3 py-2">
                        <Stethoscope className="text-indigo-400 mr-2" size={18} />
                        <input
                            type="text"
                            name="doctor"
                            readOnly
                            value={loggedInDoctor._id}
                            className="w-full bg-transparent text-white outline-none"
                        />
                    </div>
                </div>
            )}

            {/* Status */}
            <div>
                <label className="block mb-1 text-sm text-gray-300">Status</label>
                <select
                    name="status"
                    value={newPatient.status}
                    onChange={handleChange}
                    className="w-full p-2 rounded bg-gray-700 text-white"
                >
                    <option value="Admitted">Admitted</option>
                    <option value="Discharged">Discharged</option>
                    <option value="Under Observation">Under Observation</option>
                </select>
            </div>

            {/* Buttons */}
            <div className="flex gap-4 mt-4 justify-between">
                <button
                    type="submit"
                    className="flex-1 py-2 bg-green-600 hover:bg-green-700 rounded text-white font-semibold transition"
                >
                    Save Patient
                </button>
                {onCancel && (
                    <button
                        type="button"
                        onClick={onCancel}
                        className="flex-1 py-2 bg-gray-600 hover:bg-gray-700 rounded text-white font-semibold transition"
                    >
                        Cancel
                    </button>
                )}
            </div>
        </form>
    );
}

