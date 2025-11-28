import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown } from "lucide-react";
import darkTexture from "@assets/generated_images/dark_futuristic_textured_background_with_subtle_grid.png";

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
    <section ref={containerRef} className="min-h-[90vh] flex flex-col justify-center relative overflow-hidden">
      {/* Dynamic Background Layer */}
      <div 
        className="absolute inset-0 z-0 opacity-40"
        style={{
          backgroundImage: `url(${darkTexture})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          transform: 'scale(1.1) translate(calc(var(--mouse-x, 0.5) * -20px), calc(var(--mouse-y, 0.5) * -20px))',
          transition: 'transform 0.1s ease-out'
        }}
      />
      
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/80 to-background z-0" />

      {/* Floating Elements */}
      <div className="absolute right-[10%] top-[20%] w-64 h-64 border border-white/5 rounded-full opacity-20 animate-[spin_10s_linear_infinite]" />
      <div className="absolute left-[5%] bottom-[20%] w-32 h-32 border border-primary/20 rotate-45 opacity-20" />

      <div className="relative z-10 max-w-4xl">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="font-mono text-primary text-xs tracking-[0.5em] mb-4 pl-1">
            IDENTITY: CREATIVE_DIRECTOR
          </div>
        </motion.div>
        
        <motion.h1 
          className="text-6xl md:text-8xl lg:text-9xl font-display font-black leading-[0.9] tracking-tighter mb-8 mix-blend-screen"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          style={{ y: y1 }}
        >
          DIGITAL<br />
          <span className="text-transparent text-stroke hover:text-white transition-colors duration-500">ALCHEMY</span>
        </motion.h1>

        <motion.p 
          className="text-lg md:text-xl text-muted-foreground max-w-xl font-mono leading-relaxed border-l-2 border-primary pl-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          style={{ y: y2 }}
        >
          Forging immersive experiences at the intersection of design, code, and sound. 
          Specializing in high-fidelity interfaces and interactive systems.
        </motion.p>
      </div>

      <motion.div 
        className="absolute bottom-12 left-0 w-full flex justify-center z-10"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <ArrowDown className="text-muted-foreground/50 w-6 h-6" />
      </motion.div>
    </section>
  );
}
