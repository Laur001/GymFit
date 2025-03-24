"use client";

import { motion } from 'framer-motion';
import { FaInstagram, FaTwitter, FaFacebook } from 'react-icons/fa';
import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Link from 'next/link';

export default function Home() {
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

  const heroVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.8, ease: "easeOut" } },
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      <section
        id="home"
        className="parallax-bg min-h-screen flex items-center justify-center relative overflow-hidden"
        style={{
          backgroundImage: "url('/images/hero-bg.jpg')",
        }}
      >
        <motion.div
          className="text-center z-10"
          initial="hidden"
          animate="visible"
          variants={heroVariants}
        >
          <motion.h1
            className="text-5xl md:text-7xl font-extrabold mb-4 tracking-tight hero-text"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          >
            <span className="text-red-600">Gym</span>Fit
          </motion.h1>
          <motion.p
            className="text-xl md:text-2xl mb-6 hero-text"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
          >
            <span className="tagline-text">{displayedText}</span>
            <span className="animate-pulse">|</span>
          </motion.p>
          <motion.button
            className="btn-primary relative overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6, ease: "easeOut" }}
            whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
            whileTap={{ scale: 0.95 }}
          >
            <Link href="/register">
              <span className="relative z-10">Join Now</span>
            </Link>
          </motion.button>
        </motion.div>
        <div className="hero-overlay"></div>
      </section>

      <motion.section
        className="py-20 section-gradient text-center"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeInUp}
      >
        <div className="max-w-4xl mx-auto px-4">
          <motion.h2
            className="mb-6 text-white"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            Welcome to GymFit
          </motion.h2>
          <motion.p
            className="text-lg text-gray-300 mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            Discover our cutting-edge facilities, expert trainers, and supportive community. Explore
            our services, see our success stories, and get in touch to start your fitness journey
            today!
          </motion.p>
          <motion.div
            className="flex justify-center space-x-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            <Link href="/services">
              <motion.button
                className="btn-primary relative overflow-hidden"
                whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="relative z-10">Explore Services</span>
              </motion.button>
            </Link>
            <Link href="/contact">
              <motion.button
                className="btn-primary relative overflow-hidden"
                whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="relative z-10">Contact Us</span>
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </motion.section>

      <footer className="py-8 bg-black text-center">
        <motion.div
          className="flex justify-center space-x-6 mb-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <motion.a
            href="#"
            className="social-icon"
            whileHover={{ scale: 1.2, transition: { duration: 0.5 } }}
          >
            <FaInstagram size={24} />
          </motion.a>
          <motion.a
            href="#"
            className="social-icon"
            whileHover={{ scale: 1.2, transition: { duration: 0.5 } }}
          >
            <FaTwitter size={24} />
          </motion.a>
          <motion.a
            href="#"
            className="social-icon"
            whileHover={{ scale: 1.2, transition: { duration: 0.5 } }}
          >
            <FaFacebook size={24} />
          </motion.a>
        </motion.div>
        <motion.p
          className="text-gray-400"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          © 2025 GymFit. All rights reserved. | Designed with 💪 by You
        </motion.p>
      </footer>
    </div>
  );
}