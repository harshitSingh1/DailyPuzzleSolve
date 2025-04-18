// src/models/Puzzle.ts
import mongoose from 'mongoose';

const puzzleSchema = new mongoose.Schema({
  heading: { 
    type: String, 
    required: true 
  },
  gameType: {
    type: String,
    required: true,
    enum: ['Pinpoint', 'Queens', 'Tango', 'Crossword', 'Zip']
  },
  ytVideo: { 
    type: String,
    default: '' 
  },
  screenshots: [{ 
    type: String 
  }],
  createdAt: { 
    type: Date, 
    default: Date.now 
  }
});

const Puzzle = mongoose.models.Puzzle || mongoose.model('Puzzle', puzzleSchema);

export default Puzzle;