"use client";

import { motion } from 'framer-motion';

export default function TestimonialSection() {
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
      className="py-20 bg-black"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={staggerChildren}
    >
      <div className="max-w-6xl mx-auto text-center px-4">
        <h2 className="text-4xl font-bold mb-12 text-white">What Our Members Say</h2>
        <motion.div className="grid grid-cols-1 md:grid-cols-2 gap-8" variants={staggerChildren}>
          <motion.div
            className="testimonial-card"
            variants={fadeInUp}
            whileHover={{
              scale: 1.05,
              transition: { duration: 0.3 },
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
            variants={fadeInUp}
            whileHover={{
              scale: 1.05,
              transition: { duration: 0.3 },
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
  );
}