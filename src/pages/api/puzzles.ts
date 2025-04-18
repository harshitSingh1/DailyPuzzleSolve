import { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '@/utils/dbConnect';
import Puzzle from '@/models/Puzzle';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();

  try {
    const { game } = req.query;
    let query = {};
    
    if (game) {
      query = { heading: { $regex: game, $options: 'i' } };
    }

    const puzzles = await Puzzle.find(query)
      .sort({ createdAt: -1 })
      .limit(10);

    res.status(200).json({ success: true, data: puzzles });
  } catch (error) {
    res.status(400).json({ success: false });
  }
}