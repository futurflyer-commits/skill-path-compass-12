import DashboardLayout from "@/components/DashboardLayout";
import { motion } from "framer-motion";
import { Shield, TrendingUp, ArrowRight, Zap, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Link } from "react-router-dom";

const Dashboard = () => {
  return (
    <DashboardLayout>
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="font-heading text-3xl font-bold">Welcome back, Alex</h1>
        <p className="mt-1 text-muted-foreground">
          Your career trajectory is looking strong today.{" "}
          <Link to="/roles" className="font-semibold text-primary hover:underline">2 new roles matched</Link> your profile.
        </p>

        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          {/* Career Snapshot */}
          <div className="lg:col-span-2 rounded-2xl border border-border bg-card p-6 shadow-card">
            <span className="inline-block rounded-full bg-success/10 px-3 py-1 text-xs font-semibold text-success">CURRENT STATUS</span>
            <h2 className="mt-3 font-heading text-2xl font-bold">Senior Product Designer</h2>
            <p className="text-sm text-muted-foreground">Digital Creative & UX Cluster</p>

            <div className="mt-6 grid grid-cols-2 gap-6 sm:grid-cols-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">AI Exposure Risk</p>
                <p className="mt-1 flex items-center gap-2 font-heading text-2xl font-bold text-success">
                  24% <Shield className="h-4 w-4" />
                </p>
                <p className="text-xs text-muted-foreground">Low impact on creative core</p>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Market Demand</p>
                <p className="mt-1 flex items-center gap-2 font-heading text-2xl font-bold text-primary">
                  High <TrendingUp className="h-4 w-4" />
                </p>
                <p className="text-xs text-muted-foreground">Increasing for hybrid roles</p>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Resilience</p>
                <p className="mt-1 font-heading text-2xl font-bold text-success">Strong</p>
                <p className="text-xs text-muted-foreground">Top 20% in cluster</p>
              </div>
            </div>

            <Button className="mt-6 gap-2 bg-cta-gradient" asChild>
              <Link to="/path-simulator">View Full Analysis <ArrowRight className="h-4 w-4" /></Link>
            </Button>
          </div>

          {/* Active Opportunities */}
          <div className="rounded-2xl border border-border bg-card p-6 shadow-card">
            <div className="flex items-center gap-2 text-sm font-semibold">
              <Zap className="h-4 w-4 text-primary" /> Active Opportunity
            </div>
            <div className="mt-4 space-y-4">
              {[
                { role: "Design Lead", company: "OpenAI", type: "Remote", fit: 98 },
                { role: "UX Architect", company: "Anthropic", type: "Hybrid", fit: 94 },
              ].map((job) => (
                <div key={job.role} className="flex items-center justify-between rounded-xl border border-border p-3">
                  <div>
                    <p className="font-medium">{job.role}</p>
                    <p className="text-xs text-muted-foreground">{job.company} • {job.type}</p>
                  </div>
                  <span className="text-sm font-bold text-success">{job.fit}% FIT</span>
                </div>
              ))}
            </div>
            <Button variant="outline" className="mt-4 w-full" asChild>
              <Link to="/roles">Explore All Matching Jobs</Link>
            </Button>
          </div>
        </div>

        {/* Top 3 Strategic Pivot Roles */}
        <div className="mt-8">
          <div className="flex items-center justify-between">
            <h2 className="font-heading text-xl font-bold">Top 3 Strategic Pivot Roles</h2>
            <Link to="/roles" className="flex items-center gap-1 text-sm font-semibold text-primary hover:underline">
              Explore Paths <ExternalLink className="h-3 w-3" />
            </Link>
          </div>
          <div className="mt-4 grid gap-4 sm:grid-cols-3">
            {[
              { role: "AI Product Manager", desc: "Bridging creative vision with technical AI implementation.", fit: 96, trend: "Explosive", trendColor: "text-destructive", vuln: "Very Low (8%)", salary: "₹45L–₹85L" },
              { role: "Prompt Engineer Lead", desc: "Designing high-performance interaction patterns for LLMs.", fit: 89, trend: "Surging", trendColor: "text-warning", vuln: "Moderate (15%)", salary: "₹35L–₹70L" },
              { role: "Service Designer", desc: "Optimizing human-centric workflows in AI-powered industries.", fit: 82, trend: "Stable", trendColor: "text-muted-foreground", vuln: "Low (12%)", salary: "₹30L–₹55L" },
            ].map((r) => (
              <div key={r.role} className="rounded-2xl border border-border bg-card p-5 shadow-card">
                <div className="flex items-center justify-between">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-secondary text-primary">
                    <TrendingUp className="h-5 w-5" />
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-muted-foreground">FIT SCORE</p>
                    <p className="font-heading text-xl font-bold text-primary">{r.fit}%</p>
                  </div>
                </div>
                <h3 className="mt-3 font-heading font-semibold">{r.role}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{r.desc}</p>
                <div className="mt-4 space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Market Trend</span>
                    <span className={`font-semibold ${r.trendColor}`}>{r.trend}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">AI Vulnerability</span>
                    <span className="font-semibold">{r.vuln}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Salary Range</span>
                    <span className="font-semibold">{r.salary}</span>
                  </div>
                </div>
                <Progress value={r.fit} className="mt-3 h-1.5" />
              </div>
            ))}
          </div>
        </div>

        {/* Skill Gaps */}
        <div className="mt-8 rounded-2xl border border-border bg-card p-6 shadow-card">
          <h2 className="font-heading text-xl font-bold">Top Skill Gaps (Highest ROI)</h2>
          <div className="mt-4 space-y-4">
            {[
              { skill: "Prompt Engineering", required: 90, current: 35 },
              { skill: "AI Product Strategy", required: 85, current: 50 },
              { skill: "Python for ML", required: 80, current: 25 },
              { skill: "Data Storytelling", required: 75, current: 60 },
              { skill: "Stakeholder Management", required: 90, current: 72 },
            ].map((s) => (
              <div key={s.skill}>
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium">{s.skill}</span>
                  <span className="text-muted-foreground">Gap: {s.required - s.current}%</span>
                </div>
                <div className="mt-1 flex gap-1">
                  <div className="relative h-2 flex-1 rounded-full bg-muted">
                    <div className="absolute inset-y-0 left-0 rounded-full bg-primary" style={{ width: `${s.current}%` }} />
                  </div>
                  <div className="relative h-2 flex-1 rounded-full bg-muted">
                    <div className="absolute inset-y-0 left-0 rounded-full bg-secondary" style={{ width: `${s.required}%` }} />
                  </div>
                </div>
                <div className="mt-0.5 flex justify-between text-[10px] text-muted-foreground">
                  <span>Your Level: {s.current}%</span>
                  <span>Required: {s.required}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </DashboardLayout>
  );
};

export default Dashboard;
