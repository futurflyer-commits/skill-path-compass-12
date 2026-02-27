import DashboardLayout from "@/components/DashboardLayout";
import { motion, AnimatePresence } from "framer-motion";
import { Download, Share2, Code, Brain, BarChart3, Users, Lightbulb, TrendingUp, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useState, useRef, useEffect } from "react";

const skills = [
  { name: "AI Strategy", level: "Expert", proficiency: 92, levelNum: 5, category: "technical", icon: Brain, size: 80, x: 48, y: 28, demand: "Very High", salaryImpact: "+₹18L", pairedWith: ["Python", "Product Strategy", "Market Research"] },
  { name: "Product Strategy", level: "Expert", proficiency: 88, levelNum: 5, category: "domain", icon: Lightbulb, size: 72, x: 74, y: 18, demand: "High", salaryImpact: "+₹14L", pairedWith: ["AI Strategy", "Market Research", "Leadership"] },
  { name: "Python", level: "Intermediate", proficiency: 55, levelNum: 3, category: "technical", icon: Code, size: 68, x: 24, y: 35, demand: "Very High", salaryImpact: "+₹12L", pairedWith: ["AI Strategy", "PyTorch", "Data Analysis"] },
  { name: "Market Research", level: "Advanced", proficiency: 70, levelNum: 4, category: "domain", icon: BarChart3, size: 62, x: 76, y: 55, demand: "Medium", salaryImpact: "+₹8L", pairedWith: ["Product Strategy", "AI Strategy"] },
  { name: "Leadership", level: "Advanced", proficiency: 82, levelNum: 4, category: "power", icon: Users, size: 70, x: 55, y: 68, demand: "High", salaryImpact: "+₹15L", pairedWith: ["Product Strategy", "Communication"] },
  { name: "PyTorch", level: "Novice", proficiency: 25, levelNum: 1, category: "technical", icon: Code, size: 58, x: 15, y: 70, demand: "Very High", salaryImpact: "+₹20L", pairedWith: ["Python", "AI Strategy"] },
  { name: "Data Analysis", level: "Intermediate", proficiency: 60, levelNum: 3, category: "domain", icon: BarChart3, size: 64, x: 50, y: 48, demand: "Very High", salaryImpact: "+₹15L", pairedWith: ["Python", "Market Research", "AI Strategy"] },
  { name: "Communication", level: "Gap", proficiency: 15, levelNum: 0, category: "power", icon: Users, size: 54, x: 35, y: 82, demand: "High", salaryImpact: "+₹6L", pairedWith: ["Leadership"] },
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
  ["Leadership", "Data Analysis"],
];

const catMeta: Record<string, { glow: string; gradient: string; border: string; text: string; rgb: string }> = {
  technical: { glow: "shadow-[0_0_20px_hsl(var(--primary)/0.4)]", gradient: "from-primary/30 to-primary/5", border: "border-primary/60", text: "text-primary", rgb: "var(--primary)" },
  domain: { glow: "shadow-[0_0_20px_hsl(var(--success)/0.4)]", gradient: "from-success/30 to-success/5", border: "border-success/60", text: "text-success", rgb: "var(--success)" },
  power: { glow: "shadow-[0_0_20px_hsl(var(--warning)/0.4)]", gradient: "from-warning/30 to-warning/5", border: "border-warning/60", text: "text-warning", rgb: "var(--warning)" },
};

const levelDot = (level: string) => {
  if (level === "Expert") return "bg-success";
  if (level === "Advanced") return "bg-primary";
  if (level === "Intermediate") return "bg-primary/60";
  if (level === "Novice") return "bg-warning";
  return "bg-destructive";
};

const isWeak = (l: string) => l === "Gap" || l === "Novice";

