import { Metadata } from "next";
import { SITE_URL } from "@/lib/constants";
import PrivacyPage from "@/components/pages/PrivacyPage";

export const metadata: Metadata = {
  title: "Privacy Policy | LogicPuzzleHub",
  description:
    "Learn how LogicPuzzleHub collects, uses, and protects your personal information. Read our comprehensive privacy policy.",
  alternates: {
    canonical: `${SITE_URL}/privacy`,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function Page() {
  return <PrivacyPage />;
}