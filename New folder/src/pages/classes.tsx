"use client";

import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

type GymClass = {
  id: string;
  name: string;
  description: string;
  schedule: string;
  trainer: string;
  capacity: number;
};

export default function Classes() {
  const [classes, setClasses] = useState<GymClass[]>([]);
  const [error, setError] = useState('');
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    const fetchClasses = async () => {
      const response = await fetch('/api/classes');
      if (response.ok) {
        const data = await response.json();
        setClasses(data);
      } else {
        setError('Failed to fetch classes');
      }
    };
    fetchClasses();
  }, []);

  const handleBook = async (classId: string) => {
    if (!user) {
      router.push('/login');
      return;
    }

    const response = await fetch('/api/bookings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ class_id: classId }),
      credentials: 'include',
    });

    if (response.ok) {
      router.push('/bookings');
    } else {
      setError('Failed to book class');
    }
  };

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
    <div className="min-h-screen bg-black py-20">
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={staggerChildren}
      >
        <div className="max-w-6xl mx-auto text-center px-4">
          <h2 className="text-4xl font-bold mb-12 text-white">Available Classes</h2>
          {error && <p className="text-red-600 mb-4">{error}</p>}
          <motion.div className="grid grid-cols-1 md:grid-cols-3 gap-8" variants={staggerChildren}>
            {classes.map((gymClass) => (
              <motion.div
                key={gymClass.id}
                className="service-card"
                variants={fadeInUp}
                whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
              >
                <h3 className="service-title">{gymClass.name}</h3>
                <p className="service-description">{gymClass.description}</p>
                <p className="text-gray-400 mt-2">Trainer: {gymClass.trainer}</p>
                <p className="text-gray-400">Schedule: {new Date(gymClass.schedule).toLocaleString()}</p>
                <p className="text-gray-400">Capacity: {gymClass.capacity}</p>
                <motion.button
                  className="btn-primary mt-4"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleBook(gymClass.id)}
                >
                  <span className="relative z-10">Book Now</span>
                </motion.button>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
}