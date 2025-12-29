# Website Performance Optimization Guide

This document outlines the performance optimizations implemented in your portfolio website to ensure excellent performance across all hardware types.

## 1. Bundle & Build Optimization

### Vite Configuration Enhancements
**Location:** [vite.config.ts](vite.config.ts)

- **Code Splitting:** Vendor dependencies are split into separate chunks for better caching:
  - `vendor-react`: React core libraries
  - `vendor-animation`: Framer Motion
  - `vendor-ui`: Radix UI components
  - `vendor-forms`: Form handling libraries
  - `vendor-query`: React Query
  - `vendor-misc`: Utility libraries (lucide-react, cmdk, etc.)

- **Minification:** Terser is configured to:
  - Remove console logs in production
  - Optimize code size
  
- **Target:** Modern browsers (ESNext) for smaller bundles with better performance

- **Chunk Size Warnings:** Set to 500KB to catch performance regressions

### Benefits:
- Faster initial load (smaller main bundle)
- Better browser caching (vendor bundles rarely change)
- Parallel downloads of independent chunks
- Faster time to interactive (TTI)

---

## 2. Animation Performance Optimization

### Reduced Motion Support
**Location:** [client/src/components/sections/Hero.tsx](client/src/components/sections/Hero.tsx)

Animations respect the user's `prefers-reduced-motion` CSS media query:
```typescript
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
```

**Impact:**
- Users with vestibular disorders or motion sensitivity have a better experience
- Animations are disabled for better performance on low-end devices
- Spring animations use reduced stiffness for smoother transitions on lower-end hardware

### Motion Preference Hook
**Location:** [client/src/hooks/use-motion-preference.ts](client/src/hooks/use-motion-preference.ts)

- Detects user preference for reduced motion
- Listens for preference changes (e.g., in system settings)
- Can be used across components to conditionally render animations

---

## 3. Device Capability Detection

**Location:** [client/src/hooks/use-device-capabilities.ts](client/src/hooks/use-device-capabilities.ts)

Automatically detects and adapts to hardware capabilities:

```typescript
interface DeviceCapabilities {
  hasGPU: boolean;           // WebGL support
  cpuCores: number;          // Hardware concurrency
  deviceMemory: number;      // Available RAM in GB
  isLowPowerDevice: boolean; // Battery saver mode, etc.
  isSlowConnection: boolean; // Slow network detection
  supportsWebGL: boolean;    // GPU acceleration
  maxFrameRate: number;      // 30 or 60 FPS target
}
```

**How it works:**
- Detects WebGL support for GPU acceleration
- Reads CPU cores from `navigator.hardwareConcurrency`
- Checks device memory availability
- Detects low-power mode (iOS, Android)
- Detects slow connections (3G detection)

**Usage:** Components can conditionally disable expensive features on low-end devices

---

## 4. Particle Canvas Optimization

**Location:** [client/src/components/ui/particles.tsx](client/src/components/ui/particles.tsx)

### FPS Limiting
- Target FPS adjusted based on device capabilities (30 FPS on low-end, 60 on high-end)
- Frame skipping prevents unnecessary rendering on slower devices
- Adaptive particle count reduces memory pressure

### Device-Aware Rendering
- **Low-power devices:** 40% fewer particles, no glow effects
- **Regular devices:** Full particle density with interactive glow
- **Slow connections:** Reduced particle update frequency

### Performance Features:
- Efficient particle pooling (reuse particles instead of creating new ones)
- Bounds checking to remove off-screen particles
- Delta time calculation for frame-rate independent animation
- Damped velocity for smooth interactions

---

## 5. Image Optimization

**Location:** [client/src/components/ui/optimized-image.tsx](client/src/components/ui/optimized-image.tsx)

### OptimizedImage Component
A drop-in replacement for `<img>` tags with built-in optimizations:

```tsx
<OptimizedImage 
  src={imageUrl}
  alt="Description"
  loading="lazy"
  fadeInDuration={300}
  width={400}
  height={300}
/>
```

**Features:**
- **Lazy Loading:** Uses IntersectionObserver to load images only when near viewport
- **Placeholder:** Shows blur placeholder while loading
- **Fade-in Animation:** Smooth transition when image loads
- **Automatic Unobserving:** Observer cleaned up after image loads

**Benefits:**
- Reduces initial page load time
- Lower bandwidth usage for users who don't scroll to all sections
- Smoother visual experience with placeholder skeleton

---

## 6. Performance Monitoring

**Location:** [client/src/hooks/use-performance-monitoring.ts](client/src/hooks/use-performance-monitoring.ts)

### Real-time Metrics
```typescript
const metrics = usePerformanceMonitoring();
// Returns: { fps, memoryUsage, renderTime, isPerformanceGood }
```

