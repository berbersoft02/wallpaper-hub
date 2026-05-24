"use client";

import { useCallback } from "react";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";
import type { Engine } from "tsparticles-engine";

const particleOptions = {
  background: {
    color: {
      value: "transparent",
    },
  },
  fpsLimit: 30, // Reduced from 60 to save GPU
  interactivity: {
    events: {
      onHover: {
        enable: true,
        mode: "grab" as const,
      },
      resize: true,
    },
    modes: {
      grab: {
        distance: 140,
        links: {
          opacity: 0.5,
          color: "#ff2a6d"
        },
      },
    },
  },
  particles: {
    color: {
      value: "#05d9e8",
    },
    links: {
      color: "#05d9e8",
      distance: 150,
      enable: true,
      opacity: 0.2,
      width: 1,
    },
    move: {
      direction: "none" as const,
      enable: true,
      outModes: {
        default: "bounce" as const,
      },
      random: false,
      speed: 0.8, // Slightly slower movement
      straight: false,
    },
    number: {
      density: {
        enable: true,
        area: 800,
      },
      value: 30, // Reduced from 60
    },
    opacity: {
      value: 0.5,
    },
    shape: {
      type: "circle",
    },
    size: {
      value: { min: 1, max: 3 },
    },
  },
  detectRetina: false, // Save processing on high-DPI screens
};

export default function ParticlesBackground() {
  const particlesInit = useCallback(async (engine: Engine) => {
    await loadSlim(engine);
  }, []);

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      className="absolute inset-0 z-0 pointer-events-auto"
      options={particleOptions}
    />
  );
}