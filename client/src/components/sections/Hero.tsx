import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown } from "lucide-react";
import planetTexture from "@assets/generated_images/planet_with_flight_trajectory.png";
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
      {/* Invisible full text to reserve layout space */}
      <span className="opacity-0 select-none pointer-events-none">{text}</span>
      
      {/* Visible typing text overlay */}
      <span className="absolute top-0 left-0">
        {displayedText}
        {!isComplete && (
          <span className="animate-pulse text-primary inline-block ml-1 w-2 h-[1em] align-middle bg-primary/0 border-b-4 border-primary"></span>
        )}
      </span>
    </span>
  );
};

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  
  // Unified Parallax Direction (Text Moves UP)
  const yIdentity = useTransform(scrollY, [0, 1000], [0, -150]); 
  const yTitle = useTransform(scrollY, [0, 1000], [0, -350]); 
  const yDesc = useTransform(scrollY, [0, 1000], [0, -200]);
  const yStatus = useTransform(scrollY, [0, 1000], [0, -100]);

  // Opposing Parallax (Background Moves DOWN)
  const yBg = useTransform(scrollY, [0, 1000], [0, 200]); 

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const { clientX, clientY } = e;
      // Calculate localized mouse position (-1 to 1)
      const x = (clientX / window.innerWidth) * 2 - 1;
      const y = (clientY / window.innerHeight) * 2 - 1;
      
      containerRef.current.style.setProperty("--mouse-x", `${x}`);
      containerRef.current.style.setProperty("--mouse-y", `${y}`);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const handleScrollDown = () => {
    const element = document.getElementById('skills');
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section 
      id="hero" 
      ref={containerRef} 
      className="min-h-screen flex flex-col justify-center relative overflow-hidden -mt-20 pt-20 perspective-1000"
    >
      {/* Background Layers */}
      <motion.div className="absolute inset-0 z-0" style={{ y: yBg }}>
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-60 scale-110"
          style={{
            backgroundImage: `url(${planetTexture})`,
            transform: 'translate(calc(var(--mouse-x, 0) * -15px), calc(var(--mouse-y, 0) * -15px))',
            transition: 'transform 0.2s cubic-bezier(0.2, 0.8, 0.2, 1)'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/20 via-background/60 to-background" />
        <Particles className="absolute inset-0 opacity-50" />
      </motion.div>

      {/* Technical Grid Overlay */}
      <div className="absolute inset-0 pointer-events-none z-0 opacity-10">
         <div className="absolute top-[33%] left-0 w-full h-px bg-white" />
         <div className="absolute top-[66%] left-0 w-full h-px bg-white" />
         <div className="absolute left-[33%] top-0 h-full w-px bg-white" />
         <div className="absolute left-[66%] top-0 h-full w-px bg-white" />
      </div>

      {/* Main Content */}
      <div className="relative z-20 w-full max-w-7xl mx-auto px-6 md:px-12 flex flex-col justify-center h-full">
        
        {/* Vertical Guide Line */}
        <motion.div 
          className="absolute left-6 md:left-12 top-0 bottom-0 w-px bg-primary/20" 
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ duration: 1.5, ease: "circOut" }}
        />

        <div className="pl-8 md:pl-16 flex flex-col gap-2">
          
          {/* Identity Tag */}
          <motion.div 
            style={{ y: yIdentity }}
            className="flex items-center gap-3 mb-2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="w-8 h-px bg-primary" />
            <span className="font-mono text-primary text-xs tracking-[0.4em] uppercase font-bold drop-shadow-[0_0_8px_rgba(255,69,0,0.8)]">
              Identity: Multidisciplinary_Creative
            </span>
          </motion.div>

          {/* Main Title Block */}
          <motion.div 
            style={{ y: yTitle }}
            className="relative z-10 flex flex-col items-start"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
          >
            {/* Line 1: ALEXANDER VAN */}
            <div className="relative leading-[0.85] z-20 mix-blend-overlay">
               <h1 className="text-[clamp(3rem,8vw,9rem)] font-display font-black tracking-tight text-white/90 drop-shadow-2xl">
                 <TypewriterReveal text="ALEXANDER VAN" delay={500} speed={80} />
               </h1>
            </div>

            {/* Line 2: STRALENDORFF */}
            {/* Font size adjusted slightly larger to align edges with line 1 visually */}
            <div className="relative leading-[0.85] mt-2 z-10">
               <div className="bg-primary/90 px-4 py-1 transform -skew-x-12 origin-left shadow-[10px_10px_0px_rgba(0,0,0,0.3)] backdrop-blur-sm hover:bg-primary transition-colors duration-500">
                 <h1 className="text-[clamp(3.2rem,8.5vw,9.6rem)] font-display font-black tracking-normal text-black transform skew-x-12 whitespace-nowrap">
                    <TypewriterReveal text="STRALENDORFF" delay={1800} speed={80} />
                 </h1>
               </div>
            </div>
          </motion.div>

          {/* Description Box */}
          <motion.div 
            style={{ y: yDesc }}
            className="mt-12 max-w-2xl relative group"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.2 }}
          >
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary/50 group-hover:bg-primary transition-colors duration-300" />
              <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 -skew-x-6" />
              
              <p className="pl-6 py-2 text-lg md:text-xl text-muted-foreground font-mono leading-relaxed relative z-10">
                  Forging immersive experiences at the intersection of <span className="text-white font-bold">design</span>, <span className="text-white font-bold">code</span>, and <span className="text-white font-bold">sound</span>. 
                  Specializing in high-fidelity interfaces and interactive systems.
              </p>
          </motion.div>

          {/* Status Indicators */}
          <motion.div
            style={{ y: yStatus }}
            className="mt-12 flex flex-wrap gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
          >
            <div className="px-4 py-2 border border-white/10 bg-black/40 backdrop-blur-md font-mono text-xs text-muted-foreground flex items-center gap-2">
               <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
               STATUS: ONLINE
            </div>
            <div className="px-4 py-2 border border-white/10 bg-black/40 backdrop-blur-md font-mono text-xs text-muted-foreground">
               LATENCY: <span className="text-primary">12ms</span>
            </div>
            <div className="px-4 py-2 border border-white/10 bg-black/40 backdrop-blur-md font-mono text-xs text-muted-foreground">
               LOC: <span className="text-white">AUSTIN, TX</span>
            </div>
          </motion.div>

        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        className="absolute bottom-12 left-0 w-full flex justify-center z-30 pointer-events-auto"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <button 
          onClick={handleScrollDown}
          className="group flex flex-col items-center gap-2 cursor-pointer hover:opacity-100 transition-opacity opacity-50"
        >
          <span className="font-mono text-[10px] tracking-[0.2em] text-primary uppercase group-hover:tracking-[0.3em] transition-all duration-300">
            Scroll_Down
          </span>
          <ArrowDown className="text-primary w-5 h-5" />
        </button>
      </motion.div>
    </section>
  );
}
