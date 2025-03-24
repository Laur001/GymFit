import type { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '../../../lib/mongodb';
import { verifyToken } from '../../../lib/auth';
import { ObjectId } from 'mongodb'; // Add this import

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const user = await verifyToken(req);

  const client = await clientPromise;
  const db = client.db('gymfit');

  if (req.method === 'GET') {
    const classes = await db.collection('classes').find().toArray();
    return res.status(200).json(classes.map(c => ({ ...c, id: c._id.toString() })));
  }

  if (req.method === 'POST') {
    if (!user || user.role !== 'admin') {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    const { name, description, schedule, trainer, capacity } = req.body;
    const result = await db.collection('classes').insertOne({
      name,
      description,
      schedule,
      trainer,
      capacity: parseInt(capacity),
    });
    const newClass = { id: result.insertedId.toString(), name, description, schedule, trainer, capacity };
    return res.status(201).json({ message: 'Class created', class: newClass });
  }

  return res.status(405).json({ message: 'Method not allowed' });
}