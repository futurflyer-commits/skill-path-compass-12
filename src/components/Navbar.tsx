import { Link, useLocation } from "react-router-dom";
import { Compass, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

const navLinks = [
  { label: "How It Works", href: "/#how-it-works" },
  { label: "Pricing", href: "#" },
  { label: "Resources", href: "#" },
];

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const isLanding = location.pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-border/40 bg-background/90 backdrop-blur-2xl shadow-sm"
          : "bg-background/60 backdrop-blur-xl"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
        <Link to="/" className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary shadow-sm">
            <Compass className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="font-heading text-xl font-bold text-primary-foreground drop-shadow-sm">Futurefly</span>
        </Link>

        {isLanding && (
          <div className="hidden items-center gap-10 md:flex">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="group relative text-sm font-medium text-primary-foreground/70 transition-colors duration-200 hover:text-primary-foreground"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 h-[2px] w-0 rounded-full bg-primary transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </div>
        )}

        <div className="hidden items-center gap-3 md:flex">
          <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground" asChild>
            <Link to="/dashboard">Log In</Link>
          </Button>
          <Button size="sm" className="bg-cta-gradient px-5 shadow-sm transition-all duration-200 hover:shadow-md hover:scale-[1.02]" asChild>
            <Link to="/assessment">Get Started</Link>
          </Button>
        </div>

        <button className="md:hidden" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {mobileOpen && (
        <div className="border-t border-border/40 bg-background/95 backdrop-blur-xl px-6 py-5 md:hidden">
          {isLanding &&
            navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="block py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </a>
            ))}
          <div className="mt-4 flex flex-col gap-2">
            <Button variant="ghost" size="sm" asChild>
              <Link to="/dashboard">Log In</Link>
            </Button>
            <Button size="sm" className="bg-cta-gradient" asChild>
              <Link to="/assessment">Get Started</Link>
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
