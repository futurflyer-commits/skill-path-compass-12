import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ArrowRight, ArrowLeft, Sparkles, Eye, TrendingUp, Heart, X, Minus, Check, Compass } from "lucide-react";

interface Question {
  id: number;
  section: string;
  sectionLabel: string;
  question: string;
  type: "choice" | "swipe" | "pair" | "slider" | "behavior";
  options?: { label: string; description?: string; icon?: React.ReactNode }[];
  pairOptions?: [string, string];
  sliderMin?: number;
  sliderMax?: number;
  sliderLabel?: string;
}

const questions: Question[] = [
  // Section 1
  { id: 1, section: "CURRENT DIRECTION", sectionLabel: "Persona Detection", question: "What do you want most right now?", type: "choice", options: [
    { label: "Clarity on what suits me", description: "I need to discover my untapped strengths and potential paths.", icon: <Eye className="h-5 w-5" /> },
    { label: "Faster growth in my career", description: "I want to level up strategically and increase my income potential.", icon: <TrendingUp className="h-5 w-5" /> },
    { label: "A meaningful path aligned with my values", description: "I want to design my life's work and create lasting impact.", icon: <Heart className="h-5 w-5" /> },
  ]},
  { id: 2, section: "CURRENT DIRECTION", sectionLabel: "Persona Detection", question: "Which statement feels closest to you?", type: "choice", options: [
    { label: "I want to discover my strengths" },
    { label: "I want to level up strategically" },
    { label: "I want to design my life's work" },
  ]},
  { id: 3, section: "CURRENT DIRECTION", sectionLabel: "Persona Detection", question: "What is your biggest career frustration today?", type: "choice", options: [
    { label: "Too many options, no clear direction" },
    { label: "I feel stuck or underutilized" },
    { label: "My work lacks meaning" },
  ]},
  { id: 4, section: "CURRENT DIRECTION", sectionLabel: "Persona Detection", question: "Your time horizon for change:", type: "choice", options: [
    { label: "3–6 months" },
    { label: "1–2 years" },
    { label: "5+ years" },
  ]},
  { id: 5, section: "CURRENT DIRECTION", sectionLabel: "Persona Detection", question: "When making career decisions, you usually:", type: "choice", options: [
    { label: "Need structured guidance" },
    { label: "Compare options and outcomes" },
    { label: "Follow what feels aligned" },
  ]},
  { id: 6, section: "CURRENT DIRECTION", sectionLabel: "Persona Detection", question: "Which outcome motivates you most?", type: "choice", options: [
    { label: "Building strong skills" },
    { label: "Advancing position and income" },
    { label: "Creating meaningful impact" },
  ]},
  // Section 2 - RIASEC
  { id: 7, section: "ENERGY & FIT", sectionLabel: "RIASEC Fit", question: '"I enjoy solving real-world practical problems."', type: "swipe" },
  { id: 8, section: "ENERGY & FIT", sectionLabel: "RIASEC Fit", question: '"I enjoy analysing data, systems, or complex ideas."', type: "swipe" },
  { id: 9, section: "ENERGY & FIT", sectionLabel: "RIASEC Fit", question: '"I enjoy creative expression (design, writing, storytelling)."', type: "swipe" },
  { id: 10, section: "ENERGY & FIT", sectionLabel: "RIASEC Fit", question: '"I enjoy helping or guiding people."', type: "swipe" },
  { id: 11, section: "ENERGY & FIT", sectionLabel: "RIASEC Fit", question: '"I enjoy leading initiatives or influencing outcomes."', type: "swipe" },
  { id: 12, section: "ENERGY & FIT", sectionLabel: "RIASEC Fit", question: '"I enjoy organising systems, plans, or details."', type: "swipe" },
  // Section 3 - Values
  { id: 13, section: "VALUES", sectionLabel: "Values & Environment", question: "Which matters more?", type: "pair", pairOptions: ["Freedom & autonomy", "Stability & security"] },
  { id: 14, section: "VALUES", sectionLabel: "Values & Environment", question: "Which matters more?", type: "pair", pairOptions: ["High earnings", "Meaningful contribution"] },
  { id: 15, section: "VALUES", sectionLabel: "Values & Environment", question: "Which environment suits you better?", type: "pair", pairOptions: ["Structured and predictable", "Flexible and evolving"] },
  { id: 16, section: "VALUES", sectionLabel: "Values & Environment", question: "You prefer work that is:", type: "pair", pairOptions: ["Deeply specialised", "Varied and multidisciplinary"] },
  { id: 17, section: "VALUES", sectionLabel: "Values & Environment", question: "Ideal impact style:", type: "choice", options: [
    { label: "Build expertise" },
    { label: "Build influence" },
    { label: "Build change" },
  ]},
  // Section 4 - Behavioural
  { id: 18, section: "HOW YOU WORK", sectionLabel: "Behavioural Style", question: "A project lacks direction. You:", type: "choice", options: [
    { label: "Define structure and plan" },
    { label: "Analyse before acting" },
    { label: "Generate new ideas" },
    { label: "Support the team" },
  ]},
  { id: 19, section: "HOW YOU WORK", sectionLabel: "Behavioural Style", question: "You receive minimal instructions. You feel:", type: "choice", options: [
    { label: "Energised" },
    { label: "Neutral" },
    { label: "Uncomfortable" },
  ]},
  { id: 20, section: "HOW YOU WORK", sectionLabel: "Behavioural Style", question: "When facing uncertainty, you usually:", type: "choice", options: [
    { label: "Act quickly" },
    { label: "Evaluate carefully" },
    { label: "Wait for clarity" },
  ]},
  { id: 21, section: "HOW YOU WORK", sectionLabel: "Behavioural Style", question: "You feel most proud when:", type: "choice", options: [
    { label: "You solve a difficult problem" },
    { label: "You help someone succeed" },
    { label: "You create something original" },
    { label: "You achieve measurable results" },
  ]},
  // Section 5 - Personality
  { id: 22, section: "PERSONALITY", sectionLabel: "Big Five Lite", question: "I take initiative easily.", type: "swipe" },
  { id: 23, section: "PERSONALITY", sectionLabel: "Big Five Lite", question: "I follow through reliably.", type: "swipe" },
  { id: 24, section: "PERSONALITY", sectionLabel: "Big Five Lite", question: "I enjoy collaborating with others.", type: "swipe" },
  { id: 25, section: "PERSONALITY", sectionLabel: "Big Five Lite", question: "I stay calm under pressure.", type: "swipe" },
  { id: 26, section: "PERSONALITY", sectionLabel: "Big Five Lite", question: "I adapt quickly to change.", type: "swipe" },
  // Section 6 - Readiness
  { id: 27, section: "READINESS", sectionLabel: "Roadmap Intent", question: "How ready are you to take action on a career plan?", type: "slider", sliderMin: 0, sliderMax: 10, sliderLabel: "Readiness" },
  { id: 28, section: "READINESS", sectionLabel: "Roadmap Intent", question: "What support would help you most?", type: "choice", options: [
    { label: "Structured roadmap" },
    { label: "Strategic guidance" },
    { label: "Purpose alignment" },
  ]},
];

