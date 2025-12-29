import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

// Preload critical vendor chunks for faster async chunk loading
const preloadChunks = () => {
  // Preload sections that are likely to be scrolled to
  const sections = ['vendor-animation', 'vendor-forms', 'chunk-skills', 'chunk-projects'];
  sections.forEach(chunk => {
    const link = document.createElement('link');
    link.rel = 'modulepreload';
    link.href = `/assets/${chunk}-*.js`; // Vite will resolve the actual name
    document.head.appendChild(link);
  });
};

// Minimal preload on connection
if ('connection' in navigator && (navigator as any).connection?.saveData === false) {
  preloadChunks();
}

createRoot(document.getElementById("root")!).render(<App />);

