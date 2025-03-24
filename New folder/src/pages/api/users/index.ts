import type { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '../../../lib/mongodb';
import { verifyToken } from '../../../lib/auth';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const user = await verifyToken(req);
  if (!user || user.role !== 'admin') {
    return res.status(403).json({ message: 'Unauthorized' });
  }

  const client = await clientPromise;
  const db = client.db('gymfit');

  if (req.method === 'GET') {
    const users = await db.collection('users').find().toArray();
    return res.status(200).json(users.map(u => ({ ...u, id: u._id.toString() })));
  }

  return res.status(405).json({ message: 'Method not allowed' });
}