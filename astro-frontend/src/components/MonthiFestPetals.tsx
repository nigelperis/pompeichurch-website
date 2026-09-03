import { useEffect, useRef, useState } from "react";

type ParticleKind = "petal" | "flower" | "paddy";

interface Particle {
  x: number;
  y: number;
  size: number;
  speed: number;
  drift: number;
  rotation: number;
  rotationSpeed: number;
  swayOffset: number;
  opacity: number;
  color: string;
  kind: ParticleKind;
}

interface MonthiFestPetalsProps {
  pauseLabel: string;
  playLabel: string;
}

const flowerPalette = ["#f7b2bd", "#f7d154", "#ef8f6b", "#fffdf6"];

export default function MonthiFestPetals({
  pauseLabel,
  playLabel,
}: MonthiFestPetalsProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number>(0);
  const particlesRef = useRef<Particle[]>([]);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    setIsRunning(
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    );
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    const resizeCanvas = () => {
      const pixelBudgetDpr = Math.sqrt(
        8_000_000 / (window.innerWidth * window.innerHeight),
      );
      const dpr = Math.max(
        1,
        Math.min(window.devicePixelRatio || 1, 1.5, pixelBudgetDpr),
      );
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    if (!isRunning) {
      particlesRef.current = [];
      context.clearRect(0, 0, window.innerWidth, window.innerHeight);
      return () => window.removeEventListener("resize", resizeCanvas);
    }

    const createParticle = (): Particle => {
      const chance = Math.random();
      const kind: ParticleKind =
        chance < 0.18 ? "paddy" : chance < 0.32 ? "flower" : "petal";

      return {
        x: Math.random() * window.innerWidth,
        y: -30 - Math.random() * 130,
        size: kind === "paddy" ? 10 + Math.random() * 5 : 6 + Math.random() * 7,
        speed: 0.45 + Math.random() * 0.75,
        drift: (Math.random() - 0.5) * 0.45,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.022,
        swayOffset: Math.random() * Math.PI * 2,
        opacity: 0.72 + Math.random() * 0.26,
        color:
          kind === "paddy"
            ? Math.random() > 0.5
              ? "#d9a928"
              : "#efc957"
            : flowerPalette[Math.floor(Math.random() * flowerPalette.length)],
        kind,
      };
    };

    const drawPetal = (particle: Particle) => {
      const { size } = particle;
      context.beginPath();
      context.moveTo(0, -size);
      context.bezierCurveTo(
        size * 0.8,
        -size * 0.45,
        size * 0.75,
        size * 0.5,
        0,
        size,
      );
      context.bezierCurveTo(
        -size * 0.75,
        size * 0.5,
        -size * 0.8,
        -size * 0.45,
        0,
        -size,
      );
      context.fillStyle = particle.color;
      context.fill();
      context.strokeStyle = "rgba(139, 86, 92, 0.14)";
      context.lineWidth = 0.7;
      context.stroke();
    };

    const drawFlower = (particle: Particle) => {
      for (let petal = 0; petal < 5; petal += 1) {
        context.save();
        context.rotate((Math.PI * 2 * petal) / 5);
        context.beginPath();
        context.ellipse(
          0,
          particle.size * 0.55,
          particle.size * 0.42,
          particle.size * 0.7,
          0,
          0,
          Math.PI * 2,
        );
        context.fillStyle = particle.color;
        context.fill();
        context.restore();
      }

      context.beginPath();
      context.arc(0, 0, particle.size * 0.3, 0, Math.PI * 2);
      context.fillStyle = "#d9a928";
      context.fill();
    };

    const drawPaddy = (particle: Particle) => {
      const { size } = particle;
      context.strokeStyle = "#8b8a36";
      context.lineWidth = 1.1;
      context.beginPath();
      context.moveTo(0, -size);
      context.quadraticCurveTo(size * 0.2, 0, 0, size);
      context.stroke();

      for (let grain = -2; grain <= 2; grain += 1) {
        const y = grain * size * 0.28;
        const side = grain % 2 === 0 ? 1 : -1;
        context.save();
        context.translate(side * size * 0.24, y);
        context.rotate(side * 0.55);
        context.beginPath();
        context.ellipse(0, 0, size * 0.17, size * 0.36, 0, 0, Math.PI * 2);
        context.fillStyle = particle.color;
        context.fill();
        context.restore();
      }
    };

    const drawParticle = (particle: Particle) => {
      context.save();
      context.translate(particle.x, particle.y);
      context.rotate(particle.rotation);
      context.globalAlpha = particle.opacity;

      if (particle.kind === "flower") drawFlower(particle);
      else if (particle.kind === "paddy") drawPaddy(particle);
      else drawPetal(particle);

      context.restore();
    };

    let previousFrameTime = 0;
    let effectIsActive = true;

    const animate = (frameTime: number) => {
      if (!effectIsActive) return;

      if (frameTime - previousFrameTime < 1000 / 30) {
        animationFrameRef.current = requestAnimationFrame(animate);
        return;
      }
      previousFrameTime = frameTime;

      context.clearRect(0, 0, window.innerWidth, window.innerHeight);

      const particleLimit = window.innerWidth < 640 ? 18 : 32;
      if (particlesRef.current.length < particleLimit && Math.random() < 0.22) {
        particlesRef.current.push(createParticle());
      }

      particlesRef.current = particlesRef.current.filter((particle) => {
        particle.y += particle.speed;
        particle.x +=
          particle.drift +
          Math.sin(particle.y * 0.012 + particle.swayOffset) * 0.38;
        particle.rotation += particle.rotationSpeed;

        drawParticle(particle);

        return (
          particle.y < window.innerHeight + 50 &&
          particle.x > -70 &&
          particle.x < window.innerWidth + 70
        );
      });

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    const handleVisibilityChange = () => {
      cancelAnimationFrame(animationFrameRef.current);
      if (!document.hidden) {
        previousFrameTime = 0;
        animationFrameRef.current = requestAnimationFrame(animate);
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    if (!document.hidden) {
      animationFrameRef.current = requestAnimationFrame(animate);
    }

    return () => {
      effectIsActive = false;
      cancelAnimationFrame(animationFrameRef.current);
      window.removeEventListener("resize", resizeCanvas);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [isRunning]);

  const controlLabel = isRunning ? pauseLabel : playLabel;

  return (
    <>
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-9999 bg-transparent"
      />
      <button
        type="button"
        aria-label={controlLabel}
        title={controlLabel}
        aria-pressed={!isRunning}
        onClick={() => setIsRunning((running) => !running)}
        className="fixed bottom-5 left-5 z-9999 grid size-11 cursor-pointer place-items-center rounded-full border border-[#d6b855]/60 bg-[#fffdf6]/95 text-lg text-[#185c70] shadow-lg backdrop-blur-sm transition hover:scale-105 hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#185c70]"
      >
        <span aria-hidden="true">{isRunning ? "❀" : "▶"}</span>
      </button>
    </>
  );
}
