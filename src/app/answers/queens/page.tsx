import AnswerLandingPage from "@/components/seo/AnswerLandingPage"
import { SITE_URL } from "@/lib/constants"

export const metadata = {
  title: "Queens Puzzle Answer Today – LinkedIn Game Solution",
  description:
    "Today's LinkedIn Queens puzzle answer with hints and full explanation.",
  alternates: {
    canonical: `${SITE_URL}/answers/queens`,
  },
}

export default function Page() {
  return (
    <AnswerLandingPage
      gameName="LinkedIn Queens"
      gameSlug="queens"
    />
  )
}