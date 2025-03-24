import type { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '../../../lib/mongodb';
import { verifyToken } from '../../../lib/auth';
import { ObjectId } from 'mongodb'; // Add this import

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const user = await verifyToken(req);
  if (!user) {
    return res.status(403).json({ message: 'Unauthorized' });
  }

  const client = await clientPromise;
  const db = client.db('gymfit');

  if (req.method === 'GET') {
    const bookings = await db.collection('bookings').aggregate([
      { $match: { user_id: new ObjectId(user.id) } },
      {
        $lookup: {
          from: 'classes',
          localField: 'class_id',
          foreignField: '_id',
          as: 'classes',
        },
      },
      { $unwind: '$classes' },
      {
        $project: {
          id: '$_id',
          booked_at: 1,
          'classes.name': 1,
          'classes.schedule': 1,
          'classes.trainer': 1,
          _id: 0,
        },
      },
    ]).toArray();

    return res.status(200).json(bookings.map(b => ({ ...b, id: b.id.toString() })));
  }

  if (req.method === 'POST') {
    const { class_id } = req.body;
    const result = await db.collection('bookings').insertOne({
      user_id: new ObjectId(user.id),
      class_id: new ObjectId(class_id),
      booked_at: new Date(),
    });
    const booking = { id: result.insertedId.toString(), user_id: user.id, class_id };
    return res.status(201).json({ message: 'Booking created', booking });
  }

  return res.status(405).json({ message: 'Method not allowed' });
}