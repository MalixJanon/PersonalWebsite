import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import placeholderImg from "@assets/placeholder.webp";

// Modular project data structure
interface ProjectImage {
  id: string;
  url: string;
  caption?: string;
}

interface Project {
  id: string;
  title: string;
  description: string;
  toolsUsed: string[];
  images: ProjectImage[];
  thumbnailUrl: string;
}

// Sample projects - easily expandable
const PROJECTS: Project[] = [
  {
    id: "project-1",
    title: "Project Alpha",
    description: "A cutting-edge digital experience designed to showcase modern web capabilities. This project demonstrates advanced animations, responsive design, and user-centric interactions.",
    toolsUsed: ["React", "TypeScript", "Framer Motion", "Tailwind CSS"],
    thumbnailUrl: placeholderImg,
    images: [
      { id: "img-1-1", url: placeholderImg, caption: "Landing Page" },
      { id: "img-1-2", url: placeholderImg, caption: "Dashboard View" },
    ],
  },
  {
    id: "project-2",
    title: "Project Beta",
    description: "An innovative solution combining design and functionality. Built with performance and user experience as core priorities, this project sets new standards for modern applications.",
    toolsUsed: ["Vue.js", "Three.js", "Node.js", "PostgreSQL"],
    thumbnailUrl: placeholderImg,
    images: [
      { id: "img-2-1", url: placeholderImg, caption: "3D Visualization" },
    ],
  },
  {
    id: "project-3",
    title: "Project Gamma",
    description: "A comprehensive platform that brings together various technologies and design patterns. This project showcases expertise in full-stack development and system architecture.",
    toolsUsed: ["Next.js", "GraphQL", "MongoDB", "AWS"],
    thumbnailUrl: placeholderImg,
    images: [
      { id: "img-3-1", url: placeholderImg, caption: "Main Interface" },
      { id: "img-3-2", url: placeholderImg, caption: "Mobile View" },
      { id: "img-3-3", url: placeholderImg, caption: "Analytics Dashboard" },
    ],
  },
  {
    id: "project-4",
    title: "Project Delta",
    description: "A specialized application focused on solving complex problems through elegant design. This project demonstrates attention to detail and commitment to quality.",
    toolsUsed: ["React Native", "Firebase", "Redux"],
    thumbnailUrl: placeholderImg,
    images: [
      { id: "img-4-1", url: placeholderImg, caption: "App Screen 1" },
      { id: "img-4-2", url: placeholderImg, caption: "App Screen 2" },
    ],
  },
  {
    id: "project-5",
    title: "Project Epsilon",
    description: "An experimental project pushing the boundaries of what's possible in web technology. Features state-of-the-art techniques and innovative approaches.",
    toolsUsed: ["WebGL", "Rust", "Wasm", "WebRTC"],
    thumbnailUrl: placeholderImg,
    images: [
      { id: "img-5-1", url: placeholderImg, caption: "3D Scene" },
    ],
  },
  {
    id: "project-6",
    title: "Project Zeta",
    description: "A collaborative tool designed for modern teams. Built with scalability and user experience in mind, this application streamlines workflows and enhances productivity.",
    toolsUsed: ["Svelte", "Socket.io", "Prisma", "Docker"],
    thumbnailUrl: placeholderImg,
    images: [
      { id: "img-6-1", url: placeholderImg, caption: "Collaboration View" },
      { id: "img-6-2", url: placeholderImg, caption: "Real-time Sync" },
    ],
  },
];

const THUMBNAIL_SIZE = 144; // px, adjust as needed
const VISIBLE_COUNT = 5;
const GAP = 24; // px, gap between thumbnails

function rotate<T>(arr: T[], n: number) {
  const l = arr.length;
  const offset = ((n % l) + l) % l;
  return [...arr.slice(offset), ...arr.slice(0, offset)];
}

// Carousel component for project images
const ImageCarousel: React.FC<{ images: ProjectImage[] }> = ({ images }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const goToPrevious = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  if (images.length === 0) return null;

  return (
    <div className="relative w-full aspect-square overflow-hidden tech-border">
      <motion.img
        key={currentImageIndex}
        src={images[currentImageIndex].url}
        alt={images[currentImageIndex].caption || "Project image"}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="w-full h-full object-cover"
      />

      {/* Image caption */}
      {images[currentImageIndex].caption && (
        <div className="absolute bottom-0 left-0 right-0 bg-black/40 backdrop-blur-sm px-4 py-2">
          <p className="text-sm font-mono text-white">
            {images[currentImageIndex].caption}
          </p>
        </div>
      )}

      {/* Navigation - only show if multiple images */}
      {images.length > 1 && (
        <>
          <button
            onClick={goToPrevious}
            className="absolute left-2 top-1/2 -translate-y-1/2 z-10 p-2 bg-black/50 hover:bg-primary/80 transition-colors text-white rounded-sm"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={goToNext}
            className="absolute right-2 top-1/2 -translate-y-1/2 z-10 p-2 bg-black/50 hover:bg-primary/80 transition-colors text-white rounded-sm"
            aria-label="Next image"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Image counter */}
          <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-sm px-3 py-1 rounded-sm">
            <p className="text-xs font-mono text-white">
              {currentImageIndex + 1} / {images.length}
            </p>
          </div>
        </>
      )}
    </div>
  );
};

