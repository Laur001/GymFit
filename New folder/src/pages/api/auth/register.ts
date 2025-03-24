import type { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '../../../lib/mongodb';
import bcrypt from 'bcryptjs';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  const client = await clientPromise;
  const db = client.db('gymfit');

  const existingUser = await db.collection('users').findOne({ email });
  if (existingUser) {
    return res.status(400).json({ message: 'User already exists' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const result = await db.collection('users').insertOne({
    email,
    password: hashedPassword,
    role: 'user',
    created_at: new Date(),
  });

  return res.status(201).json({ message: 'User created', user: { id: result.insertedId.toString(), email, role: 'user' } });
}