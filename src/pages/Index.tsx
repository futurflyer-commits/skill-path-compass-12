import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Zap, HelpCircle, BookX, Search, Cpu, TrendingUp, ArrowRight, Sparkles } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.6, ease: "easeOut" as const },
  }),
};

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* ── Hero ── */}
      <section className="relative overflow-hidden bg-hero-gradient">
        {/* Ambient glow orbs */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 left-1/4 h-[600px] w-[600px] rounded-full bg-primary/10 blur-[120px]" />
          <div className="absolute -bottom-20 right-1/4 h-[500px] w-[500px] rounded-full bg-accent/10 blur-[100px]" />
          <div className="absolute top-1/2 left-1/2 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/5 blur-[80px]" />
          {/* Grid pattern */}
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage:
                "linear-gradient(hsl(var(--primary-foreground) / 0.3) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--primary-foreground) / 0.3) 1px, transparent 1px)",
              backgroundSize: "60px 60px",
            }}
          />
        </div>

        <Navbar />

        <div className="relative mx-auto max-w-7xl px-6 pb-28 pt-20 lg:px-8 lg:pb-36 lg:pt-28">
          <div className="mx-auto max-w-3xl text-center">
            <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={0}>
              <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 backdrop-blur-sm">
                <Sparkles className="h-3.5 w-3.5 text-primary" />
                <span className="text-xs font-medium text-primary-foreground/90">New: Personalized AI Mentorship</span>
              </div>
            </motion.div>

            <motion.h1
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              custom={1}
              className="font-heading text-5xl font-bold leading-[1.08] tracking-tight text-primary-foreground sm:text-6xl lg:text-7xl"
            >
              The AI Career Co-Pilot
              <br />
              for an{" "}
              <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                Uncertain World
              </span>
            </motion.h1>

            <motion.p
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              custom={2}
              className="mx-auto mt-7 max-w-xl text-lg leading-relaxed text-primary-foreground/60"
            >
              Navigate career disruption and find your ideal growth path with AI-driven insights, personalized roadmaps, and real-time market coaching.
            </motion.p>

            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              custom={3}
              className="mt-10 flex flex-wrap justify-center gap-4"
            >
              <Button
                size="lg"
                asChild
                className="bg-cta-gradient px-8 text-base shadow-glow transition-all duration-300 hover:scale-[1.03] hover:shadow-premium"
              >
                <Link to="/assessment">
                  Start Your Career Discovery
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-primary-foreground/20 bg-primary-foreground/5 text-primary-foreground/80 backdrop-blur-sm transition-all duration-300 hover:bg-primary-foreground/10 hover:text-primary-foreground hover:scale-[1.03]"
                asChild
              >
                <a href="#how-it-works">See How It Works</a>
              </Button>
            </motion.div>

            {/* Trust bar */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              custom={4}
              className="mt-16 flex flex-wrap items-center justify-center gap-6"
            >
              <div className="flex -space-x-2.5">
                {["AM", "SK", "JD", "RK", "PS"].map((initials) => (
                  <div
                    key={initials}
                    className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-background/20 bg-primary/80 text-[10px] font-semibold text-primary-foreground shadow-sm"
                  >
                    {initials}
                  </div>
                ))}
              </div>
              <p className="text-sm text-primary-foreground/50">
                Trusted by <span className="font-semibold text-primary-foreground/80">12,000+</span> professionals worldwide
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Pain Points ── */}
      <section id="problem" className="px-6 py-24 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeUp}
            custom={0}
            className="text-center"
          >
            <p className="font-heading text-xs font-bold uppercase tracking-[0.2em] text-primary">The Challenge</p>
            <h2 className="mt-3 font-heading text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
              The Modern Workforce is Changing
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground">
              Traditional career paths are becoming obsolete. We help you stay ahead of the curve in a rapidly evolving economy.
            </p>
          </motion.div>

          <div className="mt-16 grid gap-6 sm:grid-cols-3">
            {[
              {
                icon: Zap,
                title: "AI Disruption",
                desc: "Understand exactly how automation and generative AI impact your specific industry and role before it happens.",
              },
              {
                icon: HelpCircle,
                title: "Career Anxiety",
                desc: "Overcome the paralyzing uncertainty of what comes next with data-driven confidence and clear action plans.",
              },
              {
                icon: BookX,
                title: "Wasted Learning",
                desc: "Stop collecting random certificates. Focus your upskilling on high-leverage skills that actually drive your future growth.",
              },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-60px" }}
                variants={fadeUp}
                custom={i + 1}
                className="card-premium group"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-secondary text-primary transition-colors duration-300 group-hover:bg-primary group-hover:text-primary-foreground">
                  <item.icon className="h-6 w-6" />
                </div>
                <h3 className="mt-6 font-heading text-xl font-semibold">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How It Works ── */}
      <section id="how-it-works" className="bg-section-alt px-6 py-24 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeUp}
            custom={0}
            className="text-center"
          >
            <p className="font-heading text-xs font-bold uppercase tracking-[0.2em] text-primary">Our Process</p>
            <h2 className="mt-3 font-heading text-3xl font-bold sm:text-4xl lg:text-5xl">
              How Futurefly Propels You Forward
            </h2>
          </motion.div>

          <div className="relative mt-20">
            {/* Connecting line */}
            <div className="absolute left-0 right-0 top-10 hidden h-px bg-gradient-to-r from-transparent via-border to-transparent sm:block" />

            <div className="grid gap-12 sm:grid-cols-3">
              {[
                {
                  icon: Search,
                  step: 1,
                  title: "Discovery & Assessment",
                  desc: "Map your current skill set, experiences, and professional interests using our deep-learning assessment engine.",
                },
                {
                  icon: Cpu,
                  step: 2,
                  title: "AI-Powered Mapping",
                  desc: "Our AI analyzes thousands of career trajectories to generate a personalized high-growth path tailored to you.",
                },
                {
                  icon: TrendingUp,
                  step: 3,
                  title: "Continuous Coaching",
                  desc: "Receive real-time guidance as the market evolves. Your roadmap adapts automatically to new opportunities.",
                },
              ].map((item, i) => (
                <motion.div
                  key={item.title}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-60px" }}
                  variants={fadeUp}
                  custom={i + 1}
                  className="flex flex-col items-center text-center"
                >
                  <div className="relative z-10">
                    <div className="flex h-20 w-20 items-center justify-center rounded-3xl border border-border/60 bg-card shadow-card transition-all duration-300 hover:shadow-premium">
                      <item.icon className="h-8 w-8 text-primary" />
                    </div>
                    <span className="absolute -right-2 -top-2 flex h-7 w-7 items-center justify-center rounded-full bg-cta-gradient text-xs font-bold text-primary-foreground shadow-sm">
                      {item.step}
                    </span>
                  </div>
                  <h3 className="mt-7 font-heading text-lg font-semibold">{item.title}</h3>
                  <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted-foreground">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Social proof bar */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            custom={2}
            className="mx-auto mt-20 flex max-w-lg items-center justify-center gap-5 rounded-2xl border border-border/60 bg-card px-8 py-5 shadow-card"
          >
            <div className="flex -space-x-2">
              {["AM", "SK", "JD"].map((initials) => (
                <div
                  key={initials}
                  className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-background bg-primary text-[10px] font-semibold text-primary-foreground"
                >
                  {initials}
                </div>
              ))}
            </div>
            <p className="text-sm text-muted-foreground">
              Joined by <span className="font-semibold text-foreground">12,000+</span> professionals
            </p>
            <Button size="sm" className="bg-cta-gradient transition-all duration-200 hover:scale-[1.03]" asChild>
              <Link to="/assessment">Join Now</Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="px-6 py-24 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={fadeUp}
          custom={0}
          className="relative mx-auto max-w-5xl overflow-hidden rounded-[2rem] bg-cta-gradient p-14 text-center sm:p-20"
        >
          {/* Background decoration */}
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <div className="absolute -top-20 -right-20 h-[300px] w-[300px] rounded-full bg-primary-foreground/5 blur-[60px]" />
            <div className="absolute -bottom-20 -left-20 h-[250px] w-[250px] rounded-full bg-primary-foreground/5 blur-[60px]" />
            <div
              className="absolute inset-0 opacity-[0.05]"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 1px 1px, hsl(var(--primary-foreground) / 0.4) 1px, transparent 0)",
                backgroundSize: "32px 32px",
              }}
            />
          </div>

          <div className="relative z-10">
            <h2 className="font-heading text-3xl font-bold text-primary-foreground sm:text-4xl lg:text-5xl">
              Ready to take flight?
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-primary-foreground/70">
              Your future self will thank you. Get the clarity and direction you need in an increasingly complex professional landscape.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <Button
                size="lg"
                variant="secondary"
                className="px-8 text-base shadow-sm transition-all duration-300 hover:scale-[1.03] hover:shadow-md"
                asChild
              >
                <Link to="/assessment">Get Started Free</Link>
              </Button>
              <Button
                size="lg"
                variant="ghost"
                className="text-primary-foreground/80 transition-all duration-300 hover:bg-primary-foreground/10 hover:text-primary-foreground hover:scale-[1.03]"
                asChild
              >
                <Link to="#">
                  Talk to a Career Strategist
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </motion.div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