**Available Metrics:**
- **FPS:** Frames per second (updated every second)
- **Memory Usage:** JS heap size in MB (Chrome/Edge only)
- **Render Time:** Time to render last frame
- **Performance Status:** Boolean indicating if performance is good (FPS ≥ 50, frame time < 33ms)

**Usage:** Can be used to create a performance dashboard or trigger adaptive rendering

---

## 7. Best Practices for Optimal Performance

### For Development
1. **Monitor Bundle Size:** Use Vite's build analysis
   ```bash
   npm run build
   ```

2. **Test on Real Devices:** Use Chrome DevTools throttling:
   - Network: Slow 4G, Fast 3G, Offline
   - CPU: 4x, 6x slowdown
   - Device emulation: Android, iPhone

3. **Profile Performance:** Use Lighthouse, WebPageTest
   ```bash
   npm run dev  # Development server
   ```

### For Users
1. **Enable Hardware Acceleration:** In browser settings for better GPU utilization
2. **Use Modern Browsers:** Chrome, Edge, Safari (modern versions)
3. **On Low-End Devices:**
   - Enable "Reduce motion" in OS settings for better performance
   - Use Chrome's "Lite mode" for data savings
   - Consider disabling browser extensions

### For Deployment
1. **Enable Compression:** Ensure your server compresses responses (gzip/brotli)
2. **Set Cache Headers:** 
   - Vendor chunks: 1 year
   - App chunks: 1 week
   - HTML: No cache (or short TTL)
3. **Use CDN:** Distribute content globally
4. **Monitor Performance:** Set up performance budgets in CI/CD

---

## 8. Testing Performance

### Automated Testing
Add to your CI/CD pipeline:
```bash
# Lighthouse CI
npm install -g @lhci/cli
lhci autorun

# Bundle analysis
npm run build -- --analyze
```

### Manual Testing Checklist
- [ ] Test on slow 3G network
- [ ] Test on 6x CPU slowdown
- [ ] Test on low-end device (4GB RAM, 2 cores)
- [ ] Test with "Reduce motion" enabled
- [ ] Check Core Web Vitals
- [ ] Verify lazy loading works
- [ ] Check FPS with DevTools

---

## 9. Future Optimizations to Consider

1. **Service Worker:** Cache static assets for offline support
2. **Streaming:** Progressive HTML rendering for faster FCP
3. **WebP Images:** Use modern formats with fallbacks
4. **Compression:** Next-gen image formats (AVIF)
5. **Resource Hints:** Prefetch/preload critical resources
6. **Dynamic Imports:** Code split routes and heavy components
7. **Virtualization:** For long lists (if needed)

---

## 10. Performance Targets

| Metric | Target | Current |
|--------|--------|---------|
| Lighthouse Score | 90+ | TBD |
| First Contentful Paint (FCP) | < 1.8s | TBD |
| Largest Contentful Paint (LCP) | < 2.5s | TBD |
| Cumulative Layout Shift (CLS) | < 0.1 | TBD |
| Time to Interactive (TTI) | < 3.8s | TBD |
| Total Bundle Size | < 200KB gzip | TBD |

---

## 11. Implementation Guide

### Using Device Capabilities
```tsx
import { useDeviceCapabilities } from '@/hooks/use-device-capabilities';

export function MyComponent() {
  const { isLowPowerDevice, maxFrameRate } = useDeviceCapabilities();
  
  return (
    <motion.div
      animate={{ opacity: 1 }}
      transition={{ duration: isLowPowerDevice ? 0.5 : 0.3 }}
    >
      Adapts based on device
    </motion.div>
  );
}
```

### Using Motion Preference
```tsx
import { useMotionPreference } from '@/hooks/use-motion-preference';

export function MyComponent() {
  const prefersReducedMotion = useMotionPreference();
  
  return prefersReducedMotion ? (
    <div>No animation version</div>
  ) : (
    <motion.div animate={{ x: 100 }} />
  );
}
```

### Using OptimizedImage
```tsx
import { OptimizedImage } from '@/components/ui/optimized-image';

export function Gallery() {
  return (
    <OptimizedImage
      src="path/to/large-image.jpg"
      alt="Portfolio project"
      loading="lazy"
      width={800}
      height={600}
    />
  );
}
```

---

## Resources

- [Web.dev - Performance](https://web.dev/performance/)
- [Framer Motion Performance](https://www.framer.com/motion/performance/)
- [React Performance](https://react.dev/learn/render-and-commit)
- [MDN - Intersection Observer](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API)
- [Network Information API](https://developer.mozilla.org/en-US/docs/Web/API/Network_Information_API)

