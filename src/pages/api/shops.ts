// src/pages/api/shops.ts
import { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '@/utils/dbConnect';
import Shop from '@/models/Shop';

export default async function handler(_req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();

  try {
    const shops = await Shop.find();
    res.status(200).json({ success: true, data: shops });
  } catch (error) {
    console.error('Error fetching shop items:', error);
    res.status(500).json({ 
      success: false,
      error: 'Failed to fetch shop items'
    });
  }
}