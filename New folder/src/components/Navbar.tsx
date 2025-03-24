"use client";

import { motion, useScroll } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import Link from 'next/link';

export default function Navbar() {
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);
  const { user, logout } = useAuth();

  useEffect(() => {
    const unsubscribe = scrollY.onChange((y) => {
      setIsScrolled(y > 50);
    });
    return () => unsubscribe();
  }, [scrollY]);

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 bg-black bg-opacity-90 z-50 py-4 ${isScrolled ? 'nav-scrolled' : ''}`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-6xl mx-auto px-4 flex justify-between items-center">
        <motion.div
          className="logo-container"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          <div className="logo">GymFit</div>
          <div className="logo-tagline">Fitness Studio</div>
        </motion.div>
        <div className="space-x-6">
          <motion.a
            href="#home"
            className="nav-link"
            whileHover={{ scale: 1.1, transition: { duration: 0.2 } }}
          >
            Home
          </motion.a>
          <motion.a
            href="#about"
            className="nav-link about-link"
            whileHover={{ scale: 1.1, transition: { duration: 0.2 } }}
          >
            About
          </motion.a>
          <motion.a
            href="#services"
            className="nav-link"
            whileHover={{ scale: 1.1, transition: { duration: 0.2 } }}
          >
            Services
          </motion.a>
          <motion.a
            href="#showcase"
            className="nav-link"
            whileHover={{ scale: 1.1, transition: { duration: 0.2 } }}
          >
            Showcase
          </motion.a>
          <motion.a
            href="#contact"
            className="nav-link"
            whileHover={{ scale: 1.1, transition: { duration: 0.2 } }}
          >
            Contact
          </motion.a>
          {user ? (
            <>
              <Link href="/classes" className="nav-link">
                Classes
              </Link>
              <Link href="/bookings" className="nav-link">
                My Bookings
              </Link>
              {user.role === 'admin' && (
                <>
                  <Link href="/admin/users" className="nav-link">
                    Manage Users
                  </Link>
                  <Link href="/admin/classes" className="nav-link">
                    Manage Classes
                  </Link>
                </>
              )}
              <button onClick={logout} className="nav-link">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className="nav-link">
                Login
              </Link>
              <Link href="/register" className="nav-link">
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </motion.nav>
  );
}