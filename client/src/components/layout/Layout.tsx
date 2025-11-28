import { ReactNode, useEffect, useState } from "react";
import { useLocation } from "wouter";
import { cn } from "@/lib/utils";

interface LayoutProps {
  children: ReactNode;
}

import CustomCursor from "@/components/ui/custom-cursor";

import { motion, useScroll, useTransform } from "framer-motion";
import janonLogo from "@assets/janonlogo_1764302796958.png";

// Footer Component
function Footer() {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0.8, 1], [50, 0]);
  
  return (
    <motion.footer 
      className="border-t border-black/10 mt-20 md:mt-32 py-12 md:py-24 bg-background relative overflow-hidden"
      style={{ y }}
    >
      {/* Decorative grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.05)_1px,transparent_1px)] bg-[size:4rem_4rem]" />
      
      <div className="relative z-10 flex flex-col md:flex-row justify-between items-end gap-8 md:gap-12 px-4 sm:px-6 md:px-12 max-w-7xl mx-auto">
        <div className="space-y-4 w-full md:w-auto">
          <div className="flex items-center gap-2 mb-4 md:mb-6">
             <div className="w-2 h-2 bg-primary" />
             <span className="font-mono text-[10px] sm:text-xs tracking-widest text-muted-foreground">SYSTEM_END_OF_LINE</span>
          </div>
          <div className="w-64 h-16 opacity-80 hover:opacity-100 transition-opacity duration-500">
             <div 
               className="w-full h-full bg-foreground"
               style={{
                 maskImage: `url(${janonLogo})`,
                 maskSize: 'contain',
                 maskRepeat: 'no-repeat',
                 maskPosition: 'left center',
                 WebkitMaskImage: `url(${janonLogo})`,
                 WebkitMaskSize: 'contain',
                 WebkitMaskRepeat: 'no-repeat',
                 WebkitMaskPosition: 'left center',
               }}
             />
          </div>
          <p className="font-mono text-xs sm:text-sm text-muted-foreground max-w-md leading-relaxed border-l-2 border-primary pl-4 mt-4">
            Designing the interface between humanity and the machine.
            <br />© 2025. ALL RIGHTS RESERVED.
          </p>
        </div>
        
        <div className="flex flex-wrap gap-8 md:gap-12 text-[10px] sm:text-xs font-mono text-muted-foreground w-full md:w-auto">
          <div className="flex flex-col gap-3 md:gap-4">
             <span className="text-primary tracking-widest mb-1 md:mb-2 font-bold">SOCIAL</span>
             <a href="#" className="hover:text-foreground transition-colors hover:translate-x-1 transform duration-300">GITHUB</a>
             <a href="#" className="hover:text-foreground transition-colors hover:translate-x-1 transform duration-300">LINKEDIN</a>
             <a href="#" className="hover:text-foreground transition-colors hover:translate-x-1 transform duration-300">TWITTER</a>
          </div>
          <div className="flex flex-col gap-3 md:gap-4">
             <span className="text-primary tracking-widest mb-1 md:mb-2 font-bold">LEGAL</span>
             <a href="#" className="hover:text-foreground transition-colors hover:translate-x-1 transform duration-300">PRIVACY</a>
             <a href="#" className="hover:text-foreground transition-colors hover:translate-x-1 transform duration-300">TERMS</a>
          </div>
        </div>
      </div>
    </motion.footer>
  );
}

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
    const coordsRef = document.getElementById('coords-display');
    
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const sections = navItems.map(item => item.href.substring(1));
      const scrollPosition = scrollY + window.innerHeight / 3; // Trigger point

      // Calculate dynamic coordinate directly
      const scrollPercentage = Math.min(1, scrollY / (document.body.scrollHeight - window.innerHeight));
      const baseCoord = 45.912;
      const dynamicCoord = (baseCoord + (scrollPercentage * 10)).toFixed(3);
      
      // Direct DOM update for performance (bypass React render cycle)
      if (coordsRef) {
        coordsRef.innerText = `${dynamicCoord}, -12.004`;
      }

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
    <div className="min-h-screen w-full bg-background text-foreground relative overflow-x-hidden font-sans selection:bg-primary selection:text-white cursor-none">
      <CustomCursor />
      {/* Removed Dark Overlays (Scanlines/Noise) for Clean Look */}
      
      {/* Fixed HUD Elements */}
      <header className="fixed top-0 left-0 w-full z-[60] px-4 sm:px-6 py-3 sm:py-4 flex justify-between items-center bg-background/90 backdrop-blur-md border-b border-black/5 shadow-sm overflow-hidden">
        
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-green-500 animate-pulse rounded-full ml-2 shadow-[0_0_8px_rgba(34,197,94,0.8)]" />
          <span className="font-mono text-[10px] sm:text-xs tracking-widest text-foreground font-bold">SYS.ONLINE</span>
        </div>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-8">
          {navItems.map((item) => (
            <a 
              key={item.label} 
              href={item.href}
              onClick={(e) => scrollToSection(e, item.href)}
              className={cn(
                "text-xs font-mono tracking-[0.2em] transition-all duration-300 relative group py-2 font-bold",
                activeSection === item.href ? "text-primary" : "text-muted-foreground hover:text-foreground"
              )}
            >
              {item.label}
              <span className={cn(
                "absolute -bottom-1 left-0 h-[2px] bg-primary transition-all duration-300",
                activeSection === item.href ? "w-full" : "w-0 group-hover:w-1/2"
              )} />
            </a>
          ))}
        </nav>

        {/* Mobile Navigation (Compact) */}
        <nav className="flex md:hidden gap-4">
           {navItems.slice(0, 3).map((item) => ( 
            <a 
              key={item.label}
              href={item.href}
              onClick={(e) => scrollToSection(e, item.href)}
              className={cn(
                "text-[9px] font-mono tracking-widest transition-colors font-bold",
                activeSection === item.href ? "text-primary" : "text-muted-foreground"
              )}
            >
              {item.label === "PROJECTS" ? "WORK" : item.label}
            </a>
           ))}
           <a href="#contact" onClick={(e) => scrollToSection(e, "#contact")} className="text-[9px] font-mono tracking-widest text-primary font-bold">
             CONTACT
           </a>
        </nav>

        <div className="font-mono text-[9px] sm:text-xs text-muted-foreground hidden sm:flex items-center gap-2">
          <span className="w-2 h-2 border border-black/20 rounded-full block" />
          v3.0.0
        </div>
      </header>

      {/* Consolidated Side HUD - Navigation Dots + Coordinates */}
      <div className="fixed right-8 top-1/2 -translate-y-1/2 hidden lg:flex items-center gap-4 z-40">
        {/* Coordinates Section */}
        <div className="flex flex-col items-end gap-2 font-mono text-[10px] text-muted-foreground pointer-events-none select-none text-right border-r border-black/10 pr-4 mr-2 relative h-40 justify-center">
           <div className="absolute right-0 top-0 w-[2px] h-full bg-gradient-to-b from-transparent via-primary/20 to-transparent" />
           
           <motion.div 
             className="flex flex-col gap-1"
             animate={{ opacity: [0.5, 1, 0.5] }}
             transition={{ duration: 4, repeat: Infinity }}
           >
              <span className="text-primary tracking-widest font-bold">COORDS</span>
              <span id="coords-display" className="text-foreground">45.912, -12.004</span>
           </motion.div>

           <div className="h-8" />

           <div className="flex flex-col gap-1">
              <span className="text-primary tracking-widest font-bold">SECTOR</span>
              <span className="text-foreground">{activeSection ? activeSection.replace('#', '').toUpperCase().substring(0, 2) : '7G'}</span>
           </div>
        </div>

        {/* Navigation Dots */}
        <div className="flex flex-col gap-4 items-end relative">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={(e) => scrollToSection(e, item.href)}
              className="group flex items-center gap-3"
            >
              <span className={cn(
                "font-mono text-[10px] transition-all duration-300 opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 font-bold",
                activeSection === item.href ? "text-primary opacity-100 translate-x-0" : "text-muted-foreground"
              )}>
                {item.label}
              </span>
              <div className={cn(
                "w-2 h-2 transition-all duration-300 border border-primary rotate-45 group-hover:bg-primary/50",
                activeSection === item.href ? "bg-primary scale-125 shadow-lg shadow-primary/30" : "bg-transparent"
              )} />
            </a>
          ))}
          
          {/* Connecting Line */}
          <div className="absolute right-[3px] top-0 bottom-0 w-[1px] bg-black/5 -z-10" />
        </div>
      </div>

      <main className="pt-20 pb-20 relative z-10">
        {children}
      </main>

      <Footer />
    </div>
  );
}
