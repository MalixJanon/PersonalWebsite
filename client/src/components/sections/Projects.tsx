import project1 from "@assets/Cahya SSS Logo Final-01-01.webp";
import project2 from "@assets/EDEN underground Logo-01.webp";
import { ArrowUpRight, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import OptimizedImage from "@/components/ui/optimized-image";

const projects = [
  {
    id: 1,
    title: "CAHYA",
    category: "UI/UX DESIGN",
    image: project1,
    description: "2D adventure game featuring a young hero on a quest to restore balance and find his missing brother. Designed UI/UX and developed in Godot.",
    tags: ["Godot Engine", "Aseprite", "Fl Studio"]
  },
  {
    id: 2,
    title: "EDEN_UNDERGROUND",
    category: "GAME DEV",
    image: project2,
    description: "Cyberpunk RPG set in a underground metropolis. Implemented custom lighting engine and procedural city generation.",
    tags: ["Godot Engine", "Clip Studio Paint", "Blender"]
  }
];

export default function Projects() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const openModal = (projectId: number) => {
    setSelectedImage(projectId);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  return (
    <section id="work" className="py-20 md:py-32 min-h-screen flex flex-col justify-center max-w-7xl mx-auto px-4 sm:px-6 md:px-12 bg-background">
      <motion.div 
        className="flex items-end justify-between mb-12 md:mb-16 border-b-2 border-black/10 pb-4 sticky top-16 md:top-20 z-20 bg-background/90 backdrop-blur-sm py-4"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl sm:text-4xl md:text-6xl font-display font-bold text-foreground">
          PROJECTS
        </h2>
        <span className="font-mono text-[10px] sm:text-xs text-primary tracking-widest hidden sm:block font-bold">
          // SELECTED_WORKS
        </span>
      </motion.div>

      <div className="space-y-20 md:space-y-32">
        {projects.map((project, index) => (
          <motion.div 
            key={project.id} 
            className={`flex flex-col ${index % 2 === 1 ? 'md:flex-row-reverse' : 'md:flex-row'} gap-8 md:gap-24 items-center group perspective-1000`}
            initial={{ opacity: 0, y: 100, scale: 0.9 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            {/* Image Container */}
            <motion.div 
              className="w-full md:w-3/5 relative group-hover:z-10 cursor-pointer"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.5 }}
              onClick={() => openModal(project.id)}
            >
              <div className="absolute -inset-4 border-2 border-primary/20 opacity-0 group-hover:opacity-100 transition-all duration-500 scale-95 group-hover:scale-100 hidden sm:block" />
              
              {/* Tech Corners */}
              <div className="absolute -top-2 -left-2 w-4 h-4 border-t-2 border-l-2 border-black/30 z-20 transition-all duration-500 group-hover:-top-4 group-hover:-left-4 group-hover:border-primary" />
              <div className="absolute -bottom-2 -right-2 w-4 h-4 border-b-2 border-r-2 border-black/30 z-20 transition-all duration-500 group-hover:-bottom-4 group-hover:-right-4 group-hover:border-primary" />

              <div className="relative overflow-hidden tech-border aspect-video bg-card transform transition-transform duration-700 group-hover:rotate-y-2 group-hover:scale-[1.02] shadow-lg">
                <OptimizedImage
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                  loading="lazy"
                  decoding="async"
                />
                <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity mix-blend-multiply" />
                
                {/* Click hint overlay */}
                <div className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/20 transition-all duration-300">
                  <span className="text-white font-mono text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-primary px-4 py-2 transform -skew-x-6">
                    <span className="transform skew-x-6 block">CLICK TO EXPAND</span>
                  </span>
                </div>
              </div>
              
              {/* Decorative elements */}
              <div className="absolute -bottom-4 -right-4 md:-bottom-8 md:-right-8 font-mono text-6xl md:text-9xl font-bold text-black/5 z-[-1] select-none">
                0{project.id}
              </div>
            </motion.div>

            {/* Content Container */}
            <div className="w-full md:w-2/5 space-y-4 md:space-y-6 relative">
              <motion.div 
                className="absolute -left-4 md:-left-8 top-0 bottom-0 w-[2px] bg-gradient-to-b from-transparent via-primary/50 to-transparent hidden md:block"
                initial={{ opacity: 0, height: 0 }}
                whileInView={{ opacity: 1, height: "100%" }}
                transition={{ duration: 1 }}
              />
              
              <div className="flex items-center gap-4">
                <motion.span 
                  className="w-8 md:w-12 h-[2px] bg-primary" 
                  initial={{ width: 0 }}
                  whileInView={{ width: 48 }}
                  transition={{ duration: 0.8 }}
                />
                <span className="font-mono text-primary text-xs md:text-sm tracking-widest font-bold">{project.category}</span>
              </div>
              
              <div className="bg-primary px-3 md:px-4 py-1 inline-block mb-4 transform -skew-x-6 origin-left shadow-md">
                <h3 className="text-2xl sm:text-3xl md:text-5xl font-display font-bold leading-tight text-white transform skew-x-6">
                  {project.title}
                </h3>
              </div>
              
              <p className="text-sm md:text-base text-muted-foreground leading-relaxed border-l-2 border-black/10 pl-4 group-hover:text-foreground transition-colors duration-300">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-2 pt-4">
                {project.tags.map(tag => (
                  <span key={tag} className="px-2 md:px-3 py-1 border border-black/10 text-[10px] md:text-xs font-mono text-muted-foreground hover:text-primary hover:border-primary/50 transition-colors cursor-default bg-white/50 font-bold">
                    {tag}
                  </span>
                ))}
              </div>

              <button className="group/btn flex items-center gap-2 mt-8 text-sm font-mono tracking-widest font-bold hover:text-primary transition-colors border-b-2 border-transparent hover:border-primary pb-1 w-fit">
                VIEW_CASE_STUDY <ArrowUpRight className="w-4 h-4 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Image Modal */}
      <AnimatePresence>
        {selectedImage !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            onClick={closeModal}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="relative max-w-6xl w-full max-h-[90vh]"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button
                onClick={closeModal}
                className="absolute -top-12 right-0 text-white hover:text-primary transition-colors group z-10"
              >
                <div className="flex items-center gap-2 font-mono text-sm">
                  <span className="group-hover:translate-x-[-4px] transition-transform">CLOSE</span>
                  <X className="w-6 h-6" />
                </div>
              </button>

              {/* Tech corners on modal */}
              <div className="absolute -top-4 -left-4 w-8 h-8 border-t-2 border-l-2 border-primary" />
              <div className="absolute -top-4 -right-4 w-8 h-8 border-t-2 border-r-2 border-primary" />
              <div className="absolute -bottom-4 -left-4 w-8 h-8 border-b-2 border-l-2 border-primary" />
              <div className="absolute -bottom-4 -right-4 w-8 h-8 border-b-2 border-r-2 border-primary" />

              {/* Image */}
              <div className="tech-border overflow-hidden bg-black shadow-2xl">
                <OptimizedImage
                  src={projects.find(p => p.id === selectedImage)?.image || ''}
                  alt={projects.find(p => p.id === selectedImage)?.title || ''}
                  className="w-full h-full object-contain max-h-[85vh]"
                  loading="eager"
                  decoding="async"
                  fadeInDuration={150}
                />
              </div>

              {/* Project title overlay */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                <div className="bg-primary px-4 py-2 inline-block transform -skew-x-6">
                  <h3 className="text-2xl md:text-4xl font-display font-bold text-white transform skew-x-6">
                    {projects.find(p => p.id === selectedImage)?.title}
                  </h3>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}