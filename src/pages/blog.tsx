// src\pages\blog.tsx
import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { ExternalLink, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import SEOHead from "@/components/SEOHead";
import AdBlock from "@/components/ads/AdBlock";
import InContentAd from "@/components/ads/InContentAd";
import { SITE_URL, SITE_NAME } from "@/lib/constants";

interface BlogPost {
  id: number;
  title: string;
  description: string;
  readable_publish_date: string;
  url: string;
  cover_image: string;
  reading_time_minutes: number;
  tag_list: string[];
  user: { name: string; profile_image: string };
}

async function fetchBlogPosts(): Promise<BlogPost[]> {
  const res = await fetch(
    "https://dev.to/api/articles?tags=technology,job,programming,coding&top=7"
  );
  if (!res.ok) throw new Error("Failed to fetch blog posts");
  return res.json();
}

const POSTS_PER_PAGE = 6;
const today = new Date().toISOString().split("T")[0];

const ORIGINAL_ARTICLES = [
  {
    title: "How to Solve LinkedIn Pinpoint Faster",
    description: "Proven strategies for guessing the Pinpoint answer in fewer clues. Master category thinking, elimination, and word association.",
    path: "/blog/how-to-solve-linkedin-pinpoint",
    readTime: "8 min",
    image: "/images/pinpoint-game.png",
  },
  {
    title: "Best Brain Training Techniques for Puzzle Solvers",
    description: "Science-backed methods to improve memory, focus, and pattern recognition. Spaced repetition, working memory exercises, and deliberate practice.",
    path: "/blog/brain-training-techniques",
    readTime: "10 min",
    image: "/images/hero.jpeg",
  },
  {
    title: "Daily Puzzle Strategy Guide: Master Every LinkedIn Game",
    description: "Complete strategies for Pinpoint, Queens, Tango, Crossclimb, Zip, and Mini Sudoku. Tips from experienced solvers.",
    path: "/blog/daily-puzzle-strategy-guide",
    readTime: "12 min",
    image: "/images/crossclimb-game.png",
  },
  {
    title: "How to Master the LinkedIn Queens Puzzle",
    description: "Constraint-based solving, backtracking, and pattern recognition. A systematic approach that eliminates guessing.",
    path: "/blog/queens-puzzle-strategy",
    readTime: "9 min",
    image: "/images/queens-game.png",
  },
  {
    title: "LinkedIn Tango Puzzle: Tips to Solve It Every Time",
    description: "Master forced moves, balance counting, and the triple rule. Systematic techniques for consistent solves.",
    path: "/blog/tango-puzzle-tips",
    readTime: "7 min",
    image: "/images/tango-game.png",
  },
];

const Blog = () => {
  const [page, setPage] = useState(1);

  const { data: posts = [], isLoading, error } = useQuery({
    queryKey: ["blog-posts"],
    queryFn: fetchBlogPosts,
    staleTime: 1000 * 60 * 30,
  });

  const featuredPost = posts[0] ?? null;
  const remainingPosts = posts.slice(1);

  const totalPages = Math.ceil(remainingPosts.length / POSTS_PER_PAGE);
  const currentPosts = useMemo(
    () => remainingPosts.slice((page - 1) * POSTS_PER_PAGE, page * POSTS_PER_PAGE),
    [remainingPosts, page]
  );

  const articleSchema = featuredPost
    ? {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: featuredPost.title,
        description: featuredPost.description,
        url: featuredPost.url,
        datePublished: featuredPost.readable_publish_date,
        dateModified: today,
        author: { "@type": "Person", name: featuredPost.user.name },
        publisher: { "@type": "Organization", name: SITE_NAME, logo: { "@type": "ImageObject", url: `${SITE_URL}/images/logo1.png` } },
        image: featuredPost.cover_image || `${SITE_URL}/images/hero.jpeg`,
      }
    : undefined;

  return (
    <>
      <SEOHead
        title="Puzzle Strategy Blog - Tips, Guides & Brain Training Articles"
        description="Expert puzzle-solving strategies, brain training techniques, and daily guides for LinkedIn Pinpoint, Queens, Tango, Crossclimb, Zip, and Mini Sudoku."
        path="/blog"
        type="website"
        dateModified={today}
        breadcrumbs={[{ name: "Blog", url: `${SITE_URL}/blog` }]}
        jsonLd={articleSchema}
      />

      <main className="pt-6 pb-12">
        <div className="container max-w-5xl">
          <h1 className="mb-2 text-center font-display text-3xl font-extrabold text-foreground sm:text-4xl">
            Puzzle Strategy Blog
          </h1>
          <p className="mb-8 text-center text-muted-foreground max-w-2xl mx-auto">
            In-depth strategy guides, brain training articles, and daily solving tips written by our editorial team. Learn the reasoning behind every puzzle so you can solve tomorrow's on your own.
          </p>

          {/* Original strategy articles */}
          <section className="mb-10">
            <h2 className="font-display text-xl font-bold text-foreground mb-4 flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-primary" /> Our Strategy Guides
            </h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {ORIGINAL_ARTICLES.map((article, i) => (
                <motion.div
                  key={article.path}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Link
                    to={article.path}
                    className="flex flex-col h-full overflow-hidden rounded-xl border border-border bg-card shadow-sm transition-all hover:-translate-y-1 hover:shadow-md hover:border-primary/50"
                  >
                    <img
                      src={article.image}
                      alt={article.title}
                      className="h-36 w-full object-cover"
                      loading={i < 3 ? "eager" : "lazy"}
                    />
                    <div className="flex flex-1 flex-col p-4">
                      <h3 className="mb-1 font-display text-base font-bold text-foreground line-clamp-2">{article.title}</h3>
                      <p className="mb-3 text-sm text-muted-foreground line-clamp-2">{article.description}</p>
                      <div className="mt-auto flex items-center justify-between text-xs text-muted-foreground">
                        <span>{SITE_NAME} Team</span>
                        <span>{article.readTime} read</span>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </section>

          <AdBlock slot="5934836566" format="leaderboard" lazy={false} minHeight={90} className="mb-6" />

          <h2 className="font-display text-xl font-bold text-foreground mb-4">Trending Tech Articles</h2>

          {/* Featured post */}
          {isLoading ? (
            <Skeleton className="mb-8 h-80 w-full rounded-xl" />
          ) : featuredPost ? (
            <motion.article
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8 overflow-hidden rounded-xl border border-border bg-card shadow-sm md:flex"
              itemScope
              itemType="https://schema.org/Article"
            >
              {featuredPost.cover_image && (
                <img
                  src={featuredPost.cover_image}
                  alt={featuredPost.title}
                  className="h-56 w-full object-cover md:h-auto md:w-2/5"
                  loading="eager"
                  itemProp="image"
                />
              )}
              <div className="flex flex-1 flex-col justify-between p-6">
                <div>
                  <span className="mb-2 inline-block rounded-full bg-primary/10 px-3 py-0.5 text-xs font-semibold text-primary">
                    Featured
                  </span>
                  <h2 className="mb-2 font-display text-xl font-bold text-foreground line-clamp-2" itemProp="headline">
                    {featuredPost.title}
                  </h2>
                  <p className="mb-4 text-sm text-muted-foreground line-clamp-3" itemProp="description">
                    {featuredPost.description}
                  </p>
                </div>
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <img
                      src={featuredPost.user.profile_image}
                      alt={featuredPost.user.name}
                      className="h-8 w-8 rounded-full"
                    />
                    <div className="text-xs">
                      <p className="font-semibold text-foreground" itemProp="author">{featuredPost.user.name}</p>
                      <p className="text-muted-foreground">
                        {featuredPost.readable_publish_date} · {featuredPost.reading_time_minutes} min read
                      </p>
                    </div>
                  </div>
                  <Button asChild className="gap-2 rounded-full font-display font-semibold">
                    <a href={featuredPost.url} target="_blank" rel="noopener noreferrer">
                      Read Article <ExternalLink className="h-4 w-4" />
                    </a>
                  </Button>
                </div>
              </div>
            </motion.article>
          ) : null}

          {/* In-article ad after featured post */}
          <InContentAd className="mb-6" />

          {/* Posts grid */}
          {error ? (
            <p className="py-12 text-center text-muted-foreground">
              Failed to load articles. Please try again later.
            </p>
          ) : (
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {isLoading
                ? Array.from({ length: 6 }).map((_, i) => (
                    <div key={i} className="space-y-3">
                      <Skeleton className="h-40 w-full rounded-xl" />
                      <Skeleton className="h-4 w-3/4" />
                      <Skeleton className="h-4 w-1/2" />
                    </div>
                  ))
                : currentPosts.map((post, i) => (
                    <motion.article
                      key={post.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.05 }}
                      className="flex flex-col overflow-hidden rounded-xl border border-border bg-card shadow-sm transition-all hover:-translate-y-1 hover:shadow-md"
                    >
                      {post.cover_image && (
                        <img
                          src={post.cover_image}
                          alt={post.title}
                          className="h-40 w-full object-cover"
                          loading="lazy"
                        />
                      )}
                      <div className="flex flex-1 flex-col p-4">
                        <h3 className="mb-1 font-display text-base font-bold text-foreground line-clamp-2">
                          {post.title}
                        </h3>
                        <p className="mb-3 text-sm text-muted-foreground line-clamp-2">
                          {post.description}
                        </p>
                        {post.tag_list.length > 0 && (
                          <div className="mb-3 flex flex-wrap gap-1">
                            {post.tag_list.slice(0, 3).map((tag) => (
                              <span key={tag} className="rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground">
                                #{tag}
                              </span>
                            ))}
                          </div>
                        )}
                        <div className="mt-auto flex items-center justify-between text-xs text-muted-foreground">
                          <div className="flex items-center gap-1.5">
                            <img src={post.user.profile_image} alt="" className="h-5 w-5 rounded-full" />
                            <span>{post.user.name}</span>
                          </div>
                          <span>{post.readable_publish_date}</span>
                        </div>
                      </div>
                      <div className="border-t border-border p-3">
                        <Button asChild variant="outline" className="w-full gap-2 rounded-full font-display font-semibold">
                          <a href={post.url} target="_blank" rel="noopener noreferrer">
                            Read ({post.reading_time_minutes} min) <ExternalLink className="h-3.5 w-3.5" />
                          </a>
                        </Button>
                      </div>
                    </motion.article>
                  ))}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-8">
              <Pagination>
                <PaginationContent>
                  {page > 1 && (
                    <PaginationItem>
                      <PaginationPrevious href="#" onClick={(e) => { e.preventDefault(); setPage(page - 1); window.scrollTo({ top: 0, behavior: "smooth" }); }} />
                    </PaginationItem>
                  )}
                  {Array.from({ length: totalPages }, (_, i) => (
                    <PaginationItem key={i}>
                      <PaginationLink
                        href="#"
                        isActive={page === i + 1}
                        onClick={(e) => { e.preventDefault(); setPage(i + 1); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                      >
                        {i + 1}
                      </PaginationLink>
                    </PaginationItem>
                  ))}
                  {page < totalPages && (
                    <PaginationItem>
                      <PaginationNext href="#" onClick={(e) => { e.preventDefault(); setPage(page + 1); window.scrollTo({ top: 0, behavior: "smooth" }); }} />
                    </PaginationItem>
                  )}
                </PaginationContent>
              </Pagination>
            </div>
          )}

          {/* Ad before SEO content */}
          <AdBlock slot="5934836566" format="rectangle" lazy={true} minHeight={250} className="mt-8" />

          {/* SEO content */}
          <div className="mt-8 rounded-xl border border-border bg-muted/30 p-6">
            <h2 className="mb-2 font-display text-xl font-bold text-foreground">About Our Tech & Programming Blog</h2>
            <p className="text-muted-foreground leading-relaxed">
              Our blog curates the latest insights, tutorials, and trends in programming, technology, and software development.
              We source top articles from leading developers to help puzzle enthusiasts and coders stay ahead of the curve.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {["programming tutorials", "technology trends", "coding tips", "developer tools", "software engineering"].map((q) => (
                <span key={q} className="rounded-full bg-background border border-border px-3 py-1 text-xs text-muted-foreground">{q}</span>
              ))}
            </div>
          </div>

          {/* Bottom rectangle */}
          <AdBlock slot="5934836566" format="rectangle" lazy={true} minHeight={250} className="mt-4" />
        </div>
      </main>
    </>
  );
};

export default Blog;
