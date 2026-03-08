# PuzzleLogicHub (DailyPuzzleSolve) - Next.js App Router

> Never lose your puzzle streak again.
> PuzzleLogicHub is a modern Next.js web application that delivers daily step-by-step solutions for LinkedIn puzzle games including Pinpoint, Queens, Tango, Crossclimb, Zip, and Mini Sudoku. It features video walkthroughs, screenshot guides, and SEO-optimized pages built with server-side rendering and static generation.

---

## Why Next.js App Router?

This project was originally built as a Vite + React SPA using React Router for client-side routing and react-helmet-async for SEO meta tags. We migrated to Next.js App Router to gain:

- **Server-Side Rendering (SSR)** for faster initial page loads and better crawlability
- **Static Site Generation (SSG)** with `generateStaticParams` for pre-rendering puzzle pages at build time
- **Built-in Metadata API** replacing react-helmet-async with native Next.js metadata exports
- **File-based Routing** replacing React Router with the `src/app` directory convention
- **Image Optimization** with `next/image` for automatic WebP conversion and responsive sizing
- **Incremental Static Regeneration (ISR)** for updating daily puzzle content without full rebuilds
- **Better Core Web Vitals** with reduced JavaScript bundle and faster LCP

---

## Features

- **Daily Puzzle Solutions** with step-by-step image and video guides for all 6 LinkedIn puzzle games
- **Solution Detail Pages** with accordion-style viewers, YouTube embeds, and screenshot galleries
- **Solutions Hub** for browsing all puzzle types with filter cards
- **Shop Page** with curated product listings fetched from the backend API
- **Tools Page** with useful puzzle-related tools fetched from the backend API
- **Contact Page** with a form that submits to the backend `/api/contact` endpoint
- **Blog, Games, Memes Pages** with supporting content and community features
- **Dark and Light Mode** using next-themes
- **Full SEO Suite** with Next.js Metadata API, Open Graph, Twitter Cards, and JSON-LD structured data
- **Google AdSense Integration** with designated ad placement zones
- **Responsive Design** with mobile-first layout and hamburger menu
- **Smooth Animations** with Framer Motion page transitions and micro-interactions
- **React Query Caching** with efficient data fetching, 30-minute stale time, and automatic retries

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 14+ (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS + shadcn/ui |
| Routing | Next.js File-based Routing (src/app) |
| Data Fetching | TanStack React Query v5 + Next.js fetch |
| Animations | Framer Motion |
| SEO | Next.js Metadata API + JSON-LD |
| Theme | next-themes |
| Icons | Lucide React |
| Forms | React Hook Form + Zod |
| Deployment | Vercel (optimized for Next.js) |

---

## Backend Integration

This frontend connects to a separate REST API backend hosted on Render.

| Endpoint | Description |
|---|---|
| `GET /api/puzzles?game=pinpoint` | Fetch puzzle solutions by game type |
| `GET /api/shops` | Fetch shop product listings |
| `GET /api/tools` | Fetch tools listings |
| `POST /api/contact` | Submit a contact form message |

The backend base URL is configured via the `NEXT_PUBLIC_API_URL` environment variable. In production, API calls go directly to `https://dps-backend-epx7.onrender.com`.

---

## Folder Structure (Next.js App Router)

```
dps-next/
├── .gitignore                          # Git ignore rules
├── components.json                     # shadcn/ui configuration
├── eslint.config.mjs                   # ESLint configuration
├── next.config.ts                      # Next.js configuration
├── package.json                        # Dependencies and scripts
├── package-lock.json                   # Locked dependency versions
├── postcss.config.js                   # PostCSS configuration
├── postcss.config.mjs                  # PostCSS configuration (module)
├── tailwind.config.ts                  # Tailwind CSS configuration
├── tsconfig.json                       # TypeScript configuration
├── vercel.json                         # Vercel deployment config
├── README.md                           # Project documentation
│
├── public/                             # Static public assets
│   ├── ads.txt                         # Google AdSense verification
│   ├── googlecd2f68a869bc0e1a.html    # Google verification file
│   ├── manifest.json                   # PWA manifest
│   ├── robots.txt                      # Search engine crawl rules
│   ├── sitemap.xml                     # XML sitemap
│   ├── site.webmanifest               # Site manifest
│   ├── favicon.ico                     # Favicon
│   ├── android-chrome-192x192.png     # Chrome icon
│   ├── android-chrome-512x512.png     # Chrome icon
│   ├── apple-touch-icon.png           # Apple touch icon
│   ├── favicon-16x16.png              # Small favicon
│   ├── favicon-32x32.png              # Large favicon
│   ├── file.svg                       # SVG icon
│   ├── globe.svg                      # SVG icon
│   ├── next.svg                       # Next.js logo
│   ├── placeholder.svg                # Placeholder image
│   ├── vercel.svg                     # Vercel logo
│   ├── window.svg                     # SVG icon
│   └── images/                        # Static game images
│       ├── Checkers.png
│       ├── chess.jpg
│       ├── connect-4.png
│       ├── crossclimb-game.png
│       ├── game2048.jpg
│       ├── hero.jpeg
│       ├── logo1.png
│       ├── minesweepers.jpeg
│       ├── mini-sudoku.png
│       ├── pinpoint-game.png
│       ├── queens-game.png
│       ├── sudoku.jpeg
│       ├── tango-game.png
│       └── zip-game.png
│
└── src/                               # Source code directory
    ├── app/                           # Next.js App Router pages
    │   ├── favicon.ico               # App favicon
    │   ├── globals.css               # Global styles
    │   ├── layout.tsx                # Root layout (HTML shell, providers)
    │   ├── not-found.tsx             # Custom 404 page
    │   ├── page.tsx                  # Homepage
    │   │
    │   ├── about/                    # About page routes
    │   │   ├── layout.tsx            # About layout
    │   │   └── page.tsx              # About page
    │   │
    │   ├── answers/                  # Puzzle answer pages
    │   │   ├── crossclimb/
    │   │   │   └── page.tsx          # Crossclimb answer page
    │   │   ├── mini-sudoku/
    │   │   │   └── page.tsx          # Mini Sudoku answer page
    │   │   ├── pinpoint/
    │   │   │   └── page.tsx          # Pinpoint answer page
    │   │   ├── queens/
    │   │   │   └── page.tsx          # Queens answer page
    │   │   ├── tango/
    │   │   │   └── page.tsx          # Tango answer page
    │   │   └── zip/
    │   │       └── page.tsx          # Zip answer page
    │   │
    │   ├── blog/                     # Blog pages
    │   │   ├── layout.tsx            # Blog layout
    │   │   ├── page.tsx              # Blog listing page
    │   │   ├── best-strategies-for-linkedin-puzzles/
    │   │   │   └── page.tsx          # Blog post
    │   │   ├── brain-training-techniques/
    │   │   │   └── page.tsx          # Blog post
    │   │   ├── daily-puzzle-strategy-guide/
    │   │   │   └── page.tsx          # Blog post
    │   │   ├── how-to-solve-linkedin-pinpoint/
    │   │   │   └── page.tsx          # Blog post
    │   │   ├── how-to-solve-linkedin-zip/
    │   │   │   └── page.tsx          # Blog post
    │   │   ├── linkedin-games-complete-guide/
    │   │   │   └── page.tsx          # Blog post
    │   │   ├── linkedin-puzzle-guide/
    │   │   │   └── page.tsx          # Blog post
    │   │   ├── queens-puzzle-strategy/
    │   │   │   └── page.tsx          # Blog post
    │   │   └── tango-puzzle-tips/
    │   │       └── page.tsx          # Blog post
    │   │
    │   ├── contact/                  # Contact page
    │   │   ├── layout.tsx            # Contact layout
    │   │   └── page.tsx              # Contact form page
    │   │
    │   ├── disclaimer/               # Disclaimer page
    │   │   └── page.tsx
    │   │
    │   ├── editorial-policy/         # Editorial policy page
    │   │   └── page.tsx
    │   │
    │   ├── games/                    # Games page
    │   │   └── page.tsx
    │   │
    │   ├── memes/                    # Memes page
    │   │   ├── layout.tsx            # Memes layout
    │   │   └── page.tsx
    │   │
    │   ├── privacy/                  # Privacy policy page
    │   │   └── page.tsx
    │   │
    │   ├── shop/                     # Shop pages
    │   │   ├── layout.tsx            # Shop layout
    │   │   └── page.tsx              # Shop listing page
    │   │
    │   ├── solutions/                # Solution pages
    │   │   ├── page.tsx              # Solutions hub
    │   │   └── [game]/               # Dynamic solution route
    │   │       └── page.tsx          # Individual puzzle solution
    │   │
    │   ├── terms/                    # Terms of service
    │   │   └── page.tsx
    │   │
    │   └── tools/                    # Tools pages
    │       ├── layout.tsx            # Tools layout
    │       └── page.tsx              # Tools listing
    │
    ├── components/                   # React components
    │   ├── AdPlaceholder.tsx        # Ad placeholder component
    │   ├── Footer.tsx                # Site footer
    │   ├── Header.tsx                # Site header with navigation
    │   ├── JsonLd.tsx                # JSON-LD structured data
    │   ├── NavLink.tsx               # Navigation link component
    │   ├── providers.tsx             # React Query + Theme providers
    │   ├── PuzzleCountdown.tsx       # Puzzle countdown timer
    │   ├── PuzzleIcon.tsx            # Puzzle type icon mapper
    │   ├── RecruitmentBanner.tsx     # Recruitment banner
    │   ├── SocialShareButtons.tsx    # Social sharing buttons
    │   ├── ThemeToggle.tsx           # Dark/Light mode toggle
    │   │
    │   ├── ads/                      # AdSense components
    │   │   ├── AdBlock.tsx           # Ad block wrapper
    │   │   ├── HeaderBanner.tsx      # Header banner ad
    │   │   ├── InContentAd.tsx       # In-content advertisement
    │   │   ├── ScrollPopupAd.tsx     # Scroll popup ad
    │   │   └── StickyMobileAd.tsx    # Sticky mobile ad
    │   │
    │   ├── home/                     # Homepage section components
    │   │   ├── FAQSection.tsx       # FAQ accordion section
    │   │   ├── HeroSection.tsx      # Hero banner section
    │   │   ├── HowItWorks.tsx       # How it works section
    │   │   ├── TodaysPuzzles.tsx    # Today's puzzles section
    │   │   └── WhatsNewSection.tsx   # What's new section
    │   │
    │   ├── pages/                    # Page-level components
    │   │   ├── AboutPage.tsx        # About page content
    │   │   ├── BlogPage.tsx         # Blog page content
    │   │   ├── ContactPage.tsx      # Contact page content
    │   │   ├── DisclaimerPage.tsx   # Disclaimer page content
    │   │   ├── Memes.tsx           # Memes page content
    │   │   ├── PrivacyPage.tsx     # Privacy page content
    │   │   ├── ShopPage.tsx        # Shop page content
    │   │   └── ToolsPage.tsx       # Tools page content
    │   │
    │   ├── seo/                      # SEO components
    │   │   └── AnswerLandingPage.tsx # Answer landing page SEO
    │   │
    │   ├── shop/                     # Shop components
    │   │   ├── ShopCard.tsx         # Product card component
    │   │   └── ShopFilters.tsx      # Product filters
    │   │
    │   └── ui/                       # shadcn/ui components
    │       ├── accordion.tsx
    │       ├── alert-dialog.tsx
    │       ├── alert.tsx
    │       ├── aspect-ratio.tsx
    │       ├── avatar.tsx
    │       ├── badge.tsx
    │       ├── breadcrumb.tsx
    │       ├── button.tsx
    │       ├── calendar.tsx
    │       ├── card.tsx
    │       ├── carousel.tsx
    │       ├── chart.tsx
    │       ├── checkbox.tsx
    │       ├── collapsible.tsx
    │       ├── command.tsx
    │       ├── context-menu.tsx
    │       ├── dialog.tsx
    │       ├── drawer.tsx
    │       ├── dropdown-menu.tsx
    │       ├── form.tsx
    │       ├── hover-card.tsx
    │       ├── input-otp.tsx
    │       ├── input.tsx
    │       ├── label.tsx
    │       ├── menubar.tsx
    │       ├── navigation-menu.tsx
    │       ├── pagination.tsx
    │       ├── popover.tsx
    │       ├── progress.tsx
    │       ├── radio-group.tsx
    │       ├── scroll-area.tsx
    │       ├── select.tsx
    │       ├── separator.tsx
    │       ├── sheet.tsx
    │       ├── sidebar.tsx
    │       ├── skeleton.tsx
    │       ├── slider.tsx
    │       ├── sonner.tsx
    │       ├── switch.tsx
    │       ├── table.tsx
    │       ├── tabs.tsx
    │       ├── textarea.tsx
    │       ├── toast.tsx
    │       ├── toaster.tsx
    │       ├── toggle-group.tsx
    │       ├── toggle.tsx
    │       ├── tooltip.tsx
    │       └── use-toast.ts
    │
    ├── hooks/                        # Custom React hooks
    │   ├── use-mobile.tsx            # Mobile breakpoint detection
    │   └── use-toast.ts              # Toast notification hook
    │
    └── lib/                          # Utility libraries
        ├── api.ts                   # API fetch functions
        ├── constants.ts             # App constants & config
        ├── prefetcher.ts            # Link prefetching utilities
        ├── shopUtils.ts             # Shop-specific utilities
        ├── types.ts                 # TypeScript interfaces/types
        └── utils.ts                 # General utilities (cn function)
```

---

## Static Generation with generateStaticParams

Puzzle solution pages use `generateStaticParams` to pre-render all game routes at build time:

```tsx
// src/app/solutions/[game]/page.tsx

export async function generateStaticParams() {
  return [
    { game: 'pinpoint' },
    { game: 'queens' },
    { game: 'tango' },
    { game: 'crossclimb' },
    { game: 'zip' },
    { game: 'mini-sudoku' },
  ];
}

export async function generateMetadata({ params }: { params: { game: string } }) {
  const today = new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric' });
  return {
    title: `LinkedIn ${params.game} Answer Today (${today}) | PuzzleLogicHub`,
    description: `Get today's LinkedIn ${params.game} puzzle answer with step-by-step solution and strategy tips. Updated daily.`,
  };
}

