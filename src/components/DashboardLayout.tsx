import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard, GitBranch, Network, Target, Route, BookOpen, Award, Settings,
  Search, Bell, MessageSquare, Compass
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const sidebarLinks = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard" },
  { icon: GitBranch, label: "Career Path", href: "/path-simulator" },
  { icon: Network, label: "Skill Graph", href: "/skill-graph" },
  { icon: Target, label: "Role Matches", href: "/roles" },
  { icon: Route, label: "Path Simulator", href: "/path-simulator" },
  { icon: BookOpen, label: "Learning Plan", href: "/learning" },
  { icon: Award, label: "Persona Badge", href: "/persona-badge" },
  { icon: Settings, label: "Settings", href: "#" },
];

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();

  return (
    <div className="flex min-h-screen bg-muted/20">
      {/* Sidebar */}
      <aside className="sticky top-0 hidden h-screen w-64 flex-col border-r border-border bg-background p-4 lg:flex">
        <Link to="/" className="mb-8 flex items-center gap-2 px-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
            <Compass className="h-5 w-5 text-primary-foreground" />
          </div>
          <div>
            <span className="font-heading text-lg font-bold">Futurefly</span>
            <p className="text-xs text-muted-foreground">AI Career Co-Pilot</p>
          </div>
        </Link>

        <nav className="flex-1 space-y-1">
          {sidebarLinks.map((link) => {
            const isActive = location.pathname === link.href;
            return (
              <Link
                key={link.label}
                to={link.href}
                className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-secondary text-primary"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                <link.icon className="h-4 w-4" />
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="rounded-xl bg-secondary p-4">
          <p className="font-heading text-xs font-semibold text-primary">PRO PLAN</p>
          <p className="mt-1 text-xs text-muted-foreground">Get AI resume scoring and priority job matching.</p>
          <button className="mt-3 w-full rounded-lg bg-primary py-2 text-xs font-semibold text-primary-foreground">
            Upgrade Now
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1">
        <header className="sticky top-0 z-40 flex items-center justify-between border-b border-border bg-background/80 px-6 py-3 backdrop-blur-xl">
          <div className="relative w-80">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Search roles, skills, or trends..." className="pl-10" />
          </div>
          <div className="flex items-center gap-4">
            <button className="text-muted-foreground hover:text-foreground"><Bell className="h-5 w-5" /></button>
            <button className="text-muted-foreground hover:text-foreground"><MessageSquare className="h-5 w-5" /></button>
            <div className="flex items-center gap-2">
              <div className="text-right">
                <p className="text-sm font-medium">Alex Morgan</p>
                <p className="text-xs text-muted-foreground">Sr. Product Designer</p>
              </div>
              <Avatar className="h-9 w-9">
                <AvatarFallback className="bg-primary text-primary-foreground text-sm">AM</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </header>
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
};

export default DashboardLayout;
