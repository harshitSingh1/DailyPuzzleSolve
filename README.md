# 🧠 Daily Puzzle Solve

I built Daily Puzzle Solve to help people stay consistent with their daily challenge habits. Often, we lose our puzzle streaks not because of laziness—but because we get stuck. This platform makes sure that never happens.

Users can:
- 🔍 Get solutions for daily puzzles (to keep the streak alive!)

- 🕹️ Explore and play a variety of brain games

- 🛒 Buy puzzle-themed games and accessories

- 📰 Read daily tech blogs to stay updated

- 😄 Browse or create fun memes to unwind
  
## 🌟 Features

- **Daily Puzzle Solutions**
  - Step-by-step image guides
  - Video explanations
  - Multiple solution approaches

- **Puzzle Categories**
  - LinkedIn Pinpoint
  - LinkedIn Queens
  - LinkedIn Tango
  - LinkedIn Crossword
  - LinkedIn Zip

- **User Experience**
  - Responsive design (mobile, tablet, desktop)
  - Dark/light mode
  - Animated UI elements
  - Quick navigation between puzzles

- **SEO Optimized**
  - Automatic sitemap generation
  - Schema.org structured data
  - OpenGraph meta tags

## 🛠️ Tech Stack

**Frontend:**
- Next.js (React)
- TypeScript
- Material-UI (MUI)
- React YouTube
- Axios

**Backend:**
- Node.js
- Express
- MongoDB (via Mongoose)
- Vercel Serverless Functions

**DevOps:**
- Vercel Hosting
- GitHub Actions (CI/CD)
- MongoDB Atlas

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm (v8 or higher)
- MongoDB Atlas account

### Installation

1. Clone the repository:
   ```bash
   https://github.com/harshitSingh1/DailyPuzzleSolve.git
   cd DailyPuzzleSolve
   ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Create a .env.local file:

    ```bash
    MONGODB_URI=your_mongodb_connection_string
    NEXT_PUBLIC_API_URL=http://localhost:3000
    ```
4. Run the development server:

    ```bash
    npm run dev
    ```
5. Open http://localhost:3000 in your browser.

### 📂 Project Structure
```
daily-puzzle-solutions/
├── public/              # Static files
├── src/
│   ├── components/      # Reusable components
│   ├── models/          # MongoDB models
│   ├── pages/           # Application pages
│   │   ├── api/         # API routes
│   │   └── solutions/   # Dynamic solution pages
│   ├── styles/          # Global styles
│   └── utils/           # Utility functions
├── next.config.js       # Next.js configuration
└── README.md            # This file
```