export default async function SolutionPage({ params }: { params: { game: string } }) {
  const puzzles = await fetchPuzzles(params.game);
  return <SolutionDetail game={params.game} puzzles={puzzles} />;
}
```

For daily content updates without full rebuilds, enable ISR by adding a revalidation interval:

```tsx
export const revalidate = 3600; // Revalidate every hour
```

---

## SEO with Next.js Metadata API

Instead of react-helmet-async, each page exports a `metadata` object or `generateMetadata` function:

```tsx
// Static metadata example
export const metadata = {
  title: 'LinkedIn Puzzle Answers Today | PuzzleLogicHub',
  description: 'Get daily LinkedIn puzzle answers with step-by-step solutions.',
  openGraph: {
    title: 'LinkedIn Puzzle Answers Today',
    description: 'Free daily solutions for LinkedIn puzzles.',
    url: 'https://daily-puzzle-solve.vercel.app',
    images: [{ url: '/images/hero.jpeg', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@PuzzleLogicHub',
  },
};
```

JSON-LD structured data is added as a `<script>` tag within page components:

```tsx
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSchema) }}
/>
```

---

## Migration Guide: Vite React SPA to Next.js App Router

Follow these steps to migrate the existing codebase from Vite + React Router to Next.js App Router.

### Step 1: Create a New Next.js Project

```bash
npx create-next-app@latest dailypuzzlesolve-next --typescript --tailwind --eslint --app --src-dir
cd dailypuzzlesolve-next
```

### Step 2: Install Dependencies

```bash
npm install @tanstack/react-query framer-motion next-themes lucide-react react-hook-form @hookform/resolvers zod sonner recharts
npm install class-variance-authority clsx tailwind-merge tailwindcss-animate
npm install -D @types/node
```

Install shadcn/ui:

```bash
npx shadcn-ui@latest init
```

Then add the components you need:

```bash
npx shadcn-ui@latest add button card accordion dialog dropdown-menu sheet tabs toast tooltip
```

### Step 3: Copy Static Assets

Copy the entire `public/` folder from the old project into the new project root. This includes images, favicons, ads.txt, robots.txt, sitemap.xml, and manifest files.

### Step 4: Set Up the Root Layout

Create `src/app/layout.tsx` to replace the old `App.tsx`:

```tsx
import type { Metadata } from 'next';
import { ThemeProvider } from 'next-themes';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import QueryProvider from '@/components/QueryProvider';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: 'LinkedIn Puzzle Answers Today | PuzzleLogicHub',
    template: '%s | PuzzleLogicHub',
  },
  description: 'Daily LinkedIn puzzle answers with step-by-step solutions.',
  metadataBase: new URL('https://daily-puzzle-solve.vercel.app'),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <QueryProvider>
            <div className="flex min-h-screen flex-col">
              <Header />
              <main className="flex-1">{children}</main>
              <Footer />
            </div>
          </QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
