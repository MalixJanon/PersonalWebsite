import { Play, Pause } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import cover1 from "@assets/generated_images/abstract_album_art_orange_geometric.png";
import cover2 from "@assets/generated_images/abstract_album_art_cyan_glitch.png";

const tracks = [
  { id: 1, title: "NEON_DRIFT", duration: "3:45", bpm: 128, cover: cover1, waveform: [40, 60, 30, 80, 50, 90, 30, 40, 70, 50, 60, 40, 80, 90, 20, 40] },
  { id: 2, title: "SYSTEM_FAILURE", duration: "2:12", bpm: 140, cover: cover2, waveform: [80, 90, 60, 40, 20, 50, 80, 90, 70, 60, 30, 20, 50, 80, 90, 70] },
];

export default function Music() {
  const [activeTrack, setActiveTrack] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlay = (id: number) => {
    if (activeTrack === id) {
      setIsPlaying(!isPlaying);
    } else {
      setActiveTrack(id);
      setIsPlaying(true);
    }
  };

  return (
    <section id="audio" className="py-32 min-h-screen flex flex-col justify-center max-w-7xl mx-auto px-6 md:px-12">
      <div className="flex items-end justify-between mb-16 border-b border-white/10 pb-4 sticky top-20 z-20 bg-background/80 backdrop-blur-sm py-4">
        <h2 className="text-4xl md:text-6xl font-display font-bold text-right w-full">
          MUSIC
        </h2>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {tracks.map((track, index) => (
          <motion.div 
            key={track.id} 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.2 }}
            className={cn(
              "tech-border p-6 bg-card/50 backdrop-blur-sm transition-all duration-300 group hover:bg-card hover:border-primary/50",
              activeTrack === track.id ? "border-primary shadow-[0_0_20px_rgba(255,69,0,0.2)]" : ""
            )}
          >
            <div className="flex gap-6">
              <div className="relative w-32 h-32 shrink-0 overflow-hidden tech-border">
                <img 
                  src={track.cover} 
                  alt={track.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0" 
                />
                <div className="absolute inset-0 bg-black/20" />
                <button 
                  onClick={() => togglePlay(track.id)}
                  className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-[2px]"
                >
                  {activeTrack === track.id && isPlaying ? (
                    <Pause className="w-8 h-8 text-primary fill-current" />
                  ) : (
                    <Play className="w-8 h-8 text-white fill-white" />
                  )}
                </button>
              </div>

              <div className="flex flex-col justify-between flex-1 py-1">
                <div>
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="font-display text-2xl font-bold group-hover:text-primary transition-colors">{track.title}</h3>
                    <span className="font-mono text-xs text-muted-foreground border border-white/10 px-2 py-0.5 rounded-sm bg-black/40">
                      {track.bpm} BPM
                    </span>
                  </div>
                  <p className="text-primary font-mono text-xs tracking-widest">ORIGINAL MIX</p>
                </div>

                {/* Visualizer Bar */}
                <div className="flex items-end justify-between h-12 gap-1 mt-4">
                  {track.waveform.map((height, i) => (
                    <div 
                      key={i}
                      className={cn(
                        "w-full bg-white/10 transition-all duration-300 rounded-t-sm",
                        activeTrack === track.id && isPlaying ? "animate-pulse bg-primary" : ""
                      )}
                      style={{ 
                        height: `${height}%`,
                        animationDelay: `${i * 0.05}s`
                      }}
                    />
                  ))}
                </div>

                <div className="flex justify-between items-center mt-2 font-mono text-xs text-muted-foreground">
                  <span>{activeTrack === track.id ? "0:45" : "0:00"}</span>
                  <span>{track.duration}</span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
