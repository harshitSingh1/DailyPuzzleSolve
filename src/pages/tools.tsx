import { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Search, ExternalLink } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import SEOHead from "@/components/SEOHead";
import AdBlock from "@/components/ads/AdBlock";
import { fetchTools } from "@/lib/api";
import { SITE_URL, SITE_NAME } from "@/lib/constants";
import type { Tool } from "@/lib/types";

function parseTool(tool: Tool) {
  const tagRegex = /#(\w+)/g;
  const tags: string[] = [];
  const cleanDesc = (tool.subheading || "").replace(tagRegex, (_, tag) => {
    tags.push(tag);
    return "";
  }).trim();
  return { cleanDesc, tags };
}

const today = new Date().toISOString().split("T")[0];

const Tools = () => {
  const [search, setSearch] = useState("");
  const { data: tools = [], isLoading, error } = useQuery({
    queryKey: ["tools"],
    queryFn: fetchTools,
  });

  const processed = useMemo(() => tools.map((t) => ({ tool: t, ...parseTool(t) })), [tools]);

  const filtered = useMemo(() => {
    if (!search) return processed;
    const words = search.toLowerCase().split(" ");
    return processed.filter(({ tool, cleanDesc, tags }) => {
      const hay = `${tool.title} ${cleanDesc} ${tags.join(" ")}`.toLowerCase();
      return words.some((w) => hay.includes(w));
    });
  }, [search, processed]);

  return (
    <>
      <SEOHead
        title="Essential Developer & Puzzle Tools – Free Online Resources"
        description="Discover the best free developer tools and resources for puzzle enthusiasts. Enhance your problem-solving and coding workflow with our curated collection."
        path="/tools"
        dateModified={today}
        breadcrumbs={[{ name: "Tools", url: `${SITE_URL}/tools` }]}
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "Developer & Puzzle Tools Collection",
          url: `${SITE_URL}/tools`,
          dateModified: today,
          publisher: { "@type": "Organization", name: SITE_NAME },
          numberOfItems: tools.length,
        }}
      />
      <main className="pt-6 pb-12">
        <div className="container">
          {/* Header */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8 text-center">
            <h1 className="font-display text-3xl font-extrabold sm:text-4xl mb-2">Essential Developer Tools</h1>
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

          {/* Top leaderboard */}
          <AdBlock slot="5934836566" format="leaderboard" lazy={false} minHeight={90} className="mb-8" />

          {/* Tools grid */}
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
            <div className="flex flex-col items-center gap-3 py-12 text-center">
              <p className="text-muted-foreground">Server is waking up, retrying...</p>
              <Button variant="outline" size="sm" onClick={() => window.location.reload()}>Try Again</Button>
            </div>
          ) : filtered.length === 0 ? (
            <p className="text-center text-muted-foreground py-12">
              {search ? `No tools found matching "${search}"` : "No tools available at the moment."}
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
                    <h2 className="font-display text-lg font-bold">{tool.title}</h2>
                  </div>
                  <div className="flex flex-1 flex-col p-4 pt-2">
                    <p className="mb-3 flex-1 text-sm text-muted-foreground line-clamp-3">{cleanDesc}</p>
                    {tags.length > 0 && (
                      <div className="mb-3 flex flex-wrap gap-1">
                        {tags.map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            #{tag}
                          </Badge>
                        ))}
                      </div>
                    )}
                    <Button asChild className="w-full gap-1.5">
                      <a href={tool.url} target="_blank" rel="noopener noreferrer">
                        Visit Tool <ExternalLink className="h-4 w-4" />
                      </a>
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {/* Ad before SEO blurb */}
          <AdBlock slot="5934836566" format="rectangle" lazy={true} minHeight={250} className="mt-8" />

          {/* SEO blurb */}
          <div className="mx-auto mt-8 max-w-2xl rounded-xl border border-border bg-muted/30 p-6 text-center">
            <h2 className="font-display text-xl font-bold mb-2">About Our Developer Tools Collection</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Our hand-picked developer tools enhance your puzzle-solving and coding workflow.
              Each tool is selected for reliability, performance, and real-world usefulness for puzzle enthusiasts and competitive programmers.
            </p>
            <div className="mt-4 flex flex-wrap justify-center gap-2">
              {["free developer tools", "coding tools online", "puzzle solving tools", "programmer utilities", "productivity tools for developers"].map((q) => (
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

export default Tools;