// Infinite scrolling thumbnail grid with true carousel effect
const InfiniteThumbnailCarousel: React.FC<{
  projects: Project[];
  onSelectProject: (project: Project) => void;
}> = ({ projects, onSelectProject }) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  // Duplicate projects for infinite scroll effect
  const infiniteProjects = [...projects, ...projects, ...projects];

  // Mouse drag handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.pageX - (scrollContainerRef.current?.offsetLeft || 0));
    setScrollLeft(scrollContainerRef.current?.scrollLeft || 0);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - (scrollContainerRef.current?.offsetLeft || 0);
    const walk = (x - startX) * 2;
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollLeft = scrollLeft - walk;
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;
    const handleScroll = () => {
      const scrollWidth = container.scrollWidth / 3;
      if (container.scrollLeft >= scrollWidth * 2) {
        container.scrollLeft = scrollWidth;
      } else if (container.scrollLeft <= 0) {
        container.scrollLeft = scrollWidth;
      }
    };
    container.addEventListener('scroll', handleScroll);
    container.scrollLeft = container.scrollWidth / 3;
    return () => container.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="w-full">
      <div
        ref={scrollContainerRef}
        className="overflow-x-auto overflow-y-hidden scrollbar-hide cursor-grab active:cursor-grabbing pb-4"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        <div className="inline-flex gap-6 px-4">
          {infiniteProjects.map((project, index) => (
            <div
              key={`${project.id}-${index}`}
              className="shrink-0 w-48 h-48 relative group cursor-pointer transition-transform duration-300 hover:scale-110 hover:z-10"
              onClick={() => !isDragging && onSelectProject(project)}
            >
              <div className="w-full h-full rounded-lg overflow-hidden shadow-2xl">
                <img
                  src={project.thumbnailUrl}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  draggable={false}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                  <h3 className="text-white font-semibold text-lg p-4">{project.title}</h3>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <style>{`.scrollbar-hide::-webkit-scrollbar { display: none; }`}</style>
    </div>
  );
};

// Project detail modal
const ProjectModal: React.FC<{
  project: Project | null;
  onClose: () => void;
}> = ({ project, onClose }) => {
  if (!project) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-background border border-black/10 tech-border max-w-4xl w-full max-h-[90vh] overflow-y-auto"
      >
        <div className="p-6 md:p-8">
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 hover:bg-primary/20 rounded-sm transition-colors"
            aria-label="Close modal"
          >
            <X className="w-6 h-6 text-foreground" />
          </button>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Image carousel */}
            <div className="flex flex-col gap-4">
              <ImageCarousel images={project.images} />
              <p className="text-xs font-mono text-muted-foreground">
                {project.images.length} image{project.images.length !== 1 ? "s" : ""} •{" "}
                {project.title}
              </p>
            </div>

            {/* Project details */}
            <div className="flex flex-col gap-6">
              {/* Title */}
              <div>
                <h2 className="text-3xl font-bold font-display mb-2">
                  {project.title}
                </h2>
                <div className="w-12 h-1 bg-primary" />
              </div>

              {/* Description */}
              <div>
                <p className="text-foreground leading-relaxed">
                  {project.description}
                </p>
              </div>

              {/* Tools used */}
              <div>
                <h3 className="text-sm font-bold font-mono text-muted-foreground mb-3 uppercase tracking-widest">
                  Tools Used
                </h3>
                <div className="flex flex-wrap gap-2">
                  {project.toolsUsed.map((tool) => (
                    <span
                      key={tool}
                      className="px-3 py-1 bg-primary/10 border border-primary/30 text-xs font-mono text-primary rounded-sm hover:bg-primary/20 transition-colors cursor-default"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>

              {/* Close button for mobile */}
              <button
                onClick={onClose}
                className="md:hidden mt-4 w-full px-4 py-2 bg-primary/20 border border-primary/30 text-primary font-mono text-sm rounded-sm hover:bg-primary/30 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

// Main Portfolio component
export default function Portfolio() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <section
      id="portfolio"
      className="py-20 md:py-32 min-h-screen flex flex-col justify-center max-w-7xl mx-auto px-4 sm:px-6 md:px-12 bg-background"
    >
      {/* Section header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        viewport={{ once: true }}
        className="mb-12"
      >
        <h2 className="text-4xl md:text-5xl font-bold font-display mb-4">
          PORTFOLIO
        </h2>
        <div className="flex items-center gap-4">
          <div className="w-12 h-1 bg-primary" />
          <p className="text-muted-foreground font-mono text-sm">
            // Selected Works
          </p>
        </div>
      </motion.div>

      {/* Description */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
        viewport={{ once: true }}
        className="text-foreground max-w-2xl mb-12 leading-relaxed"
      >
        Explore a curated selection of projects showcasing design, development,
        and creative problem-solving. Click on any project to view detailed
        information and multiple stages of development.
      </motion.p>

      {/* Thumbnail carousel */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
        viewport={{ once: true }}
      >
        <InfiniteThumbnailCarousel
          projects={PROJECTS}
          onSelectProject={setSelectedProject}
        />
      </motion.div>

      {/* Info text */}
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
        viewport={{ once: true }}
        className="text-xs font-mono text-muted-foreground mt-6"
      >
        → Scroll horizontally to explore • Click to view details
      </motion.p>

      {/* Project detail modal */}
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </section>
  );
}
