"use client";

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

export default function HeroSection() {
  const tagline = "Unleash Your Inner Strength";
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    let i = 0;
    const type = () => {
      if (i < tagline.length) {
        setDisplayedText(tagline.slice(0, i + 1));
        i++;
        setTimeout(type, 100);
      }
    };
    type();
  }, []);

  return (
    <section
      id="home"
      className="parallax-bg min-h-screen flex items-center justify-center relative overflow-hidden"
      style={{
        backgroundImage: "url('https://cdn.pixabay.com/photo/2020/05/22/19/07/fitness-5206699_1280.jpg')",
      }}
    >
      <motion.div
        className="text-center z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <motion.h1
          className="text-5xl md:text-7xl font-extrabold mb-4 tracking-tight hero-text"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-red-600">Gym</span>Fit
        </motion.h1>
        <motion.p
          className="text-xl md:text-2xl mb-6 hero-text"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <span className="tagline-text">{displayedText}</span>
          <span className="animate-pulse">|</span>
        </motion.p>
        <motion.button
          className="btn-primary relative overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
          whileTap={{ scale: 0.95 }}
        >
          <span className="relative z-10">Join Now</span>
        </motion.button>
      </motion.div>
      <div className="absolute inset-0 bg-black opacity-50 z-0"></div>
    </section>
  );
}