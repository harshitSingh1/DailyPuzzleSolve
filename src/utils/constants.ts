export const SITE_NAME = 'PuzzleLogicHub';
export const SITE_URL = 'https://yourdomain.com';
export const SITE_DESCRIPTION = 'Daily solutions for logic puzzles including LinkedIn Pinpoint, Tango, Crossclimb, and Queens problems with image solutions and video explanations.';
export const SITE_KEYWORDS = 'logic puzzles, brain teasers, puzzle solutions, daily puzzles, linkedin pinpoint, tango, crossclimb, queens puzzle';

export const SOCIAL_LINKS = {
  twitter: 'https://twitter.com/PuzzleLogicHub',
  youtube: 'https://youtube.com/PuzzleLogicHub',
  discord: 'https://discord.gg/leigeanmd1531',
};

export const AD_CLIENT = 'ca-pub-YOUR_PUB_ID';


export const PUZZLE_TYPES = [
  { value: 'word', label: 'Word Puzzles' },
  { value: 'number', label: 'Number Puzzles' },
  { value: 'logic', label: 'Logic Grids' },
  { value: 'spatial', label: 'Spatial Reasoning' },
];

// Default data for empty states
export const DEFAULT_PUZZLES = [
  {
    id: '1',
    heading: 'LinkedIn Pinpoint - April 8, 2023',
    ytVideo: 'https://youtube.com/embed/example1',
    screenshots: ['/images/pinpoint-solution-040823.jpg'],
  },
  {
    id: '2',
    heading: 'Tango Puzzle - April 7, 2023',
    ytVideo: 'https://youtube.com/embed/example2',
    screenshots: ['/images/tango-solution-040723.jpg'],
  },
];

export const DEFAULT_TOOLS = [
  {
    id: '1',
    title: 'Puzzle Solver App',
    subheading: 'Mobile app for solving various logic puzzles',
    url: 'https://example.com/puzzle-solver',
  },
  {
    id: '2',
    title: 'Logic Grid Tool',
    subheading: 'Online tool for creating and solving logic grids',
    url: 'https://example.com/logic-grid',
  },
];