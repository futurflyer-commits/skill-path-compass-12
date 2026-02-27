import DashboardLayout from "@/components/DashboardLayout";
import { motion } from "framer-motion";
import { BookOpen, Clock, TrendingUp, ChevronRight } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";

const phases = [
  {
    name: "Phase 1: Foundation",
    color: "bg-primary",
    skills: [
      { name: "Python Fundamentals", demand: 92, time: "6 weeks", why: "Required baseline for ML and data science roles.", courses: ["Python for Data Science – Coursera", "Automate the Boring Stuff"] },
      { name: "SQL & Data Modeling", demand: 88, time: "4 weeks", why: "Core skill for any data-oriented role.", courses: ["SQL Masterclass – Udemy"] },
    ],
  },
  {
    name: "Phase 2: Capability Expansion",
    color: "bg-success",
    skills: [
      { name: "Machine Learning Basics", demand: 90, time: "8 weeks", why: "Opens doors to AI Product and Data Science roles.", courses: ["ML Specialization – Andrew Ng", "Fast.ai Practical ML"] },
      { name: "Prompt Engineering", demand: 95, time: "3 weeks", why: "Fastest growing skill in AI — immediate market value.", courses: ["Prompt Engineering for Developers – DeepLearning.AI"] },
      { name: "AI Product Strategy", demand: 85, time: "6 weeks", why: "Bridges technical AI with business value creation.", courses: ["AI Product Management – Duke/Coursera"] },
    ],
  },
  {
    name: "Phase 3: Strategic Positioning",
    color: "bg-warning",
    skills: [
      { name: "Cloud Architecture (AWS/GCP)", demand: 82, time: "8 weeks", why: "Required for Solutions Architect and senior AI roles.", courses: ["AWS Solutions Architect – A Cloud Guru"] },
      { name: "Stakeholder Leadership", demand: 78, time: "Ongoing", why: "Essential for senior and leadership transitions.", courses: ["Executive Presence – LinkedIn Learning"] },
    ],
  },
];

const Learning = () => {
  return (
    <DashboardLayout>
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="font-heading text-3xl font-bold">Learning Roadmap</h1>
        <p className="mt-1 text-muted-foreground">Clear, actionable learning plan organized by strategic phases.</p>

        <div className="mt-4 rounded-2xl border border-border bg-secondary/50 p-4">
          <div className="flex items-center gap-2">
            <span className="text-lg">📅</span>
            <p className="text-sm font-semibold">Smart Weekly Plan</p>
          </div>
          <p className="mt-1 text-sm text-muted-foreground">Based on your 12 hours/week allocation — auto-generated schedule available in your calendar.</p>
          <Button variant="outline" size="sm" className="mt-2">View Weekly Schedule</Button>
        </div>

        <div className="mt-8 space-y-8">
          {phases.map((phase) => (
            <div key={phase.name}>
              <div className="flex items-center gap-3 mb-4">
                <div className={`h-3 w-3 rounded-full ${phase.color}`} />
                <h2 className="font-heading text-xl font-bold">{phase.name}</h2>
              </div>
              <div className="space-y-4">
                {phase.skills.map((skill) => (
                  <div key={skill.name} className="rounded-2xl border border-border bg-card p-5 shadow-card">
                    <div className="flex flex-wrap items-start justify-between gap-2">
                      <h3 className="font-heading text-lg font-semibold">{skill.name}</h3>
                      <div className="flex items-center gap-4 text-xs">
                        <span className="flex items-center gap-1 text-muted-foreground"><Clock className="h-3 w-3" /> {skill.time}</span>
                        <span className="flex items-center gap-1 text-primary"><TrendingUp className="h-3 w-3" /> {skill.demand}% demand</span>
                      </div>
                    </div>
                    <p className="mt-2 text-sm text-muted-foreground">{skill.why}</p>
                    <div className="mt-3">
                      <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-2">Recommended Courses</p>
                      {skill.courses.map((c) => (
                        <div key={c} className="flex items-center gap-2 py-1">
                          <BookOpen className="h-3 w-3 text-primary" />
                          <span className="text-sm">{c}</span>
                          <ChevronRight className="ml-auto h-3 w-3 text-muted-foreground" />
                        </div>
                      ))}
                    </div>
                    <div className="mt-3">
                      <div className="flex justify-between text-xs text-muted-foreground mb-1">
                        <span>Market Demand</span><span>{skill.demand}%</span>
                      </div>
                      <Progress value={skill.demand} className="h-1.5" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </DashboardLayout>
  );
};

export default Learning;
