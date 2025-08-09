"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Home, User, Stethoscope, CalendarDays } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export default function Navbar() {
  const [activeSection, setActiveSection] = useState("home");
  const { loggedIn } = useAuth();

  const sections = loggedIn
    ? [
        { name: "Home", id: "home", icon: <Home size={20} /> },
        { name: "Doctors Profile", id: "doctors", icon: <Stethoscope size={20} /> },
        { name: "Your Patients", id: "patients", icon: <User size={20} /> },
        { name: "Appointments", id: "appointments", icon: <CalendarDays size={20} /> }
      ]
    : [
        { name: "Home", id: "home", icon: <Home size={20} /> },
        { name: "SignUp", id: "signup", icon: <User size={20} /> },
      ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY + window.innerHeight / 2;

      const visibleSection = sections
        .map((section) => {
          const el = document.getElementById(section.id);
          if (!el) return null;
          return {
            id: section.id,
            top: el.offsetTop,
            bottom: el.offsetTop + el.offsetHeight
          };
        })
        .filter(Boolean)
        .sort((a, b) => a!.top - b!.top)
        .find((section) => scrollY >= section!.top && scrollY < section!.bottom);

      if (visibleSection && visibleSection.id !== activeSection) {
        setActiveSection(visibleSection.id);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // run once on load

    return () => window.removeEventListener("scroll", handleScroll);
  }, [sections]); // ✅ no activeSection here

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const offset = -60;
      const top = el.getBoundingClientRect().top + window.scrollY + offset;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 80 }}
      className="fixed top-0 left-0 right-0 z-40 bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-gray-900 dark:to-gray-800 text-white shadow-md"
    >
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="text-2xl font-bold cursor-pointer text-white"
        >
          🏥 Clinic Desk
        </motion.div>

        <div className="flex gap-4">
          {sections.map((section) => (
            <motion.button
              whileTap={{ scale: 0.95 }}
              whileHover={{ scale: 1.05 }}
              key={section.id}
              onClick={() => {
                setActiveSection(section.id);
                scrollToSection(section.id);
              }}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-200 ${
                activeSection === section.id
                  ? "bg-white text-indigo-600 font-semibold shadow dark:bg-white dark:text-indigo-700"
                  : "hover:bg-white/20 dark:hover:bg-white/10 text-white"
              }`}
            >
              {section.icon}
              <span>{section.name}</span>
            </motion.button>
          ))}
        </div>
      </div>
    </motion.nav>
  );
}
