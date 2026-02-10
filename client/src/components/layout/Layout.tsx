import { ReactNode, useEffect, useState, useRef } from "react";
import { useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { motion } from "framer-motion";
import chromeLogo from "@assets/ChromeJIcon_1764303870326.webp";
import { Footer } from "@/components/layout/Footer";

interface LayoutProps {
  children: ReactNode;
}

const NAV_ITEMS = [
  { href: "#hero", label: "HOME" },
  { href: "#skills", label: "SKILLS" },
  { href: "#portfolio", label: "PORTFOLIO" },
  { href: "#audio", label: "MUSIC" },
  { href: "#contact", label: "CONTACT" },
];

const NAV_ITEMS_NO_PROJECTS = NAV_ITEMS.filter(
  (item) => item.href !== "#work" && item.label !== "PROJECTS"
);

export default function Layout({ children }: LayoutProps) {
  const [location] = useLocation();
  const [activeSection, setActiveSection] = useState("");
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [isCloseHovering, setIsCloseHovering] = useState(false);

  useEffect(() => {
    const coordsRef = document.getElementById('coords-display');
    const scrollElement = (document.scrollingElement || document.documentElement) as HTMLElement;
    const scrollTargets: Array<Window | HTMLElement> = [window, scrollElement, document.body];
    const uniqueTargets = Array.from(new Set(scrollTargets));
    
    const handleScroll = () => {
      const scrollTop = Math.max(
        scrollElement.scrollTop,
        document.documentElement.scrollTop,
        document.body.scrollTop
      );
      const scrollHeight = Math.max(
        scrollElement.scrollHeight,
        document.documentElement.scrollHeight,
        document.body.scrollHeight
      );
      const scrollY = scrollTop;
      const scrollPosition = scrollY + window.innerHeight / 3; // Trigger point at 1/3 of viewport

      // Calculate dynamic coordinate directly
      const scrollRange = Math.max(1, scrollHeight - window.innerHeight);
      const scrollPercentage = Math.min(1, scrollY / scrollRange);
      const baseCoord = 45.912;
      const dynamicCoord = (baseCoord + (scrollPercentage * 10)).toFixed(3);
      
      // Direct DOM update for performance (bypass React render cycle)
      if (coordsRef) {
        coordsRef.innerText = `${dynamicCoord}, -12.004`;
      }

      // Check active section - iterate through nav items and find the active one
      let foundActive = false;
      for (const item of NAV_ITEMS_NO_PROJECTS) {
        const sectionId = item.href.substring(1);
        const element = document.getElementById(sectionId);
        
        if (element) {
          const { offsetTop, offsetHeight } = element;
          const sectionBottom = offsetTop + offsetHeight;
          
          // Check if the trigger point is within this section
          if (scrollPosition >= offsetTop && scrollPosition < sectionBottom) {
            setActiveSection(item.href);
            foundActive = true;
            break;
          }
        }
      }
      
      // If no section found (e.g., at the very top), set to hero
      if (!foundActive && scrollY < 100) {
        setActiveSection("#hero");
      }
    };

    uniqueTargets.forEach((target) => {
      target.addEventListener("scroll", handleScroll, { passive: true } as AddEventListenerOptions);
    });
    handleScroll(); // Initial check
    return () => {
      uniqueTargets.forEach((target) => {
        target.removeEventListener("scroll", handleScroll);
      });
    };
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
    <div className="w-screen overflow-x-hidden overflow-y-visible flex flex-col bg-background text-foreground relative font-sans selection:bg-primary selection:text-white cursor-none">
      
      {/* Fixed HUD Elements */}
      <header className="fixed top-0 left-0 w-full z-[30] px-4 sm:px-6 py-3 sm:py-4 grid grid-cols-3 items-center bg-background/20 backdrop-blur-md border-b border-white/5 shadow-sm">
        
        {/* Left: SYS.ONLINE */}
        <div className="flex items-center gap-2 justify-start">
            <div className="w-2 h-2 bg-green-500 animate-pulse rounded-full shadow-[0_0_8px_rgba(34,197,94,0.8)]" />
            <span className="font-mono text-[10px] sm:text-xs tracking-widest text-foreground font-bold">SYS.ONLINE</span>
        </div>
        
        {/* Center: Logo Section */}
        <div className="flex items-center justify-center h-full">
          <div className="w-12 h-12 sm:w-14 sm:h-14 opacity-90 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center overflow-visible">
             <img 
               src={chromeLogo}
               alt="Logo"
               className="w-full h-full object-contain scale-200"
             />
          </div>
        </div>
        
        {/* Right: Empty placeholder to maintain grid layout */}
        <div className="flex justify-end">
             <div className="w-10 h-10" /> 
        </div>
      </header>

      {/* Close Button Overlay - Visible only when menu is open */}
      {isSheetOpen && (
        <button
          onClick={() => setIsSheetOpen(false)}
          onMouseEnter={() => setIsCloseHovering(true)}
          onMouseLeave={() => setIsCloseHovering(false)}
          className="fixed w-16 h-16 rounded-sm pointer-events-auto z-[101] transition-colors"
          style={{
            top: 'calc(0.75rem - 8px)',
            right: 'calc(1rem - 8px)',
          }}
          aria-label="Close menu"
          data-testid="button-close-menu"
        />
      )}

      {/* Hamburger Menu */}
      <div className="fixed top-3 right-4 sm:top-4 sm:right-6 z-[100] portfolio-menu-toggle">
        <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
            <SheetTrigger asChild>
                <motion.button 
                  className="group p-2 hover:bg-white/10 transition-colors rounded-sm border border-transparent hover:border-white/10 relative"
                  whileTap={{ scale: 0.95 }}
                >
                    <motion.div
                        initial={false}
                        animate={{ rotate: isSheetOpen ? 90 : 0 }}
                        transition={{ duration: 0.2 }}
                    >
                        {isSheetOpen ? (
                            <X className={`w-10 h-10 transition-colors ${isCloseHovering ? 'text-primary' : 'text-foreground group-hover:text-primary'}`} />
                        ) : (
                            <Menu className="w-10 h-10 text-foreground group-hover:text-primary transition-colors" />
                        )}
                    </motion.div>
                </motion.button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px] bg-background/95 backdrop-blur-xl border-l border-white/10 !z-[40] pt-20">
                <SheetHeader className="mb-8 text-left">
                    <SheetTitle className="font-display text-2xl font-bold tracking-tighter">NAVIGATION</SheetTitle>
                    <SheetDescription className="font-mono text-xs tracking-widest text-primary font-bold">
                        // SYSTEM_ACCESS
                    </SheetDescription>
                </SheetHeader>
                
                <nav className="flex flex-col gap-6">
                    {NAV_ITEMS_NO_PROJECTS.map((item) => (
                        <a 
                            key={item.label} 
                            href={item.href}
                            onClick={(e) => {
                                scrollToSection(e, item.href);
                                setIsSheetOpen(false);
                            }}
                            className={cn(
                                "text-xl font-display font-bold tracking-tight transition-all duration-300 flex items-center gap-4 group",
                                activeSection === item.href ? "text-primary" : "text-muted-foreground hover:text-foreground"
                            )}
                        >
                            <span className={cn(
                                "w-2 h-2 bg-primary rotate-45 opacity-0 group-hover:opacity-100 transition-opacity",
                                activeSection === item.href ? "opacity-100" : ""
                            )} />
                            {item.label}
                        </a>
                    ))}
                </nav>

                <div className="absolute bottom-8 left-6 right-6">
                    <div className="flex items-center gap-2 mb-4">
                        <div className="w-2 h-2 bg-green-500 animate-pulse rounded-full shadow-[0_0_8px_rgba(34,197,94,0.8)]" />
                        <span className="font-mono text-[10px] tracking-widest text-foreground font-bold">SYS.ONLINE</span>
                    </div>
                    <div className="font-mono text-[10px] text-muted-foreground">
                        v3.0.0 // DEV_MODE
                    </div>
                </div>
            </SheetContent>
        </Sheet>
      </div>

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

        {/* Navigation Dots Section */}
        <div className="flex flex-col gap-4 items-end relative">
          {NAV_ITEMS.map((item) => (
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

      <main className="relative z-10 pt-16">
        {children}
      </main>

      <Footer />
    </div>
  );
}
