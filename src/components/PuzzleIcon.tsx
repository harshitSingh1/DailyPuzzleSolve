// src\components\PuzzleIcon.tsx
import { Target, Crown, Disc, ArrowUpDown, Zap, Grid3x3, Award } from "lucide-react";
import type { ComponentType } from "react";

const ICON_MAP: Record<string, ComponentType<{ className?: string }>> = {
  Target,
  Crown,
  Disc,
  ArrowUpDown,
  Zap,
  Grid3x3,
  Award,
};

interface PuzzleIconProps {
  icon: string;
  className?: string;
}

const PuzzleIcon = ({ icon, className = "h-4 w-4" }: PuzzleIconProps) => {
  const IconComp = ICON_MAP[icon];
  if (!IconComp) return null;
  return <IconComp className={className} />;
};

export default PuzzleIcon;