const SkillGraph = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedSkill, setSelectedSkill] = useState<typeof skills[0] | null>(null);
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
  const categories = ["All", "Technical", "Domain", "Soft Skills"];
  const graphRef = useRef<HTMLDivElement>(null);
  const [particles, setParticles] = useState<{ id: number; x: number; y: number }[]>([]);

  // Generate floating particles
  useEffect(() => {
    const pts = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
    }));
    setParticles(pts);
  }, []);

  const catFilter = activeCategory === "All" ? null : activeCategory === "Soft Skills" ? "power" : activeCategory.toLowerCase();
  const filteredSkills = catFilter ? skills.filter((s) => s.category === catFilter) : skills;
  const filteredConnections = connections.filter(([a, b]) =>
    filteredSkills.some((s) => s.name === a) && filteredSkills.some((s) => s.name === b)
  );

  const pos = (name: string) => {
    const s = skills.find((sk) => sk.name === name);
    return s ? { x: s.x, y: s.y } : { x: 0, y: 0 };
  };

  return (
    <DashboardLayout>
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="font-heading text-3xl font-bold">Interactive Skill Graph</h1>
            <p className="mt-1 text-muted-foreground">Your career constellation — skills mapped, connections revealed.</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="gap-2"><Download className="h-4 w-4" /> Export</Button>
            <Button className="gap-2 bg-cta-gradient"><Share2 className="h-4 w-4" /> Share</Button>
          </div>
        </div>

        {/* Filters */}
        <div className="mt-4 flex flex-wrap gap-2">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setActiveCategory(c)}
              className={`rounded-full px-4 py-1.5 text-sm font-medium transition-all duration-300 ${activeCategory === c ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25" : "border border-border text-muted-foreground hover:border-primary/40 hover:text-foreground"}`}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-3">
          {/* === GRAPH === */}
          <div
            ref={graphRef}
            className="lg:col-span-2 relative h-[560px] rounded-2xl border border-border overflow-hidden"
            style={{ background: "radial-gradient(ellipse at 50% 40%, hsl(var(--primary)/0.06) 0%, hsl(var(--background)) 70%)" }}
          >
            {/* Floating particles */}
            {particles.map((p) => (
              <motion.div
                key={p.id}
                className="absolute h-1 w-1 rounded-full bg-primary/20"
                style={{ left: `${p.x}%`, top: `${p.y}%` }}
                animate={{ opacity: [0.1, 0.5, 0.1], scale: [0.8, 1.2, 0.8] }}
                transition={{ duration: 3 + Math.random() * 4, repeat: Infinity, delay: Math.random() * 3 }}
              />
            ))}

            {/* SVG Connections */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none z-[1]">
              <defs>
                <linearGradient id="line-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.08" />
                </linearGradient>
                <filter id="glow-line">
                  <feGaussianBlur stdDeviation="2" result="blur" />
                  <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
                </filter>
              </defs>
              {filteredConnections.map(([a, b], i) => {
                const pA = pos(a);
                const pB = pos(b);
                const isHighlighted = hoveredSkill === a || hoveredSkill === b;
                return (
                  <motion.line
                    key={`${a}-${b}`}
                    x1={`${pA.x}%`} y1={`${pA.y}%`}
                    x2={`${pB.x}%`} y2={`${pB.y}%`}
                    stroke={isHighlighted ? "hsl(var(--primary))" : "url(#line-grad)"}
                    strokeWidth={isHighlighted ? 2.5 : 1.5}
                    filter={isHighlighted ? "url(#glow-line)" : undefined}
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: isHighlighted ? 0.9 : 0.5 }}
                    transition={{ delay: 0.15 + i * 0.06, duration: 0.5 }}
                  />
                );
              })}
            </svg>

            {/* Skill Nodes */}
            {filteredSkills.map((skill, i) => {
              const meta = catMeta[skill.category];
              const Icon = skill.icon;
              const weak = isWeak(skill.level);
              const isHovered = hoveredSkill === skill.name;
              const isSelected = selectedSkill?.name === skill.name;
              return (
                <motion.div
                  key={skill.name}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.1 + i * 0.07, type: "spring", stiffness: 180, damping: 15 }}
                  onClick={() => setSelectedSkill(skill)}
                  onMouseEnter={() => setHoveredSkill(skill.name)}
                  onMouseLeave={() => setHoveredSkill(null)}
                  className="absolute z-10 group cursor-pointer"
                  style={{
                    left: `${skill.x}%`,
                    top: `${skill.y}%`,
                    transform: "translate(-50%, -50%)",
                  }}
                >
                  {/* Pulse ring for weak skills */}
                  {weak && (
                    <motion.div
                      className="absolute rounded-full"
                      style={{
                        width: skill.size + 16,
                        height: skill.size + 16,
                        left: -(8),
                        top: -(8),
                        border: `2px solid hsl(${skill.level === "Gap" ? "var(--destructive)" : "var(--warning)"} / 0.5)`,
                      }}
                      animate={{ scale: [1, 1.3, 1], opacity: [0.6, 0, 0.6] }}
                      transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                    />
                  )}

                  {/* Outer glow ring */}
                  <motion.div
                    className={`absolute rounded-full transition-all duration-300 ${isHovered || isSelected ? meta.glow : ""}`}
                    style={{ width: skill.size + 8, height: skill.size + 8, left: -4, top: -4 }}
                    animate={isHovered ? { scale: 1.08 } : { scale: 1 }}
                  >
                    <div className={`w-full h-full rounded-full border-2 ${meta.border} ${isSelected ? "border-opacity-100" : "border-opacity-60"}`} style={{ background: `radial-gradient(circle, hsl(${meta.rgb} / 0.15) 0%, transparent 70%)` }} />
                  </motion.div>

                  {/* Inner node */}
                  <motion.div
                    className={`relative flex flex-col items-center justify-center rounded-full border ${meta.border} bg-gradient-to-br ${meta.gradient} backdrop-blur-md transition-all duration-300`}
                    style={{ width: skill.size, height: skill.size }}
                    animate={isHovered ? { scale: 1.12, y: -4 } : { scale: 1, y: 0 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    <Icon className={`h-5 w-5 ${meta.text} drop-shadow-sm`} />
                    <span className={`text-[10px] font-bold mt-0.5 ${meta.text} text-center leading-tight px-1`}>{skill.name}</span>
                  </motion.div>

                  {/* Hover tooltip card */}
                  <AnimatePresence>
                    {isHovered && (
                      <motion.div
                        initial={{ opacity: 0, y: 8, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 5, scale: 0.95 }}
                        transition={{ duration: 0.15 }}
                        className="absolute left-1/2 -translate-x-1/2 z-30 pointer-events-none"
                        style={{ bottom: skill.size / 2 + 20 }}
                      >
                        <div className="rounded-xl border border-border bg-card/95 backdrop-blur-xl shadow-xl px-4 py-3 min-w-[180px]">
                          <div className="flex items-center gap-2 mb-1">
                            <div className={`h-2 w-2 rounded-full ${levelDot(skill.level)}`} />
                            <span className="font-heading font-bold text-sm">{skill.name}</span>
                          </div>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <span>{skill.level} · L{skill.levelNum}/5</span>
                          </div>
                          <div className="mt-1.5 text-xs text-muted-foreground">
                            Demand: <span className="font-semibold text-foreground">{skill.demand}</span> · <span className="text-success font-semibold">{skill.salaryImpact}</span>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}

            {/* Legend */}
            <div className="absolute top-4 left-4 rounded-xl border border-border bg-card/80 backdrop-blur-md p-3 text-xs z-20">
              <p className="font-semibold uppercase tracking-widest text-muted-foreground mb-2 text-[10px]">Proficiency</p>
              {[
                { label: "Expert", color: "bg-success" },
                { label: "Intermediate", color: "bg-primary" },
                { label: "Novice", color: "bg-warning" },
                { label: "Missing / Gap", color: "bg-destructive" },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-2 mt-1.5">
                  <div className={`h-2.5 w-2.5 rounded-full ${item.color}`} />
                  <span className="text-muted-foreground">{item.label}</span>
                </div>
              ))}
            </div>

            {/* High ROI */}
            <div className="absolute bottom-4 left-4 rounded-xl border border-border bg-card/80 backdrop-blur-md p-4 text-xs z-20 max-w-[250px]">
              <div className="flex items-center gap-2 mb-1">
                <TrendingUp className="h-4 w-4 text-success" />
                <span className="font-heading font-bold text-sm">High ROI Skills to Build Next</span>
              </div>
              <p className="text-muted-foreground text-[11px] mb-2">Based on your Senior Data Analyst path</p>
              {skills.filter((s) => isWeak(s.level)).map((s) => (
                <div key={s.name} className="flex items-center justify-between mt-2">
                  <div className="flex items-center gap-2">
                    <s.icon className="h-3.5 w-3.5 text-muted-foreground" />
                    <span className="font-medium">{s.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-success font-bold">{s.salaryImpact}</span>
                    <span className="text-muted-foreground">Gap: L{s.levelNum}/5</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* === DETAIL PANEL === */}
          <AnimatePresence mode="wait">
            {selectedSkill ? (
              <motion.div
                key={selectedSkill.name}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.25 }}
                className="space-y-4"
              >
                <div className="rounded-2xl border border-border bg-card p-5 shadow-card relative">
                  <button onClick={() => setSelectedSkill(null)} className="absolute top-3 right-3 text-muted-foreground hover:text-foreground transition-colors">
                    <X className="h-4 w-4" />
                  </button>
                  <div className="flex items-center gap-3">
                    <div className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${catMeta[selectedSkill.category].gradient} border ${catMeta[selectedSkill.category].border}`}>
                      <selectedSkill.icon className={`h-6 w-6 ${catMeta[selectedSkill.category].text}`} />
                    </div>
                    <div>
                      <p className="font-heading text-lg font-bold">{selectedSkill.name}</p>
                      <span className={`inline-block mt-0.5 rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide ${catMeta[selectedSkill.category].gradient.replace("from-", "bg-").split(" ")[0]}/20 ${catMeta[selectedSkill.category].text}`}>
                        {selectedSkill.category}
                      </span>
                    </div>
                  </div>

                  <div className="mt-5 flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Proficiency</span>
                    <span className="font-heading font-bold">{selectedSkill.level} (Level {selectedSkill.levelNum}/5)</span>
                  </div>
                  <Progress value={selectedSkill.proficiency} className="mt-2 h-2.5" />

                  <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
                    {selectedSkill.proficiency >= 80
                      ? `Strong analytical foundation with advanced proficiency in ${selectedSkill.name.toLowerCase()}, demonstrating expert-level capability and strategic insight.`
                      : selectedSkill.proficiency >= 50
                      ? `Developing proficiency in ${selectedSkill.name.toLowerCase()} with solid foundations and clear growth trajectory to expert level.`
                      : `Early-stage skill with exceptional growth potential. Prioritizing ${selectedSkill.name.toLowerCase()} could significantly accelerate your career trajectory.`}
                  </p>

                  <div className="mt-5 grid grid-cols-2 gap-3">
                    <div className="rounded-xl border border-border bg-muted/30 p-3">
                      <p className="text-[10px] uppercase tracking-widest text-muted-foreground flex items-center gap-1"><TrendingUp className="h-3 w-3" /> Demand</p>
                      <p className="font-heading font-bold text-lg mt-1">{selectedSkill.demand}</p>
                    </div>
                    <div className="rounded-xl border border-border bg-muted/30 p-3">
                      <p className="text-[10px] uppercase tracking-widest text-muted-foreground">₹ Salary Impact</p>
                      <p className="font-heading font-bold text-lg text-success mt-1">{selectedSkill.salaryImpact}</p>
                    </div>
                  </div>
                </div>

                <div className="rounded-2xl border border-border bg-card p-5 shadow-card">
                  <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Commonly Paired With</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {selectedSkill.pairedWith.map((p) => (
                      <button
                        key={p}
                        onClick={() => {
                          const found = skills.find((s) => s.name === p);
                          if (found) setSelectedSkill(found);
                        }}
                        className="rounded-full border border-border px-3 py-1.5 text-sm font-medium hover:border-primary/50 hover:bg-primary/5 transition-all duration-200 hover:shadow-sm"
                      >
                        {p}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="rounded-2xl border border-border bg-card p-5 shadow-card">
                  <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Recommended Resources</p>
                  <div className="mt-3 space-y-2">
                    {[
                      { title: `Advanced ${selectedSkill.name} Masterclass`, provider: "Coursera · 6 weeks" },
                      { title: `${selectedSkill.name} Fundamentals`, provider: "LinkedIn Learning · 3 weeks" },
                    ].map((r) => (
                      <div key={r.title} className="rounded-xl bg-muted/40 p-3 hover:bg-muted/60 transition-colors cursor-pointer">
                        <p className="text-sm font-semibold">{r.title}</p>
                        <p className="text-xs text-muted-foreground mt-0.5">{r.provider}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <Button className="w-full bg-cta-gradient text-primary-foreground font-bold py-5 text-base shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-shadow">
                  Add to Learning Roadmap
                </Button>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex h-full items-center justify-center rounded-2xl border border-dashed border-border bg-muted/10 p-8"
              >
                <p className="text-center text-muted-foreground text-sm">Click on any skill node to view detailed insights</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </DashboardLayout>
  );
};

export default SkillGraph;
