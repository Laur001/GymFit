"use client";

import { motion } from 'framer-motion';
import { useState } from 'react';
import Navbar from '../components/Navbar';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setFormData({ name: '', email: '', message: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
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
        id="contact"
        className="min-h-screen flex items-center justify-center py-20 section-gradient"
        initial="hidden"
        animate="visible"
        variants={staggerChildren}
      >
        <div className="max-w-4xl mx-auto text-center px-4">
          <motion.h2
            className="mb-6 text-white"
            variants={fadeInUp}
          >
            Get in Touch
          </motion.h2>
          <motion.form
            className="flex flex-col gap-4 max-w-md mx-auto"
            onSubmit={handleSubmit}
            variants={staggerChildren}
          >
            <motion.input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              className="p-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-red-600"
              required
              variants={fadeInUp}
            />
            <motion.input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              className="p-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-red-600"
              required
              variants={fadeInUp}
            />
            <motion.textarea
              name="message"
              placeholder="Your Message"
              value={formData.message}
              onChange={handleChange}
              className="p-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-red-600 h-32"
              required
              variants={fadeInUp}
            />
            <motion.button
              type="submit"
              className="btn-primary relative overflow-hidden"
              variants={fadeInUp}
              whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="relative z-10">Send Message</span>
            </motion.button>
            {submitted && (
              <motion.p
                className="text-green-500"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              >
                Message sent successfully!
              </motion.p>
            )}
          </motion.form>
        </div>
      </motion.section>
    </div>
  );
}