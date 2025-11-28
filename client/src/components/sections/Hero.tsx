import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { ArrowDown } from "lucide-react";
import isometricStructure from "@assets/generated_images/red_isometric_industrial_structure_on_light_grey_background.png";
import cardFront from "@assets/cardfront_1764303990780.png";
import cardBack from "@assets/cardback_1764303990780.png";
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

  // Business Card Tilt Logic
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const mouseX = useSpring(x, { stiffness: 500, damping: 50 });
  const mouseY = useSpring(y, { stiffness: 500, damping: 50 });

  const rotateX = useTransform(mouseY, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], ["-15deg", "15deg"]);
  
  // Dynamic lighting gradient based on tilt
  const brightness = useTransform(mouseY, [-0.5, 0.5], [1.1, 0.9]);
  const gradientX = useTransform(mouseX, [-0.5, 0.5], [0, 100]);
  const gradientY = useTransform(mouseY, [-0.5, 0.5], [0, 100]);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (rect) {
      const width = rect.width;
      const height = rect.height;
      const mouseXPos = e.clientX - rect.left;
      const mouseYPos = e.clientY - rect.top;
      
      const xPct = (mouseXPos / width) - 0.5;
      const yPct = (mouseYPos / height) - 0.5;
      
      x.set(xPct);
      y.set(yPct);
    }
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const handleScrollDown = () => {
    const element = document.getElementById('skills');
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section 
      id="hero" 
      ref={containerRef} 
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="min-h-[100dvh] flex flex-col justify-center relative overflow-hidden py-20 md:py-32 perspective-1000 bg-background"
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

      {/* 3D Business Card Asset */}
      <motion.div 
        className="absolute right-0 md:right-[10%] top-1/3 -translate-y-1/2 z-10 w-full md:w-[45%] h-[300px] md:h-[400px] flex items-center justify-center perspective-1000"
        style={{ 
          y: yBg,
          perspective: 1000 
        }}
      >
        <motion.div
          initial={{ rotateZ: 28 }}
          animate={{ rotateY: 360 }}
          transition={{ rotateY: { duration: 20, repeat: Infinity, ease: "linear" } }}
          style={{
            rotateX,
            transformStyle: "preserve-3d",
          }}
          className="relative w-[300px] md:w-[500px] aspect-[1.75/1] transition-all duration-200 ease-out"
        >
          {/* Front Face */}
          <div 
            className="absolute inset-0 w-full h-full backface-hidden rounded-[20px] overflow-hidden shadow-2xl"
            style={{ 
              backfaceVisibility: "hidden",
              WebkitBackfaceVisibility: "hidden",
              transform: "translateZ(1px)"
            }}
          >
             <img src={cardFront} alt="Business Card Front" className="w-full h-full object-cover" />
             {/* Lighting overlay */}
             <motion.div 
               className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/20 to-white/0 pointer-events-none mix-blend-overlay"
               style={{
                 backgroundPosition: `${gradientX}% ${gradientY}%`
               }}
             />
          </div>

          {/* Back Face */}
          <div 
            className="absolute inset-0 w-full h-full backface-hidden rounded-[20px] overflow-hidden shadow-2xl bg-[#111]"
            style={{ 
              backfaceVisibility: "hidden",
              WebkitBackfaceVisibility: "hidden",
              transform: "rotateY(180deg) translateZ(1px)"
            }}
          >
             <img src={cardBack} alt="Business Card Back" className="w-full h-full object-cover" />
             {/* Lighting overlay */}
             <motion.div 
               className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/10 to-white/0 pointer-events-none mix-blend-overlay"
             />
          </div>
          
          {/* Side/Thickness (Simulated) */}
          <div className="absolute inset-0 rounded-[20px] border border-white/10 pointer-events-none" style={{ transform: "translateZ(2px)" }} />

        </motion.div>
      </motion.div>

      <div className="relative z-20 w-full px-4 sm:px-6 md:px-12 h-full flex flex-col justify-center pointer-events-none">
        <motion.div style={{ y: yContent }} className="flex flex-col gap-8 pointer-events-auto max-w-2xl">
          
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
               <h1 className="text-[clamp(1.4rem,4.1vw,4.5rem)] font-display font-black leading-[0.85] tracking-tighter text-foreground break-words">
                 <TypewriterReveal text="ALEXANDER VAN" delay={200} speed={50} />
               </h1>
            </div>
            <div className="relative ml-2 md:ml-0 mt-[-0.1em] w-full">
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
        <button 
          onClick={handleScrollDown} 
          className="group flex items-center gap-4 bg-background/80 backdrop-blur-sm p-2 pr-4 rounded-full border border-foreground/10 hover:border-primary/50 transition-all shadow-lg hover:shadow-primary/20"
        >
          <div className="w-10 h-10 flex items-center justify-center rounded-full bg-foreground text-background group-hover:bg-primary group-hover:text-white transition-colors">
            <ArrowDown className="w-5 h-5" />
          </div>
          <div className="flex flex-col items-start">
             <span className="font-mono text-[10px] tracking-widest text-muted-foreground group-hover:text-primary transition-colors">SYSTEM_READY</span>
             <span className="font-bold text-xs tracking-widest text-foreground">SCROLL TO INITIATE</span>
          </div>
        </button>
      </motion.div>
    </section>
  );
}
