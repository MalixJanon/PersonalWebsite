import React, { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { cn } from "@/lib/utils";
import placeholderImg from "@assets/placeholder.webp";
import sydKnights from "@assets/Syd Knights Finished.webp";
import businessCards from "@assets/businesscardlayout.webp";
import signatureKG from "@assets/KeighleyGroupEmailSignature.webp";
import signatureBackend from "@assets/emailsignature.webp";
import kgLogo from "@assets/KeighleyGroupLogoBl.webp";
import linkTOTK from "@assets/LinkTOTKFinished.webp";
import mortalRune from "@assets/MortalRune.webp";
import cahyaLogo from "@assets/Cahya SSS Logo Final-01-01.webp";
import cahyaCahyaFront from "@assets/alexander-van-stralendorff-cahya-layout-x-front.webp";
import cahyaCahya2 from "@assets/alexander-van-stralendorff-cahya-layout-x-1.webp";
import cahyaFaussFront from "@assets/alexander-van-stralendorff-fauss-layout-x-front.webp";
import cahyaFauss2 from "@assets/alexander-van-stralendorff-fauss-layout-x-1-2.webp";
import cahyaGhashiFront from "@assets/alexander-van-stralendorff-ghashi-layout-x-front.webp";
import cahyaGhashi2 from "@assets/alexander-van-stralendorff-ghashi-layout-x-1-2.webp";
import cahyaSanjinFront from "@assets/alexander-van-stralendorff-sanjin-layout-x-front.webp";
import cahyaSanjin2 from "@assets/alexander-van-stralendorff-sanjin-layout-x-1-2.webp";
import edenLogo from "@assets/EDEN underground Logo-01.webp";
import obelyskLogoBoW from "@assets/OBELYSK Logo BoW.webp";
import obelyskLogoWoB from "@assets/OBELYSK Logo WoB.webp";
import quadrataLogoWoB from "@assets/Quadrata Logo WonB Sq@2x.webp";
import quadrataLogoBoW from "@assets/Quadrata Logo BonW Sq@2x.webp";
import quadrataLogoWoR from "@assets/Quadrata Logo WonR Sq@2x.webp";

import { Description } from "@radix-ui/react-toast";
import { link } from "fs";


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
    title: "janonart.com",
    description: "My personal portfolio website developed in Visual Studio Code. This project demonstrates dynamic animations with responsive design with a clean, modern visual identity inspired by Mirror's Edge.",
    toolsUsed: ["React", "TypeScript", "Framer Motion", "Tailwind CSS", "Visual Studio Code"],
    thumbnailUrl: placeholderImg,
    images: [
      { id: "img-1-1", url: placeholderImg, caption: "Landing Page" },
      { id: "img-1-2", url: placeholderImg, caption: "Dashboard View" },
    ],
  },
  {
    id: "project-2",
    title: "Quantum Shift",
    description: "My submission for the 2022 48 hour Texas Game Jam hosted by the University of Texas with the theme, 'negative space'. The player controls a ship and has to defeat enemies while 'shifting' between foreground and background. All art, sound effects, music, and programming were done by myself.",
    toolsUsed: ["Godot Engine", "Aseprite", "Fl Studio", "Git", "GDscript"],
    thumbnailUrl: placeholderImg,
    images: [
      { id: "img-2-1", url: placeholderImg, caption: "Main Level" },
      { id: "img-2-2", url: placeholderImg, caption: "Shift Mechanic" },
      { id: "img-2-3", url: placeholderImg, caption: "Boss Battle" },
      { id: "img-2-4", url: placeholderImg, caption: "Under the Hood" },
    ],
  },
  {
    id: "project-3",
    title: "Metro BEATdown",
    description: "Chillenium 2023 game jam submission for the theme, 'We Share a Heart'. While our team's main programmer didn't finish in time, I was able to stitch together a showcase of all the assets and animations I created. To my surprise, we placed 1st in visuals—my first trophy!",
    toolsUsed: ["Godot Engine", "Aseprite", "Fl Studio", "Git", "GDscript"],
    thumbnailUrl: placeholderImg,
    images: [
      { id: "img-3-1", url: placeholderImg, caption: "Main Level" },
      { id: "img-3-2", url: placeholderImg, caption: "Menu Screen" },
      { id: "img-3-3", url: placeholderImg, caption: "Options Menu" },
      { id: "img-3-4", url: placeholderImg, caption: "Our Trophy" },
    ],
  },

  // Needs Lineart Screenshot
  {
    id: "project-4",
    title: "Syd Knights",
    description: "A birthday gift dedicated to my number one supporter—my sister Syd.",
    toolsUsed: ["Clip Studio Paint", "Photoshop"],
    thumbnailUrl: sydKnights,
    images: [
      { id: "img-4-1", url: sydKnights, caption: "Syd Knights Finished" },
      { id: "img-4-2", url: placeholderImg, caption: "Lineart" },
    ],
  },
  // Need Lineart Screenshot and WIP Lineart Screenshot
  {
    id: "project-5",
    title: "Syd Knights v2",
    description: "A new take on the original, this version shifts the dynamic and gives Syd a more challenging and confident impression. I am currently still working on this piece. My vision for the finished version is very ambitious and I can't wait for you to see it!",
    toolsUsed: ["Clip Studio Paint"],
    thumbnailUrl: placeholderImg,
    images: [
      { id: "img-5-1", url: placeholderImg, caption: "Underlying Sketch w/ Some WIP Lineart" },
      { id: "img-5-2", url: placeholderImg, caption: "Original Sketch"},
    ],
  },
  // Done
  {
    id: "project-6",
    title: "Personal Business Cards",
    description: "My goal with the design of these cards was to stand out; I didn't just want a flat card with my contact information—I wanted my card to give a first impression that shows my creativity.",
    toolsUsed: ["Affinity", "Photoshop", "Blender"],
    thumbnailUrl: businessCards,
    images: [
      { id: "img-6-1", url: businessCards, caption: "Card Designs" },
    ],
  },
  // Needs ALL logos
  {
    id: "project-7",
    title: "Company Logo Spread",
    description: "A spread showcasing different logo styles for a potential client.",
    toolsUsed: ["Photoshop", "Illustrator"],
    thumbnailUrl: kgLogo,
    images: [
      { id: "img-7-1", url: kgLogo, caption: "Badge Logos" },
    ],
  },
  // DONE
  {
    id: "project-8",
    title: "HTML Company Signature",
    description: "An email signature that aligns with the design philosophy of the finished branding.",
    toolsUsed: ["HTML", "CSS"],
    thumbnailUrl: signatureKG,
    images: [
      { id: "img-8-1", url: signatureKG, caption: "Signature"},
      { id: "img-8-2", url: signatureBackend, caption: "Under the Hood"},
    ],
  },
  // Needs Sketch
  {
    id: "project-9",
    title: "Link from Tears of the Kingdom",
    description: "I illustrated this piece to commemorate the release of The Legend of Zelda: Tears of the Kingdom. Link is pictured wearing the Desert Voe armor set.",
    toolsUsed: ["Clip Studio Paint", "Photoshop", "Lightroom"],
    thumbnailUrl: linkTOTK,
    images: [
      { id: "image-9-1", url: linkTOTK, caption: "Finished Piece"},
      { id: "image-9-1", url: placeholderImg, caption: "Original Sketch"},
    ],
  },
  // DONE
  {
    id: "project-10",
    title: "Cahya and the Seven Sacred Stones Logo",
    description: "This logo is designed for a game that I am currently developing. Even though art is typically the last part of a game that is finalized, I find that creating more 'finished' assets inspires me to do the tedious stuff.",
    toolsUsed: ["Illustrator"],
    thumbnailUrl: cahyaLogo,
    images: [
      { id: "image-10-1", url: cahyaLogo, caption: "Cahya and the Seven Sacred Stones Logo"},
    ],
  },
  // DONE
  {
    id: "project-11",
    title: "Cahya SSS — Cahya Character Concept",
    description: "A character concept sheet that depicts the main character of Cahya and the Seven Sacred Stones — Cahya!",
    toolsUsed: ["Clip Studio Paint", "Photoshop", "Illustrator", "Affinity"],
    thumbnailUrl: cahyaCahyaFront,
    images: [
      { id: "image-11-1", url: cahyaCahyaFront, caption: "Cahya — Main Page"},
      { id: "image-11-2", url: cahyaCahya2, caption: "Cahya — Face"},
    ],
  },
  // DONE
    {
    id: "project-12",
    title: "Cahya SSS — Sanjin Character Concept",
    description: "A character concept sheet that depicts one of the antagonists of Cahya and the Seven Sacred Stones — Sanjin.",
    toolsUsed: ["Clip Studio Paint", "Photoshop", "Illustrator", "Affinity"],
    thumbnailUrl: cahyaSanjinFront,
    images: [
      { id: "image-12-1", url: cahyaSanjinFront, caption: "Sanjin — Main Page"},
      { id: "image-12-2", url: cahyaSanjin2, caption: "Sanjin — Face"},
    ],
  },
  // DONE
    {
    id: "project-13",
    title: "Cahya SSS — Fauss Character Concept",
    description: "A character concept sheet that depicts the main character's brother of Cahya and the Seven Sacred Stones — Fauss.",
    toolsUsed: ["Clip Studio Paint", "Photoshop", "Illustrator", "Affinity"],
    thumbnailUrl: cahyaFaussFront,
    images: [
      { id: "image-13-1", url: cahyaFaussFront, caption: "Fauss — Main Page"},
      { id: "image-13-2", url: cahyaFauss2, caption: "Fauss — Face"},
    ],
  },
  // DONE
    {
    id: "project-14",
    title: "Cahya SSS — Ghashi-Ramil Character Concept",
    description: "A character concept sheet that depicts one of the main antagonists of Cahya and the Seven Sacred Stones — Ghashi-Ramil.",
    toolsUsed: ["Clip Studio Paint", "Photoshop", "Illustrator", "Affinity"],
    thumbnailUrl: cahyaGhashiFront,
    images: [
      { id: "image-14-1", url: cahyaGhashiFront, caption: "Ghashi-Ramil — Main Page"},
      { id: "image-14-2", url: cahyaGhashi2, caption: "Ghashi-Ramil — Face"},
    ],
  },
  // DONE
  {
    id: "project-15",
    title: "EDEN: UNDERGROUND Game Concept Logo",
    description: "A logo created for a game concept that takes place in an underground city called, 'EDEN'.",
    toolsUsed: ["Photoshop", "Illustrator"],
    thumbnailUrl: edenLogo,
    images: [
      { id: "image-15-1", url: edenLogo, caption: "EDEN: UNDERGROUND Logo"},
    ],
  },
  // DONE
    {
    id: "project-16",
    title: "OBELYSK Game Concept Logo",
    description: "A logo created for a Medieval Horror game concept.",
    toolsUsed: ["Photoshop", "Illustrator"],
    thumbnailUrl: obelyskLogoWoB,
    images: [
      { id: "image-16-1", url: obelyskLogoWoB, caption: "OBELYSK Logo"},
      { id: "image-16-2", url: obelyskLogoBoW, caption: "OBELYSK Logo BoW"},
    ],
  },
  // DONE
    {
    id: "project-17",
    title: "Quadrata Logo",
    description: "A logo created for my studio.",
    toolsUsed: ["Photoshop", "Illustrator"],
    thumbnailUrl: quadrataLogoWoB,
    images: [
      { id: "image-17-1", url: quadrataLogoWoB, caption: "Main Quadrata Logo"},
      { id: "image-17-2", url: quadrataLogoBoW, caption: "Black Logo Variant"},
      { id: "image-17-3", url: quadrataLogoWoR, caption: "Red Logo Variant"},
    ],
  },
  // DONE
  {
    id: "project-18",
    title: "Mortal Rune",
    description: "A painterly piece that I created a few years back. Differring from my usual style, this piece shows my capabilities of stylized-realism, my understanding of color theory, and skin rendering.",
    toolsUsed: ["Clip Studio Paint", "Photoshop"],
    thumbnailUrl: mortalRune,
    images: [
      { id: "project-18-1", url: mortalRune, caption: "Mortal Rune — Finished Piece"},
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
const ImageCarousel: React.FC<{
  images: ProjectImage[];
  onImageChange?: (index: number) => void;
}> = ({ images, onImageChange }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [aspectRatio, setAspectRatio] = useState<number | null>(null);

  const goToPrevious = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  useEffect(() => {
    setCurrentImageIndex(0);
    setAspectRatio(null);
  }, [images]);

  useEffect(() => {
    onImageChange?.(currentImageIndex);
  }, [currentImageIndex, onImageChange]);

  if (images.length === 0) return null;

  const currentAspectRatio = aspectRatio || 16 / 9;

  return (
    <div className="relative w-full h-full overflow-hidden flex flex-col items-center justify-center gap-3">
      <div
        className="relative h-full w-auto max-h-full max-w-full overflow-hidden tech-border flex items-center justify-center"
        style={{ aspectRatio: currentAspectRatio, height: "100%" }}
      >
        <motion.img
          key={currentImageIndex}
          src={images[currentImageIndex].url}
          alt={images[currentImageIndex].caption || "Project image"}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="max-w-full max-h-full w-auto h-auto object-contain"
          onLoad={(event) => {
            const target = event.currentTarget;
            if (target.naturalWidth && target.naturalHeight) {
              setAspectRatio(target.naturalWidth / target.naturalHeight);
            }
          }}
        />
      </div>

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
  onSelectProject: (projectIndex: number) => void;
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
        className="overflow-x-auto overflow-y-visible scrollbar-hide cursor-grab active:cursor-grabbing pb-6 pt-4"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        <div className="inline-flex gap-6 px-4 py-2">
          {infiniteProjects.map((project, index) => {
            const projectIndex = projects.indexOf(project);
            return (
            <div
              key={`${project.id}-${index}`}
              className="shrink-0 w-48 h-48 relative group cursor-pointer transition-transform duration-300 hover:scale-110 hover:z-10"
              onClick={() => !isDragging && onSelectProject(projectIndex)}
            >
              <div className="w-full h-full rounded-lg overflow-hidden">
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
          );
          })}
        </div>
      </div>
      <style>{`.scrollbar-hide::-webkit-scrollbar { display: none; }`}</style>
    </div>
  );
};

// Project detail modal
const ProjectModal: React.FC<{
  project: Project | null;
  projectIndex: number;
  totalProjects: number;
  onSelectProject: (projectIndex: number) => void;
  onClose: () => void;
  onPreviousProject: () => void;
  onNextProject: () => void;
  direction: number;
}> = ({ project, projectIndex, totalProjects, onSelectProject, onClose, onPreviousProject, onNextProject, direction }) => {
  if (!project) return null;

  const [activeImageIndex, setActiveImageIndex] = useState(0);

  useEffect(() => {
    setActiveImageIndex(0);
  }, [project.id]);

  const slideVariants = {
    enter: (slideDirection: number) =>
      slideDirection === 0
        ? { x: 0, opacity: 1 }
        : {
            x: slideDirection > 0 ? "100%" : "-100%",
            opacity: 0,
          },
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (slideDirection: number) =>
      slideDirection === 0
        ? { x: 0, opacity: 1 }
        : {
            x: slideDirection > 0 ? "-100%" : "100%",
            opacity: 0,
          },
  };

  const visibleDotCount = Math.min(7, totalProjects);
  const dotHalf = Math.floor(visibleDotCount / 2);
  const dotIndices = Array.from({ length: visibleDotCount }, (_, i) =>
    (projectIndex - dotHalf + i + totalProjects) % totalProjects
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 sm:p-6"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="relative bg-background border border-black/10 w-full h-full max-w-none max-h-none overflow-hidden"
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 hover:bg-primary/20 rounded-sm transition-colors"
          aria-label="Close modal"
        >
          <X className="w-6 h-6 text-foreground" />
        </button>

        <div className="h-full p-6 md:p-8 flex flex-col overflow-hidden">
          <div className="relative flex-1 min-h-0 overflow-hidden">
            <AnimatePresence mode="sync" custom={direction}>
              <motion.div
                key={project.id}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="absolute inset-0 grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-8 min-h-0"
              >
              {/* Image carousel */}
              <div className="flex flex-col gap-4 min-h-0">
                <div className="flex-1 min-h-0">
                  <ImageCarousel
                    images={project.images}
                    onImageChange={setActiveImageIndex}
                  />
                </div>
                <p className="text-xs font-mono text-muted-foreground">
                  {project.images.length} image{project.images.length !== 1 ? "s" : ""} •{" "}
                  {project.title}
                  {project.images[activeImageIndex]?.caption
                    ? ` • ${project.images[activeImageIndex]?.caption}`
                    : ""}
                </p>
              </div>

              {/* Project details */}
              <div className="flex flex-col gap-6 min-h-0">
                {/* Title */}
                <div>
                  <h2 className="text-3xl font-bold font-display mb-2">
                    {project.title}
                  </h2>
                  <div className="w-12 h-1 bg-primary" />
                </div>

                {/* Description */}
                <div>
                  <p className="text-foreground leading-relaxed text-sm md:text-base">
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
              </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="mt-auto pt-6 flex items-center justify-center gap-4">
            <button
              onClick={onPreviousProject}
              className="p-3 text-primary transition-all duration-200 ease-out hover:scale-125 active:scale-90 active:opacity-60"
              aria-label="Previous project"
            >
              <ChevronLeft className="w-8 h-8" />
            </button>

            <div className="relative flex items-center px-2">
              <div className="pointer-events-none absolute inset-y-0 left-0 w-6 bg-gradient-to-r from-background to-transparent" />
              <div className="pointer-events-none absolute inset-y-0 right-0 w-6 bg-gradient-to-l from-background to-transparent" />
              <motion.div
                key={`project-dot-row-${projectIndex}`}
                initial={{ x: direction > 0 ? 10 : -10, opacity: 0.6 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="flex items-center gap-2"
              >
                {dotIndices.map((dotProjectIndex, i) => {
                  const distance = Math.abs(i - dotHalf);
                  const baseOpacity = Math.max(0.2, 1 - distance / (dotHalf + 1));
                  const isActive = dotProjectIndex === projectIndex;
                  return (
                    <motion.button
                      key={`project-dot-${dotProjectIndex}-${i}`}
                      type="button"
                      onClick={() => onSelectProject(dotProjectIndex)}
                      className={cn(
                        "h-2 w-2 rounded-full border border-primary/70",
                        isActive ? "bg-primary shadow-[0_0_8px_rgba(244,63,94,0.4)]" : "bg-transparent"
                      )}
                      animate={{
                        opacity: isActive ? 1 : baseOpacity,
                        scale: isActive ? 1.2 : 1 - distance * 0.1,
                      }}
                      transition={{ duration: 0.2, ease: "easeOut" }}
                      aria-label={`Go to project ${dotProjectIndex + 1}`}
                    />
                  );
                })}
              </motion.div>
            </div>

            <button
              onClick={onNextProject}
              className="p-3 text-primary transition-all duration-200 ease-out hover:scale-125 active:scale-90 active:opacity-60"
              aria-label="Next project"
            >
              <ChevronRight className="w-8 h-8" />
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

// Main Portfolio component
export default function Portfolio() {
  const [selectedProjectIndex, setSelectedProjectIndex] = useState<number | null>(null);
  const [isMounted, setIsMounted] = useState(false);
  const [projectDirection, setProjectDirection] = useState(1);
  const selectedProject =
    selectedProjectIndex === null ? null : PROJECTS[selectedProjectIndex];

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    if (selectedProject) {
      document.body.style.overflow = "hidden";
      document.body.classList.add("portfolio-modal-open");
    } else {
      document.body.style.overflow = originalOverflow;
      document.body.classList.remove("portfolio-modal-open");
    }
    return () => {
      document.body.style.overflow = originalOverflow;
      document.body.classList.remove("portfolio-modal-open");
    };
  }, [selectedProject]);

  useEffect(() => {
    if (selectedProjectIndex === null) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        setProjectDirection(-1);
        setSelectedProjectIndex((prev) =>
          prev === null ? prev : (prev - 1 + PROJECTS.length) % PROJECTS.length
        );
      }
      if (event.key === "ArrowRight") {
        event.preventDefault();
        setProjectDirection(1);
        setSelectedProjectIndex((prev) =>
          prev === null ? prev : (prev + 1) % PROJECTS.length
        );
      }
      if (event.key === "Escape") {
        event.preventDefault();
        setSelectedProjectIndex(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedProjectIndex]);

  return (
    <section
      id="portfolio"
      className="relative py-20 md:py-32 min-h-screen flex flex-col justify-center max-w-7xl mx-auto px-4 sm:px-6 md:px-12 bg-background overflow-hidden"
    >
      <div className="relative z-10">
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
          className="relative"
        >
          <InfiniteThumbnailCarousel
            projects={PROJECTS}
            onSelectProject={(projectIndex) => {
              setProjectDirection(0);
              setSelectedProjectIndex(projectIndex);
            }}
          />
          <div className="pointer-events-none absolute inset-y-0 left-0 w-24 sm:w-32 bg-gradient-to-r from-background via-background/50 to-transparent z-20" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-24 sm:w-32 bg-gradient-to-l from-background via-background/50 to-transparent z-20" />
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
        {isMounted &&
          createPortal(
            <AnimatePresence>
              {selectedProject && (
                <ProjectModal
                  project={selectedProject}
                  projectIndex={selectedProjectIndex ?? 0}
                  totalProjects={PROJECTS.length}
                  onSelectProject={(nextIndex) => {
                    setSelectedProjectIndex((prev) => {
                      if (prev === null) return nextIndex;
                      const offset = nextIndex - prev;
                      setProjectDirection(offset >= 0 ? 1 : -1);
                      return nextIndex;
                    });
                  }}
                  onClose={() => setSelectedProjectIndex(null)}
                  direction={projectDirection}
                  onPreviousProject={() =>
                    setSelectedProjectIndex((prev) => {
                      setProjectDirection(-1);
                      return prev === null
                        ? prev
                        : (prev - 1 + PROJECTS.length) % PROJECTS.length;
                    })
                  }
                  onNextProject={() =>
                    setSelectedProjectIndex((prev) => {
                      setProjectDirection(1);
                      return prev === null ? prev : (prev + 1) % PROJECTS.length;
                    })
                  }
                />
              )}
            </AnimatePresence>,
            document.body
          )}
      </div>
    </section>
  );
}
