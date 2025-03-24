"use client";

import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

type User = {
  id: string;
  email: string;
  role: string;
  created_at: string;
};

export default function AdminUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState('');
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user || user.role !== 'admin') {
      router.push('/');
      return;
    }

    const fetchUsers = async () => {
      const response = await fetch('/api/users', { credentials: 'include' });
      if (response.ok) {
        const data = await response.json();
        setUsers(data);
      } else {
        setError('Failed to fetch users');
      }
    };
    fetchUsers();
  }, [user, router]);

  const handleDelete = async (id: string) => {
    const response = await fetch(`/api/users/${id}`, {
      method: 'DELETE',
      credentials: 'include',
    });
    if (response.ok) {
      setUsers(users.filter((u) => u.id !== id));
    } else {
      setError('Failed to delete user');
    }
  };

  const handleRoleChange = async (id: string, role: string) => {
    const response = await fetch(`/api/users/${id}/role`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ role }),
      credentials: 'include',
    });
    if (response.ok) {
      setUsers(users.map((u) => (u.id === id ? { ...u, role } : u)));
    } else {
      setError('Failed to update role');
    }
  };

  if (!user || user.role !== 'admin') return null;

  return (
    <div className="min-h-screen bg-black py-20">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-4xl font-bold mb-12 text-white text-center">Manage Users</h2>
        {error && <p className="text-red-600 mb-4 text-center">{error}</p>}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-800">
                <th className="p-4 text-white">Email</th>
                <th className="p-4 text-white">Role</th>
                <th className="p-4 text-white">Created At</th>
                <th className="p-4 text-white">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <motion.tr
                  key={u.id}
                  className="border-b border-gray-700 hover:bg-gray-700"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <td className="p-4 text-gray-300">{u.email}</td>
                  <td className="p-4 text-gray-300">
                    <select
                      value={u.role}
                      onChange={(e) => handleRoleChange(u.id, e.target.value)}
                      className="bg-gray-700 text-white border border-gray-600 rounded p-1"
                    >
                      <option value="guest">Guest</option>
                      <option value="user">User</option>
                      <option value="admin">Admin</option>
                    </select>
                  </td>
                  <td className="p-4 text-gray-300">{new Date(u.created_at).toLocaleString()}</td>
                  <td className="p-4">
                    <button
                      onClick={() => handleDelete(u.id)}
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