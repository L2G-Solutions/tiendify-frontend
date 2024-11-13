'use client';

import createGlobe, { COBEOptions } from 'cobe';
import { useEffect, useRef } from 'react';
import { useSpring } from '@react-spring/web';
import { twMerge } from 'tailwind-merge';

const GLOBE_CONFIG: COBEOptions = {
  width: 800,
  height: 800,
  onRender: () => {},
  devicePixelRatio: 2,
  phi: 0,
  theta: 0.3,
  dark: 0,
  diffuse: 0.4,
  mapSamples: 16000,
  mapBrightness: 1.2,
  baseColor: [1, 1, 1],
  markerColor: [243 / 255, 18 / 255, 96 / 255],
  glowColor: [1, 1, 1],
  markers: [],
};

export function Globe({
  className,
  globeConfig = GLOBE_CONFIG,
  selectedMarker,
}: {
  className?: string;
  globeConfig?: Partial<COBEOptions>;
  selectedMarker?: { latitude: number; longitude: number };
}) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const pointerInteracting = useRef<number | null>(null);
  const pointerInteractionMovement = useRef(0);

  const config: COBEOptions = { ...GLOBE_CONFIG, ...globeConfig };

  const [{ r, l }, api] = useSpring(() => ({
    r: 0,
    l: 0.3,
    config: {
      mass: 1,
      tension: 280,
      friction: 40,
      precision: 0.001,
    },
  }));

  useEffect(() => {
    if (!canvasRef.current) return;

    let width = 0;

    const onResize = () => {
      if (canvasRef.current) {
        width = canvasRef.current.offsetWidth;
      }
    };

    window.addEventListener('resize', onResize);
    onResize();

    const globe = createGlobe(canvasRef.current, {
      ...config,
      onRender: (state) => {
        state.phi = r.get();
        state.theta = l.get();
        state.width = width * 2;
        state.height = width * 2;
      },
    });

    setTimeout(() => {
      if (canvasRef.current) {
        canvasRef.current.style.opacity = '1';
      }
    }, 0);

    return () => {
      globe.destroy();
      window.removeEventListener('resize', onResize);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (selectedMarker) {
      const phi = Math.PI - ((selectedMarker.longitude * Math.PI) / 180 - Math.PI / 2);
      const theta = (selectedMarker.latitude * Math.PI) / 180;

      api.start({
        r: phi,
        l: theta,
      });
    }
  }, [selectedMarker, api]);

  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    pointerInteracting.current = e.clientX - pointerInteractionMovement.current;
    if (canvasRef.current) {
      canvasRef.current.style.cursor = 'grabbing';
    }
  };

  const handlePointerUp = () => {
    pointerInteracting.current = null;
    if (canvasRef.current) {
      canvasRef.current.style.cursor = 'grab';
    }
  };

  const handlePointerOut = () => {
    pointerInteracting.current = null;
    if (canvasRef.current) {
      canvasRef.current.style.cursor = 'grab';
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (pointerInteracting.current !== null) {
      const delta = e.clientX - pointerInteracting.current;
      pointerInteractionMovement.current = delta;
      api.start({
        r: delta / 200,
      });
    }
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLCanvasElement>) => {
    if (pointerInteracting.current !== null && e.touches[0]) {
      const delta = e.touches[0].clientX - pointerInteracting.current;
      pointerInteractionMovement.current = delta;
      api.start({
        r: delta / 100,
      });
    }
  };

  return (
    <div className={twMerge('w-full max-w-[700px] aspect-square mx-auto relative', className)}>
      <canvas
        ref={canvasRef}
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        onPointerOut={handlePointerOut}
        onMouseMove={handleMouseMove}
        onTouchMove={handleTouchMove}
        className="w-full h-full cursor-grab opacity-0 transition-opacity duration-500 ease-in-out [contain layout paint size]"
      />
    </div>
  );
}