```

### Step 5: Create a Client-Side Query Provider

React Query requires a client component wrapper:

```tsx
// src/components/QueryProvider.tsx
'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';

export default function QueryProvider({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        retry: 1,
        staleTime: 30 * 60 * 1000,
        refetchOnWindowFocus: false,
      },
    },
  }));

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}
```

### Step 6: Convert Pages

For each page in `src/pages/`, create a corresponding route in `src/app/`:

| Old Path (React Router) | New Path (App Router) |
|---|---|
| `src/pages/index.tsx` | `src/app/page.tsx` |
| `src/pages/solutions.tsx` | `src/app/solutions/page.tsx` |
| `src/pages/solutiondetail.tsx` | `src/app/solutions/[game]/page.tsx` |
| `src/pages/contact.tsx` | `src/app/contact/page.tsx` |
| `src/pages/about.tsx` | `src/app/about/page.tsx` |
| `src/pages/shop.tsx` | `src/app/shop/page.tsx` |
| `src/pages/blog.tsx` | `src/app/blog/page.tsx` |
| `src/pages/notfound.tsx` | `src/app/not-found.tsx` |

For each converted page:

1. Remove all `react-helmet-async` imports and `<Helmet>` components
2. Export a `metadata` object or `generateMetadata` function instead
3. Replace `useParams()` from React Router with the `params` prop from Next.js
4. Replace `useNavigate()` with `useRouter()` from `next/navigation`
5. Replace `<Link to="...">` with `<Link href="...">` from `next/link`
6. Mark components using hooks like `useState` or `useEffect` with `'use client'` at the top

### Step 7: Replace React Router Links

Search and replace across the codebase:

```
// Old (React Router)
import { Link } from 'react-router-dom';
<Link to="/solutions/pinpoint">

