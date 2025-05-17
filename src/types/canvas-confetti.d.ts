
declare module 'canvas-confetti' {
  interface ConfettiOptions {
    particleCount?: number;
    angle?: number;
    spread?: number;
    startVelocity?: number;
    decay?: number;
    gravity?: number;
    drift?: number;
    ticks?: number;
    origin?: {
      x?: number;
      y?: number;
    };
    colors?: string[];
    shapes?: string[];
    scalar?: number;
    zIndex?: number;
    disableForReducedMotion?: boolean;
  }

  type ConfettiBurst = (options?: ConfettiOptions) => Promise<null>;
  
  interface ConfettiGenerator {
    (options?: ConfettiOptions): null;
    reset: () => void;
    create: (canvas: HTMLCanvasElement, options?: { resize?: boolean, useWorker?: boolean }) => ConfettiBurst;
  }
  
  const confetti: ConfettiGenerator;
  
  export default confetti;
}
