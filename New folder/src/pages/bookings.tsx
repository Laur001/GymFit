"use client";

import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

type Booking = {
  id: string;
  booked_at: string;
  classes: { name: string; schedule: string; trainer: string };
};

export default function Bookings() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [error, setError] = useState('');
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push('/login');
      return;
    }

    const fetchBookings = async () => {
      const response = await fetch('/api/bookings', { credentials: 'include' });
      if (response.ok) {
        const data = await response.json();
        setBookings(data);
      } else {
        setError('Failed to fetch bookings');
      }
    };
    fetchBookings();
  }, [user, router]);

  if (!user) return null;

  return (
    <div className="min-h-screen bg-black py-20">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-4xl font-bold mb-12 text-white text-center">Your Bookings</h2>
        {error && <p className="text-red-600 mb-4 text-center">{error}</p>}
        {bookings.length === 0 ? (
          <p className="text-gray-400 text-center">No bookings yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-800">
                  <th className="p-4 text-white">Class Name</th>
                  <th className="p-4 text-white">Trainer</th>
                  <th className="p-4 text-white">Schedule</th>
                  <th className="p-4 text-white">Booked At</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((booking) => (
                  <motion.tr
                    key={booking.id}
                    className="border-b border-gray-700 hover:bg-gray-700"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <td className="p-4 text-gray-300">{booking.classes.name}</td>
                    <td className="p-4 text-gray-300">{booking.classes.trainer}</td>
                    <td className="p-4 text-gray-300">{new Date(booking.classes.schedule).toLocaleString()}</td>
                    <td className="p-4 text-gray-300">{new Date(booking.booked_at).toLocaleString()}</td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}