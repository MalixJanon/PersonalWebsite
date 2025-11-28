import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown } from "lucide-react";
import planetTexture from "@assets/generated_images/planet_with_flight_trajectory.png";
import Particles from "@/components/ui/particles";

interface TypewriterRevealProps {
  text: string;
  className?: string;
  delay?: number;
}

const TypewriterReveal = ({ text, className, delay = 0 }: TypewriterRevealProps) => {
  const [displayedText, setDisplayedText] = useState("");
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const startTimeout = setTimeout(() => {
      setStarted(true);
      let currentIndex = 0;
      const interval = setInterval(() => {
        if (currentIndex < text.length) {
          setDisplayedText(text.slice(0, currentIndex + 1));
          currentIndex++;
        } else {
          clearInterval(interval);
        }
      }, 100); // Adjust typing speed here

      return () => clearInterval(interval);
    }, delay);

    return () => clearTimeout(startTimeout);
  }, [text, delay]);

  return (
    <span className={`relative inline-block ${className}`}>
      {/* Invisible full text to reserve layout space */}
      <span className="opacity-0">{text}</span>
      
      {/* Visible typing text overlay */}
      <span className="absolute top-0 left-0">
        {displayedText}
        <span className="animate-pulse text-primary inline-block ml-1">_</span>
      </span>
    </span>
  );
};

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  
  // Parallax for text elements (All moving UP for unified direction)
  const y1 = useTransform(scrollY, [0, 1000], [0, -50]); // Identity
  const y2 = useTransform(scrollY, [0, 1000], [0, -400]); // Name
  
  // All text elements moving in same direction (UP / Negative Y) with varying speeds for depth
  const yIdentity = useTransform(scrollY, [0, 1000], [0, -100]); 
  const yStatus = useTransform(scrollY, [0, 1000], [0, -120]); 
  
  const yTitle = useTransform(scrollY, [0, 1000], [0, -300]); 
  const yDesc = useTransform(scrollY, [0, 1000], [0, -150]);

  // Parallax for background and particles (moving down as we scroll down - opposite direction to Title)
  const yBg = useTransform(scrollY, [0, 1000], [0, 200]); 

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const { clientX, clientY } = e;
      const x = clientX / window.innerWidth;
      const y = clientY / window.innerHeight;
      
      containerRef.current.style.setProperty("--mouse-x", `${x}`);
      containerRef.current.style.setProperty("--mouse-y", `${y}`);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const handleScrollDown = (e: React.MouseEvent) => {
    e.preventDefault();
    const element = document.getElementById('skills');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" ref={containerRef} className="min-h-[100vh] flex flex-col justify-center relative overflow-hidden -mt-20 pt-20">
      {/* Dynamic Background Layer - Wrapped to fix conflict between Framer Motion y and CSS transform */}
      <motion.div 
        className="absolute inset-0 z-0 opacity-80"
        style={{ y: yBg }} // Scroll Parallax
      >
        <div 
          className="absolute inset-0 w-[120vw] h-[120vh] left-[-10vw] top-[-10vh]"
          style={{
            backgroundImage: `url(${planetTexture})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            transform: 'translate(calc(var(--mouse-x, 0.5) * -20px), calc(var(--mouse-y, 0.5) * -20px))', // Mouse Parallax
            transition: 'transform 0.1s ease-out'
          }}
        />
      </motion.div>

      {/* Particles Layer - Behind content but in front of background */}
      <motion.div 
        className="absolute inset-0 z-10 pointer-events-none"
        style={{ y: yBg }} 
      >
        <Particles />
      </motion.div>
      
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/40 to-background z-0" />
      
      {/* Technical Grid Lines */}
      <div className="absolute inset-0 pointer-events-none z-0">
         <div className="absolute top-1/3 left-0 w-full h-[1px] bg-white/5" />
         <div className="absolute top-2/3 left-0 w-full h-[1px] bg-white/5" />
         <div className="absolute left-1/3 top-0 h-full w-[1px] bg-white/5" />
         <div className="absolute left-2/3 top-0 h-full w-[1px] bg-white/5" />
      </div>

      <div className="relative z-20 max-w-6xl px-4 w-full pl-12 md:pl-24"> 
        <motion.div 
          className="flex flex-col relative"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
            {/* Connecting Line Structure */}
            <motion.div 
              className="absolute left-[-20px] top-0 bottom-0 w-[1px] bg-primary/30" 
              initial={{ height: 0 }}
              animate={{ height: "100%" }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
            />

            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="flex items-center gap-4 mb-4 pl-6 relative z-30"
              style={{
                y: yIdentity,
                translateX: `calc(var(--mouse-x, 0.5) * 30px)`, 
                translateY: `calc(var(--mouse-y, 0.5) * 30px)`
              }}
            >
              <div className="absolute left-0 top-1/2 w-4 h-[1px] bg-primary/50" />
              <div className="font-mono text-primary text-xs tracking-[0.5em] uppercase drop-shadow-[0_0_5px_rgba(255,69,0,0.5)]">
                IDENTITY: MULTIDISCIPLINARY_CREATIVE
              </div>
            </motion.div>
            
            <motion.div 
              className="relative mb-8 mix-blend-normal pl-2 z-50" 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
              style={{ 
                y: yTitle,
                translateX: `calc(var(--mouse-x, 0.5) * -50px)`, 
                translateY: `calc(var(--mouse-y, 0.5) * -50px)`
              }}
            >
              <div className="text-5xl md:text-7xl lg:text-8xl font-display font-black leading-[0.9] tracking-tighter text-white drop-shadow-2xl relative z-50">
                <TypewriterReveal text="ALEXANDER" delay={500} />
              </div>
              
              <div className="bg-primary inline-block px-6 py-2 mt-2 transform -skew-x-6 origin-left shadow-lg shadow-primary/20 relative z-50">
                 <span className="text-5xl md:text-7xl lg:text-8xl font-display font-black leading-[0.9] tracking-tighter text-black block transform skew-x-6">
                    <TypewriterReveal text="VAN STRALENDORFF" delay={1500} />
                 </span>
              </div>
            </motion.div>

            <motion.div 
              className="relative max-w-2xl pl-8 z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              style={{ 
                y: yDesc,
                translateX: `calc(var(--mouse-x, 0.5) * -20px)`, 
                translateY: `calc(var(--mouse-y, 0.5) * -20px)`
              }}
            >
                <div className="absolute left-0 top-8 w-4 h-[1px] bg-primary/50" />
                
                {/* Sleek Subtext Design - Simplified */}
                <div className="relative pl-8 py-6 border-l border-white/20 backdrop-blur-sm bg-black/20">
                    <p className="relative z-10 text-xl md:text-2xl text-muted-foreground font-mono leading-relaxed drop-shadow-md">
                        Forging immersive experiences at the intersection of design, code, and sound. 
                        Specializing in high-fidelity interfaces and interactive systems.
                    </p>
                    <div className="absolute top-0 left-0 w-1 h-8 bg-primary shadow-[0_0_10px_rgba(255,69,0,0.5)]" />
                </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="mt-12 flex gap-6 pl-8 z-30"
              style={{
                y: yStatus,
                translateX: `calc(var(--mouse-x, 0.5) * 15px)`,
                translateY: `calc(var(--mouse-y, 0.5) * 15px)`
              }}
            >
              <div className="px-6 py-3 border border-white/10 font-mono text-sm text-muted-foreground bg-black/40 backdrop-blur-md hover:border-primary/50 transition-colors cursor-default hover:scale-105 transition-transform duration-300">
                 STATUS: ONLINE
              </div>
              <div className="px-6 py-3 border border-white/10 font-mono text-sm text-muted-foreground bg-black/40 backdrop-blur-md hover:border-primary/50 transition-colors cursor-default hover:scale-105 transition-transform duration-300">
                 LATENCY: 12ms
              </div>
            </motion.div>
        </motion.div>
      </div>

      <motion.div 
        className="absolute bottom-12 left-0 w-full flex justify-center z-10"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div onClick={handleScrollDown} className="group flex flex-col items-center gap-2 cursor-pointer">
          <span className="font-mono text-[10px] tracking-widest text-muted-foreground group-hover:text-primary transition-colors">SCROLL_DOWN</span>
          <ArrowDown className="text-primary w-6 h-6" />
        </div>
      </motion.div>
    </section>
  );
}
