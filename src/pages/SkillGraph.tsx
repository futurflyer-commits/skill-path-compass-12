import DashboardLayout from "@/components/DashboardLayout";
import { motion } from "framer-motion";
import { Download, Share2, Code, Brain, BarChart3, Users, Lightbulb, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useState } from "react";

const skills = [
  { name: "AI Strategy", level: "Expert", proficiency: 92, levelNum: 5, category: "technical", icon: Brain, size: 72, x: 45, y: 30, demand: "Very High", salaryImpact: "+₹18L", pairedWith: ["Python", "Product Strategy", "Market Research"] },
  { name: "Product Strategy", level: "Expert", proficiency: 88, levelNum: 5, category: "domain", icon: Lightbulb, size: 68, x: 70, y: 22, demand: "High", salaryImpact: "+₹14L", pairedWith: ["AI Strategy", "Market Research", "Leadership"] },
  { name: "Python", level: "Intermediate", proficiency: 55, levelNum: 3, category: "technical", icon: Code, size: 64, x: 22, y: 38, demand: "Very High", salaryImpact: "+₹12L", pairedWith: ["AI Strategy", "PyTorch", "Data Analysis"] },
  { name: "Market Research", level: "Advanced", proficiency: 70, levelNum: 4, category: "domain", icon: BarChart3, size: 60, x: 72, y: 52, demand: "Medium", salaryImpact: "+₹8L", pairedWith: ["Product Strategy", "AI Strategy"] },
  { name: "Leadership", level: "Advanced", proficiency: 82, levelNum: 4, category: "power", icon: Users, size: 66, x: 50, y: 65, demand: "High", salaryImpact: "+₹15L", pairedWith: ["Product Strategy", "Communication"] },
  { name: "PyTorch", level: "Novice", proficiency: 25, levelNum: 1, category: "technical", icon: Code, size: 56, x: 18, y: 68, demand: "Very High", salaryImpact: "+₹20L", pairedWith: ["Python", "AI Strategy"] },
  { name: "Data Analysis", level: "Intermediate", proficiency: 60, levelNum: 3, category: "domain", icon: BarChart3, size: 58, x: 55, y: 45, demand: "Very High", salaryImpact: "+₹15L", pairedWith: ["Python", "Market Research", "AI Strategy"] },
  { name: "Communication", level: "Gap", proficiency: 15, levelNum: 0, category: "power", icon: Users, size: 52, x: 35, y: 80, demand: "High", salaryImpact: "+₹6L", pairedWith: ["Leadership"] },
];

const connections = [
  ["AI Strategy", "Product Strategy"],
  ["AI Strategy", "Python"],
  ["AI Strategy", "Data Analysis"],
  ["Python", "PyTorch"],
  ["Python", "Data Analysis"],
  ["Product Strategy", "Market Research"],
  ["Product Strategy", "Leadership"],
  ["Leadership", "Communication"],
  ["Data Analysis", "Market Research"],
];

const categoryColors: Record<string, { border: string; bg: string; text: string }> = {
  technical: { border: "border-primary", bg: "bg-primary/20", text: "text-primary" },
  domain: { border: "border-success", bg: "bg-success/20", text: "text-success" },
  power: { border: "border-warning", bg: "bg-warning/20", text: "text-warning" },
};

const levelColor = (level: string) => {
  switch (level) {
    case "Expert": return "bg-success";
    case "Advanced": return "bg-primary";
    case "Intermediate": return "bg-primary/60";
    case "Novice": return "bg-warning";
    case "Gap": return "bg-destructive";
    default: return "bg-muted";
  }
};

