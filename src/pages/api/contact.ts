import { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '@/utils/dbConnect';
import Contact from '@/models/Contact';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    await dbConnect();

    const { name, email, message, subject } = req.body;

    // Basic validation
    if (!name || !email || !message || !subject) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Create new contact entry
    const contact = new Contact({
      name,
      email,
      subject,
      message,
      createdAt: new Date()
    });

    await contact.save();

    // Here you could add email sending logic if needed

    return res.status(200).json({ message: 'Message sent successfully' });
  } catch (error) {
    console.error('Contact form error:', error);
    return res.status(500).json({ message: 'Error sending message' });
  }
}