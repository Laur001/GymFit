"use client";

import { motion } from 'framer-motion';

export default function ServicesSection() {
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const staggerChildren = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  return (
    <motion.section
      id="services"
      className="py-20 bg-black"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={staggerChildren}
    >
      <div className="max-w-6xl mx-auto text-center px-4">
        <h2 className="text-4xl font-bold mb-12 text-white">Our Services</h2>
        <motion.div className="grid grid-cols-1 md:grid-cols-3 gap-8" variants={staggerChildren}>
          <motion.div
            className="service-card"
            variants={fadeInUp}
            whileHover={{
              scale: 1.05,
              transition: { duration: 0.3 },
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
              transition: { duration: 0.3 },
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
              transition: { duration: 0.3 },
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
  );
}