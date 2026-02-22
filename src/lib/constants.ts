export const API_BASE_URL = "https://dps-backend-epx7.onrender.com/api";

export const SITE_NAME = "PuzzleLogicHub";
export const SITE_URL = "https://dailypuzzlesolve.com";
export const SITE_DESCRIPTION = "Get instant access to today's LinkedIn puzzle solutions: Pinpoint, Queens, Tango, Crossclimb, Zip, and Mini Sudoku. Step-by-step explanations, video guides, and expert tips updated daily.";

export const PUZZLE_GAMES = [
  {
    id: "pinpoint",
    label: "LinkedIn Pinpoint",
    emoji: "🎯",
    description: "Word puzzle where you find the common connection between four given words. Get daily solutions with detailed explanations.",
    image: "/images/pinpoint-game.png",
    difficulty: "Medium",
  },
  {
    id: "queens",
    label: "LinkedIn Queens",
    emoji: "👑",
    description: "Logic puzzle where you place queens on a chessboard without them attacking each other. Step-by-step daily solutions available.",
    image: "/images/queens-game.png",
    difficulty: "Hard",
  },
  {
    id: "tango",
    label: "LinkedIn Tango",
    emoji: "💃",
    description: "Pattern-matching puzzle where you connect colored dots with non-crossing lines. Get expert solutions daily.",
    image: "/images/tango-game.png",
    difficulty: "Medium",
  },
  {
    id: "crossclimb",
    label: "LinkedIn Crossclimb",
    emoji: "🧗",
    description: "Hybrid puzzle combining crossword clues with a ladder-style word progression. Daily solutions with explanations.",
    image: "/images/crossclimb-game.png",
    difficulty: "Hard",
  },
  {
    id: "zip",
    label: "LinkedIn Zip",
    emoji: "⚡",
    description: "Number sequence puzzle where you find the missing number in an interlocking pattern. Daily solutions available.",
    image: "/images/zip-game.png",
    difficulty: "Easy",
  },
  {
    id: "minisudoku",
    label: "LinkedIn Mini Sudoku",
    emoji: "🔢",
    description: "A compact Sudoku puzzle exclusive to LinkedIn. Solve the mini grid with logic and deduction. Daily solutions with step-by-step guides.",
    image: "/images/mini-sudoku.png",
    difficulty: "Medium",
  },
] as const;

export const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/games", label: "Games" },
  { href: "/blog", label: "Blog" },
  { href: "/shop", label: "Shop" },
  { href: "/tools", label: "Tools" },
  { href: "/memes", label: "Memes" },
] as const;

export const SOCIAL_LINKS = {
  youtube: "https://youtube.com/",
  twitter: "https://twitter.com/",
  linkedin: "https://linkedin.com/",
  reddit: "https://reddit.com/",
};

export const FAQ_DATA = [
  {
    question: "How often are puzzle solutions updated?",
    answer: "Solutions are updated daily within 30 minutes for all LinkedIn puzzle games including Pinpoint, Queens, Tango, Crossclimb, Zip, and Mini Sudoku. You can also request solutions for other puzzle games.",
  },
  {
    question: "Are the solutions free to access?",
    answer: "Yes, all puzzle solutions are completely free to access. We believe in making puzzle-solving resources available to everyone.",
  },
  {
    question: "How detailed are the solutions?",
    answer: "Each solution includes step-by-step explanations, screenshots, and video walkthroughs when available. We ensure every step is clearly explained.",
  },
  {
    question: "Can I request help for a specific puzzle?",
    answer: "Yes! You can contact us through our support page, and we'll help you with any specific puzzle you're struggling with.",
  },
  {
    question: "Can you tell me more about PuzzleLogicHub?",
    answer: "PuzzleLogicHub is your premier destination for comprehensive LinkedIn puzzle solutions. We provide daily updated solutions for Pinpoint, Queens, Tango, Crossclimb, Zip, and Mini Sudoku puzzles, helping you master these challenging games with detailed explanations and expert strategies.",
  },
];
