import { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import RecruitmentBanner from "@/components/RecruitmentBanner";

import Index from "./pages/index";

// Lazy-loaded pages, only loaded when navigated to
const Solutions = lazy(() => import("./pages/solutions"));
const SolutionDetail = lazy(() => import("./pages/solutiondetail"));
const Contact = lazy(() => import("./pages/contact"));
const About = lazy(() => import("./pages/about"));
const Privacy = lazy(() => import("./pages/privacy"));
const Terms = lazy(() => import("./pages/terms"));
const Blog = lazy(() => import("./pages/blog"));
const Games = lazy(() => import("./pages/games"));
const Memes = lazy(() => import("./pages/memes"));
const Shop = lazy(() => import("./pages/shop"));
const Tools = lazy(() => import("./pages/tools"));
const NotFound = lazy(() => import("./pages/notfound"));

// Lazy-loaded heavy ad components
const StickyMobileAd = lazy(() => import("./components/ads/StickyMobileAd"));
const ScrollPopupAd = lazy(() => import("./components/ads/ScrollPopupAd"));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 3,
      staleTime: 10 * 60 * 1000, // 10 min stale, show cached data first
      refetchOnWindowFocus: false,
      gcTime: 24 * 60 * 60 * 1000, // 24h cache in memory
      refetchOnReconnect: false,
    },
  },
});

const PageFallback = () => (
  <div className="flex min-h-[50vh] items-center justify-center">
    <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
  </div>
);

const App = () => (
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
                  <Route path="/games" element={<Games />} />
                  <Route path="/blog" element={<Blog />} />
                  <Route path="/shop" element={<Shop />} />
                  <Route path="/tools" element={<Tools />} />
                  <Route path="/memes" element={<Memes />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </Suspense>
            </div>
            <Footer />
            <Suspense fallback={null}>
              <StickyMobileAd />
              <ScrollPopupAd />
            </Suspense>
          </div>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
