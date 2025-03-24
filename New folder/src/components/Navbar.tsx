"use client";

import { motion, useScroll } from 'framer-motion';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Navbar() {
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const unsubscribe = scrollY.onChange((y) => {
      setIsScrolled(y > 50);
    });
    return () => unsubscribe();
  }, [scrollY]);

  // Animation variants for navbar links
  const navLinkVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1, // Staggered delay for each link
        duration: 0.3,
      },
    }),
  };

  const links = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About", className: "about-link" },
    { href: "/services", label: "Services" },
    { href: "/showcase", label: "Showcase" },
    { href: "/testimonials", label: "Testimonials" },
    { href: "/contact", label: "Contact" },
    { href: "/login", label: "Login" },
    { href: "/register", label: "Register" },
  ];

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
          <Link href="/">
            <div className="logo">GymFit</div>
            <div className="logo-tagline">Fitness Studio</div>
          </Link>
        </motion.div>
        <div className="space-x-6">
          {links.map((link, index) => (
            <motion.a
              key={link.label}
              href={link.href}
              className={`nav-link ${link.className || ''}`}
              custom={index}
              initial="hidden"
              animate="visible"
              variants={navLinkVariants}
              whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
            >
              {link.label}
            </motion.a>
          ))}
        </div>
      </div>
    </motion.nav>
  );
}