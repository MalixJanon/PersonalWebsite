import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const skills = [
  { name: "ILLUSTRATION", level: 95, code: "UI.SYS", status: "OPTIMAL" },
  { name: "GRAPHIC DESIGN", level: 88, code: "UX.FLOW", status: "STABLE" },
  { name: "MUSIC PRODUCTION", level: 92, code: "REACT.JS", status: "ACTIVE" },
  { name: "UI/UX", level: 75, code: "AUDIO.WAV", status: "SYNCED" },
  { name: "GAME DEVELOPMENT", level: 60, code: "GODOT.ENG", status: "LOADING" },
];

export default function Skills() {
  return (
    <section id="skills" className="py-20 md:py-32 relative min-h-screen flex flex-col justify-center max-w-7xl mx-auto px-4 sm:px-6 md:px-12 bg-background overflow-hidden">
      <div className="flex items-end justify-between mb-16 border-b-2 border-black/10 pb-4 sticky top-16 md:top-20 z-20 bg-background/90 backdrop-blur-sm py-4">
        <h2 className="text-3xl sm:text-4xl md:text-6xl font-display font-bold text-foreground">
          SKILLS
        </h2>
        <span className="font-mono text-[10px] sm:text-xs text-primary tracking-widest hidden sm:block font-bold">
          // SYSTEM_DIAGNOSTICS
        </span>
      </div>

      <div className="grid grid-cols-1 gap-12 w-full relative z-10 max-w-5xl mx-auto">
        {skills.map((skill, index) => (
          <motion.div 
            key={skill.code} 
            className="group relative"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
          >
            <div className="flex items-end justify-between mb-4">
               <h3 className="font-display text-3xl md:text-5xl font-black text-foreground group-hover:text-primary transition-colors duration-500">
                  {skill.name}
               </h3>
               <motion.span 
                className="font-mono text-lg md:text-xl text-primary font-bold"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.5 + index * 0.1 }}
               >
                  {skill.level}%
               </motion.span>
            </div>
            
            {/* Large Progress Bar Container */}
            <div className="h-12 md:h-16 w-full bg-black/5 border border-black/10 relative overflow-hidden">
               {/* Background Grid Pattern */}
               <div className="absolute inset-0 opacity-20 bg-[linear-gradient(90deg,transparent_19px,rgba(0,0,0,0.1)_1px)] bg-[size:20px_100%]" />

               {/* The Fill */}
               <motion.div 
                  className="absolute top-0 left-0 h-full bg-primary overflow-hidden"
                  initial={{ width: 0 }}
                  whileInView={{ width: `${skill.level}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.5, ease: "circOut", delay: 0.2 + index * 0.1 }}
               >
                  {/* Liquid Bubbling Effect */}
                  <div className="absolute inset-0 w-full h-full">
                    {/* Bubbles */}
                    {Array.from({ length: 8 }).map((_, i) => (
                        <div 
                            key={i}
                            className="absolute rounded-full bg-white/20 animate-bubble"
                            style={{
                                width: `${Math.random() * 20 + 10}px`,
                                height: `${Math.random() * 20 + 10}px`,
                                bottom: `-${Math.random() * 20 + 20}px`,
                                left: `${Math.random() * 100}%`,
                                animationDuration: `${Math.random() * 2 + 2}s`,
                                animationDelay: `${Math.random() * 2}s`,
                                animationIterationCount: 'infinite',
                                animationTimingFunction: 'linear'
                            }}
                        />
                    ))}
                  </div>
                  
                  {/* Shine/Gloss */}
                  <div className="absolute top-0 left-0 w-full h-1/3 bg-gradient-to-b from-white/30 to-transparent" />
               </motion.div>
            </div>
            
            <div className="mt-3 flex justify-between items-center">
               <span className="font-mono text-xs text-muted-foreground tracking-widest font-bold">[{skill.code}]</span>
               <span className="font-mono text-xs text-muted-foreground tracking-widest font-bold uppercase">{skill.status}</span>
            </div>
          </motion.div>
        ))}
      </div>
      
      <style>{`
        @keyframes bubble {
            0% { transform: translateY(0) scale(1); opacity: 0; }
            20% { opacity: 1; }
            100% { transform: translateY(-100px) scale(1.5); opacity: 0; }
        }
        .animate-bubble {
            animation-name: bubble;
        }
      `}</style>
    </section>
  );
}
