import type { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '../../../lib/mongodb';
import { verifyToken } from '../../../lib/auth';
import { ObjectId } from 'mongodb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const user = await verifyToken(req);
  if (!user || user.role !== 'admin') {
    return res.status(403).json({ message: 'Unauthorized' });
  }

  const { id } = req.query;

  const client = await clientPromise;
  const db = client.db('gymfit');

  if (req.method === 'DELETE') {
    const result = await db.collection('users').deleteOne({ _id: new ObjectId(id as string) });
    if (result.deletedCount === 0) {
      return res.status(404).json({ message: 'User not found' });
    }
    return res.status(200).json({ message: 'User deleted' });
  }

  return res.status(405).json({ message: 'Method not allowed' });
}