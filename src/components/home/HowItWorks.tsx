import { memo } from "react";
import { motion } from "framer-motion";
import { Search, BookOpen, Trophy } from "lucide-react";

const steps = [
  {
    icon: Search,
    title: "Find Your Puzzle",
    description: "Browse today's puzzles or search by game type and date.",
  },
  {
    icon: BookOpen,
    title: "Follow the Guide",
    description: "Step-by-step screenshots and video walkthroughs make solving easy.",
  },
  {
    icon: Trophy,
    title: "Keep Your Streak",
    description: "Never lose your daily streak again. Solve with confidence every day.",
  },
];

const HowItWorks = memo(() => {
  return (
    <section className="bg-muted/50 py-16 sm:py-20">
      <div className="container">
        <div className="mb-10 text-center">
          <h2 className="mb-3 font-display text-3xl font-bold sm:text-4xl">
            How It Works
          </h2>
          <p className="text-muted-foreground">
            Three simple steps to never miss a puzzle again
          </p>
        </div>

        <div className="mx-auto grid max-w-4xl gap-8 sm:grid-cols-3">
          {steps.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="text-center"
            >
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                <step.icon className="h-7 w-7" />
              </div>
              <h3 className="mb-2 font-display text-lg font-semibold">{step.title}</h3>
              <p className="text-sm text-muted-foreground">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
});

HowItWorks.displayName = "HowItWorks";

export default HowItWorks;
