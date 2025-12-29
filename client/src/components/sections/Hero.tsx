import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { useDeviceCapabilities } from '@/hooks/use-device-capabilities';
import { ArrowDown } from "lucide-react";
import cardFront from "@assets/cardfront_1764303990780.webp";
import cardBack from "@assets/cardback_1764303990780.webp";
import { TypewriterReveal } from "@/components/ui/typewriter-reveal";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Check for reduced motion preference
  const prefersReducedMotion = useRef(
    typeof window !== 'undefined' 
      ? window.matchMedia('(prefers-reduced-motion: reduce)').matches 
      : false
  ).current;

  // Scroll-based parallax
  const { scrollY } = useScroll();
  // Normalized scroll progress for parallax (0 to 1 over 1400px)
  const scrollProgress = useTransform(scrollY, [0, 1400], [0, 1]);
  
  // Mouse-based Parallax Depth Layers
  // We reuse the tilt values (x, y) for parallax source to avoid redundant updates
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  // Reduced spring stiffness for lower-end devices when animations are heavy
  const springConfig = prefersReducedMotion 
    ? { stiffness: 100, damping: 60 }
    : { stiffness: 300, damping: 40 };
  
  const parallaxSpringX = useSpring(x, springConfig);
  const parallaxSpringY = useSpring(y, springConfig);

  // Combined Transforms
  // Card: Mouse(±40px) + Scroll(100px)
  const cardX = useTransform([parallaxSpringX, scrollProgress], ([x, s]: number[]) => (x * -40) + (s * 100));
  const cardY = useTransform([parallaxSpringY, scrollProgress], ([y, s]: number[]) => (y * -40) + (s * 100));

  // Name: Mouse(±8px) + Scroll(-60px)
  const nameX = useTransform([parallaxSpringX, scrollProgress], ([x, s]: number[]) => (x * 8) + (s * -60));
  const nameY = useTransform([parallaxSpringY, scrollProgress], ([y, s]: number[]) => (y * 8) + (s * -60));

  // Text: Mouse(±20px) + Scroll(-40px)
  const textX = useTransform([parallaxSpringX, scrollProgress], ([x, s]: number[]) => (x * 20) + (s * -40));
  const textY = useTransform([parallaxSpringY, scrollProgress], ([y, s]: number[]) => (y * 20) + (s * -40));

  // Grid: Scroll(50px) - Inverted
  const gridOffset = useTransform(scrollProgress, (s) => s * 50);

  // Business Card Tilt Logic - Stiff spring for quick response
  const mouseX = useSpring(x, { stiffness: 500, damping: 50 });
  const mouseY = useSpring(y, { stiffness: 500, damping: 50 });

  const rotateX = useTransform(mouseY, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], ["-15deg", "15deg"]);
  
  const deviceCapabilities = useDeviceCapabilities();
  const [isVisible, setIsVisible] = useState(true);

  // Cache container rect to avoid calling getBoundingClientRect on every move
  const rectRef = useRef<DOMRect | null>(null);
  useEffect(() => {
    const onResize = () => { rectRef.current = containerRef.current?.getBoundingClientRect() ?? null; };
    onResize();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!rectRef.current) rectRef.current = containerRef.current?.getBoundingClientRect() ?? null;
    const rect = rectRef.current;
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

  useEffect(() => {
    const node = containerRef.current;
    if (!node) return;
    const ob = new IntersectionObserver((entries) => {
      setIsVisible(entries.some(e => e.isIntersecting));
    }, { threshold: 0.1 });
    ob.observe(node);
    return () => ob.disconnect();
  }, []);

  const enableSpin = !prefersReducedMotion && !deviceCapabilities.isLowPowerDevice && isVisible;

  return (
    <section 
      id="hero" 
      ref={containerRef} 
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="min-h-[85vh] flex flex-col justify-center relative overflow-visible perspective-1000 bg-background"
    >
      {/* Technical Background Grid */}
      <motion.div className="absolute inset-0 pointer-events-none opacity-20" style={{ x: gridOffset, y: gridOffset }}>
         <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(to_right,rgba(0,0,0,0.1)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.1)_1px,transparent_1px)] bg-[size:40px_40px]" />
         {/* Crosshairs */}
         <div className="absolute top-1/4 left-1/4 w-4 h-4 border-l border-t border-foreground" />
         <div className="absolute top-1/4 right-1/4 w-4 h-4 border-r border-t border-foreground" />
         <div className="absolute bottom-1/4 left-1/4 w-4 h-4 border-l border-b border-foreground" />
         <div className="absolute bottom-1/4 right-1/4 w-4 h-4 border-r border-b border-foreground" />
      </motion.div>

      {/* 3D Business Card Asset - Completely Rebuilt */}
      <motion.div 
        className="absolute left-1/2 md:left-[55%] lg:left-[60%] top-2/5 -translate-y-1/2 z-10 flex items-center justify-center perspective-1000 pointer-events-none antialiased"
        style={{ 
          perspective: 1000,
          WebkitPerspective: 1000,
          MozPerspective: 1000,
          x: cardX,
          y: cardY
        }}
      >
        {/* Tilt Container */}
        <motion.div
          style={{
            rotateX,
            rotateY: rotateY,
            transformStyle: "preserve-3d",
            WebkitTransformStyle: "preserve-3d",
            MozTransformStyle: "preserve-3d",
            scale: 1.5
          }}
          className="relative w-[220px] sm:w-[280px] md:w-[380px] lg:w-[420px] aspect-[1.75/1] overflow-visible"
        >
          {/* Spinning Container */}
          <motion.div
             className={enableSpin ? "w-full h-full relative overflow-visible animate-hero-spin" : "w-full h-full relative overflow-visible"}
             style={{ 
               rotateZ: "45deg",
               transformStyle: "preserve-3d",
               WebkitTransformStyle: "preserve-3d",
               MozTransformStyle: "preserve-3d"
             }}
          >
              {/* --- FRONT FACE --- */}
              <div 
                className="absolute inset-0 w-full h-full backface-hidden"
                style={{ 
                  backfaceVisibility: "hidden",
                  WebkitBackfaceVisibility: "hidden",
                  MozBackfaceVisibility: "hidden",
                  transform: "translateZ(1px)",
                  borderRadius: "16px"
                }}
              >
                 <img src={cardFront} alt="Business Card Front" className="w-full h-full object-cover rounded-[16px]" />
              </div>

              {/* --- BACK FACE --- */}
              <div 
                className="absolute inset-0 w-full h-full backface-hidden"
                style={{ 
                  backfaceVisibility: "hidden",
                  WebkitBackfaceVisibility: "hidden",
                  MozBackfaceVisibility: "hidden",
                  transform: "rotateY(180deg) translateZ(1px)",
                  borderRadius: "16px"
                }}
              >
                 <img src={cardBack} alt="Business Card Back" className="w-full h-full object-cover rounded-[16px]" />
              </div>

          </motion.div>
        </motion.div>
        
      </motion.div>

      <div className="relative z-20 w-full px-4 sm:px-6 md:px-12 h-full flex flex-col justify-center pointer-events-none py-20 md:py-32">
        <motion.div style={{ x: textX, y: textY }} className="flex flex-col gap-8 pointer-events-auto max-w-2xl ml-auto md:ml-0 md:mr-auto" data-testid="text-content-wrapper">
          
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
              style={{ x: nameX, y: nameY }}
              data-testid="text-name-alexander"
            >
               <h1 className="text-[clamp(1.8rem,4vw,4rem)] whitespace-nowrap font-display font-black leading-[0.85] tracking-tighter text-foreground opacity-20 absolute top-2 left-2 select-none blur-sm">
                 <TypewriterReveal text="ALEXANDER VAN" delay={200} speed={50} />
               </h1>
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
              style={{ x: nameX, y: nameY }}
              data-testid="text-name-stralendorff"
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
                Multidisciplinary creative with a passion for crafting immersive digital experiences. Skilled in UI/UX & Graphic Design, Illustration, Music Production, and Game Development.
              </p>
            </div>
            
            <div className="flex-1 hidden md:block font-mono text-[10px] text-muted-foreground opacity-70">
              <div className="grid grid-cols-2 gap-4">
                 <div>
                   <span className="block mb-1 font-bold text-primary">THROTTLE</span>
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
        className="absolute bottom-20 left-8 z-30"
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
