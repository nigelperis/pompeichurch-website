import { useEffect, useRef } from "react";

interface Flake {
  x: number;
  y: number;
  r: number;
  speed: number;
  drift: number;
  turbulence: number;
}

interface PileFlake {
  x: number;
  y: number;
  r: number;
}

export default function SnowWithPile() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pileRef = useRef<PileFlake[]>([]);
  const animationFrameRef = useRef<number>(0);
  const windRef = useRef<number>(0);
  const windTargetRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const flakes: Flake[] = [];

    function createFlake(): Flake {
      return {
        x: Math.random() * (canvas?.width || 0),
        y: -10,
        r: Math.random() * 3 + 1,
        speed: Math.random() * 1 + 0.5,
        drift: (Math.random() - 0.5) * 0.5,
        turbulence: Math.random() * 0.3,
      };
    }

    // initial snow
    for (let i = 0; i < 80; i++) flakes.push(createFlake());

    // Wind gust system
    function updateWind() {
      // Randomly change wind target every 2-4 seconds
      if (Math.random() < 0.01) {
        windTargetRef.current = (Math.random() - 0.5) * 3;
      }

      // Smoothly transition to target wind
      windRef.current += (windTargetRef.current - windRef.current) * 0.02;
    }

    function animate() {
      if (!canvas || !ctx) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      updateWind();

      pileRef.current.forEach((p) => {
        ctx.fillStyle = "rgba(100, 150, 200, 0.3)";
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = "#E8F4F8";
        ctx.beginPath();
        ctx.arc(p.x - 0.5, p.y - 0.5, p.r, 0, Math.PI * 2);
        ctx.fill();
      });

      flakes.forEach((flake, i) => {
        const turbulenceX = (Math.random() - 0.5) * flake.turbulence;
        const turbulenceY = (Math.random() - 0.5) * flake.turbulence * 0.5;

        flake.y += flake.speed + turbulenceY;
        flake.x += flake.drift + windRef.current + turbulenceX;

        if (flake.x > canvas.width) flake.x = 0;
        if (flake.x < 0) flake.x = canvas.width;

        if (flake.y >= canvas.height - flake.r) {
          pileRef.current.push({
            x: flake.x,
            y: canvas.height - flake.r,
            r: flake.r,
          });
          flakes[i] = createFlake();
        }

        ctx.fillStyle = "rgba(100, 150, 200, 0.2)";
        ctx.beginPath();
        ctx.arc(flake.x, flake.y, flake.r, 0, Math.PI * 2);
        ctx.fill();

        ctx.beginPath();
        ctx.arc(flake.x - 0.5, flake.y - 0.5, flake.r, 0, Math.PI * 2);
        ctx.fillStyle = "#E8F4F8";
        ctx.fill();
      });

      animationFrameRef.current = requestAnimationFrame(animate);
    }

    animate();

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  const clearPile = () => {
    pileRef.current = [];
  };

  return (
    <>
      <canvas
        ref={canvasRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          pointerEvents: "none",
          zIndex: 9999,
          background: "transparent",
        }}
      />

      <button
        onClick={clearPile}
        style={{
          position: "fixed",
          bottom: 20,
          left: 20,
          zIndex: 10000,
          padding: "8px 14px",
          background: "rgba(255, 255, 255, 0.8)",
          color: "#333",
          borderRadius: "6px",
          cursor: "pointer",
        }}
      >
        Clear Snow ❄️
      </button>
    </>
  );
}
