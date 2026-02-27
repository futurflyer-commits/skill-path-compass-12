import DashboardLayout from "@/components/DashboardLayout";
import { motion } from "framer-motion";
import { Search, TrendingUp, Shield, MapPin, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

const roles = [
  { title: "AI Product Manager", industry: "Technology", growth: "Explosive", aiExposure: 8, salary: "₹45L–₹85L", location: "Remote / Bengaluru", fit: 96, demand: 94 },
  { title: "Prompt Engineer Lead", industry: "AI / ML", growth: "Surging", aiExposure: 15, salary: "₹35L–₹70L", location: "Remote / Hyderabad", fit: 89, demand: 91 },
  { title: "Service Designer", industry: "Design / Consulting", growth: "Stable", aiExposure: 12, salary: "₹30L–₹55L", location: "Mumbai / Remote", fit: 82, demand: 78 },
  { title: "AI Solutions Architect", industry: "Enterprise Tech", growth: "Surging", aiExposure: 10, salary: "₹50L–₹1.2Cr", location: "Bengaluru / Delhi", fit: 78, demand: 89 },
  { title: "Data Science Lead", industry: "Analytics", growth: "Growing", aiExposure: 20, salary: "₹40L–₹80L", location: "Pune / Remote", fit: 75, demand: 85 },
  { title: "UX Strategist", industry: "Design", growth: "Stable", aiExposure: 18, salary: "₹25L–₹50L", location: "Bengaluru / Mumbai", fit: 71, demand: 72 },
];

const Roles = () => {
  return (
    <DashboardLayout>
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="font-heading text-3xl font-bold">Role Library</h1>
        <p className="mt-1 text-muted-foreground">Explore roles matched to your profile, sorted by fit score.</p>

        <div className="mt-6 flex flex-wrap gap-3">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Search roles, skills, industries..." className="pl-10" />
          </div>
          <Button variant="outline" className="gap-2"><Filter className="h-4 w-4" /> Filters</Button>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {["Growth Rate", "AI Exposure", "Salary Band", "Geography", "Industry"].map((f) => (
            <button key={f} className="rounded-full border border-border bg-card px-3 py-1 text-xs text-muted-foreground hover:border-primary/50">{f}</button>
          ))}
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {roles.map((r) => (
            <div key={r.title} className="group rounded-2xl border border-border bg-card p-5 shadow-card transition-all hover:shadow-elevated">
              <div className="flex items-center justify-between">
                <span className="rounded-full bg-secondary px-2 py-0.5 text-xs font-medium text-secondary-foreground">{r.industry}</span>
                <span className="font-heading text-lg font-bold text-primary">{r.fit}%</span>
              </div>
              <h3 className="mt-3 font-heading text-lg font-semibold">{r.title}</h3>
              <div className="mt-3 space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1 text-muted-foreground"><TrendingUp className="h-3 w-3" /> Growth</span>
                  <span className={`font-semibold ${r.growth === "Explosive" ? "text-destructive" : r.growth === "Surging" ? "text-warning" : "text-muted-foreground"}`}>{r.growth}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1 text-muted-foreground"><Shield className="h-3 w-3" /> AI Exposure</span>
                  <span className="font-semibold">{r.aiExposure}%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Salary</span>
                  <span className="font-semibold">{r.salary}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1 text-muted-foreground"><MapPin className="h-3 w-3" /> Location</span>
                  <span className="font-semibold">{r.location}</span>
                </div>
              </div>
              <div className="mt-3">
                <div className="flex justify-between text-[10px] text-muted-foreground mb-1">
                  <span>Market Demand</span><span>{r.demand}%</span>
                </div>
                <Progress value={r.demand} className="h-1.5" />
              </div>
              <Button variant="outline" size="sm" className="mt-4 w-full">View Path</Button>
            </div>
          ))}
        </div>
      </motion.div>
    </DashboardLayout>
  );
};

export default Roles;
