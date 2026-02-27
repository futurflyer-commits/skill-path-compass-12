import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Assessment from "./pages/Assessment";
import PersonaReveal from "./pages/PersonaReveal";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import SkillGraph from "./pages/SkillGraph";
import Roles from "./pages/Roles";
import PathSimulator from "./pages/PathSimulator";
import Learning from "./pages/Learning";
import PersonaBadge from "./pages/PersonaBadge";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/assessment" element={<Assessment />} />
          <Route path="/persona-reveal" element={<PersonaReveal />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/skill-graph" element={<SkillGraph />} />
          <Route path="/roles" element={<Roles />} />
          <Route path="/path-simulator" element={<PathSimulator />} />
          <Route path="/learning" element={<Learning />} />
          <Route path="/persona-badge" element={<PersonaBadge />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
