"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import { useQuery } from "@tanstack/react-query"
import { motion } from "framer-motion"
import { ExternalLink, BookOpen } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

import AdBlock from "@/components/ads/AdBlock"
import InContentAd from "@/components/ads/InContentAd"

import { SITE_NAME } from "@/lib/constants"

/* ------------------------------------------------ */

interface BlogPost {
  id: number
  title: string
  description: string
  readable_publish_date: string
  url: string
  cover_image: string
  reading_time_minutes: number
  tag_list: string[]
  user: { name: string; profile_image: string }
}

/* ------------------------------------------------ */

async function fetchBlogPosts(): Promise<BlogPost[]> {
  const res = await fetch(
    "https://dev.to/api/articles?tags=technology,programming,coding&top=7"
  )

  if (!res.ok) throw new Error("Failed to fetch blog posts")

  return res.json()
}

/* ------------------------------------------------ */

const POSTS_PER_PAGE = 6

/* ------------------------------------------------ */

export default function BlogPage() {

  const [page, setPage] = useState(1)

  const { data: posts = [], isLoading, error } = useQuery({
    queryKey: ["blog-posts"],
    queryFn: fetchBlogPosts,
    staleTime: 1000 * 60 * 30,
  })

  const featuredPost = posts[0] ?? null
  const remainingPosts = posts.slice(1)

  const totalPages = Math.ceil(remainingPosts.length / POSTS_PER_PAGE)

  const currentPosts = useMemo(() => {
    return remainingPosts.slice(
      (page - 1) * POSTS_PER_PAGE,
      page * POSTS_PER_PAGE
    )
  }, [remainingPosts, page])

  return (
    <main className="pt-6 pb-12">

      <div className="container max-w-5xl">

        {/* PAGE TITLE */}

        <h1 className="mb-2 text-center font-display text-3xl font-extrabold sm:text-4xl">
          Puzzle Strategy Blog
        </h1>

        <p className="mb-8 text-center text-muted-foreground max-w-2xl mx-auto">
          In-depth strategy guides, brain training techniques, and logical reasoning insights to help you master daily puzzle games and strengthen analytical thinking.
        </p>

        {/* STRATEGY GUIDES */}

        <section className="mb-10">

          <h2 className="font-display text-xl font-bold mb-4 flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-primary" />
            Our Strategy Guides
          </h2>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">

            {[
              {
                title: "How to Solve LinkedIn Pinpoint Faster",
                description:
                  "Proven strategies for guessing the Pinpoint answer using fewer clues and stronger category thinking.",
                path: "/blog/how-to-solve-linkedin-pinpoint",
              },
              {
                title: "Best Brain Training Techniques for Puzzle Solvers",
                description:
                  "Improve memory, focus, and pattern recognition using research-backed mental exercises.",
                path: "/blog/brain-training-techniques",
              },
              {
                title: "Daily Puzzle Strategy Guide",
                description:
                  "Complete strategies for solving Pinpoint, Queens, Tango, Crossclimb, Zip and Mini Sudoku.",
                path: "/blog/daily-puzzle-strategy-guide",
              },
            ].map((article, i) => (

              <motion.div
                key={article.path}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
              >

                <Link
                  href={article.path}
                  className="flex flex-col h-full rounded-xl border bg-card shadow-sm hover:-translate-y-1 hover:shadow-md transition-all p-5"
                >

                  <h3 className="mb-2 font-display text-lg font-bold">
                    {article.title}
                  </h3>

                  <p className="text-sm text-muted-foreground">
                    {article.description}
                  </p>

                </Link>

              </motion.div>

            ))}

          </div>

        </section>

        {/* TOP AD */}

        <AdBlock
          slot="5934836566"
          format="leaderboard"
          lazy={false}
          minHeight={90}
          className="mb-6"
        />

        {/* FEATURED ARTICLE */}

        {isLoading ? (
          <Skeleton className="mb-8 h-80 w-full rounded-xl" />
        ) : featuredPost ? (

          <article className="mb-8 overflow-hidden rounded-xl border bg-card shadow-sm md:flex">

            {featuredPost.cover_image && (
              <img
                src={featuredPost.cover_image}
                alt={featuredPost.title}
                className="h-56 w-full object-cover md:w-2/5"
              />
            )}

            <div className="flex flex-1 flex-col justify-between p-6">

              <div>

                <span className="mb-2 inline-block rounded-full bg-primary/10 px-3 py-0.5 text-xs font-semibold text-primary">
                  Featured
                </span>

                <h2 className="mb-2 font-display text-xl font-bold">
                  {featuredPost.title}
                </h2>

                <p className="mb-4 text-sm text-muted-foreground">
                  {featuredPost.description}
                </p>

              </div>

              <Button asChild className="gap-2 rounded-full">

                <a
                  href={featuredPost.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Read Article
                  <ExternalLink className="h-4 w-4" />
                </a>

              </Button>

            </div>

          </article>

        ) : null}

        {/* IN CONTENT AD */}

        <InContentAd className="mb-6" />

        {/* BLOG GRID */}

        {error ? (

          <p className="py-12 text-center text-muted-foreground">
            Failed to load articles.
          </p>

        ) : (

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">

            {isLoading
              ? Array.from({ length: 6 }).map((_, i) => (
                  <Skeleton key={i} className="h-40 rounded-xl" />
                ))
              : currentPosts.map((post) => (

                  <article
                    key={post.id}
                    className="flex flex-col overflow-hidden rounded-xl border bg-card shadow-sm hover:-translate-y-1 hover:shadow-md transition-all"
                  >

                    {post.cover_image && (
                      <img
                        src={post.cover_image}
                        alt={post.title}
                        className="h-40 w-full object-cover"
                      />
                    )}

                    <div className="flex flex-1 flex-col p-4">

                      <h3 className="mb-2 font-display text-base font-bold">
                        {post.title}
                      </h3>

                      <p className="text-sm text-muted-foreground">
                        {post.description}
                      </p>

                    </div>

                  </article>

                ))}

          </div>

        )}

        {/* PAGINATION */}

        {totalPages > 1 && (

          <div className="mt-8">

            <Pagination>

              <PaginationContent>

                {page > 1 && (
                  <PaginationItem>
                    <PaginationPrevious
                      href="#"
                      onClick={(e) => {
                        e.preventDefault()
                        setPage(page - 1)
                      }}
                    />
                  </PaginationItem>
                )}

                {Array.from({ length: totalPages }, (_, i) => (

                  <PaginationItem key={i}>
                    <PaginationLink
                      href="#"
                      isActive={page === i + 1}
                      onClick={(e) => {
                        e.preventDefault()
                        setPage(i + 1)
                      }}
                    >
                      {i + 1}
                    </PaginationLink>
                  </PaginationItem>

                ))}

                {page < totalPages && (
                  <PaginationItem>
                    <PaginationNext
                      href="#"
                      onClick={(e) => {
                        e.preventDefault()
                        setPage(page + 1)
                      }}
                    />
                  </PaginationItem>
                )}

              </PaginationContent>

            </Pagination>

          </div>

        )}

        {/* SEO CONTENT */}

        <section className="mt-10 rounded-xl border bg-muted/30 p-6">

          <h2 className="mb-2 font-display text-xl font-bold">
            About Our Tech & Programming Blog
          </h2>

          <p className="text-muted-foreground leading-relaxed">
            This blog focuses on improving logical reasoning, puzzle solving strategies, and programming knowledge. Our editorial team analyzes daily puzzle patterns, algorithmic thinking methods, and cognitive training techniques to help readers become better problem solvers.
          </p>

          <p className="text-muted-foreground mt-2 leading-relaxed">
            Whether you are practicing coding challenges, solving logic puzzles, or improving mental agility, the strategies shared in our articles are designed to help you understand the reasoning behind each solution instead of simply memorizing answers.
          </p>

        </section>

        {/* BOTTOM ADS */}

        <AdBlock
          slot="5934836566"
          format="rectangle"
          lazy={true}
          minHeight={250}
          className="mt-6"
        />

      </div>

    </main>
  )
}