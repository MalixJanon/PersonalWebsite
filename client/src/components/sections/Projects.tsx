import project1 from "@assets/generated_images/futuristic_ui_dashboard_mockup.png";
import project2 from "@assets/generated_images/pixel_art_cyberpunk_city_game_concept.png";
import { ExternalLink, ArrowUpRight } from "lucide-react";

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
    <section id="work" className="py-24">
      <div className="flex items-end justify-between mb-16 border-b border-white/10 pb-4">
        <h2 className="text-4xl md:text-6xl font-display font-bold">
          OPERATIONS
        </h2>
        <span className="font-mono text-xs text-primary tracking-widest hidden md:block">
          // SELECTED_WORKS
        </span>
      </div>

      <div className="space-y-32">
        {projects.map((project, index) => (
          <div 
            key={project.id} 
            className={`flex flex-col ${index % 2 === 1 ? 'md:flex-row-reverse' : 'md:flex-row'} gap-12 md:gap-24 items-center group`}
          >
            {/* Image Container */}
            <div className="w-full md:w-3/5 relative">
              <div className="absolute -inset-4 border border-primary/20 opacity-0 group-hover:opacity-100 transition-all duration-500 scale-95 group-hover:scale-100" />
              <div className="relative overflow-hidden tech-border aspect-video bg-card">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                />
                <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity mix-blend-overlay" />
              </div>
              
              {/* Decorative decorative elements */}
              <div className="absolute -bottom-8 -right-8 font-mono text-9xl font-bold text-white/5 z-[-1]">
                0{project.id}
              </div>
            </div>

            {/* Content Container */}
            <div className="w-full md:w-2/5 space-y-6">
              <div className="flex items-center gap-4">
                <span className="w-12 h-[1px] bg-primary" />
                <span className="font-mono text-primary text-sm tracking-widest">{project.category}</span>
              </div>
              
              <h3 className="text-4xl md:text-5xl font-display font-bold leading-tight group-hover:text-transparent group-hover:text-stroke transition-colors duration-300">
                {project.title}
              </h3>
              
              <p className="text-muted-foreground leading-relaxed border-l border-white/10 pl-4">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-2 pt-4">
                {project.tags.map(tag => (
                  <span key={tag} className="px-3 py-1 border border-white/10 text-xs font-mono text-muted-foreground hover:text-primary hover:border-primary/50 transition-colors cursor-default">
                    {tag}
                  </span>
                ))}
              </div>

              <button className="group/btn flex items-center gap-2 mt-8 text-sm font-mono tracking-widest hover:text-primary transition-colors">
                VIEW_CASE_STUDY <ArrowUpRight className="w-4 h-4 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
