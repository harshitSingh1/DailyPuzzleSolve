import AnswerLandingPage from "@/components/seo/AnswerLandingPage"
import { SITE_URL } from "@/lib/constants"

export const metadata = {
  title: "Zip Puzzle Answer Today – LinkedIn Puzzle Solution",
  description:
    "Today's LinkedIn Zip puzzle answer with hints and solution explanation.",
  alternates: {
    canonical: `${SITE_URL}/answers/zip`,
  },
}

export default function Page() {
  return (
    <AnswerLandingPage
      gameName="LinkedIn Zip"
      gameSlug="zip"
    />
  )
}