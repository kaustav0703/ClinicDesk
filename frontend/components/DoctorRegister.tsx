"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { useAuth } from "@/context/AuthContext";
import { FiMail, FiLock, FiUser, FiPhone, FiBriefcase } from "react-icons/fi";
import axios from 'axios';

const SPECIALIZATIONS = [
  "Dermatology",
  "Gastroenterologist",
  "Oncologist",
  "Family medicine",
  "Neurology",
  "Internal medicine",
  "Cardiologist",
  "Ophthalmologist",
  "Pediatrics",
  "Geriatric medicine",
  "Immunology",
  "Obstetrics and gynaecology",
  "Anesthesiology",
  "Endocrinologist",
  "General Surgery",
  "Infectious disease physician",
  "Orthopaedist",
  "Colorectal surgery",
  "Emergency medicine",
  "Hematology",
  "Pathology",
  "Psychiatry",
  "Radiology",
  "Hospice and palliative medicine",
];

export default function DoctorRegister() {
  const { registerState, setRegisterState } = useAuth();
  const [form, setForm] = useState({
    email: "",
    password: "",
    name: "",
    specialization: "",
    phone: "",
  });
  const [message, setMessage] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };


  // Handle image input
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("email", form.email);
    formData.append("password", form.password);
    formData.append("name", form.name);
    formData.append("specialization", form.specialization);
    formData.append("phone", form.phone);
    if (image) formData.append("image", image);

    try {
      const res = await axios.post(
        `${apiUrl}/doctors/register`, // Make sure it's the correct backend URL
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (res.data.success) {
        setMessage("Registration successful. You can now log in.");
        setForm({
          email: "",
          password: "",
          name: "",
          specialization: "",
          phone: "",
        });
        setImage(null);
      } else {
        setMessage(res.data.message || "Something went wrong.");
      }
    } catch (error: any) {
      console.error(error);
      setMessage("Server error. Please try again.");
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gray-900 text-white px-6 font-inter">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-2xl bg-gray-800 p-10 rounded-3xl shadow-2xl"
      >
        <h2 className="text-4xl font-extrabold text-center mb-8 text-indigo-400">
          Doctor Registration
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* name */}
          <div>
            <label className="block mb-1 text-sm font-medium">Name</label>
            <div className="flex items-center bg-gray-700 rounded-md">
              <FiUser className="mx-3 text-gray-400" />
              <input
                name="name"
                type="text"
                required
                className="w-full px-3 py-2 bg-transparent text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded-md"
                placeholder="Enter your name"
                value={form.name}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block mb-1 text-sm font-medium">Email</label>
            <div className="flex items-center bg-gray-700 rounded-md">
              <FiMail className="mx-3 text-gray-400" />
              <input
                name="email"
                type="email"
                required
                className="w-full px-3 py-2 bg-transparent text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded-md"
                placeholder="Enter your email"
                value={form.email}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block mb-1 text-sm font-medium">Password</label>
            <div className="flex items-center bg-gray-700 rounded-md">
              <FiLock className="mx-3 text-gray-400" />
              <input
                name="password"
                type="password"
                required
                className="w-full px-3 py-2 bg-transparent text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded-md"
                placeholder="Enter your password"
                value={form.password}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Specialization */}
          <div>
            <label className="block mb-1 text-sm font-medium">Specialization</label>
            <div className="flex items-center bg-gray-700 rounded-md">
              <FiBriefcase className="mx-3 text-gray-400" />
              <input
                name="specialization"
                list="specializations"
                required
                className="w-full px-3 py-2 bg-transparent text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded-md"
                placeholder="Search or select specialization"
                value={form.specialization}
                onChange={handleChange}
              />
              <datalist id="specializations">
                {SPECIALIZATIONS.map((spec) => (
                  <option key={spec} value={spec} />
                ))}
              </datalist>
            </div>
          </div>

          {/* Phone */}
          <div>
            <label className="block mb-1 text-sm font-medium">Phone</label>
            <div className="flex items-center bg-gray-700 rounded-md">
              <FiPhone className="mx-3 text-gray-400" />
              <input
                name="phone"
                type="tel"
                required
                className="w-full px-3 py-2 bg-transparent text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded-md"
                placeholder="Enter your phone number"
                value={form.phone}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Image */}
          <div>
            <label className="block mb-1 text-sm font-medium">Profile Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full px-3 py-2 bg-gray-700 text-white rounded-md"
            />
          </div>


          {/* Submit */}
          <button
            type="submit"
            className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 rounded-xl font-semibold text-lg transition"
          >
            Register
          </button>
        </form>

        {/* Message */}
        {message && (
          <p className="text-sm text-center mt-4 text-gray-300">{message}</p>
        )}

        {/* Switch to login */}
        <p className="text-sm mt-6 text-center text-gray-400">
          Already have an account?{" "}
          <button
            className="text-indigo-400 hover:underline hover:text-indigo-300"
            onClick={() => setRegisterState(false)}
          >
            Log in here
          </button>
        </p>
      </motion.div>
    </section>
  );
}
