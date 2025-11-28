import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown } from "lucide-react";
import planetTexture from "@assets/generated_images/planet_with_flight_trajectory.png";
import Particles from "@/components/ui/particles";

const CYCLES_PER_LETTER = 10;
const SHUFFLE_TIME = 50;
const CHARS = "!@#$%^&*()_+-=[]{}|;':,./<>?";

interface DecryptTextProps {
  text: string;
  className?: string;
  revealDelay?: number; // Delay before starting the effect for the whole word
}

const DecryptText = ({ text, className, revealDelay = 0 }: DecryptTextProps) => {
  const [displayText, setDisplayText] = useState(text.split('').map(() => ''));
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Start the effect after the reveal delay
    const startTimeout = setTimeout(() => {
      setIsVisible(true);
    }, revealDelay);

    return () => clearTimeout(startTimeout);
  }, [revealDelay]);

  useEffect(() => {
    if (!isVisible) return;

    let interval: NodeJS.Timeout;
    let currentIteration = 0;
    
    // The text reveals one character at a time, but prior to revealing,
    // the remaining characters are scrambling.
    // Actually, the request is: "Show each character cycle through before landing on the correct letter one at a time"
    
    interval = setInterval(() => {
      setDisplayText(prev => {
        return text.split('').map((char, index) => {
          // If we have passed the iteration for this character, show the real character
          if (index < Math.floor(currentIteration / CYCLES_PER_LETTER)) {
            return char;
          }
          // Otherwise show a random character
          return CHARS[Math.floor(Math.random() * CHARS.length)];
        });
      });

      currentIteration++;
      
      // Stop when all characters are revealed
      if (currentIteration >= text.length * CYCLES_PER_LETTER) {
        clearInterval(interval);
        setDisplayText(text.split('')); // Ensure final state is correct
      }
    }, SHUFFLE_TIME);

    return () => clearInterval(interval);
  }, [text, isVisible]);

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
          transform: 'scale(1.1) translate(calc(var(--mouse-x, 0.5) * -10px), calc(var(--mouse-y, 0.5) * -10px))',
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

      <div className="relative z-10 max-w-5xl px-4">
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
        
        <motion.h1 
          className="text-6xl md:text-8xl lg:text-9xl font-display font-black leading-[0.9] tracking-tighter mb-8 mix-blend-screen"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          style={{ y: y1 }}
        >
          <DecryptText text="DIGITAL" revealDelay={200} />
          <br />
          <span className="text-transparent text-stroke hover:text-white transition-colors duration-500 relative group cursor-default">
            ALCHEMY
            <span className="absolute -bottom-2 left-0 w-0 h-2 bg-primary group-hover:w-full transition-all duration-500 opacity-50 blur-sm" />
          </span>
        </motion.h1>

        <motion.p 
          className="text-lg md:text-xl text-muted-foreground max-w-xl font-mono leading-relaxed border-l-2 border-primary pl-6 bg-black/40 backdrop-blur-md py-4 pr-4 rounded-r-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          style={{ y: y2 }}
        >
          Forging immersive experiences at the intersection of design, code, and sound. 
          Specializing in high-fidelity interfaces and interactive systems.
        </motion.p>

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
