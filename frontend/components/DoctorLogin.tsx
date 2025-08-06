"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useAuth } from "@/context/AuthContext";
import axios from "axios";

export default function DoctorLogin() {

  const { loggedInDoctor, setAllMyPatients, setDoctorLoginToken, setLoggedInDoctor, setLoggedIn, registerState, setRegisterState, doctorLoginToken } = useAuth();
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [hasSignedIn, setHasSignedIn] = useState(false);
  const [message, setMessage] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    // You can integrate your login logic or API call here
    try {
      const response = await axios.post(
        `${apiUrl}/doctors/login`,
        { email, password },
        {
          withCredentials: true // ✅ crucial to send and accept cookies
        }
      );

      if (response.status === 200) {
        if (response.status === 200) {
          setMessage("Login successful");
          setLoggedInDoctor(response.data.doctor);
          setHasSignedIn(true);
          setDoctorLoginToken(response.data.token);
          setTimeout(() => {
            setHasSignedIn(false);
            setLoggedIn(true);
          }, 1500); // Auto-hide popup after 3s
        }
      }
    } catch (error: any) {
      console.error("Login error:", error);
      const status = error?.response?.status;

      if (status === 401) {
        setMessage("Invalid username or password");
      } else if (status === 500) {
        setMessage("Server error. Please try again.");
      } else {
        setMessage("Access Denied or Network Error");
      }
      setHasSignedIn(true);
      setTimeout(() => setHasSignedIn(false), 3000);
    }
  };

  useEffect(() => {
    // Get all patients
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
          const myPatients = allPatients.filter((patient: any) => patient.doctor === loggedInDoctor._id);
          console.log("*******************");
          console.log(myPatients);
          console.log("*******************");
          setAllMyPatients(myPatients);
        } else {
          console.log("Error getting patients");
        }
      } catch (error: any) {
        console.log("Error getting patients");
      }
    }
    getAllPatients();
  }, [loggedInDoctor]);

  const handleReset = () => {
    setEmail("");
    setPassword("");
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gray-900 text-white px-4" id="signup">
      {hasSignedIn && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 30 }}
          transition={{ duration: 0.3 }}
          className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-black text-white px-4 py-2 rounded shadow-lg z-50"
        >
          {message}
        </motion.div>
      )}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md bg-gray-800 p-8 rounded-2xl shadow-lg"
      >
        <h2 className="text-3xl font-bold text-center mb-6 text-indigo-400">
          Doctor Login
        </h2>
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block mb-1 text-sm font-medium">Email</label>
            <input
              type="email"
              className="w-full px-4 py-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium">Password</label>
            <input
              type="password"
              className="w-full px-4 py-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="flex gap-4">
            <button
              type="submit"
              className="flex-1 py-2 bg-indigo-600 hover:bg-indigo-700 rounded-md font-semibold transition"
            >
              Login
            </button>
            <button
              type="button"
              onClick={handleReset}
              className="flex-1 py-2 bg-gray-600 hover:bg-gray-700 rounded-md font-semibold transition"
            >
              Reset
            </button>
          </div>
        </form>

        <p className="text-sm mt-6 text-center text-gray-400">
          Don't have an account?{" "}
          <button
            className="text-indigo-400 hover:underline hover:text-indigo-300"
            onClick={() => setRegisterState(true)}
          >
            Register new doctor
          </button>
        </p>
      </motion.div>
    </section>
  );
}
