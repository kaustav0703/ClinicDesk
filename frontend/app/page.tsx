"use client";
import { useEffect } from "react";
import HomeSection from "@/components/HomeSection";
import DoctorSection from "@/components/DoctorSection";
import PatientsSection from "@/components/PatientsSection";
import PatientSection from "@/components/PatientSection";
import PatientEdit from "@/components/PatientEdit";
import DoctorLogin from "@/components/DoctorLogin";
import DoctorRegister from "@/components/DoctorRegister";
import AppointmentCalendar from "@/components/AppointmentCalendar";
import { useAuth } from "@/context/AuthContext";
import axios from 'axios';

// DUMMY DOCTOR DATA
const currentDoctor = {
  id: "d123",
  name: "Dr. Ayesha Khan",
  phone: "+1 234 567 8901",
  email: "ayesha.khan@hospitalapi.com",
  specialization: "Cardiologist",
  avatar: "https://i.pravatar.cc/150?img=47",
};

const patients = [
  { id: "P001", name: "Alice Johnson", email: "alice@example.com", status: "Admitted" as const },
  { id: "P002", name: "Bob Smith", email: "bob@example.com", status: "Under Observation" as const },
  { id: "P003", name: "Charlie Ray", email: "charlie@example.com", status: "Discharged" as const }
];

export default function Home() {
  const { setAllMyPatients, setLoggedInDoctor, loggedIn, login, logout, registerState, setLoggedIn, loggedInDoctor, doctorLoginToken, setHasPatients, allMyPatients, isCurrentPatientSelected, currentPatient, isPatientEdit } = useAuth();
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {

    // Check if user has logged in
    async function getUser() {
      console.log("Checking if user is logged in...");
      try {
        const response = await axios.get(`${apiUrl}/`, { withCredentials: true });
        if (response.status === 200 || response.status == 201) {
          const newResponse = await axios.post(`${apiUrl}/doctors/cookieLogin`, { email: response.data.user.email }, { withCredentials: true });
          setLoggedInDoctor(newResponse.data.doctor);
          setLoggedIn(true);
        }
      } catch (error: any) {
        setLoggedIn(false);
      }
    }
    getUser();

    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash) {
        const element = document.querySelector(hash);
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }
    };

    handleHashChange();
    window.addEventListener("hashchange", handleHashChange);

    return () => window.removeEventListener("hashchange", handleHashChange);

  }, []);

  // Get all patients
  useEffect(() => {
    async function getAllPatients() {
      try {
        const response = await axios.get(`${apiUrl}/patients/all_patients`, {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${doctorLoginToken}`
          }
        });

        if (response.status === 200) {
          const allPatients = response.data.body;
          console.log(allPatients);
          const myPatients = allPatients.filter((patient: any) => patient.doctor === loggedInDoctor._id);
          setAllMyPatients(myPatients);
        } else {
          console.log("Error getting patients");
        }
      } catch (error: any) {
        console.log("Error getting patients");
      }
      finally {

      }
    }
    getAllPatients();
  }, [loggedInDoctor]);

  // Check if patients exist
  useEffect(() => {
    if (allMyPatients.length > 0) {
      setHasPatients(true);
    }
  }, [allMyPatients]);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex flex-col items-center">
      <HomeSection />
      {/* Toggle login for testing */}
      <div className="flex justify-center my-4">
        {!loggedIn && !registerState && <DoctorLogin />}
        {!loggedIn && registerState && <DoctorRegister />}
      </div>

      {loggedIn && (
        <>
          <DoctorSection doctor={currentDoctor} />

          {isPatientEdit ? (
            <PatientEdit patientData={currentPatient} />
          ) : isCurrentPatientSelected ? (
            <PatientSection patientData={currentPatient} />
          ) : (
            <PatientsSection patients={patients} />
          )}

          <AppointmentCalendar />
        </>
      )}
      
    </div>
  );
}
