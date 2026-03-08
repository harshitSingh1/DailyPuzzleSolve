"use client"

import { useState, useMemo } from "react"
import { useQuery } from "@tanstack/react-query"
import { motion } from "framer-motion"
import { Search, ExternalLink } from "lucide-react"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"

import AdBlock from "@/components/ads/AdBlock"

import { fetchTools } from "@/lib/api"
import type { Tool } from "@/lib/types"

function parseTool(tool: Tool) {
  const tagRegex = /#(\w+)/g
  const tags: string[] = []

  const cleanDesc = (tool.subheading || "")
    .replace(tagRegex, (_, tag) => {
      tags.push(tag)
      return ""
    })
    .trim()

  return { cleanDesc, tags }
}

export default function ToolsPage() {
  const [search, setSearch] = useState("")

  const { data: tools = [], isLoading, error } = useQuery({
    queryKey: ["tools"],
    queryFn: fetchTools,
  })

  const processed = useMemo(
    () => tools.map((t) => ({ tool: t, ...parseTool(t) })),
    [tools]
  )

  const filtered = useMemo(() => {
    if (!search) return processed

    const words = search.toLowerCase().split(" ")

    return processed.filter(({ tool, cleanDesc, tags }) => {
      const hay = `${tool.title} ${cleanDesc} ${tags.join(" ")}`.toLowerCase()
      return words.some((w) => hay.includes(w))
    })
  }, [search, processed])

  return (
    <main className="pt-6 pb-12">
      <div className="container">

        {/* Hidden SEO Heading */}
        <h2 className="sr-only">
          Best Free Developer Tools for Coding and Puzzle Solving
        </h2>

        {/* Header */}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 text-center"
        >
          <h1 className="font-display text-3xl font-extrabold sm:text-4xl mb-2">
            Essential Developer Tools
          </h1>

          <p className="mx-auto max-w-lg text-muted-foreground">
            Boost your puzzle-solving and coding skills with these hand-picked tools
          </p>
        </motion.div>

        {/* Search */}

        <div className="mx-auto mb-8 max-w-md relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

          <Input
            placeholder="Search tools..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 rounded-full"
          />
        </div>

        {/* Top Leaderboard Ad */}

        <AdBlock
          slot="5934836566"
          format="leaderboard"
          lazy={false}
          minHeight={90}
          className="mb-8"
        />

        {/* Tools Grid */}

        {isLoading ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="flex flex-col rounded-xl border border-border bg-card">
                <div className="flex items-center gap-3 p-4 pb-0">
                  <Skeleton className="h-14 w-14 rounded-lg" />
                  <Skeleton className="h-5 w-2/3" />
                </div>

                <div className="flex flex-col gap-3 p-4 pt-2">
                  <Skeleton className="h-12 w-full" />
                  <Skeleton className="h-4 w-1/2" />
                  <Skeleton className="h-9 w-full mt-1" />
                </div>
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">
              Server is waking up, retrying...
            </p>

            <Button
              variant="outline"
              onClick={() => window.location.reload()}
            >
              Try Again
            </Button>
          </div>
        ) : filtered.length === 0 ? (
          <p className="text-center text-muted-foreground py-12">
            {search
              ? `No tools found matching "${search}"`
              : "No tools available at the moment."}
          </p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {filtered.map(({ tool, cleanDesc, tags }, i) => (
              <motion.div
                key={tool._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.03 * i }}
                className="group flex flex-col rounded-xl border border-border bg-card shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="flex items-center gap-3 p-4 pb-0">
                  <img
                    src={tool.image || "/placeholder.svg"}
                    alt={`${tool.title} logo`}
                    className="h-14 w-14 rounded-lg object-contain"
                    loading="lazy"
                  />

                  <h2 className="font-display text-lg font-bold">
                    {tool.title}
                  </h2>
                </div>

                <div className="flex flex-1 flex-col p-4 pt-2">

                  <p className="mb-3 flex-1 text-sm text-muted-foreground line-clamp-3">
                    {cleanDesc}
                  </p>

                  {tags.length > 0 && (
                    <div className="mb-3 flex flex-wrap gap-1">
                      {tags.map((tag) => (
                        <Badge key={tag} variant="secondary">
                          #{tag}
                        </Badge>
                      ))}
                    </div>
                  )}

                  <Button asChild className="w-full gap-1.5">
                    <a
                      href={tool.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Visit Tool
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </Button>

                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Mid-page Ad */}

        <AdBlock
          slot="5934836566"
          format="rectangle"
          lazy={true}
          minHeight={250}
          className="mt-8"
        />

        {/* Educational Intro */}

        <div className="mx-auto mt-8 max-w-3xl space-y-4 text-muted-foreground leading-relaxed">

          <p>
            Whether you are debugging complex code, optimizing a development workflow, or searching for better ways to visualize algorithms and data structures, the right developer tool can save hours of work. Our curated collection of free developer tools is designed specifically for programmers, puzzle solvers, and problem-solving enthusiasts who rely on efficient workflows.
          </p>

          <p>
            Every tool listed on this page has been tested based on three important criteria: reliability, accessibility, and practical usefulness. We prioritize tools that run directly in your browser without requiring installation, offer free core functionality, and provide genuine value for developers solving real-world problems.
          </p>

          <p>
            Many competitive programmers and logic puzzle enthusiasts use tools like JSON validators, code formatters, regex testers, and algorithm visualizers to prototype solutions, verify patterns, and debug logic quickly. These tools can significantly improve productivity when working on coding challenges, daily puzzles, or software development tasks.
          </p>

          <p>
            Our team continuously reviews new developer utilities and removes outdated or unreliable tools to keep this collection accurate and useful. If you frequently work with code, data, or logical problem solving, bookmarking this page can help you quickly access powerful tools whenever you need them.
          </p>

        </div>

        {/* SEO Authority Section */}

        <div className="mx-auto mt-8 max-w-2xl rounded-xl border border-border bg-muted/30 p-6 text-center">

          <h2 className="font-display text-xl font-bold mb-2">
            About Our Developer Tools Collection
          </h2>

          <p className="text-sm text-muted-foreground leading-relaxed">
            This curated collection of developer tools is designed to help programmers,
            competitive coders, and puzzle enthusiasts work more efficiently.
            From debugging utilities to visualization tools, each resource is chosen
            for reliability, performance, and real-world usefulness.
          </p>

          <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
            Whether you are solving algorithm challenges, building software,
            or experimenting with logical puzzles, the right tool can dramatically
            reduce development time and improve problem-solving accuracy.
            Our goal is to provide a trusted library of tools that developers
            can rely on every day.
          </p>

          <div className="mt-4 flex flex-wrap justify-center gap-2">

            {[
              "free developer tools",
              "coding tools online",
              "programming utilities",
              "puzzle solving tools",
              "developer productivity tools",
              "algorithm visualization tools",
              "regex tester online",
              "json formatter tool",
            ].map((q) => (

              <span
                key={q}
                className="rounded-full bg-background border border-border px-3 py-1 text-xs text-muted-foreground"
              >
                {q}
              </span>

            ))}

          </div>

        </div>

        {/* Bottom Ad */}

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