// New (Next.js)
import Link from 'next/link';
<Link href="/solutions/pinpoint">
```

### Step 8: Optimize Images

Replace standard `<img>` tags with the Next.js Image component:

```tsx
import Image from 'next/image';

<Image
  src="/images/hero.jpeg"
  alt="LinkedIn Puzzle Solutions"
  width={1200}
  height={630}
  priority
/>
```

### Step 9: Configure Environment Variables

Create a `.env.local` file:

```env
NEXT_PUBLIC_API_URL=https://dps-backend-epx7.onrender.com
NEXT_PUBLIC_SITE_URL=https://daily-puzzle-solve.vercel.app
NEXT_PUBLIC_ADSENSE_CLIENT=ca-pub-5138062904998916
```

### Step 10: Update next.config.js

```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'img.youtube.com' },
      { protocol: 'https', hostname: 'dps-backend-epx7.onrender.com' },
    ],
  },
  async headers() {
    return [
      {
        source: '/ads.txt',
        headers: [{ key: 'Content-Type', value: 'text/plain' }],
      },
    ];
  },
  async redirects() {
    return [
      {
        source: '/index',
        destination: '/',
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
```

### Step 11: Run and Test

```bash
npm run dev
```

Open http://localhost:3000 and verify:

1. All pages load correctly
2. Dark and light mode toggle works
3. Puzzle solution pages render with correct data
4. SEO meta tags appear in page source (not just client-rendered)
5. AdSense script loads once in the root layout
6. Internal links navigate without full page reloads
7. Images are optimized and served as WebP

### Step 12: Deploy to Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

Vercel automatically detects Next.js and configures:

- Edge caching for static pages
- Serverless functions for dynamic routes
- Automatic ISR support
- Image optimization CDN
- HTTP/2 and Brotli compression

---

## Development

### Prerequisites

- Node.js 18+ and npm

### Local Setup

```bash
# Clone the repository
git clone https://github.com/harshitSingh1/DailyPuzzleSolve.git
cd DailyPuzzleSolve

# Install dependencies
npm install

# Start the development server
npm run dev
```

Open http://localhost:3000 in your browser.

### Build for Production

```bash
npm run build
npm start
```

### Environment Variables

| Variable | Description |
|---|---|
| `NEXT_PUBLIC_API_URL` | Backend API base URL |
| `NEXT_PUBLIC_SITE_URL` | Frontend site URL for canonical tags |
| `NEXT_PUBLIC_ADSENSE_CLIENT` | Google AdSense publisher ID |

---

## License

Private. All rights reserved. PuzzleLogicHub.