const aiTips: Record<number, string> = {
  1: "Choosing clarity helps our AI focus on identifying your untapped strengths and hidden career families that align with your natural working style.",
  7: "This helps us match you with roles like AI Hardware Engineering or Operations in India's growing tech hubs like Bengaluru and Hyderabad.",
  13: "Your value preferences help us filter career paths that align with what matters most to you — leading to higher job satisfaction.",
  18: "Understanding your work style helps us predict which team environments and role types will bring out your best performance.",
  22: "Your personality snapshot helps us calibrate coaching style — whether you need gentle nudges or bold challenges.",
  27: "Your readiness level determines the pace and intensity of your personalized roadmap.",
};

const SwipeOptions = ({ selected, onSelect }: { selected: string | null; onSelect: (v: string) => void }) => (
  <div className="flex justify-center gap-6">
    {[
      { label: "NO", icon: <X className="h-6 w-6" />, value: "no" },
      { label: "SOMETIMES", icon: <Minus className="h-6 w-6" />, value: "sometimes" },
      { label: "YES", icon: <Check className="h-6 w-6" />, value: "yes" },
    ].map((opt) => (
      <button
        key={opt.value}
        onClick={() => onSelect(opt.value)}
        className={`flex h-28 w-28 flex-col items-center justify-center gap-2 rounded-2xl border-2 transition-all sm:h-32 sm:w-32 ${
          selected === opt.value
            ? "border-primary bg-secondary text-primary"
            : "border-border bg-card text-muted-foreground hover:border-primary/50"
        }`}
      >
        {opt.icon}
        <span className="text-xs font-semibold tracking-wide">{opt.label}</span>
      </button>
    ))}
  </div>
);

