import { Metadata } from "next"
import DisclaimerPage from "@/components/pages/DisclaimerPage"
import { SITE_URL } from "@/lib/constants"

export const metadata: Metadata = {
  title: "Disclaimer – Affiliate Disclosure & Legal Notice",
  description:
    "Read LogicPuzzleHub's disclaimer including affiliate disclosure, accuracy notice, and third-party trademarks. We are not affiliated with LinkedIn.",
  alternates: {
    canonical: `${SITE_URL}/disclaimer`,
  },
  robots: {
    index: false,
    follow: true,
  },
}

export default function Page() {
  return <DisclaimerPage />
}