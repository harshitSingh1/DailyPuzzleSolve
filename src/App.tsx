import { lazy, Suspense, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import RecruitmentBanner from "@/components/RecruitmentBanner";
import { prefetchGlobalData, startKeepAlive } from "@/lib/prefetcher";

import Index from "./pages/index";

// Lazy-loaded pages, only loaded when navigated to
const Solutions = lazy(() => import("./pages/solutions"));
const SolutionDetail = lazy(() => import("./pages/solutiondetail"));
const Contact = lazy(() => import("./pages/contact"));
const About = lazy(() => import("./pages/about"));
const Privacy = lazy(() => import("./pages/privacy"));
const Terms = lazy(() => import("./pages/terms"));
const Disclaimer = lazy(() => import("./pages/disclaimer"));
const EditorialPolicy = lazy(() => import("./pages/editorial-policy"));
const Blog = lazy(() => import("./pages/blog"));
const BlogPinpoint = lazy(() => import("./pages/blog/how-to-solve-linkedin-pinpoint"));
const BlogBrainTraining = lazy(() => import("./pages/blog/brain-training-techniques"));
const BlogStrategyGuide = lazy(() => import("./pages/blog/daily-puzzle-strategy-guide"));
const BlogQueensStrategy = lazy(() => import("./pages/blog/queens-puzzle-strategy"));
const BlogTangoTips = lazy(() => import("./pages/blog/tango-puzzle-tips"));
const Games = lazy(() => import("./pages/games"));
const Memes = lazy(() => import("./pages/memes"));
const LinkedinPuzzleGuide = lazy(() => import("./pages/linkedin-puzzle-guide"));
const HowToSolveZip = lazy(() => import("./pages/how-to-solve-linkedin-zip"));
const HowToSolvePinpoint = lazy(() => import("./pages/how-to-solve-linkedin-pinpoint"));
const LinkedinGamesGuide = lazy(() => import("./pages/linkedin-games-complete-guide"));
const BestStrategies = lazy(() => import("./pages/best-strategies-for-linkedin-puzzles"));
const Shop = lazy(() => import("./pages/shop"));
const Tools = lazy(() => import("./pages/tools"));
const NotFound = lazy(() => import("./pages/notfound"));

// Removed intrusive popup/sticky ads for AdSense policy compliance

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 30 * 60 * 1000,       // 30 min stale – show cached data instantly
      refetchOnWindowFocus: false,
      gcTime: 60 * 60 * 1000,           // 60 min cache in memory
      refetchOnReconnect: false,
    },
  },
});

const PageFallback = () => (
  <div className="flex min-h-[50vh] items-center justify-center">
    <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
  </div>
);

const App = () => {
  useEffect(() => {
    prefetchGlobalData(queryClient);
    startKeepAlive();
  }, []);

  return (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <div className="flex min-h-screen flex-col">
            <RecruitmentBanner />
            <Header />
            
            <div className="flex-1">
              <Suspense fallback={<PageFallback />}>
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/solutions" element={<Solutions />} />
                  <Route path="/solutions/:game" element={<SolutionDetail />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/privacy" element={<Privacy />} />
                  <Route path="/terms" element={<Terms />} />
                  <Route path="/disclaimer" element={<Disclaimer />} />
                  <Route path="/editorial-policy" element={<EditorialPolicy />} />
                  <Route path="/games" element={<Games />} />
                  <Route path="/blog" element={<Blog />} />
                  <Route path="/blog/how-to-solve-linkedin-pinpoint" element={<BlogPinpoint />} />
                  <Route path="/blog/brain-training-techniques" element={<BlogBrainTraining />} />
                  <Route path="/blog/daily-puzzle-strategy-guide" element={<BlogStrategyGuide />} />
                  <Route path="/blog/queens-puzzle-strategy" element={<BlogQueensStrategy />} />
                  <Route path="/blog/tango-puzzle-tips" element={<BlogTangoTips />} />
                  <Route path="/shop" element={<Shop />} />
                  <Route path="/tools" element={<Tools />} />
                  <Route path="/memes" element={<Memes />} />
                  <Route path="/linkedin-puzzle-guide" element={<LinkedinPuzzleGuide />} />
                  <Route path="/how-to-solve-linkedin-zip" element={<HowToSolveZip />} />
                  <Route path="/how-to-solve-linkedin-pinpoint" element={<HowToSolvePinpoint />} />
                  <Route path="/linkedin-games-complete-guide" element={<LinkedinGamesGuide />} />
                  <Route path="/best-strategies-for-linkedin-puzzles" element={<BestStrategies />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </Suspense>
            </div>
            <Footer />
          </div>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
  );
};

export default App;
