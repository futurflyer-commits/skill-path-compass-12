import DashboardLayout from "@/components/DashboardLayout";
import { motion } from "framer-motion";
import { Download, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

const skills = [
  { name: "AI Strategy", level: "Core Expert", proficiency: 92, category: "technical", size: 120, x: 45, y: 45, color: "bg-primary" },
  { name: "Product Strategy", level: "Expert", proficiency: 88, category: "domain", size: 90, x: 55, y: 25, color: "bg-success" },
  { name: "Python", level: "Advanced", proficiency: 75, category: "technical", size: 80, x: 25, y: 40, color: "bg-primary" },
  { name: "Market Research", level: "Strong", proficiency: 70, category: "domain", size: 70, x: 70, y: 48, color: "bg-success" },
  { name: "Adaptive Leadership", level: "Strength", proficiency: 82, category: "power", size: 85, x: 55, y: 68, color: "bg-warning" },
  { name: "PyTorch", level: "Intermediate", proficiency: 55, category: "technical", size: 60, x: 18, y: 65, color: "bg-primary" },
];

const SkillGraph = () => {
  const categories = ["All", "Technical", "Domain", "Power"];
  const filters = ["AI-critical skills", "Transferable skills", "High Growth"];

  return (
    <DashboardLayout>
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="font-heading text-3xl font-bold">Interactive Skill Graph</h1>
            <p className="mt-1 text-muted-foreground">A visualization of your Technical, Domain, and Power skills synthesized from your career evidence.</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="gap-2"><Download className="h-4 w-4" /> Export</Button>
            <Button className="gap-2 bg-cta-gradient"><Share2 className="h-4 w-4" /> Share Graph</Button>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          <div className="flex gap-1 rounded-lg bg-muted p-1 text-sm">
            {categories.map((c, i) => (
              <button key={c} className={`rounded-md px-3 py-1 ${i === 0 ? "bg-card shadow-sm font-medium" : "text-muted-foreground"}`}>{c}</button>
            ))}
          </div>
          {filters.map((f) => (
            <button key={f} className="rounded-full border border-border px-3 py-1 text-sm text-muted-foreground hover:border-primary/50">{f}</button>
          ))}
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-3">
          {/* Graph */}
          <div className="lg:col-span-2 relative h-[500px] rounded-2xl border border-border bg-muted/20 p-4">
            {skills.map((skill) => (
              <motion.div
                key={skill.name}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: Math.random() * 0.5, type: "spring" }}
                className={`absolute flex flex-col items-center justify-center rounded-full ${skill.color} text-primary-foreground cursor-pointer hover:scale-110 transition-transform`}
                style={{
                  width: skill.size,
                  height: skill.size,
                  left: `${skill.x}%`,
                  top: `${skill.y}%`,
                  transform: "translate(-50%, -50%)",
                }}
              >
                <span className="text-xs font-bold text-center leading-tight px-2">{skill.name}</span>
                <span className="text-[10px] opacity-80">{skill.level}</span>
              </motion.div>
            ))}
            <div className="absolute bottom-4 left-4 text-xs text-muted-foreground">
              <p className="font-semibold uppercase tracking-wide mb-2">Skill Map Legend</p>
              <div className="flex items-center gap-2"><div className="h-3 w-3 rounded-full bg-primary" /> Technical Skills</div>
              <div className="flex items-center gap-2 mt-1"><div className="h-3 w-3 rounded-full bg-success" /> Domain Knowledge</div>
              <div className="flex items-center gap-2 mt-1"><div className="h-3 w-3 rounded-full bg-warning" /> Power Skills</div>
              <p className="mt-2 text-muted-foreground">Node size = Strength</p>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            <div className="rounded-2xl border border-border bg-card p-5 shadow-card">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-success/20 text-success">⚙️</div>
                <div>
                  <p className="font-heading font-bold">AI Strategy</p>
                  <p className="text-xs font-semibold text-success">CORE STRENGTH</p>
                </div>
              </div>
              <p className="mt-3 text-sm text-muted-foreground">
                Proven ability to conceptualize and deploy AI-driven business solutions across enterprise environments.
              </p>
              <div className="mt-4 flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Proficiency</span>
                <span className="font-bold">92%</span>
              </div>
              <Progress value={92} className="mt-1 h-2" />
            </div>

            <div className="rounded-2xl border border-border bg-card p-5 shadow-card">
              <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Key Evidence Snippets</p>
              <div className="mt-3 space-y-3">
                {[
                  { text: "Directed the 2023 AI Roadmap for Global Logistics, resulting in a 15% reduction in fuel costs using predictive modeling.", source: "Project: SmartRoutes 2023" },
                  { text: "Built internal stakeholder consensus for GenAI adoption within the customer service division.", source: "Role: Strategy Lead @ TechNova" },
                ].map((e) => (
                  <div key={e.source} className="border-l-2 border-primary pl-3">
                    <p className="text-sm italic text-foreground/80">"{e.text}"</p>
                    <p className="mt-1 text-xs font-semibold text-primary">{e.source}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl bg-cta-gradient p-5 text-primary-foreground">
              <p className="text-xs font-semibold uppercase tracking-wide">🚀 Next Growth Step</p>
              <h3 className="mt-1 font-heading text-lg font-bold">Advanced MLOps Certification</h3>
              <p className="mt-1 text-sm text-primary-foreground/80">Bridge the gap between strategy and production-grade deployment.</p>
              <Button variant="secondary" size="sm" className="mt-3">View Course Path</Button>
            </div>
          </div>
        </div>
      </motion.div>
    </DashboardLayout>
  );
};

export default SkillGraph;
