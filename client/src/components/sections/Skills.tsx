import { motion } from "framer-motion";

const skills = [
  { name: "INTERFACE DESIGN", level: 95, code: "UI.SYS" },
  { name: "USER EXPERIENCE", level: 88, code: "UX.FLOW" },
  { name: "FRONTEND DEV", level: 92, code: "REACT.JS" },
  { name: "SOUND DESIGN", level: 75, code: "AUDIO.WAV" },
  { name: "GAME LOGIC", level: 60, code: "CSHARP.UNITY" },
];

export default function Skills() {
  return (
    <section id="skills" className="py-24 relative">
      <div className="flex items-end justify-between mb-16 border-b border-white/10 pb-4">
        <h2 className="text-4xl md:text-6xl font-display font-bold">
          CAPABILITIES
        </h2>
        <span className="font-mono text-xs text-primary tracking-widest hidden md:block">
          // SYSTEM_DIAGNOSTICS
        </span>
      </div>

      <div className="grid gap-8 max-w-3xl">
        {skills.map((skill, index) => (
          <div key={skill.code} className="group">
            <div className="flex justify-between items-end mb-2 font-mono text-sm">
              <span className="group-hover:text-primary transition-colors">{skill.name}</span>
              <span className="text-muted-foreground text-[10px]">{skill.code} :: {skill.level}%</span>
            </div>
            
            <div className="h-2 bg-white/5 w-full relative overflow-hidden">
              {/* Background Grid in bar */}
              <div className="absolute inset-0 w-full h-full" 
                style={{ 
                  backgroundImage: 'linear-gradient(90deg, transparent 50%, rgba(0,0,0,0.5) 50%)', 
                  backgroundSize: '4px 100%' 
                }} 
              />
              
              <motion.div 
                className="h-full bg-primary relative"
                initial={{ width: 0 }}
                whileInView={{ width: `${skill.level}%` }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: index * 0.1, ease: "circOut" }}
              >
                <div className="absolute right-0 top-0 h-full w-1 bg-white shadow-[0_0_10px_rgba(255,255,255,0.8)]" />
              </motion.div>
            </div>
          </div>
        ))}
      </div>

      {/* Decorative Logic Gate SVG or similar */}
      <div className="absolute right-0 top-1/3 opacity-10 pointer-events-none hidden lg:block">
        <svg width="300" height="300" viewBox="0 0 100 100" className="stroke-white fill-none stroke-[0.5]">
          <circle cx="50" cy="50" r="40" />
          <path d="M50 10 L50 90" />
          <path d="M10 50 L90 50" />
          <rect x="30" y="30" width="40" height="40" />
        </svg>
      </div>
    </section>
  );
}
