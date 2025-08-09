"use client"; // Enables client-side rendering in Next.js App Router

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Mail,
  BadgeCheck,
  UserCircle,
  PlusCircle,
  X,
  Phone,
  Eye,
  Pen
} from "lucide-react";

import axios from "axios";
import { useAuth } from "@/context/AuthContext";

// Import form component for adding new patients
import PatientForm from "./PatientForm";

import PatientSection from "./PatientSection";

// Import a loading spinner component
import { LoaderFive } from "@/components/ui/loader";

export default function PatientsSection({ patients }: any) {
  // States
  const [showForm, setShowForm] = useState(false); // toggles patient form
  const [hasPatients, setHasPatients] = useState(false); // true if patient data is non-empty
  const [isLoading, setIsLoading] = useState(true); // loading indicator
  const [allMyPatients, setAllMyPatients] = useState([]); // array of all patients

  const { setCurrentPatient, setIsCurrentPatientSelected, setIsPatientEdit } = useAuth();

  // Environment variable for backend API base URL
  const backendUrl = process.env.NEXT_PUBLIC_API_URL;

  // Fetch patients on component mount
  useEffect(() => {
    async function getAllMyPatients() {
      try {
        const response = await axios.get(`${backendUrl}/patients/all_patients`, {
          withCredentials: true, // for cookie-based auth
        });

        // Store the patients
        const patients = response.data.body || [];
        setAllMyPatients(patients);
        setHasPatients(patients.length > 0);
      } catch (err) {
        console.error("Error fetching patients:", err);
      } finally {
        setIsLoading(false); // stop loading spinner
      }
    }

    getAllMyPatients();
  }, []);

  // A fallback component when no patients are found
  const NoPatientsBanner = () => (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="text-center bg-gray-800 p-10 rounded-2xl border border-indigo-400/10 shadow-xl text-white max-w-xl mt-8"
    >
      <h3 className="text-2xl font-semibold text-indigo-300 mb-3">
        No Patients Found
      </h3>
      <p className="text-gray-400 mb-2">
        You haven’t added any patients yet.
      </p>
      <p className="text-gray-500 text-sm">
        Click the “Add Patient” button to get started.
      </p>
    </motion.div>
  );

  // Open Patient Section
  const handlePatientClick = (patient: any) => {
    setCurrentPatient(patient);
    setIsCurrentPatientSelected(true);
    console.log("Patient Selected");
  }

  const handleDeletePatient = async (patientId: string) => {
    const confirmed = window.confirm("Are you sure you want to delete this patient?");
    if (!confirmed) return;

    try {
      await axios.delete(`${backendUrl}/patients/delete/${patientId}`, {
        withCredentials: true,
      });

      // Remove from UI
      setAllMyPatients((prev) => prev.filter((p: any) => p._id !== patientId));
      if (allMyPatients.length - 1 === 0) setHasPatients(false);
    } catch (err) {
      console.error("Error deleting patient:", err);
      alert("Failed to delete patient. Please try again.");
    }
  };


  return (
    <section
      id="patients"
      className="min-h-screen py-20 px-6 bg-gray-900 text-white flex flex-col items-center"
    >
      {/* Heading */}
      <motion.h2
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl font-bold text-indigo-400 mb-6 text-center"
      >
        Patients List
      </motion.h2>

      {/* Toggle Button for Add Patient Form */}
      <button
        onClick={() => setShowForm(!showForm)}
        className="mb-10 px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded-xl flex items-center gap-2 transition cursor-pointer"
      >
        {showForm ? <X size={18} /> : <PlusCircle size={18} />}
        {showForm ? "Cancel" : "Add Patient"}
      </button>

      {/* Loading Spinner */}
      {isLoading && <LoaderFive text="Loading Your Patients..." className="text-4xl" />}

      {/* No Patients Banner */}
      {!isLoading && !showForm && (!hasPatients || allMyPatients.length === 0) && (
        <NoPatientsBanner />
      )}

      {/* Add Patient Form */}
      {!isLoading && showForm && <PatientForm setShowForm={setShowForm} />}

      {/* Patient Cards Grid */}
      {!isLoading && !showForm && hasPatients && (
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
              whileHover={{ scale: 1.04, rotate: 0.3 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="relative overflow-hidden rounded-3xl shadow-2xl border border-indigo-500/20 hover:border-indigo-500/40 bg-gradient-to-br from-gray-800 via-gray-900 to-black"
            >
              {/* Header strip */}
              <div className="px-6 py-4 flex items-center gap-4">
                <UserCircle size={42} className="text-indigo-300" />
                <div>
                  <h3 className="text-xl font-medium text-indigo-200">{patient.name}</h3>
                  <p className="text-xs text-indigo-400 flex items-center gap-1">
                    <BadgeCheck size={14} /> {patient._id}
                  </p>
                </div>
              </div>

              {/* Body */}
              <div className="p-6 space-y-3 text-gray-300 text-base">
                <p className="flex items-center gap-3">
                  <Mail size={18} className="text-indigo-300" />
                  <a href={`mailto:${patient.email}`} className="hover:underline">{patient.email}</a>
                </p>
                <p className="flex items-center gap-3">
                  <Phone size={18} className="text-indigo-300" />
                  <a href={`tel:${patient.phone}`} className="hover:underline">{patient.phone}</a>
                </p>
                <p className="flex items-center gap-3">
                  <span className="text-indigo-300">
                    {patient.gender === "Male" ? "♂️" : patient.gender === "Female" ? "♀️" : "⚧️"}
                  </span>
                  {patient.gender || "Not specified"}
                </p>
                {patient.age && (
                  <p className="flex items-center gap-3">
                    🎂 {patient.age} years old
                  </p>
                )}
              </div>

              {/* Footer */}
              <div className="px-6 py-4 flex items-center justify-between border-t border-gray-700">
                {/* Status badge */}
                <span
                  className={`px-4 py-1.5 rounded-full text-sm font-semibold shadow-md 
        ${patient.status === "Admitted"
                      ? "bg-green-600 text-white shadow-green-500/30"
                      : patient.status === "Discharged"
                        ? "bg-blue-600 text-white shadow-blue-500/30"
                        : "bg-yellow-400 text-black shadow-yellow-400/30"
                    }`}
                >
                  {patient.status}
                </span>

                {/* Action buttons */}
                <div className="flex gap-2">
                  <button
                    onClick={() => handlePatientClick(patient)}
                    className="cursor-pointer p-2 bg-gray-800 hover:bg-indigo-600 rounded-lg transition"
                    title="View"
                  >
                    <Eye size={20} />
                  </button>
                  <button
                    onClick={() => {
                      setIsPatientEdit(true);
                      setCurrentPatient(patient);
                    }}
                    className="cursor-pointer p-2 bg-gray-800 hover:bg-yellow-500 rounded-lg transition"
                    title="Edit"
                  >
                    <Pen size={20} />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeletePatient(patient._id);
                    }}
                    className="cursor-pointer p-2 bg-gray-800 hover:bg-red-700 rounded-lg transition"
                    title="Delete"
                  >
                    🗑️
                  </button>
                </div>
              </div>
            </motion.div>

          ))}

        </motion.div>
      )}
    </section>
  );
}
