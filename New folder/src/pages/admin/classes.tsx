"use client";

import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
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

export default function AdminClasses() {
  const [classes, setClasses] = useState<GymClass[]>([]);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    schedule: '',
    trainer: '',
    capacity: 0,
  });
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user || user.role !== 'admin') {
      router.push('/');
      return;
    }

    const fetchClasses = async () => {
      const response = await fetch('/api/classes', { credentials: 'include' });
      if (response.ok) {
        const data = await response.json();
        setClasses(data);
      } else {
        setError('Failed to fetch classes');
      }
    };
    fetchClasses();
  }, [user, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await fetch('/api/classes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
      credentials: 'include',
    });

    if (response.ok) {
      const data = await response.json();
      setClasses([...classes, data.class]);
      setFormData({ name: '', description: '', schedule: '', trainer: '', capacity: 0 });
    } else {
      setError('Failed to create class');
    }
  };

  const handleDelete = async (id: string) => {
    const response = await fetch(`/api/classes/${id}`, {
      method: 'DELETE',
      credentials: 'include',
    });
    if (response.ok) {
      setClasses(classes.filter((c) => c.id !== id));
    } else {
      setError('Failed to delete class');
    }
  };

  if (!user || user.role !== 'admin') return null;

  return (
    <div className="min-h-screen bg-black py-20">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-4xl font-bold mb-12 text-white text-center">Manage Classes</h2>
        {error && <p className="text-red-600 mb-4 text-center">{error}</p>}
        <motion.form
          onSubmit={handleSubmit}
          className="max-w-md mx-auto flex flex-col gap-4 mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <input
            type="text"
            placeholder="Class Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="p-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-red-600"
            required
          />
          <textarea
            placeholder="Description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="p-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-red-600"
          />
          <input
            type="datetime-local"
            value={formData.schedule}
            onChange={(e) => setFormData({ ...formData, schedule: e.target.value })}
            className="p-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-red-600"
            required
          />
          <input
            type="text"
            placeholder="Trainer"
            value={formData.trainer}
            onChange={(e) => setFormData({ ...formData, trainer: e.target.value })}
            className="p-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-red-600"
            required
          />
          <input
            type="number"
            placeholder="Capacity"
            value={formData.capacity}
            onChange={(e) => setFormData({ ...formData, capacity: parseInt(e.target.value) })}
            className="p-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-red-600"
            required
          />
          <motion.button
            type="submit"
            className="btn-primary"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="relative z-10">Add Class</span>
          </motion.button>
        </motion.form>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-800">
                <th className="p-4 text-white">Name</th>
                <th className="p-4 text-white">Trainer</th>
                <th className="p-4 text-white">Schedule</th>
                <th className="p-4 text-white">Capacity</th>
                <th className="p-4 text-white">Actions</th>
              </tr>
            </thead>
            <tbody>
              {classes.map((c) => (
                <motion.tr
                  key={c.id}
                  className="border-b border-gray-700 hover:bg-gray-700"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <td className="p-4 text-gray-300">{c.name}</td>
                  <td className="p-4 text-gray-300">{c.trainer}</td>
                  <td className="p-4 text-gray-300">{new Date(c.schedule).toLocaleString()}</td>
                  <td className="p-4 text-gray-300">{c.capacity}</td>
                  <td className="p-4">
                    <button
                      onClick={() => handleDelete(c.id)}
                      className="text-red-600 hover:underline"
                    >
                      Delete
                    </button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}