"use client";

import { motion } from 'framer-motion';

export default function AboutSection() {
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <motion.section
      id="about"
      className="py-20 bg-gray-800"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={fadeInUp}
    >
      <div className="max-w-4xl mx-auto text-center px-4">
        <h2 className="text-4xl font-bold mb-6 text-white">About Us</h2>
        <p className="text-lg text-gray-300">
          At GymFit, we’re passionate about fitness and transformation. Our cutting-edge
          facilities, expert trainers, and supportive community are here to help you crush your
          goals and become the best version of yourself.
        </p>
      </div>
    </motion.section>
  );
}