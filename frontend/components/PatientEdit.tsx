"use client";
import { useAuth } from "@/context/AuthContext";
import { motion } from "framer-motion";
import { User, Phone, Mail, Venus, ArrowLeft, Activity } from "lucide-react";
import { useEffect, useRef } from "react";

export default function PatientEdit({ patientData }: { patientData: any }) {
    const { setIsPatientEdit } = useAuth();

    const nameRef = useRef<HTMLInputElement>(null);
    const phoneRef = useRef<HTMLInputElement>(null);
    const emailRef = useRef<HTMLInputElement>(null);
    const genderRef = useRef<HTMLSelectElement>(null);
    const statusRef = useRef<HTMLSelectElement>(null);
    const backendUrl = process.env.NEXT_PUBLIC_API_URL;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const formData = {
            name: nameRef.current?.value,
            phone: phoneRef.current?.value,
            email: emailRef.current?.value,
            gender: genderRef.current?.value,
            status: statusRef.current?.value,
        };

        const isChanged = Object.keys(formData).some(
            key => formData[key as keyof typeof formData] !== patientData[key]
        );

        if (isChanged) {
            console.log("Data changed. Calling API...");
            try {
                const res = await fetch("/api/update-patient", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(formData),
                });

                const data = await res.json();
                console.log("API response:", data);
            } catch (error) {
                console.error("API error:", error);
            }
        } else {
            console.log("No changes detected.");
        }
    };

    return (
        <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-16 bg-gradient-to-br from-gray-800 via-gray-900 to-black text-white rounded-3xl px-6 py-10 shadow-2xl border border-indigo-500/20 max-w-4xl mx-auto mt-10"
        >
            <h2 className="text-4xl font-bold text-indigo-400 mb-10 text-center">
                Edit Patient
            </h2>

            <div className="flex flex-col items-center gap-6 w-full max-w-xl mx-auto">
                <div className="flex items-center gap-4 w-full">
                    <User className="text-indigo-400" />
                    <input
                        ref={nameRef}
                        type="text"
                        placeholder="Name"
                        defaultValue={patientData?.name}
                        className="bg-gray-800 border border-gray-600 rounded-xl px-1 py-2 w-[80%] focus:outline-none focus:ring-2 focus:ring-indigo-500 mx-auto text-center text-2xl"
                    />
                </div>

                <div className="flex items-center gap-4 w-full">
                    <Phone className="text-indigo-400" />
                    <input
                        ref={phoneRef}
                        type="text"
                        placeholder="Phone"
                        defaultValue={patientData?.phone}
                        className="bg-gray-800 border border-gray-600 rounded-xl px-1 py-2 w-[80%] focus:outline-none focus:ring-2 focus:ring-indigo-500 mx-auto text-center text-2xl"
                    />
                </div>

                <div className="flex items-center gap-4 w-full">
                    <Venus className="text-indigo-400" />
                    <select
                        ref={genderRef}
                        defaultValue={patientData?.gender}
                        className="bg-gray-800 border border-gray-600 rounded-xl px-1 py-2 w-[80%] focus:outline-none focus:ring-2 focus:ring-indigo-500 mx-auto text-center text-2xl"
                    >
                        <option value="">Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                    </select>
                </div>

                <div className="flex items-center gap-4 w-full">
                    <Mail className="text-indigo-400" />
                    <input
                        ref={emailRef}
                        type="email"
                        placeholder="Email"
                        defaultValue={patientData?.email}
                        className="bg-gray-800 border border-gray-600 rounded-xl px-1 py-2 w-[80%] focus:outline-none focus:ring-2 focus:ring-indigo-500 mx-auto text-center text-2xl"
                    />
                </div>

                <div className="flex items-center gap-4 w-full">
                    <Activity className="text-indigo-400" />
                    <select
                        ref={statusRef}
                        defaultValue={patientData?.status}
                        className="bg-gray-800 border border-gray-600 rounded-xl px-1 py-2 w-[80%] focus:outline-none focus:ring-2 focus:ring-indigo-500 mx-auto text-center text-2xl"
                    >
                        <option value="">Select Status</option>
                        <option value="Under Observation">Under Observation</option>
                        <option value="Admitted">Admitted</option>
                        <option value="Discharged">Discharged</option>
                    </select>
                </div>
            </div>

            <div className="mt-14 text-center flex justify-center gap-6">
                <button
                    type="button"
                    onClick={() => setIsPatientEdit(false)}
                    className="px-8 py-4 bg-gray-700 hover:bg-gray-600 text-white rounded-xl text-xl transition cursor-pointer inline-flex items-center gap-3"
                >
                    <ArrowLeft size={22} /> Back
                </button>

                <button
                    type="submit"
                    className="px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xl transition cursor-pointer"
                >
                    Save Changes
                </button>
            </div>
        </motion.form>
    );
}
