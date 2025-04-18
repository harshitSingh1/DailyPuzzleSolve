import { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '@/utils/dbConnect';
import Shop from '@/models/Shop';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();

  try {
    const shops = await Shop.find();
    res.status(200).json({ success: true, data: shops });
  } catch (error) {
    res.status(400).json({ success: false });
  }
}