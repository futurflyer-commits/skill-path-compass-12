import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Zap, HelpCircle, BookX, Search, Cpu, TrendingUp, Play } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import heroImg from "@/assets/hero-constellation.png";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.5 } }),
};

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="relative overflow-hidden bg-hero-gradient px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2">
          <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={0}>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-secondary px-4 py-1.5">
              <span className="h-2 w-2 rounded-full bg-primary animate-pulse-soft" />
              <span className="text-xs font-medium text-primary">New: Personalized AI Mentorship</span>
            </div>
            <h1 className="font-heading text-4xl font-bold leading-tight text-foreground sm:text-5xl lg:text-6xl">
              The AI Career Co-Pilot for an{" "}
              <span className="text-gradient">Uncertain World</span>
            </h1>
            <p className="mt-6 max-w-lg text-lg text-muted-foreground">
              Navigate career disruption and find your ideal growth path with AI-driven insights, personalized roadmaps, and real-time market coaching.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Button size="lg" asChild className="bg-cta-gradient px-8 text-base">
                <Link to="/assessment">Start Your Career Roadmap Discovery</Link>
              </Button>
              <Button size="lg" variant="outline" className="gap-2 text-base" asChild>
                <a href="#how-it-works">
                  <Play className="h-4 w-4" /> See How It Works
                </a>
              </Button>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="relative"
          >
            <img
              src={heroImg}
              alt="Career constellation visualization"
              className="w-full rounded-2xl shadow-elevated"
            />
          </motion.div>
        </div>
      </section>

      {/* Problem Section */}
      <section id="problem" className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0}>
            <p className="font-heading text-xs font-semibold uppercase tracking-widest text-primary">The Challenge</p>
            <h2 className="mt-2 font-heading text-3xl font-bold sm:text-4xl">The Modern Workforce is Changing</h2>
            <p className="mt-4 max-w-2xl text-muted-foreground">
              Traditional career paths are becoming obsolete. We help you stay ahead of the curve in a rapidly evolving economy.
            </p>
          </motion.div>

          <div className="mt-12 grid gap-6 sm:grid-cols-3">
            {[
              { icon: Zap, title: "AI Disruption", desc: "Understand exactly how automation and generative AI impact your specific industry and role before it happens." },
              { icon: HelpCircle, title: "Career Anxiety", desc: "Overcome the paralyzing uncertainty of what comes next with data-driven confidence and clear action plans." },
              { icon: BookX, title: "Wasted Learning", desc: "Stop collecting random certificates. Focus your upskilling on high-leverage skills that actually drive your future growth." },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                custom={i + 1}
                className="group rounded-2xl border border-border bg-card p-6 shadow-card transition-all hover:shadow-elevated"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-secondary text-primary">
                  <item.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 font-heading text-lg font-semibold">{item.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="bg-muted/30 px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl text-center">
          <p className="font-heading text-xs font-semibold uppercase tracking-widest text-primary">Our Process</p>
          <h2 className="mt-2 font-heading text-3xl font-bold sm:text-4xl">How Futurefly Propels You Forward</h2>

          <div className="mt-14 grid gap-8 sm:grid-cols-3">
            {[
              { icon: Search, step: 1, title: "Discovery & Assessment", desc: "Map your current skill set, experiences, and professional interests using our deep-learning assessment engine." },
              { icon: Cpu, step: 2, title: "AI-Powered Mapping", desc: "Our AI analyzes thousands of career trajectories to generate a personalized high-growth path tailored to you." },
              { icon: TrendingUp, step: 3, title: "Continuous Coaching", desc: "Receive real-time guidance as the market evolves. Your roadmap adapts automatically to new opportunities and threats." },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                custom={i + 1}
                className="flex flex-col items-center"
              >
                <div className="relative">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-secondary text-primary">
                    <item.icon className="h-7 w-7" />
                  </div>
                  <span className="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                    {item.step}
                  </span>
                </div>
                <h3 className="mt-5 font-heading text-lg font-semibold">{item.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{item.desc}</p>
              </motion.div>
            ))}
          </div>

          <div className="mx-auto mt-14 flex max-w-md items-center justify-center gap-4 rounded-full border border-border bg-card px-6 py-3 shadow-card">
            <div className="flex -space-x-2">
              {["AM", "SK", "JD"].map((initials) => (
                <div key={initials} className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-background bg-primary text-xs font-semibold text-primary-foreground">
                  {initials}
                </div>
              ))}
            </div>
            <p className="text-sm text-muted-foreground">
              Joined by <span className="font-semibold text-foreground">12,000+</span> professionals
            </p>
            <Button size="sm" variant="default" asChild>
              <Link to="/assessment">Join the Waitlist</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl overflow-hidden rounded-3xl bg-cta-gradient p-12 text-center sm:p-16">
          <h2 className="font-heading text-3xl font-bold text-primary-foreground sm:text-4xl">Ready to take flight?</h2>
          <p className="mx-auto mt-4 max-w-xl text-primary-foreground/80">
            Your future self will thank you. Get the clarity and direction you need in an increasingly complex professional landscape.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Button size="lg" variant="secondary" asChild>
              <Link to="/assessment">Get Started Free</Link>
            </Button>
            <Button size="lg" variant="ghost" className="text-primary-foreground hover:text-primary-foreground/80 hover:bg-primary-foreground/10" asChild>
              <Link to="#">Talk to a Career Strategist →</Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
