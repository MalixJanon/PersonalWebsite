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
      {/* Background Grid */}
      <div className="absolute inset-0 pointer-events-none opacity-10">
         <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(to_right,rgba(0,0,0,0.1)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.1)_1px,transparent_1px)] bg-[size:20px_20px]" />
      </div>

      <div className="flex items-end justify-between mb-12 md:mb-16 border-b-2 border-black/10 pb-4 sticky top-16 md:top-20 z-20 bg-background/90 backdrop-blur-sm py-4">
        <h2 className="text-3xl sm:text-4xl md:text-6xl font-display font-bold text-foreground">
          SKILLS
        </h2>
        <span className="font-mono text-[10px] sm:text-xs text-primary tracking-widest hidden sm:block font-bold">
          // SYSTEM_DIAGNOSTICS
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full relative z-10">
        {skills.map((skill, index) => (
          <motion.div 
            key={skill.code} 
            className="group relative bg-white/40 backdrop-blur-sm border border-black/10 hover:border-primary/50 transition-colors p-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
          >
            {/* Corner Accents */}
            <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-black/20 group-hover:border-primary transition-colors" />
            <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-black/20 group-hover:border-primary transition-colors" />
            <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-black/20 group-hover:border-primary transition-colors" />
            <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-black/20 group-hover:border-primary transition-colors" />

            {/* Header */}
            <div className="flex justify-between items-start mb-4">
              <span className="font-mono text-[10px] text-muted-foreground tracking-widest group-hover:text-primary transition-colors">
                [{skill.code}]
              </span>
              <div className="flex items-center gap-2">
                <div className={cn(
                  "w-1.5 h-1.5 rounded-full animate-pulse", 
                  skill.status === "OPTIMAL" ? "bg-green-500" : "bg-primary"
                )} />
                <span className="font-mono text-[9px] text-muted-foreground font-bold">{skill.status}</span>
              </div>
            </div>

            {/* Title */}
            <h3 className="font-display text-xl md:text-2xl font-bold mb-6 text-foreground group-hover:translate-x-1 transition-transform duration-300">
              {skill.name}
            </h3>

            {/* Technical Progress Bar */}
            <div className="space-y-2">
              <div className="flex justify-between text-[10px] font-mono font-bold text-muted-foreground">
                <span>CAPACITY</span>
                <span>{skill.level}%</span>
              </div>
              <div className="h-2 bg-black/5 w-full flex gap-0.5">
                {Array.from({ length: 20 }).map((_, i) => (
                  <motion.div 
                    key={i}
                    className={cn(
                      "h-full flex-1 transition-colors duration-300",
                      (i / 20) * 100 < skill.level 
                        ? "bg-primary opacity-80 group-hover:opacity-100" 
                        : "bg-transparent"
                    )}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: (i / 20) * 100 < skill.level ? 0.8 : 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 + i * 0.02 }}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        ))}
        
        {/* Empty Grid Filler for aesthetic */}
        <div className="hidden lg:block p-6 border border-black/5 border-dashed flex items-center justify-center opacity-30">
           <span className="font-mono text-xs text-muted-foreground">AWAITING_INPUT...</span>
        </div>
      </div>
    </section>
  );
}
