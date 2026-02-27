import DashboardLayout from "@/components/DashboardLayout";
import { motion } from "framer-motion";
import { Shield, TrendingUp, ArrowRight, Zap, ExternalLink, Target, ChevronRight, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Link } from "react-router-dom";

/* ── Gauge Chart Component ── */
const GaugeChart = ({ value, label, riskLabel, riskColor }: { value: number; label: string; riskLabel: string; riskColor: string }) => {
  const radius = 54;
  const circumference = Math.PI * radius; // half circle
  const offset = circumference - (value / 100) * circumference;

  return (
    <div className="flex flex-col items-center">
      <svg width="140" height="80" viewBox="0 0 140 80">
        <path d="M 15 75 A 55 55 0 0 1 125 75" fill="none" stroke="hsl(var(--muted))" strokeWidth="10" strokeLinecap="round" />
        <motion.path
          d="M 15 75 A 55 55 0 0 1 125 75"
          fill="none"
          stroke={`hsl(var(--${value > 50 ? "destructive" : value > 30 ? "warning" : "success"}))`}
          strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.2, ease: "easeOut", delay: 0.3 }}
        />
        <text x="70" y="65" textAnchor="middle" className="fill-foreground font-heading text-2xl font-bold">{value}%</text>
      </svg>
      <p className="text-xs text-muted-foreground mt-1">{label}</p>
      <span className={`mt-1 rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase ${riskColor}`}>{riskLabel}</span>
    </div>
  );
};

/* ── Mini Sparkline Component ── */
const Sparkline = ({ data, color = "primary" }: { data: number[]; color?: string }) => {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const w = 160;
  const h = 50;
  const points = data.map((v, i) => `${(i / (data.length - 1)) * w},${h - ((v - min) / range) * (h - 8) - 4}`).join(" ");

  return (
    <svg width={w} height={h} className="overflow-visible">
      <defs>
        <linearGradient id={`spark-${color}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={`hsl(var(--${color}))`} stopOpacity="0.3" />
          <stop offset="100%" stopColor={`hsl(var(--${color}))`} stopOpacity="0" />
        </linearGradient>
      </defs>
      <polygon
        points={`0,${h} ${points} ${w},${h}`}
        fill={`url(#spark-${color})`}
      />
      <motion.polyline
        points={points}
        fill="none"
        stroke={`hsl(var(--${color}))`}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.5, ease: "easeOut", delay: 0.4 }}
      />
    </svg>
  );
};

