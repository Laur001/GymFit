"use client";

import { motion } from 'framer-motion';
import { useState } from 'react';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import { useRouter } from 'next/navigation';

export default function Login() {
  const router = useRouter();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }

      localStorage.setItem('token', data.token);
      router.push('/');
    } catch (err: any) {
      setError(err.message || 'Invalid email or password');
    }
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
      {/* Navigation Bar */}
      <Navbar />

      {/* Login Form */}
      <motion.section
        className="min-h-screen flex items-center justify-center py-20 section-gradient"
        initial="hidden"
        animate="visible"
        variants={staggerChildren}
      >
        <div className="max-w-md w-full mx-auto px-4">
          <motion.h2
            className="mb-6 text-center text-white"
            variants={fadeInUp}
          >
            Login
          </motion.h2>
          <motion.form
            className="flex flex-col gap-4"
            onSubmit={handleSubmit}
            variants={staggerChildren}
          >
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
            <motion.input
              type="password"
              name="password"
              placeholder="Your Password"
              value={formData.password}
              onChange={handleChange}
              className="p-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-red-600"
              required
              variants={fadeInUp}
            />
            {error && (
              <motion.p
                className="text-red-500 text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              >
                {error}
              </motion.p>
            )}
            <motion.button
              type="submit"
              className="btn-primary relative overflow-hidden"
              variants={fadeInUp}
              whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="relative z-10">Login</span>
            </motion.button>
          </motion.form>
          <motion.p
            className="text-center text-gray-400 mt-4"
            variants={fadeInUp}
          >
            Don’t have an account?{' '}
            <Link href="/register" className="text-red-600 hover:underline">
              Register
            </Link>
          </motion.p>
        </div>
      </motion.section>
    </div>
  );
}