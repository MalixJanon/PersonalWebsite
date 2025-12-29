import React, { useEffect, useRef, useState, useCallback, memo } from "react";
import { Play, Pause } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useDeviceCapabilities } from '@/hooks/use-device-capabilities';
import cover1 from "@assets/Cahya SSS Logo Final-01-01.webp";
import cover2 from "@assets/Quadrata Logo WonB Sq@2x.webp";

const tracks = [
  {
    id: 1,
    title: "SALTED_CARAMEL",
    duration: "3:26",
    bpm: "CHILL",
    cover: cover1,
    audioUrl: "/audio/SALTED_CARAMEL.wav",
    waveform: new Array(32).fill(10),
  },
  {
    id: 2,
    title: "ARKSID",
    duration: "1:16",
    bpm: "ACTION",
    cover: cover2,
    audioUrl: "/audio/ARKSID.mp3",
    waveform: new Array(32).fill(10),
  },
];

export default function Music() {
  const [activeTrack, setActiveTrack] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [frequencyData, setFrequencyData] = useState<number[]>(Array(32).fill(0));
  const [isDragging, setIsDragging] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const sourceRef = useRef<MediaElementAudioSourceNode | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const containerRef = useRef<HTMLElement | null>(null);
  const [isVisible, setIsVisible] = useState(true);
  const deviceCapabilities = useDeviceCapabilities();
  const progressBarRefs = useRef<Map<number, HTMLDivElement>>(new Map());
  const barElementsRef = useRef<Map<number, HTMLDivElement[]>>(new Map());
  const lastUpdateTimeRef = useRef<number>(0);
  const BASE_UPDATE_INTERVAL = 50; // Update every 50ms instead of every frame (~20fps)

  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
      if (audioContextRef.current) {
        audioContextRef.current.close();
        audioContextRef.current = null;
      }
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play();
        startFrequencyAnalysis();
      } else {
        audioRef.current.pause();
        stopFrequencyAnalysis();
      }
    }
  }, [isPlaying]);

  const startFrequencyAnalysis = () => {
    if (!audioRef.current || !analyserRef.current) return;

    const analyser = analyserRef.current;
    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
    const bars = 32;
    const step = Math.floor(bufferLength / bars);

    // Adjust interval based on device capabilities
    const UPDATE_INTERVAL = deviceCapabilities.isLowPowerDevice ? 200 : BASE_UPDATE_INTERVAL;

    const updateFrequencies = (timestamp: number) => {
      // If the section is not visible or device is low-power, keep frequencies zeroed
      if (!isVisible || deviceCapabilities.isLowPowerDevice) {
        setFrequencyData(Array(bars).fill(0));
        animationFrameRef.current = requestAnimationFrame(updateFrequencies);
        return;
      }

      // Throttle updates to reduce CPU usage
      if (timestamp - lastUpdateTimeRef.current < UPDATE_INTERVAL) {
        animationFrameRef.current = requestAnimationFrame(updateFrequencies);
        return;
      }
      lastUpdateTimeRef.current = timestamp;

      analyser.getByteFrequencyData(dataArray);
      
      const frequencies: number[] = [];
      for (let i = 0; i < bars; i++) {
        const start = i * step;
        const end = start + step;
        let sum = 0;
        for (let j = start; j < end; j++) {
          sum += dataArray[j];
        }
        const average = sum / step;
        frequencies.push(average / 255);
      }

      setFrequencyData(frequencies);
      animationFrameRef.current = requestAnimationFrame(updateFrequencies);
    };

    animationFrameRef.current = requestAnimationFrame(updateFrequencies);
  };

  const stopFrequencyAnalysis = () => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }
    setFrequencyData(Array(32).fill(0));
  };

  const togglePlay = (id: number) => {
    const track = tracks.find(t => t.id === id);
    if (!track) return;

    if (activeTrack === id) {
      setIsPlaying(!isPlaying);
    } else {
      // Switching to a different track - clean up previous audio completely
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = '';
        audioRef.current = null;
      }
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }
      if (sourceRef.current) {
        sourceRef.current.disconnect();
        sourceRef.current = null;
      }

      // Reset state before switching
      setIsPlaying(false);
      setCurrentTime(0);
      setDuration(0);
      setFrequencyData(Array(32).fill(0));
      
      // Small delay to ensure state updates before starting new track
      setTimeout(() => {
        if (!audioContextRef.current) {
          audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
        }

        const audioContext = audioContextRef.current;
        const analyser = audioContext.createAnalyser();
        analyser.fftSize = 512;
        analyserRef.current = analyser;

        const audio = new Audio(track.audioUrl);
        const source = audioContext.createMediaElementSource(audio);
        source.connect(analyser);
        analyser.connect(audioContext.destination);
        sourceRef.current = source;

        audio.addEventListener('timeupdate', () => {
          setCurrentTime(audio.currentTime);
        });
        audio.addEventListener('loadedmetadata', () => {
          setDuration(audio.duration);
        });
        audio.addEventListener('ended', () => {
          setIsPlaying(false);
          setCurrentTime(0);
          stopFrequencyAnalysis();
        });
        
        audioRef.current = audio;
        setActiveTrack(id);
        setIsPlaying(true);
        audio.play();
      }, 50);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleProgressClick = (trackId: number, e: React.MouseEvent<HTMLDivElement>) => {
    if (activeTrack !== trackId || !audioRef.current) return;
    
    const container = progressBarRefs.current.get(trackId);
    if (!container) return;
    
    const rect = container.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = x / rect.width;
    const newTime = percentage * duration;
    
    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const handleProgressDrag = (trackId: number, e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging || activeTrack !== trackId || !audioRef.current) return;
    
    const container = progressBarRefs.current.get(trackId);
    if (!container) return;
    
    const rect = container.getBoundingClientRect();
    const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
    const percentage = x / rect.width;
    const newTime = percentage * duration;
    
    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const handleMouseDown = () => {
    setIsDragging(true);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mouseup', handleMouseUp);
      return () => window.removeEventListener('mouseup', handleMouseUp);
    }
  }, [isDragging]);

  useEffect(() => {
    const node = containerRef.current || document.getElementById('audio');
    if (!node) return;
    const observer = new IntersectionObserver((entries) => {
      setIsVisible(entries.some((e) => e.isIntersecting));
    }, { threshold: 0.1 });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={(el) => (containerRef.current = el)} id="audio" className="py-20 md:py-32 min-h-screen flex flex-col justify-center max-w-7xl mx-auto px-4 sm:px-6 md:px-12 bg-background">
      <motion.div 
        className="flex items-end justify-between mb-12 md:mb-16 border-b-2 border-black/10 pb-4 sticky top-16 md:top-20 z-20 bg-background/90 backdrop-blur-sm py-4"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl sm:text-4xl md:text-6xl font-display font-bold text-right w-full text-foreground">
          MUSIC
        </h2>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-6 md:gap-8">
        {tracks.map((track, index) => {
          const isTrackActive = activeTrack === track.id;
          const isTrackPlaying = isTrackActive && isPlaying;
          const trackProgress = isTrackActive && duration > 0 ? currentTime / duration : 0;

          return (
            <motion.div 
              key={track.id} 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className={cn(
                "tech-border p-4 sm:p-6 bg-white/60 backdrop-blur-sm transition-all duration-300 hover:bg-white hover:border-primary/50 shadow-sm",
                isTrackActive ? "border-primary shadow-lg" : ""
              )}
            >
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
                <div className="relative w-full sm:w-32 aspect-square sm:h-32 shrink-0 overflow-hidden tech-border group/art cursor-pointer shadow-inner">
                  <img 
                    src={track.cover} 
                    alt={track.title} 
                    className={cn
                      ("w-full h-full object-cover transition-transform duration-700 group-hover/art:scale-110 group-hover/art:grayscale-0",
                      isTrackPlaying ? "grayscale-0" : "grayscale"
                    )}
                  />
                  <div className="absolute inset-0 bg-white/10 mix-blend-overlay" />
                  <button 
                    onClick={() => togglePlay(track.id)}
                    className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover/art:opacity-100 transition-opacity backdrop-blur-[2px]"
                  >
                    {isTrackPlaying ? (
                      <Pause className="w-8 h-8 text-primary fill-current" />
                    ) : (
                      <Play className="w-8 h-8 text-white fill-white" />
                    )}
                  </button>
                </div>

                <div className="flex-1 flex flex-col gap-3 min-w-0">
                  {/* Track Info */}
                  <div>
                    <div className="flex justify-between items-start mb-1 gap-2">
                      <h3 className="font-display text-xl sm:text-2xl font-bold group-hover:text-primary transition-colors line-clamp-1 text-foreground">{track.title}</h3>
                      <span className="font-mono text-[10px] sm:text-xs text-muted-foreground border border-black/10 px-2 py-0.5 bg-black/5 shrink-0 font-bold">
                        {track.bpm} 
                      </span>
                    </div>
                    <p className="text-primary font-mono text-[10px] sm:text-xs tracking-widest font-bold">ORIGINAL MIX</p>
                  </div>

                  {/* Vertical Bar Waveform */}
                  <div 
                    ref={(el) => {
                      if (el) progressBarRefs.current.set(track.id, el);
                      else progressBarRefs.current.delete(track.id);
                    }}
                    className={cn(
                      "h-16 sm:h-20 flex items-center gap-[3px] relative",
                      isTrackActive ? "cursor-pointer group/progress" : "cursor-default"
                    )}
                    onClick={(e) => handleProgressClick(track.id, e)}
                    onMouseMove={(e) => handleProgressDrag(track.id, e)}
                    onMouseDown={isTrackActive ? handleMouseDown : undefined}
                  >
                    {track.waveform.map((baseHeight, i) => {
                      const barProgress = i / track.waveform.length;
                      const isPast = isTrackActive && barProgress <= trackProgress;
                      
                      const height = isTrackActive && isTrackPlaying && frequencyData[i] > 0
                        ? Math.max(15, frequencyData[i] * 100)
                        : baseHeight;
                      
                      return (
                        <div 
                          key={i}
                          className="flex-1 h-full flex items-center pointer-events-none"
                        >
                          <div
                            className={cn(
                              "w-full rounded-full transition-[height,background-color] duration-100 pointer-events-none",
                              isPast
                                ? "bg-primary shadow-sm" 
                                : "bg-black/10"
                            )}
                            style={{ 
                              height: `${height}%`,
                              willChange: isTrackPlaying ? 'height' : 'auto'
                            }}
                          >
                            {isPast && (
                              <div className="w-full h-full bg-gradient-to-t from-transparent via-white/20 to-white/40 rounded-full pointer-events-none" />
                            )}
                          </div>
                        </div>
                      );
                    })}

                    {isTrackActive && (
                      <div className="absolute inset-0 opacity-0 group-hover/progress:opacity-100 transition-opacity pointer-events-none" />
                    )}
                  </div>

                  {/* Time Display */}
                  <div className="flex justify-between items-center font-mono text-[10px] sm:text-xs text-muted-foreground font-bold">
                    <span>{isTrackActive ? formatTime(currentTime) : "0:00"}</span>
                    <span>{track.duration}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}