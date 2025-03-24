"use client";

import { motion } from 'framer-motion';

export default function ShowcaseSection() {
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
      id="showcase"
      className="py-20 bg-gray-800"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={staggerChildren}
    >
      <div className="max-w-6xl mx-auto text-center px-4">
        <h2 className="text-4xl font-bold mb-12 text-white">Showcase</h2>
        <motion.div className="grid grid-cols-1 md:grid-cols-3 gap-8" variants={staggerChildren}>
          <motion.div className="portfolio-item" variants={fadeInUp}>
            <img
              src="https://cdn.pixabay.com/photo/2016/11/19/12/43/barbell-1839086_1280.jpg"
              alt="Training"
              className="w-full h-64 object-cover rounded-lg"
            />
            <div className="portfolio-overlay">
              <div className="portfolio-title">Training</div>
              <a href="#" className="text-white font-semibold">Learn More</a>
            </div>
          </motion.div>
          <motion.div className="portfolio-item" variants={fadeInUp}>
            <img
              src="https://cdn.pixabay.com/photo/2017/04/27/08/29/man-2264825_1280.jpg"
              alt="Classes"
              className="w-full h-64 object-cover rounded-lg"
            />
            <div className="portfolio-overlay">
              <div className="portfolio-title">Classes</div>
              <a href="#" className="text-white font-semibold">Learn More</a>
            </div>
          </motion.div>
          <motion.div className="portfolio-item" variants={fadeInUp}>
            <img
              src="https://cdn.pixabay.com/photo/2017/11/29/16/12/berries-2986532_1280.jpg"
              alt="Nutrition"
              className="w-full h-64 object-cover rounded-lg"
            />
            <div className="portfolio-overlay">
              <div className="portfolio-title">Nutrition</div>
              <a href="#" className="text-white font-semibold">Learn More</a>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
}