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

      <div className="grid grid-cols-1 gap-8 w-full relative z-10">
        {skills.map((skill, index) => (
          <motion.div 
            key={skill.code} 
            className="group relative"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
          >
            <div className="flex items-end justify-between mb-2">
               <h3 className="font-display text-2xl md:text-4xl font-black text-foreground/20 group-hover:text-foreground transition-colors duration-500">
                  {skill.name}
               </h3>
               <span className="font-mono text-xs text-primary font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {skill.level}%
               </span>
            </div>
            
            <div className="h-[1px] w-full bg-black/10 relative overflow-hidden group-hover:h-[2px] transition-all duration-300">
               <div 
                  className="absolute top-0 left-0 h-full bg-primary transition-all duration-1000 ease-out w-0 group-hover:w-full"
                  style={{ width: `${skill.level}%` }} // Initial static width for mobile if needed, or use animation
               />
            </div>
            
            <div className="mt-2 flex justify-between items-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
               <span className="font-mono text-[10px] text-muted-foreground tracking-widest">MODULE: {skill.code}</span>
               <span className="font-mono text-[10px] text-muted-foreground tracking-widest">STATUS: {skill.status}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
