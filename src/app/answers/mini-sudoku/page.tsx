import AnswerLandingPage from "@/components/seo/AnswerLandingPage"
import { SITE_URL } from "@/lib/constants"

export const metadata = {
  title: "Mini Sudoku Answer Today – LinkedIn Puzzle Solution",
  description:
    "Today's LinkedIn Mini Sudoku answer with hints and solving strategy.",
  alternates: {
    canonical: `${SITE_URL}/answers/mini-sudoku`,
  },
}

export default function Page() {
  return (
    <AnswerLandingPage
      gameName="LinkedIn Mini Sudoku"
      gameSlug="mini-sudoku"
    />
  )
}