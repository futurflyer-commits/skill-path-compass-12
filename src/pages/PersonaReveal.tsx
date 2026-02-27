import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Shield, TrendingUp, Compass, Zap, ArrowRight } from "lucide-react";

const stages = [
  "Mapping skills...",
  "Predicting trajectories...",
  "Matching market signals...",
  "Building your Career DNA...",
];

const PersonaReveal = () => {
  const [phase, setPhase] = useState<"loading" | "reveal">("loading");
  const [stageIdx, setStageIdx] = useState(0);
  const [progress, setProgress] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(interval);
          setTimeout(() => setPhase("reveal"), 400);
          return 100;
        }
        return p + 2;
      });
    }, 60);

    const stageInterval = setInterval(() => {
      setStageIdx((s) => (s < stages.length - 1 ? s + 1 : s));
    }, 800);

    return () => {
      clearInterval(interval);
      clearInterval(stageInterval);
    };
  }, []);

  return (
    <div className="flex min-h-screen items-center justify-center bg-hero-gradient px-4">
      <AnimatePresence mode="wait">
        {phase === "loading" ? (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="w-full max-w-md text-center"
          >
            <div className="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-full bg-secondary animate-pulse-soft">
              <Compass className="h-10 w-10 text-primary" />
            </div>
            <h1 className="font-heading text-3xl font-bold">Analyzing Your Career DNA…</h1>
            <p className="mt-3 text-muted-foreground">{stages[stageIdx]}</p>
            <Progress value={progress} className="mx-auto mt-8 h-2 max-w-xs" />
          </motion.div>
        ) : (
          <motion.div
            key="reveal"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="w-full max-w-2xl"
          >
            <div className="rounded-3xl border border-border bg-card p-8 shadow-elevated sm:p-12">
              <div className="text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-cta-gradient">
                  <span className="text-3xl">🧠</span>
                </div>
                <p className="text-xs font-semibold uppercase tracking-widest text-primary">Your Career Persona</p>
                <h1 className="mt-2 font-heading text-3xl font-bold sm:text-4xl">The Adaptive Builder</h1>
                <p className="mt-1 text-sm text-muted-foreground">AI-Resilient Product Strategist Archetype</p>
                <p className="mx-auto mt-4 max-w-lg text-muted-foreground">
                  You thrive at the intersection of creativity and strategy. Your natural inclination to solve practical problems, 
                  combined with your openness to change, positions you perfectly for roles that bridge human insight with AI capabilities.
                </p>
              </div>

              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {[
                  { icon: Shield, label: "AI Disruption Index", value: "24%", sub: "Low exposure risk", color: "text-success" },
                  { icon: TrendingUp, label: "Market Demand", value: "High", sub: "Increasing for hybrid roles", color: "text-primary" },
                  { icon: Compass, label: "Mobility Score", value: "87/100", sub: "High cross-domain potential", color: "text-primary" },
                  { icon: Zap, label: "Growth Velocity", value: "Fast", sub: "Top 15% trajectory", color: "text-success" },
                ].map((stat) => (
                  <div key={stat.label} className="rounded-xl border border-border bg-muted/30 p-4">
                    <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                      <stat.icon className="h-4 w-4" />
                      {stat.label}
                    </div>
                    <p className={`mt-1 font-heading text-2xl font-bold ${stat.color}`}>{stat.value}</p>
                    <p className="text-xs text-muted-foreground">{stat.sub}</p>
                  </div>
                ))}
              </div>

              <div className="mt-8 text-center">
                <Button size="lg" className="gap-2 bg-cta-gradient px-8" onClick={() => navigate("/register")}>
                  Unlock Your Personalized Career Roadmap <ArrowRight className="h-4 w-4" />
                </Button>
                <p className="mt-3 text-xs text-muted-foreground">Requires free registration</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PersonaReveal;
