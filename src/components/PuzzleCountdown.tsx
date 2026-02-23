import { useState, useEffect, memo } from "react";
import { Clock } from "lucide-react";

const PuzzleCountdown = memo(() => {
  const [timeLeft, setTimeLeft] = useState("");

  useEffect(() => {
    const update = () => {
      const now = new Date();
      // Next solution posts at 1:30 PM IST (UTC+5:30) = 08:00 UTC
      const target = new Date(now);
      target.setUTCHours(8, 0, 0, 0); // 1:30 PM IST = 08:00 UTC
      if (now.getTime() >= target.getTime()) {
        target.setDate(target.getDate() + 1);
      }
      const diff = target.getTime() - now.getTime();
      const h = Math.floor(diff / 3600000);
      const m = Math.floor((diff % 3600000) / 60000);
      const s = Math.floor((diff % 60000) / 1000);
      setTimeLeft(`${h}h ${m}m ${s}s`);
    };
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="inline-flex items-center gap-1.5 rounded-full border border-border bg-muted/50 px-3 py-1.5 text-sm text-muted-foreground">
      <Clock className="h-3.5 w-3.5" />
      <span>Next puzzle in <strong className="text-foreground">{timeLeft}</strong></span>
    </div>
  );
});

PuzzleCountdown.displayName = "PuzzleCountdown";
export default PuzzleCountdown;
