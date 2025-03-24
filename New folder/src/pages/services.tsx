"use client";

import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';

export default function Services() {
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  const staggerChildren = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        ease: "easeOut",
      },
    },
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      <motion.section
        id="services"
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
            Our Services
          </motion.h2>
          <motion.div className="grid grid-cols-1 md:grid-cols-3 gap-8" variants={staggerChildren}>
            <motion.div
              className="service-card"
              variants={fadeInUp}
              whileHover={{
                scale: 1.05,
                boxShadow: "0 10px 25px rgba(0, 0, 0, 0.3)",
                transition: { duration: 0.3, ease: "easeOut" },
              }}
            >
              <h3 className="service-title">Personal Training</h3>
              <p className="service-description">
                One-on-one sessions tailored to your unique fitness goals.
              </p>
            </motion.div>
            <motion.div
              className="service-card"
              variants={fadeInUp}
              whileHover={{
                scale: 1.05,
                boxShadow: "0 10px 25px rgba(0, 0, 0, 0.3)",
                transition: { duration: 0.3, ease: "easeOut" },
              }}
            >
              <h3 className="service-title">Group Classes</h3>
              <p className="service-description">
                High-energy classes to keep you motivated and moving.
              </p>
            </motion.div>
            <motion.div
              className="service-card"
              variants={fadeInUp}
              whileHover={{
                scale: 1.05,
                boxShadow: "0 10px 25px rgba(0, 0, 0, 0.3)",
                transition: { duration: 0.3, ease: "easeOut" },
              }}
            >
              <h3 className="service-title">Nutrition Plans</h3>
              <p className="service-description">
                Personalized diets to fuel your body for success.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
}