const Dashboard = () => {
  const today = new Date().toLocaleDateString("en-IN", { year: "numeric", month: "long", day: "numeric" });

  return (
    <DashboardLayout>
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        {/* Header */}
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="font-heading text-3xl font-bold">Hi Sarah, here's where you stand.</h1>
            <p className="mt-1 text-muted-foreground">Your AI-powered career snapshot for {today}.</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="gap-2"><Download className="h-4 w-4" /> Export Report</Button>
            <Button className="gap-2 bg-cta-gradient">Update Profile</Button>
          </div>
        </div>

        {/* ── Career Snapshot Cards ── */}
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {/* Current Positioning */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="rounded-2xl border border-border bg-card p-5 shadow-card"
          >
            <div className="flex items-center gap-2 text-sm font-semibold text-muted-foreground">
              <Target className="h-4 w-4 text-primary" /> Current Positioning
            </div>
            <div className="mt-4">
              <p className="text-[10px] uppercase tracking-widest text-muted-foreground">Role Cluster</p>
              <p className="font-heading text-xl font-bold mt-0.5">Product Strategy</p>
            </div>
            <div className="mt-4 flex items-center gap-6">
              <div>
                <p className="text-[10px] uppercase tracking-widest text-muted-foreground">Seniority</p>
                <span className="mt-1 inline-block rounded-full bg-primary/15 px-3 py-1 text-xs font-bold text-primary">Senior / Lead</span>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-widest text-muted-foreground">Mobility</p>
                <p className="mt-1 font-heading text-xl font-bold">8 <span className="text-sm font-normal text-muted-foreground">/10</span></p>
              </div>
            </div>
          </motion.div>

          {/* AI Exposure */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="rounded-2xl border border-border bg-card p-5 shadow-card flex flex-col items-center justify-center"
          >
            <div className="flex items-center gap-2 text-sm font-semibold text-muted-foreground self-start">
              <Shield className="h-4 w-4 text-warning" /> AI Exposure
            </div>
            <div className="mt-2">
              <GaugeChart value={34} label="Automation Impact" riskLabel="Moderate Risk" riskColor="bg-warning/15 text-warning" />
            </div>
          </motion.div>

          {/* Market Strength */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="rounded-2xl border border-border bg-card p-5 shadow-card"
          >
            <div className="flex items-center gap-2 text-sm font-semibold text-muted-foreground">
              <TrendingUp className="h-4 w-4 text-success" /> Market Strength
            </div>
            <div className="mt-3">
              <p className="font-heading text-3xl font-bold">Top 15% <span className="text-sm font-normal text-muted-foreground">Salary Percentile</span></p>
            </div>
            <div className="mt-3">
              <Sparkline data={[42, 45, 48, 47, 52, 55, 58, 62, 65, 70, 72, 78]} color="success" />
              <div className="flex items-center justify-between mt-1 text-[10px] text-muted-foreground">
                <span>2021</span>
                <span className="text-success font-bold text-xs">+12% YoY</span>
                <span>2023</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* ── Top Match Roles ── */}
        <div className="mt-8">
          <div className="flex items-center justify-between">
            <h2 className="font-heading text-xl font-bold">Your Top Match Roles</h2>
            <Link to="/roles" className="flex items-center gap-1 text-sm font-semibold text-primary hover:underline">
              View Roadmap <ExternalLink className="h-3 w-3" />
            </Link>
          </div>
          <div className="mt-4 space-y-3">
            {[
              { role: "Director of Product Operations", tags: "Strategic Leadership · Operations Focus · High Growth", score: 96 },
              { role: "AI Strategy Consultant", tags: "Advisory · Tech Implementation · Enterprise", score: 88 },
              { role: "VP of Product", tags: "Executive Leadership · Portfolio Management · Scale", score: 82 },
            ].map((r, i) => (
              <motion.div
                key={r.role}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + i * 0.1 }}
              >
                <Link
                  to="/roles"
                  className="group flex items-center justify-between rounded-2xl border border-border bg-card p-4 shadow-card hover:border-primary/30 hover:shadow-lg transition-all duration-300"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary group-hover:bg-primary/20 transition-colors">
                      <Target className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-heading font-bold">{r.role}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">{r.tags}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <p className="text-[10px] uppercase tracking-widest text-muted-foreground">Match Score</p>
                      <p className={`font-heading text-2xl font-bold ${r.score >= 90 ? "text-success" : "text-primary"}`}>{r.score}%</p>
                    </div>
                    <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ── Strategic Pivots + Skill Gaps ── */}
        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          {/* Strategic Pivots */}
          <div>
            <h2 className="font-heading text-xl font-bold mb-4">Strategic Pivot Roles</h2>
            <div className="space-y-3">
              {[
                { role: "AI Product Manager", salary: "₹45L–₹85L", trend: "Explosive", trendColor: "text-destructive", fit: 96 },
                { role: "Prompt Engineer Lead", salary: "₹35L–₹70L", trend: "Surging", trendColor: "text-warning", fit: 89 },
                { role: "Service Designer", salary: "₹30L–₹55L", trend: "Stable", trendColor: "text-muted-foreground", fit: 82 },
              ].map((r) => (
                <div key={r.role} className="rounded-2xl border border-border bg-card p-4 shadow-card">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-secondary text-primary"><TrendingUp className="h-4 w-4" /></div>
                      <div>
                        <p className="font-heading font-semibold">{r.role}</p>
                        <p className="text-xs text-muted-foreground">{r.salary}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className={`text-xs font-bold ${r.trendColor}`}>{r.trend}</span>
                      <p className="font-heading text-lg font-bold text-primary">{r.fit}%</p>
                    </div>
                  </div>
                  <Progress value={r.fit} className="mt-3 h-1.5" />
                </div>
              ))}
            </div>
          </div>

          {/* Skill Gaps */}
          <div>
            <h2 className="font-heading text-xl font-bold mb-4">Top Skill Gaps (Highest ROI)</h2>
            <div className="rounded-2xl border border-border bg-card p-5 shadow-card space-y-5">
              {[
                { skill: "Prompt Engineering", required: 90, current: 35 },
                { skill: "AI Product Strategy", required: 85, current: 50 },
                { skill: "Python for ML", required: 80, current: 25 },
                { skill: "Data Storytelling", required: 75, current: 60 },
                { skill: "Stakeholder Mgmt", required: 90, current: 72 },
              ].map((s) => {
                const gap = s.required - s.current;
                return (
                  <div key={s.skill}>
                    <div className="flex items-center justify-between text-sm mb-1.5">
                      <span className="font-medium">{s.skill}</span>
                      <span className={`text-xs font-bold ${gap > 40 ? "text-destructive" : gap > 20 ? "text-warning" : "text-success"}`}>Gap: {gap}%</span>
                    </div>
                    <div className="relative h-3 rounded-full bg-muted overflow-hidden">
                      <motion.div
                        className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-primary/70 to-primary"
                        initial={{ width: 0 }}
                        animate={{ width: `${s.current}%` }}
                        transition={{ duration: 0.8, delay: 0.5 }}
                      />
                      <div
                        className="absolute inset-y-0 rounded-full border-2 border-dashed border-foreground/20"
                        style={{ left: `${s.current}%`, width: `${s.required - s.current}%` }}
                      />
                    </div>
                    <div className="flex justify-between text-[10px] text-muted-foreground mt-1">
                      <span>You: {s.current}%</span>
                      <span>Required: {s.required}%</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-8 rounded-2xl bg-cta-gradient p-6 flex flex-wrap items-center justify-between gap-4"
        >
          <div>
            <p className="font-heading text-xl font-bold text-primary-foreground">Ready to close your skill gaps?</p>
            <p className="text-sm text-primary-foreground/80 mt-1">Your personalized learning roadmap is waiting.</p>
          </div>
          <Button variant="secondary" size="lg" className="font-bold gap-2" asChild>
            <Link to="/learning">View Learning Plan <ArrowRight className="h-4 w-4" /></Link>
          </Button>
        </motion.div>
      </motion.div>
    </DashboardLayout>
  );
};

export default Dashboard;
