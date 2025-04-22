// src/pages/api/tools.ts
import { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '@/utils/dbConnect';
import Tool from '@/models/Tool';

export default async function handler(_req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();

  try {
    const startTime = performance.now();
    const tools = await Tool.find().lean();
    const endTime = performance.now();
    console.log(`Database Query Time: ${endTime - startTime} ms`);
    res.status(200).json({ success: true, data: tools });
  } catch (error) {
    console.error('Error fetching tools:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch tools',
    });
  }
}