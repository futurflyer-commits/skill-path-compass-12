import { Link } from "react-router-dom";
import { Compass } from "lucide-react";

const Footer = () => (
  <footer className="border-t border-border/50 bg-muted/40 px-6 py-16 lg:px-8">
    <div className="mx-auto max-w-7xl">
      <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
        <div className="lg:pr-8">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary shadow-sm">
              <Compass className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="font-heading text-lg font-bold">Futurefly</span>
          </div>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
            The intelligent co-pilot for navigating the next generation of professional growth and success.
          </p>
        </div>
        {[
          { title: "PRODUCT", links: ["Features", "Roadmaps", "Pricing"] },
          { title: "COMPANY", links: ["About", "Careers", "Privacy"] },
          { title: "SOCIAL", links: ["LinkedIn", "Twitter", "Instagram"] },
        ].map((col) => (
          <div key={col.title}>
            <h4 className="font-heading text-xs font-bold tracking-[0.15em] text-foreground/70">{col.title}</h4>
            <ul className="mt-4 space-y-3">
              {col.links.map((l) => (
                <li key={l}>
                  <Link to="#" className="text-sm text-muted-foreground transition-colors duration-200 hover:text-foreground">
                    {l}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-border/50 pt-8 sm:flex-row">
        <p className="text-xs text-muted-foreground">© 2024 Futurefly AI. All rights reserved.</p>
        <div className="flex gap-8 text-xs text-muted-foreground">
          <Link to="#" className="transition-colors duration-200 hover:text-foreground">Terms of Service</Link>
          <Link to="#" className="transition-colors duration-200 hover:text-foreground">Privacy Policy</Link>
          <Link to="#" className="transition-colors duration-200 hover:text-foreground">Cookie Policy</Link>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
