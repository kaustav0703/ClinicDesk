"use client";
import { motion, useAnimation, useInView } from "framer-motion";
import { ArrowDownCircle } from "lucide-react";
import { useEffect, useRef } from "react";

const headingWords = ["Welcome", "to", "Clinic", "Desk"];

export default function HomeSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start("float");
    } else {
      controls.stop();
    }
  }, [isInView, controls]);

  return (
    <section
      ref={ref}
      id="home"
      className="min-h-screen bg-gradient-to-br from-indigo-100 to-white dark:from-gray-900 dark:to-gray-800 flex flex-col items-center justify-center text-center px-6"
    >
      {/* Floating Text Animation */}
      <motion.div
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={{
          hidden: {},
          visible: {
            transition: {
              staggerChildren: 0.15,
            },
          },
        }}
        className="flex flex-wrap justify-center gap-2 mb-4"
      >
        {headingWords.map((word, index) => (
          <motion.span
            key={index}
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
              float: {
                y: [0, -6, 0],
                transition: {
                  repeat: Infinity,
                  duration: 2,
                  ease: "easeInOut",
                },
              },
            }}
            animate={controls}
            className="text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-300 dark:to-purple-400"
          >
            {word}
          </motion.span>
        ))}
      </motion.div>

      <motion.p
        initial={{ opacity: 0, scale: 0.95 }}
        animate={isInView ? { opacity: 1, scale: 1 } : {}}
        transition={{ delay: 0.5, duration: 0.7 }}
        className="text-lg md:text-xl text-gray-700 dark:text-gray-300 max-w-2xl mb-8"
      >
        ClinicDesk – a full-stack app built with Next.js, Node.js, and MongoDB Atlas for doctors to manage appointments, medical records, and profiles, featuring secure authentication and an intuitive, responsive interface.
      </motion.p>

      <motion.a
        href="#doctors"
        initial={{ opacity: 0, y: 10 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.8, duration: 0.6 }}
        className="inline-flex items-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-full shadow hover:bg-indigo-700 dark:hover:bg-indigo-500 transition"
      >
        Explore API
        <motion.div
          animate={{ y: [0, -4, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
        >
          <ArrowDownCircle size={20} />
        </motion.div>
      </motion.a>
    </section>
  );
}
