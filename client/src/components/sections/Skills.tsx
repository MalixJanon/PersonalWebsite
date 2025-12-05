import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const skills = [
  { name: "UI/UX", level: 86, code: "UX.FLOW", status: "SYNCED" },
  { name: "GRAPHIC DESIGN", level: 88, code: "DESIGN.PSD", status: "SYNCED" },
  { name: "MUSIC PRODUCTION", level: 92, code: "STUDIO.FL", status: "OPTIMAL" },
  { name: "ILLUSTRATION", level: 90, code: "ART.CSP", status: "OPTIMAL" },
  { name: "GAME DEVELOPMENT", level: 63, code: "GODOT.ENG", status: "STABLE" },
];

export default function Skills() {
  return (
    <section id="skills" className="py-20 md:py-32 relative min-h-screen flex flex-col justify-center w-full bg-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 w-full relative z-10">
        <div className="flex items-end justify-between mb-12 md:mb-16 border-b-2 border-black/10 pb-4 sticky top-16 md:top-20 z-20 bg-background/90 backdrop-blur-sm py-4">
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-display font-bold text-foreground">
            SKILLS
          </h2>
          <span className="font-mono text-[10px] sm:text-xs text-primary tracking-widest hidden sm:block font-bold">
            // SYSTEM_DIAGNOSTICS
          </span>
        </div>

        <div className="grid gap-8 md:gap-12 max-w-4xl mx-auto w-full">
          {skills.map((skill, index) => (
            <motion.div 
              key={skill.code} 
              className="group relative"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              {/* Tech markers */}
              <div className="absolute -left-2 md:-left-4 top-1/2 -translate-y-1/2 w-1.5 h-1.5 md:w-2 md:h-2 bg-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300 rotate-45 shadow-sm" />
              
              <div className="flex flex-col sm:flex-row justify-between sm:items-end mb-2 font-mono text-sm pl-2 gap-1 sm:gap-0">
                <span className="group-hover:text-primary transition-colors text-base sm:text-lg font-bold tracking-wider duration-300 text-foreground">{skill.name}</span>
                <div className="flex items-center gap-4">
                  <motion.span 
                    className="text-muted-foreground text-[9px] sm:text-[10px] border border-black/10 px-2 py-1 bg-white/50 w-fit font-bold"
                    whileHover={{ scale: 1.1, borderColor: "hsl(var(--primary))", color: "hsl(var(--primary))" }}
                  >
                    {skill.code}
                  </motion.span>
                  <span className="font-bold text-primary text-xs">{skill.level}%</span>
                </div>
              </div>
              
              <div className="h-4 bg-black/5 w-full relative overflow-hidden border border-black/5 group-hover:border-primary/30 transition-colors duration-300">
                {/* Background Grid in bar */}
                <div className="absolute inset-0 w-full h-full opacity-20" 
                  style={{ 
                    backgroundImage: 'linear-gradient(90deg, transparent 50%, rgba(0,0,0,0.1) 50%)', 
                    backgroundSize: '4px 100%' 
                  }} 
                />
                
                <motion.div 
                  className="h-full bg-primary relative overflow-hidden"
                  initial={{ width: 0 }}
                  whileInView={{ width: `${skill.level}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.5, delay: index * 0.1, ease: "circOut" }}
                >
                  {/* Seamless Flowing Glow */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-[fluid_3s_linear_infinite] w-[200%]" />
                  
                  {/* Leading Edge Highlight */}
                  <div className="absolute right-0 top-0 h-full w-1 bg-white shadow-[0_0_10px_rgba(255,255,255,0.8)]" />
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Decorative Elements - Redesigned Background Shapes */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <motion.div 
            className="absolute top-1/4 left-[-10%] w-[50vw] h-[50vw] border border-black/5 rounded-full opacity-20"
            animate={{ 
                scale: [1, 1.1, 1],
                rotate: [0, 180, 360],
            }}
            transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
        />
         <motion.div 
            className="absolute bottom-[-10%] right-[-5%] w-[40vw] h-[40vw] border border-primary/5 rounded-full opacity-10"
            animate={{ 
                scale: [1.1, 1, 1.1],
                rotate: [360, 180, 0],
            }}
            transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
        />
      </div>
    </section>
  );
}
