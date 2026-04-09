import { redirect } from "next/navigation";
import { fetchLatestSolution } from "@/lib/solutionUtils";

type Props = {
  params: Promise<{
    game: string;
  }>;
};

// Fetch latest solution and redirect to its date
export default async function TodayPage({ params }: Props) {
  const { game } = await params;

  try {
    // Fetch the latest solution
    const latestSolution = await fetchLatestSolution(game);
    
    if (latestSolution && latestSolution.date) {
      redirect(`/answers/${game}/${latestSolution.date}`);
    }
  } catch (error) {
    // Don't log NEXT_REDIRECT errors - they're expected from redirect()
    if (error && typeof error === 'object' && 'digest' in error && typeof error.digest === 'string' && !error.digest.includes('NEXT_REDIRECT')) {
      console.error(`Error fetching latest solution for ${game}:`, error);
    }
  }

  // Fallback: use today's date if API fails or no solution available
  const today = new Date().toISOString().split("T")[0];
  redirect(`/answers/${game}/${today}`);
}

// Enable ISR
export const revalidate = 60;
