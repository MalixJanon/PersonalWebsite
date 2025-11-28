import { ReactNode, useEffect, useState } from "react";
import { useLocation } from "wouter";
import { cn } from "@/lib/utils";

interface LayoutProps {
  children: ReactNode;
}

import CustomCursor from "@/components/ui/custom-cursor";

export default function Layout({ children }: LayoutProps) {
  const [location] = useLocation();
  const [activeSection, setActiveSection] = useState("");

  const navItems = [
    { href: "#hero", label: "HOME" },
    { href: "#skills", label: "SKILLS" },
    { href: "#work", label: "PROJECTS" },
    { href: "#audio", label: "MUSIC" },
    { href: "#contact", label: "CONTACT" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map(item => item.href.substring(1));
      const scrollPosition = window.scrollY + window.innerHeight / 3; // Trigger point

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(`#${section}`);
            break; // Found the active section
          }
        }
      }
      // Special case for top
      if (window.scrollY < 100) setActiveSection("#hero");
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial check
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    if (href === "/") {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen w-full bg-background text-foreground relative overflow-x-hidden font-sans selection:bg-primary selection:text-black cursor-none">
      <CustomCursor />
      {/* Global Overlays */}
      <div className="fixed inset-0 z-50 pointer-events-none scanlines opacity-30 mix-blend-overlay" />
      <div className="fixed inset-0 z-40 pointer-events-none bg-[url('/noise.png')] opacity-[0.03] mix-blend-overlay" />
      
      {/* Fixed HUD Elements */}
      <header className="fixed top-0 left-0 w-full z-40 px-6 py-4 flex justify-between items-center bg-background/90 backdrop-blur-md border-b border-white/5 shadow-2xl shadow-black/50">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-primary animate-pulse" />
          <span className="font-mono text-xs tracking-widest text-primary font-bold">SYS.ONLINE</span>
        </div>
        
        <nav className="hidden md:flex gap-8">
          {navItems.map((item) => (
            <a 
              key={item.label} 
              href={item.href}
              onClick={(e) => scrollToSection(e, item.href)}
              className={cn(
                "text-xs font-mono tracking-[0.2em] transition-all duration-300 relative group py-2",
                activeSection === item.href ? "text-primary scale-105 font-bold" : "text-muted-foreground hover:text-foreground"
              )}
            >
              {item.label}
              <span className={cn(
                "absolute -bottom-1 left-0 h-[1px] bg-primary transition-all duration-300",
                activeSection === item.href ? "w-full" : "w-0 group-hover:w-1/2"
              )} />
            </a>
          ))}
        </nav>

        <div className="font-mono text-xs text-muted-foreground flex items-center gap-2">
          <span className="w-2 h-2 border border-muted-foreground/50 rounded-full block" />
          v2.0.45
        </div>
      </header>

      {/* Side HUD elements - Navigation Dots */}
      <div className="fixed right-8 top-1/2 -translate-y-1/2 hidden lg:flex flex-col gap-4 z-40 items-end">
        {navItems.map((item) => (
          <a
            key={item.label}
            href={item.href}
            onClick={(e) => scrollToSection(e, item.href)}
            className="group flex items-center gap-3"
          >
            <span className={cn(
              "font-mono text-[10px] transition-all duration-300 opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0",
              activeSection === item.href ? "text-primary opacity-100 translate-x-0" : "text-muted-foreground"
            )}>
              {item.label}
            </span>
            <div className={cn(
              "w-2 h-2 transition-all duration-300 border border-primary rotate-45 group-hover:bg-primary/50",
              activeSection === item.href ? "bg-primary scale-125" : "bg-transparent"
            )} />
          </a>
        ))}
        
        {/* Connecting Line */}
        <div className="absolute right-[3px] top-0 bottom-0 w-[1px] bg-white/5 -z-10" />
      </div>

      {/* Left Side HUD - Technical Details */}
      <div className="fixed left-6 top-1/2 -translate-y-1/2 hidden lg:flex flex-col gap-12 z-40 text-[10px] font-mono text-muted-foreground/30 pointer-events-none select-none">
         <div className="writing-vertical-rl rotate-180 tracking-widest flex items-center gap-4">
            <span className="text-primary/50">COORDS: 45.912, -12.004</span>
            <div className="h-12 w-[1px] bg-primary/20" />
         </div>
         <div className="h-24 w-[1px] bg-border mx-auto relative">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3 h-[1px] bg-primary/50" />
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3 h-[1px] bg-primary/50" />
         </div>
         <div className="writing-vertical-rl rotate-180 tracking-widest">SECTOR 7G</div>
      </div>

      <main className="pt-20 pb-20 px-6 md:px-12 max-w-7xl mx-auto relative z-10">
        {children}
      </main>

      <footer className="border-t border-white/5 mt-20 py-12 bg-black/20 backdrop-blur-sm">
        <div className="flex flex-col md:flex-row justify-between items-end gap-8 px-6 md:px-12 max-w-7xl mx-auto">
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
