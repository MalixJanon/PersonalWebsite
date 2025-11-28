import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useMotionValue, useSpring, animate, useMotionTemplate } from "framer-motion";
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
  
  // Mouse-based Parallax Depth Layers
  const parallaxMouseX = useMotionValue(0);
  const parallaxMouseY = useMotionValue(0);
  
  const parallaxSpringX = useSpring(parallaxMouseX, { stiffness: 300, damping: 40 });
  const parallaxSpringY = useSpring(parallaxMouseY, { stiffness: 300, damping: 40 });
  
  // Parallax transforms based on mouse position - different depths
  const parallaxXName = useTransform(parallaxSpringX, [-0.5, 0.5], [8, -8]);           // Name: closest, minimal
  const parallaxYName = useTransform(parallaxSpringY, [-0.5, 0.5], [8, -8]);
  
  const parallaxXText = useTransform(parallaxSpringX, [-0.5, 0.5], [20, -20]);         // Text: middle depth
  const parallaxYText = useTransform(parallaxSpringY, [-0.5, 0.5], [20, -20]);
  
  const parallaxXCard = useTransform(parallaxSpringX, [-0.5, 0.5], [-40, 40]);         // Card: furthest depth
  const parallaxYCard = useTransform(parallaxSpringY, [-0.5, 0.5], [-40, 40]);

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

  // Continuous rotation for the card
  const spinY = useMotionValue(0);
  
  useEffect(() => {
    const animation = animate(spinY, 360, {
      duration: 20,
      ease: "linear",
      repeat: Infinity,
    });
    return () => animation.stop();
  }, [spinY]);

  // Derived lighting values based on spin
  const frontLight = useTransform(spinY, (v) => {
    const angle = v % 360;
    return Math.max(0, Math.sin((angle + 45) * (Math.PI / 180))); 
  });
  
  const backLight = useTransform(spinY, (v) => {
    const angle = (v + 180) % 360;
    return Math.max(0, Math.sin((angle + 45) * (Math.PI / 180)));
  });

  // Dynamic gradient position moving with the face
  const shimmerPos = useTransform(spinY, [0, 360], ["100%", "-100%"]);

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
      
      // Also set parallax based on mouse position
      parallaxMouseX.set(xPct);
      parallaxMouseY.set(yPct);
    }
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    parallaxMouseX.set(0);
    parallaxMouseY.set(0);
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

      {/* 3D Business Card Asset - Completely Rebuilt */}
      <motion.div 
        className="absolute right-1/4 md:right-[30%] lg:right-1/3 top-1/4 -translate-y-1/2 z-10 flex items-center justify-center perspective-1000 pointer-events-none antialiased"
        style={{ 
          perspective: 1000
        }}
      >
        {/* Tilt Container */}
        <motion.div
          style={{
            rotateX,
            rotateY: rotateY,
            transformStyle: "preserve-3d",
            rotate: "28deg",
            scale: 1.5
          }}
          className="relative w-[220px] sm:w-[280px] md:w-[380px] lg:w-[420px] aspect-[1.75/1] overflow-visible"
        >
          {/* Spinning Container */}
          <motion.div
             className="w-full h-full relative overflow-visible"
             style={{ 
               rotateY: spinY,
               transformStyle: "preserve-3d" 
             }}
          >
              {/* --- FRONT FACE --- */}
              <div 
                className="absolute inset-0 w-full h-full rounded-[16px] backface-hidden"
                style={{ 
                  backfaceVisibility: "hidden",
                  WebkitBackfaceVisibility: "hidden",
                  transform: "translateZ(1px)",
                  willChange: "transform"
                }}
              >
                 <img src={cardFront} alt="Business Card Front" className="w-full h-full object-cover rounded-[16px]" style={{ clipPath: "inset(0 round 16px)" }} />
                 
                 {/* Enhanced Dynamic Lighting Overlay */}
                 <motion.div 
                   className="absolute inset-0 mix-blend-overlay pointer-events-none"
                   style={{
                     opacity: frontLight,
                     background: useMotionTemplate`linear-gradient(105deg, transparent 15%, rgba(255,255,255,0.7) ${gradientX}%, transparent 85%)`
                   }}
                 />
                 
                 {/* Premium Specular Reflection */}
                 <motion.div 
                   className="absolute inset-0 mix-blend-screen pointer-events-none"
                   style={{ 
                     opacity: brightness,
                     background: "linear-gradient(135deg, rgba(255,255,255,0.25) 0%, transparent 50%, rgba(0,0,0,0.1) 100%)"
                   }}
                 />
              </div>

              {/* --- BACK FACE --- */}
              <div 
                className="absolute inset-0 w-full h-full rounded-[16px] backface-hidden"
                style={{ 
                  backfaceVisibility: "hidden",
                  WebkitBackfaceVisibility: "hidden",
                  transform: "rotateY(180deg) translateZ(1px)",
                  willChange: "transform"
                }}
              >
                 <img src={cardBack} alt="Business Card Back" className="w-full h-full object-cover rounded-[16px]" style={{ clipPath: "inset(0 round 16px)" }} />
                 
                 {/* Enhanced Dark Metallic Lighting */}
                 <motion.div 
                    className="absolute inset-0 mix-blend-multiply pointer-events-none"
                    style={{ 
                      opacity: backLight,
                      background: "linear-gradient(135deg, rgba(255,255,255,0.12) 0%, transparent 40%, rgba(0,0,0,0.4) 100%)"
                    }}
                 />
                 
                 {/* Premium Moving glint on back */}
                 <motion.div 
                   className="absolute inset-0 mix-blend-screen pointer-events-none"
                   style={{ 
                     x: shimmerPos,
                     background: "linear-gradient(90deg, transparent 20%, rgba(255,255,255,0.15) 50%, transparent 80%)"
                   }}
                 />
              </div>

          </motion.div>
        </motion.div>
        
      </motion.div>

      <div className="relative z-20 w-full px-4 sm:px-6 md:px-12 h-full flex flex-col justify-center pointer-events-none">
        <motion.div style={{ x: parallaxXText, y: parallaxYText }} className="flex flex-col gap-8 pointer-events-auto max-w-2xl ml-auto md:ml-0 md:mr-auto">
          
          {/* Top Technical Text - Fade in 1st */}
          <motion.div 
            className="flex items-center gap-4 font-mono text-[10px] md:text-xs tracking-widest text-muted-foreground"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-primary shadow-[0_0_10px_rgba(255,51,51,0.5)]" />
              <span>FIG. 01 // SYSTEM_OVERRIDE</span>
            </div>
            <div className="h-px w-12 bg-black/20" />
            <span>EPSILON_CLASS</span>
            <div className="ml-auto hidden sm:block text-[8px] opacity-50">REF: 8849-X</div>
          </motion.div>

          {/* Main Typography - Aligned to Left - Fade in 2nd & 3rd */}
          <div className="relative z-10 w-full mt-12 md:mt-0 border-l-2 border-primary/20 pl-0 md:pl-0 md:border-none">
            <motion.div 
              className="relative w-full"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
              viewport={{ once: true }}
              style={{ x: parallaxXName, y: parallaxYName }}
            >
               <h1 className="text-[clamp(1.8rem,4vw,4rem)] whitespace-nowrap font-display font-black leading-[0.85] tracking-tighter text-foreground">
                 <TypewriterReveal text="ALEXANDER VAN" delay={200} speed={50} />
               </h1>
            </motion.div>
            <motion.div 
              className="relative ml-2 md:ml-0 mt-[-0.1em] w-full"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
              viewport={{ once: true }}
              style={{ x: parallaxXName, y: parallaxYName }}
            >
               <h1 className="text-[clamp(1.8rem,4.2vw,4.2rem)] font-display font-black leading-[0.85] tracking-tighter text-foreground opacity-20 absolute top-2 left-2 select-none blur-sm break-words">
                 <TypewriterReveal text="STRALENDORFF" delay={1000} speed={50} />
               </h1>
               <h1 className="text-[clamp(1.8rem,4.2vw,4.2rem)] font-display font-black leading-[0.85] tracking-tighter text-primary mix-blend-multiply break-words">
                  <TypewriterReveal text="STRALENDORFF" delay={1000} speed={50} />
               </h1>
            </motion.div>
            
            {/* Decorative Corner Bracket */}
            <div className="absolute -top-4 -left-4 w-8 h-8 border-t border-l border-foreground/10 hidden md:block" />
          </div>

          {/* Description & Specimen Data - Fade in 4th */}
          <motion.div 
            className="flex flex-col md:flex-row gap-12 mt-8 max-w-3xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45, ease: "easeOut" }}
            viewport={{ once: true }}
          >
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
          </motion.div>

        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        className="absolute bottom-32 left-8 z-30"
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
