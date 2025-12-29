import { useEffect, useState } from 'react';

export interface DeviceCapabilities {
  hasGPU: boolean;
  cpuCores: number;
  deviceMemory: number; // in GB
  isLowPowerDevice: boolean;
  isSlowConnection: boolean;
  supportsWebGL: boolean;
  maxFrameRate: number;
}

export function useDeviceCapabilities(): DeviceCapabilities {
  const [capabilities, setCapabilities] = useState<DeviceCapabilities>({
    hasGPU: true,
    cpuCores: 4,
    deviceMemory: 8,
    isLowPowerDevice: false,
    isSlowConnection: false,
    supportsWebGL: true,
    maxFrameRate: 60,
  });

  useEffect(() => {
    if (typeof navigator === 'undefined') return;

    // Detect GPU via WebGL
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl2') || canvas.getContext('webgl');
    const hasGPU = gl !== null;

    // Get device memory (may not be available on all browsers)
    const deviceMemory = (navigator as any).deviceMemory || 8;

    // Get CPU cores (may not be available on all browsers)
    const cpuCores = navigator.hardwareConcurrency || 4;

    // Detect low power mode (iOS specific)
    const isLowPowerDevice = (navigator as any).getBattery
      ? true
      : window.matchMedia?.('(prefers-reduced-data: reduce)').matches || false;

    // Detect slow connection
    const connection = (navigator as any).connection;
    const isSlowConnection = connection?.effectiveType === '4g'
      ? false
      : connection?.effectiveType === '3g' || connection?.saveData
        ? true
        : false;

    // Estimate max frame rate based on device capabilities
    const maxFrameRate = isLowPowerDevice || cpuCores <= 2 ? 30 : 60;

    setCapabilities({
      hasGPU,
      cpuCores,
      deviceMemory,
      isLowPowerDevice,
      isSlowConnection,
      supportsWebGL: hasGPU,
      maxFrameRate,
    });
  }, []);

  return capabilities;
}
