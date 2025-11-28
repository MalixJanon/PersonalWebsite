import { motion } from "framer-motion";

const skills = [
  { name: "ILLUSTRATION", level: 95, code: "UI.SYS" },
  { name: "GRAPHIC DESIGN", level: 88, code: "UX.FLOW" },
  { name: "MUSIC PRODUCTION", level: 92, code: "REACT.JS" },
  { name: "UI/UX", level: 75, code: "AUDIO.WAV" },
  { name: "GAME DEVELOPMENT", level: 60, code: "GDSCRIPT.GODOT" },
];

export default function Skills() {
  return (
    <section id="skills" className="py-32 relative min-h-screen flex flex-col justify-center max-w-7xl mx-auto px-6 md:px-12">
      <div className="flex items-end justify-between mb-16 border-b border-white/10 pb-4 sticky top-20 z-20 bg-background/80 backdrop-blur-sm py-4">
        <h2 className="text-4xl md:text-6xl font-display font-bold">
          SKILLS
        </h2>
        <span className="font-mono text-xs text-primary tracking-widest hidden md:block">
          // SYSTEM_DIAGNOSTICS
        </span>
      </div>

      <div className="grid gap-12 max-w-4xl mx-auto w-full">
        {skills.map((skill, index) => (
          <motion.div 
            key={skill.code} 
            className="group relative"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
          >
            {/* Tech markers */}
            <div className="absolute -left-4 top-1/2 -translate-y-1/2 w-2 h-2 bg-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300 rotate-45 shadow-[0_0_10px_rgba(255,69,0,0.8)]" />
            
            <div className="flex justify-between items-end mb-2 font-mono text-sm pl-2">
              <span className="group-hover:text-primary transition-colors text-lg font-bold tracking-wider duration-300">{skill.name}</span>
              <motion.span 
                className="text-muted-foreground text-[10px] border border-white/10 px-2 py-1 bg-black/30"
                whileHover={{ scale: 1.1, borderColor: "rgba(255,69,0,0.5)" }}
              >
                {skill.code} :: {skill.level}%
              </motion.span>
            </div>
            
            <div className="h-4 bg-white/5 w-full relative overflow-hidden skew-x-[-10deg] tech-border">
              {/* Background Grid in bar */}
              <div className="absolute inset-0 w-full h-full opacity-20" 
                style={{ 
                  backgroundImage: 'linear-gradient(90deg, transparent 50%, rgba(255,255,255,0.1) 50%)', 
                  backgroundSize: '4px 100%' 
                }} 
              />
              
              <motion.div 
                className="h-full bg-primary relative"
                initial={{ width: 0 }}
                whileInView={{ width: `${skill.level}%` }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, delay: index * 0.1, ease: "circOut" }}
              >
                <div className="absolute right-0 top-0 h-full w-2 bg-white shadow-[0_0_15px_rgba(255,255,255,0.8)] animate-pulse" />
                {/* Glitch effect inside bar */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] animate-[shimmer_2s_infinite]" />
              </motion.div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Decorative Logic Gate SVG or similar */}
      <div className="absolute right-0 top-1/3 opacity-10 pointer-events-none hidden lg:block">
        <svg width="400" height="400" viewBox="0 0 100 100" className="stroke-white fill-none stroke-[0.2]">
          <circle cx="50" cy="50" r="40" className="animate-[spin_20s_linear_infinite]" />
          <circle cx="50" cy="50" r="30" className="animate-[spin_15s_linear_infinite_reverse]" />
          <circle cx="50" cy="50" r="20" />
          <path d="M50 10 L50 90" />
          <path d="M10 50 L90 50" />
          <rect x="30" y="30" width="40" height="40" className="animate-pulse" />
        </svg>
      </div>
    </section>
  );
}
