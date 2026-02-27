import DashboardLayout from "@/components/DashboardLayout";
import { motion } from "framer-motion";
import { Download, Save, Briefcase, Code, Award, Sparkles, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Link } from "react-router-dom";

const milestones = [
  { year: "Year 0", title: "Current Role: Senior Analyst", desc: "Focusing on data visualization and SQL reporting at Meta.", icon: Briefcase },
  { year: "Year 1.5", title: "Python & ML Fundamentals", desc: "Certification + Self-Paced learning path.", icon: Code, tags: ["Certification", "Self-Paced"] },
  { year: "Year 3.0", title: "Lead Data Scientist", desc: "Expected Promotion. Shift to people leadership and strategy.", icon: Award },
  { year: "Year 5.0", title: "AI Solutions Architect", desc: "Probable target role with 82% match.", icon: Sparkles, target: true },
];

const PathSimulator = () => {
  return (
    <DashboardLayout>
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <div className="mb-2 text-sm text-muted-foreground">Home › Career Path Simulator</div>
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="font-heading text-3xl font-bold">Path Simulator</h1>
            <p className="mt-1 text-muted-foreground">Simulate interactive career scenarios for your 5-year trajectory.</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="gap-2"><Download className="h-4 w-4" /> Export Path</Button>
            <Button className="gap-2 bg-cta-gradient"><Save className="h-4 w-4" /> Save Scenario</Button>
          </div>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          {/* Timeline */}
          <div className="lg:col-span-2 space-y-6">
            <div className="rounded-2xl border border-border bg-card p-6 shadow-card">
              <div className="flex items-center justify-between">
                <h2 className="font-heading text-xl font-bold">5-Year Growth Map</h2>
                <span className="flex items-center gap-1 rounded-full bg-success/10 px-3 py-1 text-xs font-semibold text-success">✓ OPTIMIZED PATH</span>
              </div>

              <div className="mt-6 relative">
                <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-border" />
                {milestones.map((m, i) => (
                  <motion.div
                    key={m.year}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.15 }}
                    className="relative mb-8 ml-14 last:mb-0"
                  >
                    <div className={`absolute -left-[3.25rem] flex h-10 w-10 items-center justify-center rounded-xl ${m.target ? "border-2 border-dashed border-primary bg-secondary" : "bg-secondary"} text-primary`}>
                      <m.icon className="h-5 w-5" />
                    </div>
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-heading font-semibold">{m.title}</h3>
                        <p className="text-sm text-muted-foreground">{m.desc}</p>
                        {m.tags && (
                          <div className="mt-2 flex gap-2">
                            {m.tags.map((t) => (
                              <span key={t} className="rounded-full bg-success/10 px-2 py-0.5 text-xs font-medium text-success">{t}</span>
                            ))}
                          </div>
                        )}
                        {m.target && (
                          <div className="mt-3 flex items-center gap-3 rounded-lg border border-border bg-muted/50 px-4 py-2">
                            <span className="text-xs font-semibold uppercase text-muted-foreground">Probable Target</span>
                            <span className="font-heading font-bold">82% Match</span>
                            <Progress value={82} className="h-2 w-24" />
                          </div>
                        )}
                      </div>
                      <span className="text-sm text-muted-foreground">{m.year}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Salary Projection */}
            <div className="rounded-2xl border border-border bg-card p-6 shadow-card">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="font-heading text-xl font-bold">Salary Projection</h2>
                  <p className="text-sm text-muted-foreground">Based on market demand for ML skills.</p>
                </div>
                <div className="text-right">
                  <p className="font-heading text-3xl font-bold text-primary">₹1.85Cr</p>
                  <p className="text-sm font-semibold text-success">+42% from current</p>
                </div>
              </div>
              <div className="mt-6 flex items-end gap-3 h-40">
                {[
                  { year: "Year 0", h: 30, salary: "₹65L" },
                  { year: "Year 1", h: 45, salary: "₹82L" },
                  { year: "Year 2", h: 60, salary: "₹1.05Cr" },
                  { year: "Year 3", h: 80, salary: "₹1.40Cr" },
                  { year: "Year 5", h: 100, salary: "₹1.85Cr" },
                ].map((bar) => (
                  <div key={bar.year} className="flex flex-1 flex-col items-center gap-1">
                    <span className="text-[10px] font-semibold text-primary">{bar.salary}</span>
                    <div className="w-full flex-1 flex items-end">
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: `${bar.h}%` }}
                        transition={{ delay: 0.3, duration: 0.5 }}
                        className="w-full rounded-t-lg bg-gradient-to-t from-primary/50 to-primary"
                      />
                    </div>
                    <span className="text-[10px] text-muted-foreground uppercase">{bar.year}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar - What-If Simulator */}
          <div className="space-y-4">
            <div className="rounded-2xl border border-border bg-card p-5 shadow-card">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-secondary text-primary">⚙️</div>
                <h3 className="font-heading font-bold">What-If Simulator</h3>
              </div>
              <p className="mt-2 text-sm text-muted-foreground">Modify variables to see impact on your path.</p>

              <div className="mt-4 space-y-4">
                {[
                  { label: "Relocate to other Cities", desc: "Increases average salary by 35%", defaultOn: true },
                  { label: "AI Mastery", desc: "Skip the Year 1.5 certification" },
                  { label: "Managerial Focus", desc: "Prioritize Soft Skills path" },
                ].map((toggle) => (
                  <div key={toggle.label} className="flex items-start justify-between">
                    <div>
                      <p className="text-sm font-medium">{toggle.label}</p>
                      <p className="text-xs text-muted-foreground">{toggle.desc}</p>
                    </div>
                    <Switch defaultChecked={toggle.defaultOn} />
                  </div>
                ))}
              </div>

              <div className="mt-6">
                <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Weekly Study Hours</p>
                <Slider defaultValue={[12]} max={40} step={1} className="mt-3" />
                <div className="mt-1 flex justify-between text-xs text-muted-foreground">
                  <span>0h</span>
                  <span className="font-semibold text-primary">12 hours</span>
                  <span>40h</span>
                </div>
              </div>

              <Button variant="outline" className="mt-4 w-full">Run Deep Simulation</Button>
            </div>

            <div className="rounded-2xl border border-border bg-card p-5 shadow-card">
              <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Risk Assessment</p>
              <div className="mt-3 flex items-center gap-3">
                <div className="flex h-14 w-14 items-center justify-center rounded-full border-4 border-warning">
                  <span className="font-heading text-lg font-bold">22%</span>
                </div>
                <div>
                  <p className="font-heading font-bold">Low Disruption Risk</p>
                  <p className="text-xs text-muted-foreground">Your skills are currently high in demand with moderate AI exposure.</p>
                </div>
              </div>
            </div>

            <div className="rounded-2xl bg-foreground p-5 text-background">
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4" />
                <p className="text-sm font-bold">AI Recommendation</p>
              </div>
              <p className="mt-2 text-sm text-background/80">
                "Based on your current trajectory, adding <strong>Cloud Architecture</strong> in Year 2 would increase your target salary by another 12%."
              </p>
              <button className="mt-3 text-sm font-semibold text-primary">Add to My Path</button>
            </div>
          </div>
        </div>
      </motion.div>
    </DashboardLayout>
  );
};

export default PathSimulator;
