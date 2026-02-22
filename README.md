# 🧩 DailyPuzzleSolve — Frontend

> **Never lose your puzzle streak again.**  
> DailyPuzzleSolve is a modern React web application that delivers daily step-by-step solutions for LinkedIn's puzzle games — Pinpoint, Queens, Tango, Crossclimb, and Zip — with video walkthroughs, screenshot guides, and SEO-optimised pages.

---

## 🚀 Features

- **Daily Puzzle Solutions** — Step-by-step image and video solutions for all 5 LinkedIn puzzle games
- **Solution Detail Pages** — Accordion-style solution viewer with YouTube embed support and screenshot galleries
- **Solutions Hub** — Browse all puzzle types with filter cards
- **Shop Page** — Curated product listings fetched from the backend API
- **Tools Page** — Useful puzzle-related tools fetched from the backend API
- **Contact Page** — Contact form that submits to the backend `/api/contact` endpoint
- **About, Blog, Games, Memes Pages** — Supporting pages with placeholder and coming-soon content
- **Dark / Light Mode** — Full theme toggle using `next-themes`
- **SEO Ready** — `react-helmet-async` for dynamic meta tags, Open Graph, Twitter cards, and JSON-LD structured data on every page
- **Google AdSense Integration** — Designated ad placement zones (header banner, mid-page, solution pages)
- **Responsive Design** — Mobile-first layout with hamburger menu
- **Smooth Animations** — `framer-motion` page transitions and micro-interactions
- **React Query Caching** — Efficient data fetching with 5-minute stale time and automatic retries

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 18 + Vite |
| Language | TypeScript |
| Styling | Tailwind CSS + shadcn/ui |
| Routing | React Router v6 |
| Data Fetching | TanStack React Query v5 |
| Animations | Framer Motion |
| SEO | react-helmet-async |
| Theme | next-themes |
| Icons | Lucide React |
| Forms | React Hook Form + Zod |

---

## 🔌 Backend Integration

This frontend connects to a separate **Next.js + MongoDB backend** via REST API.

| Endpoint | Description |
|---|---|
| `GET /api/puzzles?game=pinpoint` | Fetch puzzle solutions by game type |
| `GET /api/shops` | Fetch shop product listings |
| `GET /api/tools` | Fetch tools listings |
| `POST /api/contact` | Submit a contact form message |

### Local Development Setup

Run both servers simultaneously:

```bash
# Terminal 1 — Next.js backend (port 3000)
cd server
npm run dev

# Terminal 2 — This Vite frontend (port 8080)
cd client
npm run dev
```

The Vite dev server automatically proxies `/api` requests to `http://localhost:3000`.  
In production, API calls go directly to `https://dailypuzzlesolve.com/api`.

---

## 📁 Folder Structure

```
├── public/
│   ├── images/                    # Static game images (chess, sudoku, pinpoint, etc.)
│   ├── favicon.ico
│   ├── manifest.json
│   ├── robots.txt
│   ├── sitemap.xml
│   ├── ads.txt                    # Google AdSense publisher verification
│   └── googlecd2f68a869bc0e1a.html  # Google Search Console verification
│
├── src/
│   ├── components/
│   │   ├── ui/                    # shadcn/ui base components (button, card, dialog, etc.)
│   │   ├── home/
│   │   │   ├── FAQSection.tsx     # Accordion FAQ section
│   │   │   ├── HeroSection.tsx    # "We're Back" animated hero banner
│   │   │   ├── HowItWorks.tsx     # 3-step explainer section
│   │   │   └── TodaysPuzzles.tsx  # Featured puzzle solution cards
│   │   ├── AdPlaceholder.tsx      # Dev placeholder for ad zones
│   │   ├── AdSenseAd.tsx          # Google AdSense ad component
│   │   ├── Footer.tsx             # Site footer with links and social icons
│   │   ├── Header.tsx             # Sticky header with nav and mobile menu
│   │   ├── NavLink.tsx            # Active-state nav link wrapper
│   │   ├── RecruitmentBanner.tsx  # Top announcement / recruitment banner
│   │   ├── SEOHead.tsx            # Helmet-based SEO meta tag manager
│   │   └── ThemeToggle.tsx        # Dark / light mode toggle button
│   │
│   ├── hooks/
│   │   ├── use-mobile.tsx         # Mobile breakpoint detection hook
│   │   └── use-toast.ts           # Toast notification hook
│   │
│   ├── lib/
│   │   ├── api.ts                 # All fetch functions (puzzles, shops, tools, contact)
│   │   ├── constants.ts           # API base URL, site config, puzzle game definitions, FAQ data
│   │   ├── types.ts               # TypeScript interfaces (Puzzle, ShopItem, Tool, etc.)
│   │   └── utils.ts               # Tailwind class merging utility (cn)
│   │
│   ├── pages/
│   │   ├── Index.tsx              # Homepage (Hero + TodaysPuzzles + HowItWorks + FAQ)
│   │   ├── Solutions.tsx          # Puzzle solutions hub — all game types
│   │   ├── SolutionDetail.tsx     # Individual game solution page (/solutions/:game)
│   │   ├── Shop.tsx               # Product listings from /api/shops
│   │   ├── Tools.tsx              # Tools listings from /api/tools
│   │   ├── Contact.tsx            # Contact form → /api/contact
│   │   ├── About.tsx              # About DailyPuzzleSolve
│   │   ├── Blog.tsx               # Blog placeholder
│   │   ├── Games.tsx              # Games placeholder
│   │   ├── Memes.tsx              # Memes placeholder
│   │   ├── Privacy.tsx            # Privacy policy
│   │   ├── Terms.tsx              # Terms of service
│   │   └── NotFound.tsx           # 404 page
│   │
│   ├── test/
│   │   ├── example.test.ts        # Example Vitest test
│   │   └── setup.ts               # Test environment setup
│   │
│   ├── App.tsx                    # Root app — routing, providers (QueryClient, Helmet, Theme)
│   ├── App.css                    # Global app styles
│   ├── index.css                  # Tailwind base + CSS design tokens (HSL variables)
│   ├── main.tsx                   # Vite entry point
│   └── vite-env.d.ts              # Vite environment type declarations
│
├── components.json                # shadcn/ui configuration
├── eslint.config.js               # ESLint configuration
├── index.html                     # HTML entry point
├── postcss.config.js              # PostCSS config (Tailwind)
├── tailwind.config.ts             # Tailwind theme, colors, fonts, animations
├── tsconfig.json                  # TypeScript root config
├── tsconfig.app.json              # TypeScript app config
├── tsconfig.node.json             # TypeScript Node config
├── vite.config.ts                 # Vite config — dev server, proxy, aliases
└── vitest.config.ts               # Vitest test runner config
```

---

## 🧑‍💻 Getting Started

### Prerequisites

- Node.js 18+ and npm
- Your Next.js backend running on port 3000 (for local API calls)

### Installation

```bash
# Clone the repository
git clone https://github.com/harshitSingh1/DailyPuzzleSolve.git

# Navigate to the project
cd DailyPuzzleSolve

# Install dependencies
cd server
npm install
npm start

# Start the development server (port 8080)
cd client
npm install
npm start
```

Open [http://localhost:8080](http://localhost:8080) in your browser.

---

## 📄 License

Private — All rights reserved © DailyPuzzleSolve
