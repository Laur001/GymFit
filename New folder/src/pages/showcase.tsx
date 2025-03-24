"use client";

import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';

export default function Showcase() {
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
        id="showcase"
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
            Showcase
          </motion.h2>
          <motion.div className="grid grid-cols-1 md:grid-cols-3 gap-8" variants={staggerChildren}>
            <motion.div
              className="portfolio-item"
              variants={fadeInUp}
              whileHover={{ scale: 1.05, transition: { duration: 0.3, ease: "easeOut" } }}
            >
              <img
                src="https://cdn.pixabay.com/photo/2016/11/19/12/43/barbell-1839086_1280.jpg"
                alt="Training"
                className="w-full h-64 object-cover rounded-xl shadow-lg"
              />
              <motion.div
                className="portfolio-overlay"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1, transition: { duration: 0.3, ease: "easeOut" } }}
              >
                <div className="portfolio-title">Training</div>
                <a href="#" className="text-white font-semibold">Learn More</a>
              </motion.div>
            </motion.div>
            <motion.div
              className="portfolio-item"
              variants={fadeInUp}
              whileHover={{ scale: 1.05, transition: { duration: 0.3, ease: "easeOut" } }}
            >
              <img
                src="https://cdn.pixabay.com/photo/2017/04/27/08/29/man-2264825_1280.jpg"
                alt="Classes"
                className="w-full h-64 object-cover rounded-xl shadow-lg"
              />
              <motion.div
                className="portfolio-overlay"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1, transition: { duration: 0.3, ease: "easeOut" } }}
              >
                <div className="portfolio-title">Classes</div>
                <a href="#" className="text-white font-semibold">Learn More</a>
              </motion.div>
            </motion.div>
            <motion.div
              className="portfolio-item"
              variants={fadeInUp}
              whileHover={{ scale: 1.05, transition: { duration: 0.3, ease: "easeOut" } }}
            >
              <img
                src="https://cdn.pixabay.com/photo/2017/11/29/16/12/berries-2986532_1280.jpg"
                alt="Nutrition"
                className="w-full h-64 object-cover rounded-xl shadow-lg"
              />
              <motion.div
                className="portfolio-overlay"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1, transition: { duration: 0.3, ease: "easeOut" } }}
              >
                <div className="portfolio-title">Nutrition</div>
                <a href="#" className="text-white font-semibold">Learn More</a>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
}