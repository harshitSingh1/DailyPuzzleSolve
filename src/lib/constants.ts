export const API_BASE_URL = "https://dps-backend-epx7.onrender.com/api";

export const SITE_NAME = "PuzzleLogicHub";
export const SITE_URL = "https://daily-puzzle-solve.vercel.app";
export const SITE_DESCRIPTION = "Get today's LinkedIn puzzle answers: Pinpoint, Queens, Tango, Crossclimb, Zip & Mini Sudoku solutions. Step-by-step screenshots, video walkthroughs & expert tips updated daily.";

export const PUZZLE_GAMES = [
  {
    id: "pinpoint",
    label: "LinkedIn Pinpoint",
    icon: "Target",
    description: "Today's LinkedIn Pinpoint answer & solution. Find the common connection between four words with our step-by-step guide.",
    image: "/images/pinpoint-game.png",
    difficulty: "Medium",
    keywords: ["linkedin pinpoint answer today", "pinpoint solution today", "linkedin pinpoint hints", "pinpoint puzzle clues"],
  },
  {
    id: "queens",
    label: "LinkedIn Queens",
    icon: "Crown",
    description: "Today's LinkedIn Queens puzzle answer & solution. Place queens on the board without conflicts using our daily guide.",
    image: "/images/queens-game.png",
    difficulty: "Hard",
    keywords: ["queens puzzle answer today", "linkedin queens solution", "queens puzzle hints", "linkedin queens today"],
  },
  {
    id: "tango",
    label: "LinkedIn Tango",
    icon: "Disc",
    description: "Today's LinkedIn Tango puzzle answer & solution. Connect colored dots with non-crossing lines — solved daily.",
    image: "/images/tango-game.png",
    difficulty: "Medium",
    keywords: ["linkedin tango answer today", "tango puzzle solution", "linkedin tango hints"],
  },
  {
    id: "crossclimb",
    label: "LinkedIn Crossclimb",
    icon: "ArrowUpDown",
    description: "Today's LinkedIn Crossclimb answer & solution. Hybrid crossword-ladder puzzle solved daily with explanations.",
    image: "/images/crossclimb-game.png",
    difficulty: "Hard",
    keywords: ["linkedin crossclimb answer today", "crossclimb solution", "crossclimb puzzle hints"],
  },
  {
    id: "zip",
    label: "LinkedIn Zip",
    icon: "Zap",
    description: "Today's LinkedIn Zip puzzle answer & solution. Find the missing number in interlocking patterns — daily guide.",
    image: "/images/zip-game.png",
    difficulty: "Easy",
    keywords: ["linkedin zip answer today", "zip puzzle solution", "linkedin zip hints"],
  },
  {
    id: "minisudoku",
    label: "LinkedIn Mini Sudoku",
    icon: "Grid3x3",
    description: "Today's LinkedIn Mini Sudoku answer & solution. Solve the compact grid with logic — step-by-step daily guide.",
    image: "/images/mini-sudoku.png",
    difficulty: "Medium",
    keywords: ["linkedin mini sudoku answer today", "mini sudoku solution", "linkedin sudoku hints"],
  },
] as const;

export const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/memes", label: "Memes" },
  { href: "/shop", label: "Shop" },
  { href: "/tools", label: "Tools" },
  { href: "/blog", label: "Blogs" },
  { href: "/about", label: "About" },
] as const;

export const SOCIAL_LINKS = {
  youtube: "https://youtube.com/@PuzzleLogicHub",
  twitter: "https://twitter.com/PuzzleLogicHub",
  linkedin: "https://linkedin.com/company/puzzlelogichub",
  reddit: "https://reddit.com/r/PuzzleLogicHub",
  facebook: "https://facebook.com/PuzzleLogicHub",
  instagram: "https://instagram.com/PuzzleLogicHub",
};

export const FAQ_DATA = [
  {
    question: "What are today's LinkedIn puzzle answers?",
    answer: "We publish daily solutions for all LinkedIn puzzle games — Pinpoint, Queens, Tango, Crossclimb, Zip, and Mini Sudoku — within 30 minutes of each new puzzle going live. Scroll up to find today's answers with step-by-step screenshots and video walkthroughs.",
  },
  {
    question: "How do I solve LinkedIn Pinpoint today?",
    answer: "Check our daily Pinpoint solution page for the answer. We provide the common connection word, step-by-step clue analysis, and a video walkthrough to help you understand the logic behind today's puzzle.",
  },
  {
    question: "Are the puzzle solutions free to access?",
    answer: "Yes, all puzzle solutions are completely free to access. We believe in making puzzle-solving resources available to everyone.",
  },
  {
    question: "How detailed are the solutions?",
    answer: "Each solution includes step-by-step explanations, annotated screenshots showing every move, and video walkthroughs when available. We ensure every step is clearly explained so you can learn the strategy.",
  },
  {
    question: "Can I get hints instead of the full answer?",
    answer: "Yes! Each solution page includes a hints section that gives you progressive clues without spoiling the full answer. Start with Hint 1 and work your way up only if you need more help.",
  },
  {
    question: "What LinkedIn puzzle games do you cover?",
    answer: "We cover all six LinkedIn puzzle games: Pinpoint (word connections), Queens (logic placement), Tango (pattern matching), Crossclimb (crossword ladder), Zip (number sequences), and Mini Sudoku (compact grid). Solutions are updated daily for each game.",
  },
  {
    question: "What time are LinkedIn puzzles updated?",
    answer: "LinkedIn puzzles reset daily. Our team publishes new solutions within 30 minutes of each puzzle going live. We also display a countdown timer so you know exactly when fresh answers will be available.",
  },
  {
    question: "Is PuzzleLogicHub affiliated with LinkedIn?",
    answer: "No. PuzzleLogicHub is an independent website and is not affiliated with, endorsed by, or sponsored by LinkedIn Corporation. All puzzle names and trademarks belong to their respective owners.",
  },
];