import project1 from "@assets/generated_images/futuristic_ui_dashboard_mockup.png";
import project2 from "@assets/generated_images/pixel_art_cyberpunk_city_game_concept.png";
import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";

const projects = [
  {
    id: 1,
    title: "ORBITAL_HUD",
    category: "UI/UX DESIGN",
    image: project1,
    description: "Next-gen spacecraft telemetry interface designed for high-stress environments. Features real-time data visualization and holographic projections.",
    tags: ["React", "Three.js", "WebGL"]
  },
  {
    id: 2,
    title: "NEON_PROTOCOL",
    category: "GAME DEV",
    image: project2,
    description: "Cyberpunk RPG set in a decaying metropolis. Implemented custom lighting engine and procedural city generation.",
    tags: ["Unity", "C#", "Pixel Art"]
  }
];

export default function Projects() {
  return (
    <section id="work" className="py-32 min-h-screen flex flex-col justify-center">
      <div className="flex items-end justify-between mb-16 border-b border-white/10 pb-4 sticky top-20 z-20 bg-background/80 backdrop-blur-sm py-4">
        <h2 className="text-4xl md:text-6xl font-display font-bold">
          PROJECTS
        </h2>
        <span className="font-mono text-xs text-primary tracking-widest hidden md:block">
          // SELECTED_WORKS
        </span>
      </div>

      <div className="space-y-32">
        {projects.map((project, index) => (
          <motion.div 
            key={project.id} 
            className={`flex flex-col ${index % 2 === 1 ? 'md:flex-row-reverse' : 'md:flex-row'} gap-12 md:gap-24 items-center group perspective-1000`}
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            {/* Image Container */}
            <div className="w-full md:w-3/5 relative group-hover:z-10">
              <div className="absolute -inset-4 border border-primary/20 opacity-0 group-hover:opacity-100 transition-all duration-500 scale-95 group-hover:scale-100" />
              
              {/* Tech Corners */}
              <div className="absolute -top-2 -left-2 w-4 h-4 border-t border-l border-white/50 z-20 transition-all duration-500 group-hover:-top-4 group-hover:-left-4 group-hover:border-primary" />
              <div className="absolute -bottom-2 -right-2 w-4 h-4 border-b border-r border-white/50 z-20 transition-all duration-500 group-hover:-bottom-4 group-hover:-right-4 group-hover:border-primary" />

              <div className="relative overflow-hidden tech-border aspect-video bg-card transform transition-transform duration-700 group-hover:rotate-y-2 group-hover:scale-[1.02]">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110" 
                />
                <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity mix-blend-overlay" />
                <div className="absolute inset-0 bg-black/50 transition-opacity duration-500 group-hover:opacity-0" />
              </div>
              
              {/* Decorative decorative elements */}
              <div className="absolute -bottom-8 -right-8 font-mono text-9xl font-bold text-white/5 z-[-1] select-none">
                0{project.id}
              </div>
            </div>

            {/* Content Container */}
            <div className="w-full md:w-2/5 space-y-6 relative">
              <div className="absolute -left-8 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-primary/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              
              <div className="flex items-center gap-4">
                <span className="w-12 h-[1px] bg-primary" />
                <span className="font-mono text-primary text-sm tracking-widest">{project.category}</span>
              </div>
              
              <h3 className="text-4xl md:text-5xl font-display font-bold leading-tight group-hover:text-transparent group-hover:text-stroke transition-colors duration-300">
                {project.title}
              </h3>
              
              <p className="text-muted-foreground/80 leading-relaxed border-l border-white/10 pl-4 group-hover:text-foreground transition-colors duration-300">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-2 pt-4">
                {project.tags.map(tag => (
                  <span key={tag} className="px-3 py-1 border border-white/10 text-xs font-mono text-muted-foreground hover:text-primary hover:border-primary/50 transition-colors cursor-default bg-black/30">
                    {tag}
                  </span>
                ))}
              </div>

              <button className="group/btn flex items-center gap-2 mt-8 text-sm font-mono tracking-widest hover:text-primary transition-colors border-b border-transparent hover:border-primary pb-1 w-fit">
                VIEW_CASE_STUDY <ArrowUpRight className="w-4 h-4 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
