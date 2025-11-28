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
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const y2 = useTransform(scrollY, [0, 500], [0, -100]);

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
      <div 
        className="absolute inset-0 z-0 opacity-80"
        style={{
          backgroundImage: `url(${planetTexture})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          width: '120vw', // Enlarged for parallax
          height: '120vh', // Enlarged for parallax
          position: 'absolute',
          left: '50%',
          top: '50%',
          transform: 'translate(calc(-50% + var(--mouse-x, 0.5) * -40px), calc(-50% + var(--mouse-y, 0.5) * -40px))', // Parallax
          transition: 'transform 0.1s ease-out'
        }}
      />

      {/* Particles Layer */}
      <Particles className="absolute inset-0 z-0" />
      
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/40 to-background z-0" />
      
      {/* Technical Grid Lines */}
      <div className="absolute inset-0 pointer-events-none">
         <div className="absolute top-1/3 left-0 w-full h-[1px] bg-white/5" />
         <div className="absolute top-2/3 left-0 w-full h-[1px] bg-white/5" />
         <div className="absolute left-1/3 top-0 h-full w-[1px] bg-white/5" />
         <div className="absolute left-2/3 top-0 h-full w-[1px] bg-white/5" />
      </div>

      <div className="relative z-10 max-w-5xl px-4 w-full">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex items-center gap-4 mb-6"
        >
          <div className="h-[1px] w-12 bg-primary" />
          <div className="font-mono text-primary text-xs tracking-[0.5em] uppercase">
            Identity: Creative_Director
          </div>
        </motion.div>
        
        <motion.div 
          className="relative mb-8 mix-blend-normal"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          style={{ y: y1 }}
        >
          <div className="text-6xl md:text-8xl lg:text-9xl font-display font-black leading-[0.85] tracking-tighter text-white">
            <DecryptText text="DIGITAL" delay={0} />
          </div>
          
          <div className="bg-primary inline-block px-4 py-2 mt-2 transform -skew-x-6 origin-left">
             <span className="text-6xl md:text-8xl lg:text-9xl font-display font-black leading-[0.85] tracking-tighter text-black block transform skew-x-6">
                <DecryptText text="ALCHEMY" delay={1000} />
             </span>
          </div>
        </motion.div>

        <motion.div 
          className="relative max-w-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          style={{ y: y2 }}
        >
            {/* Refraction Box Effect - Liquid Glass */}
            <div className="absolute inset-0 border border-white/20 bg-white/5 backdrop-blur-xl -skew-x-6 shadow-[0_8px_32px_0_rgba(0,0,0,0.37)]" />
            <div className="absolute inset-0 border-t border-l border-white/30 -skew-x-6 mix-blend-overlay" />
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-50 -skew-x-6 pointer-events-none" />
            
            <p className="relative z-10 text-lg md:text-xl text-muted-foreground font-mono leading-relaxed pl-8 py-6 pr-6 drop-shadow-md">
                Forging immersive experiences at the intersection of design, code, and sound. 
                Specializing in high-fidelity interfaces and interactive systems.
            </p>
            
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary -skew-x-6 shadow-[0_0_10px_rgba(255,69,0,0.5)]" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-8 flex gap-4"
        >
          <div className="px-4 py-2 border border-white/10 font-mono text-xs text-muted-foreground bg-black/40 backdrop-blur-md hover:border-primary/50 transition-colors cursor-default">
             STATUS: ONLINE
          </div>
          <div className="px-4 py-2 border border-white/10 font-mono text-xs text-muted-foreground bg-black/40 backdrop-blur-md hover:border-primary/50 transition-colors cursor-default">
             LATENCY: 12ms
          </div>
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
