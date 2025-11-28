import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown } from "lucide-react";
import planetTexture from "@assets/generated_images/planet_with_flight_trajectory.png";
import Particles from "@/components/ui/particles";

const CYCLES_PER_LETTER = 10;
const SHUFFLE_TIME = 50;
const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*";

interface DecryptTextProps {
  text: string;
  className?: string;
  delay?: number;
}

const DecryptText = ({ text, className, delay = 0 }: DecryptTextProps) => {
  const [displayText, setDisplayText] = useState(text.split('').map(() => ''));
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    let iteration = 0;
    const totalIterations = 20; // Faster cycle for 1s total feel
    const intervalDuration = 50; // 50ms * 20 = 1000ms (1s) roughly
    
    const startTimeout = setTimeout(() => {
        const interval = setInterval(() => {
            setDisplayText(prev => 
                text.split('').map((char, index) => {
                    if (index < iteration) {
                        return text[index];
                    }
                    return CHARS[Math.floor(Math.random() * CHARS.length)];
                })
            );

            if (iteration >= text.length) {
                clearInterval(interval);
                setIsComplete(true);
                setDisplayText(text.split(''));
            }
            
            // Reveal a new character every few ticks to fit within ~1s
            // or simply increment iteration based on progress
            iteration += 1/2; // Slow down the reveal slightly relative to the scramble
            
        }, intervalDuration);

        return () => clearInterval(interval);
    }, delay);

    return () => clearTimeout(startTimeout);
  }, [text, delay]);

  return (
    <span className={className}>
      {displayText.join('')}
    </span>
  );
};

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  
  // Parallax for text elements (moving up as we scroll down)
  const y1 = useTransform(scrollY, [0, 1000], [0, -300]); // Identity
  const y2 = useTransform(scrollY, [0, 1000], [0, -400]); // Name (Fastest)
  const y3 = useTransform(scrollY, [0, 1000], [0, -200]); // Description (Slower)
  const y4 = useTransform(scrollY, [0, 1000], [0, -150]); // Status (Slowest)

  // Parallax for background and particles (moving down as we scroll down - opposite direction)
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

  return (
    <section id="hero" ref={containerRef} className="min-h-[100vh] flex flex-col justify-center relative overflow-hidden -mt-20 pt-20">
      {/* Dynamic Background Layer */}
      <motion.div 
        className="absolute inset-0 z-0 opacity-80"
        style={{
          y: yBg, // Scroll Parallax (Opposite to text)
          backgroundImage: `url(${planetTexture})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          width: '120vw', 
          height: '120vh', 
          position: 'absolute',
          left: '50%',
          top: '50%',
          transform: 'translate(calc(-50% + var(--mouse-x, 0.5) * -20px), calc(-50% + var(--mouse-y, 0.5) * -20px))', // Mouse Parallax
          transition: 'transform 0.1s ease-out'
        }}
      />

      {/* Particles Layer - Behind content but in front of background */}
      <motion.div 
        className="absolute inset-0 z-10 pointer-events-none"
        style={{ y: yBg }} // Scroll Parallax (Opposite to text)
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
                y: y1,
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
              className="relative mb-8 mix-blend-normal pl-2 z-50" // High Z-Index
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
              style={{ 
                y: y2,
                translateX: `calc(var(--mouse-x, 0.5) * -50px)`, 
                translateY: `calc(var(--mouse-y, 0.5) * -50px)`
              }}
            >
              <div className="text-5xl md:text-7xl lg:text-8xl font-display font-black leading-[0.9] tracking-tighter text-white drop-shadow-2xl relative z-50">
                <DecryptText text="ALEXANDER" delay={0} />
              </div>
              
              <div className="bg-primary inline-block px-6 py-2 mt-2 transform -skew-x-6 origin-left shadow-lg shadow-primary/20 relative z-50">
                 <span className="text-5xl md:text-7xl lg:text-8xl font-display font-black leading-[0.9] tracking-tighter text-black block transform skew-x-6">
                    <DecryptText text="VAN STRALENDORFF" delay={1000} />
                 </span>
              </div>
            </motion.div>

            <motion.div 
              className="relative max-w-2xl pl-8 z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              style={{ 
                y: y3,
                translateX: `calc(var(--mouse-x, 0.5) * -20px)`, 
                translateY: `calc(var(--mouse-y, 0.5) * -20px)`
              }}
            >
                <div className="absolute left-0 top-8 w-4 h-[1px] bg-primary/50" />
                
                {/* Refraction Box Effect - Liquid Glass */}
                <div className="absolute inset-0 border border-white/20 bg-white/5 backdrop-blur-xl -skew-x-6 shadow-[0_8px_32px_0_rgba(0,0,0,0.37)]" />
                <div className="absolute inset-0 border-t border-l border-white/30 -skew-x-6 mix-blend-overlay" />
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-50 -skew-x-6 pointer-events-none" />
                
                <p className="relative z-10 text-xl md:text-2xl text-muted-foreground font-mono leading-relaxed pl-10 py-8 pr-8 drop-shadow-md">
                    Forging immersive experiences at the intersection of design, code, and sound. 
                    Specializing in high-fidelity interfaces and interactive systems.
                </p>
                
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary -skew-x-6 shadow-[0_0_10px_rgba(255,69,0,0.5)]" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="mt-12 flex gap-6 pl-8 z-30"
              style={{
                y: y4,
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
        <a href="#skills" className="group flex flex-col items-center gap-2 cursor-pointer">
          <span className="font-mono text-[10px] tracking-widest text-muted-foreground group-hover:text-primary transition-colors">SCROLL_DOWN</span>
          <ArrowDown className="text-primary w-6 h-6" />
        </a>
      </motion.div>
    </section>
  );
}
