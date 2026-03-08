import Link from "next/link"
import { SITE_URL, SITE_NAME } from "@/lib/constants"

interface Props {
  gameName: string
  gameSlug: string
}

export default function AnswerLandingPage({ gameName, gameSlug }: Props) {

  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  return (
    <main className="container max-w-3xl py-12">

      <h1 className="text-3xl font-bold mb-4">
        {gameName} Answer Today
      </h1>

      <p className="text-muted-foreground mb-6">
        Looking for today's <strong>{gameName}</strong> answer? Our editorial
        team solves the LinkedIn puzzle every day and publishes the correct
        solution with hints and explanations shortly after the puzzle goes live.
      </p>

      <div className="rounded-lg border p-6 bg-muted/40 text-center">

        <h2 className="text-xl font-semibold mb-2">
          View Today's {gameName} Solution
        </h2>

        <Link
          href={`/solutions/${gameSlug}`}
          className="inline-block mt-3 rounded-full bg-primary text-white px-6 py-3 font-medium"
        >
          See Full Solution
        </Link>

      </div>

      <section className="mt-10 space-y-4 text-muted-foreground">

        <h2 className="text-lg font-semibold text-foreground">
          How to Solve {gameName}
        </h2>

        <p>
          {gameName} is one of LinkedIn's daily puzzle games designed to test
          logical reasoning, pattern recognition, and deduction skills.
        </p>

        <p>
          Each puzzle requires analyzing clues carefully and eliminating
          incorrect possibilities step by step. Many experienced solvers use
          structured reasoning techniques to arrive at the correct answer faster.
        </p>

        <p>
          Our solution guides include hints, reasoning steps, and visual
          explanations to help players understand the puzzle instead of simply
          copying the answer.
        </p>

      </section>

    </main>
  )
}