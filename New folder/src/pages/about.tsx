"use client";

import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';

export default function About() {
  const zoomIn = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.8, ease: "easeOut" } },
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      <motion.section
        id="about"
        className="min-h-screen flex items-center justify-center py-20 section-gradient"
        initial="hidden"
        animate="visible"
        variants={zoomIn}
      >
        <div className="max-w-4xl mx-auto text-center px-4">
          <motion.h2
            className="mb-6 text-white"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          >
            About Us
          </motion.h2>
          <motion.p
            className="text-lg text-gray-300"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
          >
            At GymFit, we’re passionate about fitness and transformation. Our cutting-edge
            facilities, expert trainers, and supportive community are here to help you crush your
            goals and become the best version of yourself.
          </motion.p>
        </div>
      </motion.section>
    </div>
  );
}