const Assessment = () => {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [sliderVal, setSliderVal] = useState(5);
  const navigate = useNavigate();

  const q = questions[step];
  const progress = ((step + 1) / questions.length) * 100;
  const currentTip = Object.entries(aiTips).reverse().find(([key]) => Number(key) <= q.id)?.[1];

  const setAnswer = (val: string) => {
    setAnswers((prev) => ({ ...prev, [q.id]: val }));
  };

  const next = () => {
    if (q.type === "slider") setAnswers((prev) => ({ ...prev, [q.id]: String(sliderVal) }));
    if (step < questions.length - 1) setStep(step + 1);
    else navigate("/persona-reveal");
  };

  const prev = () => {
    if (step > 0) setStep(step - 1);
  };

  return (
    <div className="flex min-h-screen flex-col bg-muted/20">
      {/* Navbar */}
      <nav className="flex items-center justify-between border-b border-border bg-background px-4 py-3 sm:px-6">
        <div className="flex items-center gap-2" onClick={() => navigate("/")} role="button">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
            <Compass className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="font-heading text-xl font-bold">Futurefly</span>
        </div>
        <div className="hidden items-center gap-6 text-sm font-medium text-muted-foreground sm:flex">
          <span>Dashboard</span>
          <span className="border-b-2 border-primary pb-1 text-primary">Assessments</span>
          <span>Roadmap</span>
          <span>Network</span>
        </div>
        <div />
      </nav>

      <div className="mx-auto flex w-full max-w-3xl flex-1 flex-col px-4 py-8">
        {/* Progress Header */}
        <div className="rounded-2xl border border-border bg-card p-6 shadow-card">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="font-heading text-2xl font-bold sm:text-3xl">
                {q.section === "ENERGY & FIT" ? "What energises you?" :
                 q.section === "VALUES" ? "What matters most?" :
                 q.section === "HOW YOU WORK" ? "How you work" :
                 q.section === "PERSONALITY" ? "Your personality" :
                 q.section === "READINESS" ? "Your readiness" :
                 "Where do you want to go?"}
              </h1>
              <p className="mt-1 text-sm text-muted-foreground">
                {q.section === "CURRENT DIRECTION" ? "Define your target direction to help our AI map your ideal growth path." :
                 q.section === "ENERGY & FIT" ? "We're mapping your core interests to global career families." :
                 q.section === "VALUES" ? "Forced-choice comparisons improve accuracy." :
                 q.section === "HOW YOU WORK" ? "Understanding your natural work patterns." :
                 q.section === "PERSONALITY" ? "Quick personality snapshot for coaching calibration." :
                 "These determine your coaching style and product funnel."}
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm font-semibold text-primary">STEP {q.id} OF 28</p>
              <p className="text-xs italic text-muted-foreground">{q.sectionLabel}</p>
            </div>
          </div>
          <div className="mt-4 flex items-center justify-between text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            <span>{q.section}</span>
            <span>{Math.round(progress)}% COMPLETE</span>
          </div>
          <Progress value={progress} className="mt-2 h-2" />
        </div>

        {/* Question Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.25 }}
            className="mt-6 rounded-2xl border border-border bg-card p-6 shadow-card sm:p-8"
          >
            {q.type === "swipe" && (
              <div className="flex flex-col items-center py-6">
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-secondary">
                  <span className="text-2xl">🔧</span>
                </div>
                <h2 className="mb-8 text-center font-heading text-xl font-semibold sm:text-2xl">{q.question}</h2>
                <SwipeOptions selected={answers[q.id] || null} onSelect={setAnswer} />
              </div>
            )}

            {q.type === "choice" && (
              <div>
                <div className="mb-6 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-secondary text-primary">
                    <Sparkles className="h-5 w-5" />
                  </div>
                  <h2 className="font-heading text-xl font-semibold">{q.question}</h2>
                </div>
                <div className="space-y-3">
                  {q.options?.map((opt) => (
                    <button
                      key={opt.label}
                      onClick={() => setAnswer(opt.label)}
                      className={`flex w-full items-center gap-4 rounded-xl border-2 p-4 text-left transition-all ${
                        answers[q.id] === opt.label
                          ? "border-primary bg-secondary"
                          : "border-border bg-card hover:border-primary/40"
                      }`}
                    >
                      {opt.icon && (
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-muted text-muted-foreground">
                          {opt.icon}
                        </div>
                      )}
                      <div className="flex-1">
                        <p className="font-medium">{opt.label}</p>
                        {opt.description && <p className="mt-0.5 text-sm text-muted-foreground">{opt.description}</p>}
                      </div>
                      <div className={`h-5 w-5 rounded-full border-2 ${
                        answers[q.id] === opt.label ? "border-primary bg-primary" : "border-border"
                      }`} />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {q.type === "pair" && (
              <div>
                <h2 className="mb-6 text-center font-heading text-xl font-semibold">{q.question}</h2>
                <div className="grid gap-4 sm:grid-cols-2">
                  {q.pairOptions?.map((opt) => (
                    <button
                      key={opt}
                      onClick={() => setAnswer(opt)}
                      className={`rounded-xl border-2 p-6 text-center transition-all ${
                        answers[q.id] === opt
                          ? "border-primary bg-secondary"
                          : "border-border hover:border-primary/40"
                      }`}
                    >
                      <p className="font-heading text-lg font-semibold">{opt}</p>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {q.type === "slider" && (
              <div className="flex flex-col items-center py-6">
                <h2 className="mb-8 text-center font-heading text-xl font-semibold">{q.question}</h2>
                <div className="w-full max-w-md">
                  <input
                    type="range"
                    min={q.sliderMin}
                    max={q.sliderMax}
                    value={sliderVal}
                    onChange={(e) => setSliderVal(Number(e.target.value))}
                    className="w-full accent-primary"
                  />
                  <div className="mt-2 flex justify-between text-sm text-muted-foreground">
                    <span>{q.sliderMin}</span>
                    <span className="font-semibold text-primary">{sliderVal}</span>
                    <span>{q.sliderMax}</span>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <div className="mt-6 flex items-center justify-between">
          <button
            onClick={prev}
            disabled={step === 0}
            className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground disabled:opacity-40"
          >
            <ArrowLeft className="h-4 w-4" /> Save for later
          </button>
          <Button
            size="lg"
            onClick={next}
            disabled={!answers[q.id] && q.type !== "slider"}
            className="gap-2 bg-cta-gradient px-8"
          >
            {step === questions.length - 1 ? "See My Persona" : q.type === "swipe" ? "Next Question" : "Next Step"}
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>

        {/* AI Tip */}
        {currentTip && (
          <motion.div
            key={currentTip}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 rounded-2xl border border-border bg-secondary/50 p-4"
          >
            <div className="flex items-start gap-3">
              <Sparkles className="mt-0.5 h-5 w-5 text-primary" />
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-primary">AI Co-pilot Tip</p>
                <p className="mt-1 text-sm text-muted-foreground">{currentTip}</p>
              </div>
            </div>
          </motion.div>
        )}
      </div>

      <footer className="border-t border-border bg-background px-4 py-4 text-center text-xs text-muted-foreground">
        © 2024 Futurefly Career AI. All rights reserved. &nbsp;|&nbsp; Privacy Policy &nbsp;|&nbsp; Terms of Service &nbsp;|&nbsp; Support
      </footer>
    </div>
  );
};

export default Assessment;
