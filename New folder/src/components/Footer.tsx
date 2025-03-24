"use client";

import { motion } from 'framer-motion';
import { FaInstagram, FaTwitter, FaFacebook } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="py-8 bg-black text-center">
      <div className="flex justify-center space-x-6 mb-4">
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
      </div>
      <p className="text-gray-400">
        © 2025 GymFit. All rights reserved. | Designed with 💪 by You
      </p>
    </footer>
  );
}