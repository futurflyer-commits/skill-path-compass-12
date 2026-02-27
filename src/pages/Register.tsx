import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Shield, TrendingUp, Compass, ArrowRight, Upload, Check } from "lucide-react";

const Register = () => {
  const [step, setStep] = useState(0);
  const navigate = useNavigate();

  const interests = ["AI", "Leadership", "Entrepreneurship", "Deep Tech", "Strategy", "Sustainability", "Creative Tech", "Data Science", "Product Management"];
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);

  const toggleInterest = (i: string) =>
    setSelectedInterests((p) => (p.includes(i) ? p.filter((x) => x !== i) : [...p, i]));

  if (step === 0) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-hero-gradient px-4">
        <div className="mx-auto grid w-full max-w-5xl gap-8 lg:grid-cols-2">
          {/* Left - Persona Summary */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="flex flex-col justify-center">
            <p className="text-xs font-semibold uppercase tracking-widest text-primary">Continue Your Journey</p>
            <h1 className="mt-2 font-heading text-3xl font-bold">Your Persona is Ready</h1>
            <div className="mt-6 rounded-2xl border border-border bg-card p-6 shadow-card">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-cta-gradient text-xl">🧠</div>
                <div>
                  <p className="font-heading font-bold">The Adaptive Builder</p>
                  <p className="text-xs text-muted-foreground">AI-Resilient Product Strategist</p>
                </div>
              </div>
              <div className="mt-4 grid grid-cols-3 gap-3 text-center text-xs">
                {[
                  { icon: Shield, label: "AI Risk", val: "24%" },
                  { icon: TrendingUp, label: "Demand", val: "High" },
                  { icon: Compass, label: "Mobility", val: "87" },
                ].map((s) => (
                  <div key={s.label} className="rounded-lg bg-muted/50 p-3">
                    <s.icon className="mx-auto h-4 w-4 text-primary" />
                    <p className="mt-1 font-semibold">{s.val}</p>
                    <p className="text-muted-foreground">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right - Sign Up */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="rounded-2xl border border-border bg-card p-8 shadow-elevated">
            <h2 className="font-heading text-2xl font-bold">Create Your Account</h2>
            <p className="mt-1 text-sm text-muted-foreground">Unlock your personalized career roadmap</p>
            <div className="mt-6 space-y-3">
              <Button variant="outline" className="w-full gap-2 justify-center">
                <svg className="h-5 w-5" viewBox="0 0 24 24"><path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"/><path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
                Continue with Google
              </Button>
              <Button variant="outline" className="w-full gap-2 justify-center">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/></svg>
                Continue with LinkedIn
              </Button>
              <div className="relative my-4">
                <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-border" /></div>
                <div className="relative flex justify-center text-xs uppercase"><span className="bg-card px-2 text-muted-foreground">or</span></div>
              </div>
              <Input placeholder="Full Name" />
              <Input placeholder="Email Address" type="email" />
              <Input placeholder="Password" type="password" />
              <Button className="w-full bg-cta-gradient" onClick={() => setStep(1)}>Create Account</Button>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  if (step === 1) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-muted/20 px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-lg rounded-2xl border border-border bg-card p-8 shadow-elevated">
          <h2 className="font-heading text-2xl font-bold">Upload Your Profile</h2>
          <p className="mt-1 text-sm text-muted-foreground">One-click import or drag-and-drop your CV</p>
          <div className="mt-6 flex flex-col items-center gap-4 rounded-xl border-2 border-dashed border-border p-10">
            <Upload className="h-10 w-10 text-muted-foreground" />
            <p className="text-sm text-muted-foreground">Drag & drop your CV here, or click to browse</p>
            <Button variant="outline" size="sm">Browse Files</Button>
          </div>
          <Button variant="outline" className="mt-4 w-full gap-2 justify-center">
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/></svg>
            Import from LinkedIn
          </Button>
          <div className="mt-6 flex justify-end">
            <Button className="gap-2 bg-cta-gradient" onClick={() => setStep(2)}>Next <ArrowRight className="h-4 w-4" /></Button>
          </div>
        </motion.div>
      </div>
    );
  }

  if (step === 2) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-muted/20 px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-lg rounded-2xl border border-border bg-card p-8 shadow-elevated">
          <h2 className="font-heading text-2xl font-bold">Your Career Interests</h2>
          <p className="mt-1 text-sm text-muted-foreground">Select all that apply</p>
          <div className="mt-6 flex flex-wrap gap-3">
            {interests.map((i) => (
              <button
                key={i}
                onClick={() => toggleInterest(i)}
                className={`rounded-full border-2 px-4 py-2 text-sm font-medium transition-all ${
                  selectedInterests.includes(i)
                    ? "border-primary bg-secondary text-primary"
                    : "border-border text-muted-foreground hover:border-primary/50"
                }`}
              >
                {selectedInterests.includes(i) && <Check className="mr-1 inline h-3 w-3" />}
                {i}
              </button>
            ))}
          </div>
          <div className="mt-8 flex justify-end">
            <Button className="gap-2 bg-cta-gradient" onClick={() => navigate("/dashboard")}>
              Complete Profile <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </motion.div>
      </div>
    );
  }

  return null;
};

export default Register;
