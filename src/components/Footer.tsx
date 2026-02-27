import { Link } from "react-router-dom";
import { Compass } from "lucide-react";

const Footer = () => (
  <footer className="border-t border-border bg-muted/30 px-4 py-12 sm:px-6 lg:px-8">
    <div className="mx-auto max-w-7xl">
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <Compass className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="font-heading text-lg font-bold">Futurefly</span>
          </div>
          <p className="mt-3 text-sm text-muted-foreground">
            The intelligent co-pilot for navigating the next generation of professional growth and success.
          </p>
        </div>
        {[
          { title: "PRODUCT", links: ["Features", "Roadmaps", "Pricing"] },
          { title: "COMPANY", links: ["About", "Careers", "Privacy"] },
          { title: "SOCIAL", links: ["LinkedIn", "Twitter", "Instagram"] },
        ].map((col) => (
          <div key={col.title}>
            <h4 className="font-heading text-xs font-semibold tracking-widest text-muted-foreground">{col.title}</h4>
            <ul className="mt-3 space-y-2">
              {col.links.map((l) => (
                <li key={l}>
                  <Link to="#" className="text-sm text-foreground/70 transition-colors hover:text-foreground">
                    {l}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-border pt-6 sm:flex-row">
        <p className="text-xs text-muted-foreground">© 2024 Futurefly AI. All rights reserved.</p>
        <div className="flex gap-6 text-xs text-muted-foreground">
          <Link to="#" className="hover:text-foreground">Terms of Service</Link>
          <Link to="#" className="hover:text-foreground">Privacy Policy</Link>
          <Link to="#" className="hover:text-foreground">Cookie Policy</Link>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
