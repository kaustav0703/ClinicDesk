"use client";
import { useAuth } from "@/context/AuthContext";
import { motion } from "framer-motion";
import {
  Mail,
  Phone,
  Stethoscope,
  BadgeCheck,
  Sparkles,
} from "lucide-react";
import { useEffect } from "react";

type Doctor = {
  id: string;
  name: string;
  email: string;
  phone: string;
  specialization: string;
  avatar?: string;
};

interface Props {
  doctor: Doctor;
}

export default function DoctorSection({ doctor }: Props) {

  const { loggedInDoctor, setLoggedInDoctor} = useAuth();

  useEffect(() => {
    if(loggedInDoctor.length === 0) {
      setLoggedInDoctor(doctor);
    }
  }, []);

  return (
    <section
      id="doctors"
      className="min-h-screen py-20 px-6 bg-gray-900 text-white flex items-center justify-center"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="bg-gray-800 rounded-3xl shadow-2xl p-10 max-w-2xl w-full text-center border border-indigo-500/20"
      >
        {/* Floating Avatar */}
        <motion.img
          src={loggedInDoctor.image || "https://i.pravatar.cc/150?img=50"}
          alt={loggedInDoctor.name}
          className="w-36 h-36 rounded-full object-cover mx-auto mb-6 border-4 border-indigo-600 shadow-lg"
          animate={{ y: [0, -10, 0] }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Bouncing Heading */}
        <motion.h2
          className="text-4xl md:text-5xl font-bold text-white mb-3 flex justify-center items-center gap-2"
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
        >
          <Sparkles size={30} className="text-indigo-400" />
          {loggedInDoctor.name}
        </motion.h2>

        <motion.p
          className="text-xl md:text-2xl text-indigo-400 mb-8 flex justify-center items-center gap-2"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.7 }}
        >
          <Stethoscope size={20} />
          {loggedInDoctor.specialization}
        </motion.p>

        {/* Info Section */}
        <motion.div
          className="text-lg md:text-xl text-gray-300 space-y-4 text-left px-6"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { staggerChildren: 0.2 },
            },
          }}
        >
          <motion.p className="flex items-center gap-3" variants={{ hidden: {}, visible: {} }}>
            <BadgeCheck size={20} className="text-green-400" />
            <strong>ID:</strong> {loggedInDoctor._id}
          </motion.p>
          <motion.p className="flex items-center gap-3" variants={{ hidden: {}, visible: {} }}>
            <Mail size={20} />
            <strong>Email:</strong> {loggedInDoctor.email}
          </motion.p>
          <motion.p className="flex items-center gap-3" variants={{ hidden: {}, visible: {} }}>
            <Phone size={20} />
            <strong>Phone:</strong> {loggedInDoctor.phone}
          </motion.p>
        </motion.div>
      </motion.div>
    </section>
  );
}
