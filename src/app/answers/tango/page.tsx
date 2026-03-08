import AnswerLandingPage from "@/components/seo/AnswerLandingPage"
import { SITE_URL } from "@/lib/constants"

export const metadata = {
  title: "Tango Puzzle Answer Today – LinkedIn Puzzle Solution",
  description:
    "Today's LinkedIn Tango puzzle answer with hints, explanation, and walkthrough.",
  alternates: {
    canonical: `${SITE_URL}/answers/tango`,
  },
}

export default function Page() {
  return (
    <AnswerLandingPage
      gameName="LinkedIn Tango"
      gameSlug="tango"
    />
  )
}