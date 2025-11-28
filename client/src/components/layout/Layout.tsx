import { ReactNode } from "react";
import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [location] = useLocation();

  const navItems = [
    { href: "/", label: "NEXUS" },
    { href: "#skills", label: "CAPABILITIES" },
    { href: "#work", label: "OPERATIONS" },
    { href: "#audio", label: "AUDIO_LOGS" },
  ];

  return (
    <div className="min-h-screen w-full bg-background text-foreground relative overflow-x-hidden font-sans selection:bg-primary selection:text-black">
      {/* Global Overlays */}
      <div className="fixed inset-0 z-50 pointer-events-none scanlines opacity-30 mix-blend-overlay" />
      <div className="fixed inset-0 z-40 pointer-events-none bg-[url('/noise.png')] opacity-[0.03] mix-blend-overlay" />
      
      {/* Fixed HUD Elements */}
      <header className="fixed top-0 left-0 w-full z-40 px-6 py-4 flex justify-between items-center bg-background/80 backdrop-blur-sm border-b border-white/5">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-primary animate-pulse" />
          <span className="font-mono text-xs tracking-widest text-muted-foreground">SYS.ONLINE</span>
        </div>
        
        <nav className="hidden md:flex gap-8">
          {navItems.map((item) => (
            <a 
              key={item.label} 
              href={item.href}
              className={cn(
                "text-xs font-mono tracking-[0.2em] hover:text-primary transition-colors relative group",
                location === item.href ? "text-primary" : "text-muted-foreground"
              )}
            >
              {item.label}
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-primary transition-all group-hover:w-full" />
            </a>
          ))}
        </nav>

        <div className="font-mono text-xs text-muted-foreground">
          v2.0.45
        </div>
      </header>

      {/* Side HUD elements */}
      <div className="fixed left-6 top-1/2 -translate-y-1/2 hidden lg:flex flex-col gap-4 z-40 text-[10px] font-mono text-muted-foreground/50">
         <div className="writing-vertical-rl rotate-180 tracking-widest">COORDS: 45.912, -12.004</div>
         <div className="h-24 w-[1px] bg-border mx-auto" />
         <div className="writing-vertical-rl rotate-180 tracking-widest">SECTOR 7G</div>
      </div>

      <div className="fixed right-6 top-1/2 -translate-y-1/2 hidden lg:flex flex-col gap-2 z-40">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="w-1 h-1 bg-primary/20 rounded-full" />
        ))}
        <div className="w-1 h-8 bg-primary rounded-full mt-2" />
      </div>

      <main className="pt-20 pb-20 px-6 md:px-12 max-w-7xl mx-auto relative z-10">
        {children}
      </main>

      <footer className="border-t border-white/5 mt-20 py-12">
        <div className="flex flex-col md:flex-row justify-between items-end gap-8">
          <div>
            <h2 className="text-4xl font-display font-bold text-transparent text-stroke opacity-20 hover:opacity-100 transition-opacity cursor-default">
              NEXUS
            </h2>
            <p className="font-mono text-xs text-muted-foreground mt-2 max-w-xs">
              Designing the interface between humanity and the machine.
            </p>
          </div>
          
          <div className="flex gap-8 text-xs font-mono text-muted-foreground">
            <a href="#" className="hover:text-primary transition-colors">GITHUB</a>
            <a href="#" className="hover:text-primary transition-colors">LINKEDIN</a>
            <a href="#" className="hover:text-primary transition-colors">TWITTER</a>
            <a href="#" className="hover:text-primary transition-colors">MAIL</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
