import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown } from "lucide-react";
import isometricStructure from "@assets/generated_images/red_isometric_industrial_structure_on_light_grey_background.png";
import Particles from "@/components/ui/particles";

interface TypewriterRevealProps {
  text: string;
  className?: string;
  delay?: number;
  speed?: number;
}

const TypewriterReveal = ({ text, className, delay = 0, speed = 100 }: TypewriterRevealProps) => {
  const [displayedText, setDisplayedText] = useState("");
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    const startTimeout = setTimeout(() => {
      let currentIndex = 0;
      const interval = setInterval(() => {
        if (currentIndex < text.length) {
          setDisplayedText(text.slice(0, currentIndex + 1));
          currentIndex++;
        } else {
          clearInterval(interval);
          setIsComplete(true);
        }
      }, speed);

      return () => clearInterval(interval);
    }, delay);

    return () => clearTimeout(startTimeout);
  }, [text, delay, speed]);

  return (
    <span className={`relative inline-block ${className}`}>
      <span className="opacity-0 select-none pointer-events-none">{text}</span>
      <span className="absolute top-0 left-0">
        {displayedText}
        {!isComplete && (
          <span className="animate-pulse text-primary inline-block ml-1 w-3 h-[1em] align-middle bg-primary"></span>
        )}
      </span>
    </span>
  );
};

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  
  // Standard Parallax
  const yContent = useTransform(scrollY, [0, 1000], [0, -100]); 
  const yBg = useTransform(scrollY, [0, 1000], [0, 100]); 

  const handleScrollDown = () => {
    const element = document.getElementById('skills');
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section 
      id="hero" 
      ref={containerRef} 
      className="min-h-[100dvh] flex flex-col justify-center relative overflow-hidden pt-20 perspective-1000 bg-background"
    >
      {/* Technical Background Grid */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
         <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(to_right,rgba(0,0,0,0.1)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.1)_1px,transparent_1px)] bg-[size:40px_40px]" />
         {/* Crosshairs */}
         <div className="absolute top-1/4 left-1/4 w-4 h-4 border-l border-t border-foreground" />
         <div className="absolute top-1/4 right-1/4 w-4 h-4 border-r border-t border-foreground" />
         <div className="absolute bottom-1/4 left-1/4 w-4 h-4 border-l border-b border-foreground" />
         <div className="absolute bottom-1/4 right-1/4 w-4 h-4 border-r border-b border-foreground" />
      </div>

      {/* Main 3D Asset */}
      <motion.div className="absolute right-0 md:right-[-5%] top-1/2 -translate-y-1/2 z-0 w-full md:w-[55%] opacity-90 mix-blend-multiply" style={{ y: yBg }}>
        <img src={isometricStructure} alt="Industrial Structure" className="w-full h-auto object-contain scale-100 md:scale-110" />
      </motion.div>

      <div className="relative z-20 w-full px-4 sm:px-6 md:px-12 h-full flex flex-col justify-center">
        <motion.div style={{ y: yContent }} className="flex flex-col gap-8">
          
          {/* Top Technical Text */}
          <div className="flex items-center gap-4 font-mono text-[10px] md:text-xs tracking-widest text-muted-foreground">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-primary" />
              <span>FIG. 01 // SYSTEM_OVERRIDE</span>
            </div>
            <div className="h-px w-12 bg-black/20" />
            <span>EPSILON_CLASS</span>
          </div>

          {/* Main Typography - Aligned to Left */}
          <div className="relative z-10 w-full">
            <div className="relative w-full">
               <h1 className="text-[clamp(1.4rem,5.1vw,5.5rem)] font-display font-black leading-[0.85] tracking-tighter text-foreground break-words">
                 <TypewriterReveal text="ALEXANDER VAN" delay={200} speed={50} />
               </h1>
            </div>
            <div className="relative ml-2 md:ml-4 mt-[-0.1em] w-full">
               <h1 className="text-[clamp(1.5rem,5.5vw,6rem)] font-display font-black leading-[0.85] tracking-tighter text-foreground opacity-20 absolute top-2 left-2 select-none blur-sm break-words">
                 <TypewriterReveal text="STRALENDORFF" delay={1000} speed={50} />
               </h1>
               <h1 className="text-[clamp(1.5rem,5.5vw,6rem)] font-display font-black leading-[0.85] tracking-tighter text-primary mix-blend-multiply break-words">
                  <TypewriterReveal text="STRALENDORFF" delay={1000} speed={50} />
               </h1>
            </div>
          </div>

          {/* Description & Specimen Data */}
          <div className="flex flex-col md:flex-row gap-12 mt-8 max-w-3xl">
            <div className="flex-1 border-l-2 border-primary pl-6 py-2 bg-white/30 backdrop-blur-sm">
              <p className="font-mono text-sm md:text-base leading-relaxed text-foreground/80 font-bold">
                Forging immersive interfaces at the intersection of design and machine logic.
                Specializing in high-fidelity industrial systems.
              </p>
            </div>
            
            <div className="flex-1 hidden md:block font-mono text-[10px] text-muted-foreground opacity-70">
              <div className="grid grid-cols-2 gap-4">
                 <div>
                   <span className="block mb-1 font-bold text-primary">SPEED</span>
                   <div className="w-full h-1 bg-black/10"><div className="w-[80%] h-full bg-black" /></div>
                 </div>
                 <div>
                   <span className="block mb-1 font-bold text-primary">PRECISION</span>
                   <div className="w-full h-1 bg-black/10"><div className="w-[95%] h-full bg-black" /></div>
                 </div>
                 <div className="col-span-2">
                   <span className="block mb-1 font-bold text-primary">SYSTEM_STATUS</span>
                   <span className="text-foreground font-bold tracking-widest">OPTIMAL // 98.4%</span>
                 </div>
              </div>
            </div>
          </div>

        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        className="absolute bottom-8 left-8 z-30"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <button onClick={handleScrollDown} className="group flex items-center gap-4">
          <div className="w-8 h-8 flex items-center justify-center border border-foreground/20 group-hover:border-primary transition-colors bg-white">
            <ArrowDown className="w-4 h-4 text-foreground" />
          </div>
          <span className="font-mono text-[10px] tracking-widest font-bold group-hover:text-primary transition-colors">SCROLL_TO_INITIATE</span>
        </button>
      </motion.div>
    </section>
  );
}