const SkillGraph = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedSkill, setSelectedSkill] = useState(skills[0]);
  const categories = ["All", "Technical", "Domain", "Power"];

  const filteredSkills = activeCategory === "All"
    ? skills
    : skills.filter((s) => s.category === activeCategory.toLowerCase());

  const filteredConnections = connections.filter(([a, b]) =>
    filteredSkills.some((s) => s.name === a) && filteredSkills.some((s) => s.name === b)
  );

  const getSkillPos = (name: string) => {
    const s = skills.find((sk) => sk.name === name);
    return s ? { x: s.x, y: s.y } : { x: 0, y: 0 };
  };

  const isGapOrNovice = (level: string) => level === "Gap" || level === "Novice";

  return (
    <DashboardLayout>
      <TooltipProvider delayDuration={200}>
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <h1 className="font-heading text-3xl font-bold">Interactive Skill Graph</h1>
              <p className="mt-1 text-muted-foreground">Your Technical, Domain, and Power skills — visualized as an interactive constellation.</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" className="gap-2"><Download className="h-4 w-4" /> Export</Button>
              <Button className="gap-2 bg-cta-gradient"><Share2 className="h-4 w-4" /> Share Graph</Button>
            </div>
          </div>

          {/* Category Filters */}
          <div className="mt-4 flex flex-wrap gap-2">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setActiveCategory(c)}
                className={`rounded-full px-4 py-1.5 text-sm font-medium transition-all ${activeCategory === c ? "bg-primary text-primary-foreground shadow-md" : "border border-border text-muted-foreground hover:border-primary/50"}`}
              >
                {c} Skills
              </button>
            ))}
          </div>

          <div className="mt-6 grid gap-6 lg:grid-cols-3">
            {/* Graph Area */}
            <div className="lg:col-span-2 relative h-[520px] rounded-2xl border border-border bg-card/50 backdrop-blur-sm overflow-hidden">
              {/* SVG Connections */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 0 }}>
                {filteredConnections.map(([a, b], i) => {
                  const posA = getSkillPos(a);
                  const posB = getSkillPos(b);
                  return (
                    <motion.line
                      key={`${a}-${b}`}
                      x1={`${posA.x}%`} y1={`${posA.y}%`}
                      x2={`${posB.x}%`} y2={`${posB.y}%`}
                      stroke="hsl(var(--primary) / 0.15)"
                      strokeWidth="1.5"
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={{ pathLength: 1, opacity: 1 }}
                      transition={{ delay: 0.2 + i * 0.08, duration: 0.6 }}
                    />
                  );
                })}
              </svg>

              {/* Skill Nodes */}
              {filteredSkills.map((skill) => {
                const colors = categoryColors[skill.category];
                const Icon = skill.icon;
                const isWeak = isGapOrNovice(skill.level);
                return (
                  <Tooltip key={skill.name}>
                    <TooltipTrigger asChild>
                      <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: Math.random() * 0.4 + 0.1, type: "spring", stiffness: 200 }}
                        onClick={() => setSelectedSkill(skill)}
                        className={`absolute flex flex-col items-center justify-center rounded-full border-2 ${colors.border} ${colors.bg} cursor-pointer hover:scale-110 transition-transform z-10 ${selectedSkill.name === skill.name ? "ring-2 ring-primary ring-offset-2 ring-offset-background" : ""}`}
                        style={{
                          width: skill.size,
                          height: skill.size,
                          left: `${skill.x}%`,
                          top: `${skill.y}%`,
                          transform: "translate(-50%, -50%)",
                        }}
                      >
                        {isWeak && (
                          <motion.div
                            className={`absolute inset-0 rounded-full border-2 ${skill.level === "Gap" ? "border-destructive/60" : "border-warning/60"}`}
                            animate={{ scale: [1, 1.35, 1], opacity: [0.7, 0, 0.7] }}
                            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                          />
                        )}
                        <Icon className={`h-5 w-5 ${colors.text}`} />
                        <span className={`text-[10px] font-bold mt-0.5 ${colors.text}`}>{skill.name}</span>
                      </motion.div>
                    </TooltipTrigger>
                    <TooltipContent side="top" className="p-3 max-w-[200px]">
                      <div className="flex items-center gap-2 mb-1">
                        <div className={`h-2 w-2 rounded-full ${levelColor(skill.level)}`} />
                        <span className="font-heading font-bold text-sm">{skill.name}</span>
                      </div>
                      <p className="text-xs text-muted-foreground">{skill.level} · L{skill.levelNum}/5</p>
                      <p className="text-xs text-muted-foreground">Demand: {skill.demand} · {skill.salaryImpact}</p>
                    </TooltipContent>
                  </Tooltip>
                );
              })}

              {/* Legend */}
              <div className="absolute top-4 left-4 rounded-xl border border-border bg-card/80 backdrop-blur-sm p-3 text-xs z-20">
                <p className="font-semibold uppercase tracking-wide text-muted-foreground mb-2">Proficiency</p>
                {[
                  { label: "Expert", color: "bg-success" },
                  { label: "Intermediate", color: "bg-primary" },
                  { label: "Novice", color: "bg-warning" },
                  { label: "Missing / Gap", color: "bg-destructive" },
                ].map((item) => (
                  <div key={item.label} className="flex items-center gap-2 mt-1">
                    <div className={`h-2.5 w-2.5 rounded-full ${item.color}`} />
                    <span className="text-muted-foreground">{item.label}</span>
                  </div>
                ))}
              </div>

              {/* High ROI callout */}
              <div className="absolute bottom-4 left-4 rounded-xl border border-border bg-card/80 backdrop-blur-sm p-3 text-xs z-20 max-w-[240px]">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="h-4 w-4 text-success" />
                  <span className="font-heading font-bold text-sm">High ROI Skills to Build</span>
                </div>
                <p className="text-muted-foreground mb-2">Based on your career path</p>
                {skills.filter((s) => isGapOrNovice(s.level)).map((s) => (
                  <div key={s.name} className="flex items-center justify-between mt-1.5">
                    <div className="flex items-center gap-2">
                      <s.icon className="h-3.5 w-3.5 text-muted-foreground" />
                      <span className="font-medium">{s.name}</span>
                    </div>
                    <span className="text-success font-semibold">{s.salaryImpact}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Detail Sidebar */}
            <div className="space-y-4">
              <div className="rounded-2xl border border-border bg-card p-5 shadow-card">
                <div className="flex items-center gap-3">
                  <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${categoryColors[selectedSkill.category].bg}`}>
                    <selectedSkill.icon className={`h-5 w-5 ${categoryColors[selectedSkill.category].text}`} />
                  </div>
                  <div>
                    <p className="font-heading font-bold">{selectedSkill.name}</p>
                    <span className={`inline-block mt-0.5 rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase ${categoryColors[selectedSkill.category].bg} ${categoryColors[selectedSkill.category].text}`}>
                      {selectedSkill.category}
                    </span>
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Proficiency</span>
                  <span className="font-bold">{selectedSkill.level} (Level {selectedSkill.levelNum}/5)</span>
                </div>
                <Progress value={selectedSkill.proficiency} className="mt-1.5 h-2" />

                <p className="mt-3 text-sm text-muted-foreground">
                  {selectedSkill.proficiency >= 80
                    ? `Strong foundation with advanced proficiency in ${selectedSkill.name.toLowerCase()}, demonstrating expert-level capability.`
                    : selectedSkill.proficiency >= 50
                    ? `Developing proficiency in ${selectedSkill.name.toLowerCase()} with room for growth to reach expert level.`
                    : `Early-stage skill with high growth potential. Investing here could significantly boost your career trajectory.`}
                </p>

                <div className="mt-4 grid grid-cols-2 gap-3">
                  <div className="rounded-xl border border-border p-3">
                    <p className="text-[10px] uppercase tracking-wide text-muted-foreground flex items-center gap-1"><TrendingUp className="h-3 w-3" /> Demand</p>
                    <p className="font-heading font-bold mt-1">{selectedSkill.demand}</p>
                  </div>
                  <div className="rounded-xl border border-border p-3">
                    <p className="text-[10px] uppercase tracking-wide text-muted-foreground">₹ Salary Impact</p>
                    <p className="font-heading font-bold text-success mt-1">{selectedSkill.salaryImpact}</p>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-border bg-card p-5 shadow-card">
                <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Commonly Paired With</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {selectedSkill.pairedWith.map((p) => (
                    <button
                      key={p}
                      onClick={() => {
                        const found = skills.find((s) => s.name === p);
                        if (found) setSelectedSkill(found);
                      }}
                      className="rounded-full border border-border px-3 py-1 text-sm font-medium hover:border-primary/50 hover:bg-primary/5 transition-colors"
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>

              <div className="rounded-2xl border border-border bg-card p-5 shadow-card">
                <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Recommended Resources</p>
                <div className="mt-3 space-y-2">
                  {[
                    { title: `Advanced ${selectedSkill.name} Masterclass`, provider: "Coursera · 6 weeks" },
                    { title: `${selectedSkill.name} Fundamentals`, provider: "LinkedIn Learning · 3 weeks" },
                  ].map((r) => (
                    <div key={r.title} className="rounded-xl bg-muted/50 p-3">
                      <p className="text-sm font-semibold">{r.title}</p>
                      <p className="text-xs text-muted-foreground">{r.provider}</p>
                    </div>
                  ))}
                </div>
              </div>

              <Button className="w-full bg-cta-gradient text-primary-foreground font-semibold">
                Add to Learning Roadmap
              </Button>
            </div>
          </div>
        </motion.div>
      </TooltipProvider>
    </DashboardLayout>
  );
};

export default SkillGraph;
