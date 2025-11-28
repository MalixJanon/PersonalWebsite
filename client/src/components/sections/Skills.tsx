import { motion } from "framer-motion";
import { Cpu, Palette, Gamepad2, Music, Layers, Terminal } from "lucide-react";

const skills = [
  { 
    category: "CORE_SYSTEMS",
    icon: Terminal,
    items: [
      { name: "React / Next.js", level: 95 },
      { name: "TypeScript", level: 90 },
      { name: "Tailwind CSS", level: 98 },
      { name: "Node.js", level: 85 }
    ]
  },
  { 
    category: "VISUAL_PROCESSING",
    icon: Palette,
    items: [
      { name: "UI/UX Design", level: 92 },
      { name: "Motion Graphics", level: 88 },
      { name: "3D Rendering", level: 75 },
      { name: "Illustration", level: 95 }
    ]
  },
  { 
    category: "AUDIO_ENGINE",
    icon: Music,
    items: [
      { name: "Music Production", level: 92 },
      { name: "Sound Design", level: 85 },
      { name: "Mixing/Mastering", level: 80 }
    ]
  },
  { 
    category: "INTERACTIVE_SIM",
    icon: Gamepad2,
    items: [
      { name: "Game Development", level: 60 },
      { name: "Godot Engine", level: 65 },
      { name: "Interactive Art", level: 85 }
    ]
  }
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
          CAPABILITIES
        </h2>
        <span className="font-mono text-[10px] sm:text-xs text-primary tracking-widest hidden sm:block font-bold">
          // SYSTEM_DIAGNOSTICS_V2.0
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
        {skills.map((category, catIndex) => (
          <motion.div 
            key={category.category}
            className="tech-border p-6 md:p-8 bg-white/40 backdrop-blur-sm relative group hover:bg-white/60 transition-colors duration-300"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: catIndex * 0.1 }}
          >
            {/* Corner Accents */}
            <div className="absolute top-0 right-0 w-0 h-0 border-t-[20px] border-r-[20px] border-t-transparent border-r-primary/20 group-hover:border-r-primary transition-colors" />
            
            <div className="flex items-center gap-3 mb-6 border-b border-black/5 pb-4">
              <category.icon className="w-5 h-5 text-primary" />
              <h3 className="font-mono text-sm md:text-base font-bold tracking-widest text-foreground">{category.category}</h3>
            </div>

            <div className="space-y-6">
              {category.items.map((skill, index) => (
                <div key={skill.name} className="space-y-2">
                  <div className="flex justify-between text-xs font-mono font-bold">
                    <span className="text-foreground/80">{skill.name.toUpperCase()}</span>
                    <span className="text-primary">{skill.level}%</span>
                  </div>
                  <div className="h-1.5 w-full bg-black/5 overflow-hidden">
                    <motion.div 
                      className="h-full bg-foreground relative"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: (catIndex * 0.2) + (index * 0.1), ease: "circOut" }}
                    >
                       {/* Stripped pattern on bar */}
                       <div className="absolute inset-0 w-full h-full opacity-30" 
                        style={{ 
                          backgroundImage: 'linear-gradient(45deg, transparent 25%, rgba(255,255,255,0.5) 25%, rgba(255,255,255,0.5) 50%, transparent 50%, transparent 75%, rgba(255,255,255,0.5) 75%, rgba(255,255,255,0.5))', 
                          backgroundSize: '4px 4px' 
                        }} 
                      />
                    </motion.div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
