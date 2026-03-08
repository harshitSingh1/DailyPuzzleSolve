import AnswerLandingPage from "@/components/seo/AnswerLandingPage"
import { SITE_URL } from "@/lib/constants"

export const metadata = {
  title: "Pinpoint Answer Today – LinkedIn Puzzle Solution",
  description:
    "Find today's LinkedIn Pinpoint answer with hints, explanation, and full puzzle walkthrough.",
  alternates: {
    canonical: `${SITE_URL}/answers/pinpoint`,
  },
}

export default function Page() {
  return (
    <AnswerLandingPage
      gameName="LinkedIn Pinpoint"
      gameSlug="pinpoint"
    />
  )
}