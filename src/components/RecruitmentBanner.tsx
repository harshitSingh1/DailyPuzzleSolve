import { useState, useEffect } from "react";
import { X, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

const RecruitmentBanner = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const dismissed = sessionStorage.getItem("recruitmentBannerDismissed");
    setIsVisible(!dismissed);
  }, []);

  const handleDismiss = () => {
    sessionStorage.setItem("recruitmentBannerDismissed", "true");
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="relative border-b border-primary/20 bg-primary/10 px-4 py-3 text-center text-sm">
      <div className="container flex items-center justify-center gap-3">
        <Users className="h-4 w-4 text-primary" />
        <span className="text-foreground">We're looking for contributors to help grow this WebApp!

        </span>
        <Button variant="default" size="sm" className="ml-2 rounded-full text-xs" asChild>
          <a
            href="https://github.com/harshitSingh1/DailyPuzzleSolve"
            target="_blank"
            rel="noopener noreferrer">
            
            Join Us
          </a>
        </Button>
      </div>
      <button
        onClick={handleDismiss}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
        aria-label="Dismiss">
        
        <X className="h-4 w-4" />
      </button>
    </div>);

};

export default RecruitmentBanner;