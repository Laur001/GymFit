"use client";

import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';

export default function Testimonials() {
  const slideIn = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  const staggerChildren = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        ease: "easeOut",
      },
    },
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      <motion.section
        className="min-h-screen flex items-center justify-center py-20 section-gradient"
        initial="hidden"
        animate="visible"
        variants={staggerChildren}
      >
        <div className="max-w-6xl mx-auto text-center px-4">
          <motion.h2
            className="mb-12 text-white"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            What Our Members Say
          </motion.h2>
          <motion.div className="grid grid-cols-1 md:grid-cols-2 gap-8" variants={staggerChildren}>
            <motion.div
              className="testimonial-card"
              variants={slideIn}
              whileHover={{
                scale: 1.05,
                boxShadow: "0 10px 25px rgba(0, 0, 0, 0.3)",
                transition: { duration: 0.3, ease: "easeOut" },
              }}
            >
              <p className="text-gray-300 mb-4">
                "GymFit changed my life! The trainers are amazing, and the community keeps me
                motivated every day."
              </p>
              <p className="text-red-600 font-semibold">- Sarah K.</p>
            </motion.div>
            <motion.div
              className="testimonial-card"
              variants={slideIn}
              whileHover={{
                scale: 1.05,
                boxShadow: "0 10px 25px rgba(0, 0, 0, 0.3)",
                transition: { duration: 0.3, ease: "easeOut" },
              }}
            >
              <p className="text-gray-300 mb-4">
                "I’ve never felt stronger. The nutrition plans and group classes are a game-changer!"
              </p>
              <p className="text-red-600 font-semibold">- Mike T.</p>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
}