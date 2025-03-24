import type { NextApiRequest, NextApiResponse } from 'next';
import { verifyToken } from '../../../lib/auth';
import clientPromise from '../../../lib/mongodb';
import { ObjectId } from 'mongodb'; // Add this import

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const user = await verifyToken(req);
  if (!user) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const client = await clientPromise;
  const db = client.db('gymfit');

  const userData = await db.collection('users').findOne({ _id: new ObjectId(user.id) });
  if (!userData) {
    return res.status(404).json({ message: 'User not found' });
  }

  return res.status(200).json({ id: user.id, email: user.email, role: user.role });
}