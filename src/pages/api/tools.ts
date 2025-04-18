import { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '@/utils/dbConnect';
import Tool from '@/models/Tool';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();

  try {
    const tools = await Tool.find();
    res.status(200).json({ success: true, data: tools });
  } catch (error) {
    res.status(400).json({ success: false });
  }
}