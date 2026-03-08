import AnswerLandingPage from "@/components/seo/AnswerLandingPage"
import { SITE_URL } from "@/lib/constants"

export const metadata = {
  title: "Crossclimb Answer Today – LinkedIn Puzzle Solution",
  description:
    "Find today's LinkedIn Crossclimb answer with hints and step-by-step reasoning.",
  alternates: {
    canonical: `${SITE_URL}/answers/crossclimb`,
  },
}

export default function Page() {
  return (
    <AnswerLandingPage
      gameName="LinkedIn Crossclimb"
      gameSlug="crossclimb"
    />
  )
}