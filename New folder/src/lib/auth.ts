import type { NextApiRequest } from 'next';
import jwt from 'jsonwebtoken';

export async function verifyToken(req: NextApiRequest) {
  const token = req.cookies.token;
  if (!token) {
    return null;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { id: string; email: string; role: string };
    return decoded;
  } catch (error) {
    return null;
  }
}