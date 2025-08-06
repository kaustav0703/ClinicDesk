"use client";
import { motion } from "framer-motion";
import { Mail, BadgeCheck, UserCircle, PlusCircle, X, Phone } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useState, useEffect } from "react";
import PatientForm from "./PatientForm";

export default function PatientsSection({ patients }: any) {

  const [showForm, setShowForm] = useState(false);
  const { allMyPatients, hasPatients } = useAuth();

  const NoPatientsBanner = () => (
  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.5 }}
    className="text-center bg-gray-800 p-10 rounded-2xl border border-indigo-400/10 shadow-xl text-white max-w-xl mt-8"
  >
    <h3 className="text-2xl font-semibold text-indigo-300 mb-3">No Patients Found</h3>
    <p className="text-gray-400 mb-2">You haven’t added any patients yet.</p>
    <p className="text-gray-500 text-sm">Click the “Add Patient” button to get started.</p>
  </motion.div>
);


  return (
    <section
      id="patients"
      className="min-h-screen py-20 px-6 bg-gray-900 text-white flex flex-col items-center"
    >
      <motion.h2
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl font-bold text-indigo-400 mb-6 text-center"
      >
        Patients List
      </motion.h2>

      <button
        onClick={() => setShowForm(!showForm)}
        className="mb-10 px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded-xl flex items-center gap-2 transition cursor-pointer"
      >
        {showForm ? <X size={18} /> : <PlusCircle size={18} />}
        {showForm ? "Cancel" : "Add Patient"}
      </button>
      {!showForm && (!hasPatients || allMyPatients.length === 0) && <NoPatientsBanner />}
      {showForm ? (
        <PatientForm setShowForm={setShowForm} />
      ) : (
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.15,
              },
            },
          }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl"
        >
          {allMyPatients.map((patient: any) => (
            // Patient Card
            <motion.div
              key={patient._id}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="bg-gradient-to-br from-gray-800 via-gray-900 to-black rounded-3xl p-8 shadow-2xl border border-indigo-500/20 hover:border-indigo-500/40 transition-all"
            >
              <div className="flex items-center gap-6 mb-6">
                <UserCircle size={48} className="text-indigo-400" />
                <div>
                  <h3 className="text-2xl font-bold text-white">{patient.name}</h3>
                  <p className="text-sm text-gray-400 flex items-center gap-2 mt-1">
                    <BadgeCheck size={16} className="text-green-400" />
                    ID: {patient._id}
                  </p>
                </div>
              </div>

              <div className="space-y-2 text-gray-300 text-lg">
                <p className="flex items-center gap-3">
                  <Mail size={18} className="text-indigo-300" /> {patient.email}
                </p>
                <p className="flex items-center gap-3">
                  <Phone size={18} className="text-indigo-300" /> {patient.phone}
                </p>
                <p className="flex items-center gap-3">
                  <span className="text-indigo-300 text-lg">
                    {patient.gender === "Male" ? "♂️" : patient.gender === "Female" ? "♀️" : "⚧️"}
                  </span>
                  {patient.gender || "Not specified"}
                </p>

              </div>

              <div className="mt-6">
                <span
                  className={`inline-block px-4 py-1.5 rounded-full text-sm font-semibold tracking-wide shadow ${patient.status === "Admitted"
                    ? "bg-green-600 text-white"
                    : patient.status === "Discharged"
                      ? "bg-blue-600 text-white"
                      : "bg-yellow-400 text-black"
                    }`}
                >
                  {patient.status}
                </span>
              </div>
            </motion.div>

          ))}
        </motion.div>
      )}
    </section>
  );
}
