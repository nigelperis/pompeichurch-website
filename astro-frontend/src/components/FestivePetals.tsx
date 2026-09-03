import { useEffect, useRef, useState } from "react";

type FestiveVariant = "easter" | "monthi";
type ParticleKind = "egg" | "flower";

interface Particle {
  kind: ParticleKind;
  x: number;
  y: number;
  size: number;
  speed: number;
  drift: number;
  rotation: number;
  rotationSpeed: number;
  swayOffset: number;
  wobble: number;
  opacity: number;
  color: string;
  accentColor?: string;
}

interface FestivePetalsProps {
  variant: FestiveVariant;
}

const easterPalette = [
  { color: "#F7C9A9", accentColor: "#F28C8C" },
  { color: "#F6D186", accentColor: "#B48E3E" },
  { color: "#B7E4C7", accentColor: "#4B8F72" },
  { color: "#A9DEF9", accentColor: "#4F88C6" },
  { color: "#E4C1F9", accentColor: "#A85DC4" },
  { color: "#FFC8DD", accentColor: "#E27AA4" },
];

const monthiFlowerPalette = ["#f7b2bd", "#f7d154", "#ef8f6b", "#fffdf6"];

function createParticle(
  variant: FestiveVariant,
  viewportWidth: number,
): Particle {
  if (variant === "easter") {
    const palette =
      easterPalette[Math.floor(Math.random() * easterPalette.length)] ??
      easterPalette[0];

    return {
      kind: "egg",
      x: Math.random() * viewportWidth,
      y: -40 - Math.random() * 120,
      size: 11 + Math.random() * 9,
      speed: 0.55 + Math.random() * 0.8,
      drift: (Math.random() - 0.5) * 0.65,
      rotation: Math.random() * Math.PI * 2,
      rotationSpeed: (Math.random() - 0.5) * 0.018,
      swayOffset: Math.random() * Math.PI * 2,
      wobble: 0.4 + Math.random() * 0.75,
      opacity: 1,
      color: palette.color,
      accentColor: palette.accentColor,
    };
  }

  return {
    kind: "flower",
    x: Math.random() * viewportWidth,
    y: -30 - Math.random() * 130,
    size: 6 + Math.random() * 7,
    speed: 0.45 + Math.random() * 0.75,
    drift: (Math.random() - 0.5) * 0.45,
    rotation: Math.random() * Math.PI * 2,
    rotationSpeed: (Math.random() - 0.5) * 0.022,
    swayOffset: Math.random() * Math.PI * 2,
    wobble: 0.38,
    opacity: 0.72 + Math.random() * 0.26,
    color:
      monthiFlowerPalette[
        Math.floor(Math.random() * monthiFlowerPalette.length)
      ] ?? monthiFlowerPalette[0],
  };
}

function drawEgg(context: CanvasRenderingContext2D, particle: Particle) {
  const { size, color, accentColor = color } = particle;

  context.save();
  context.beginPath();
  context.ellipse(0, 0, size * 0.75, size, 0, 0, Math.PI * 2);
  context.clip();

  const gradient = context.createRadialGradient(
    -size * 0.2,
    -size * 0.3,
    size * 0.1,
    0,
    0,
    size,
  );
  gradient.addColorStop(0, color);
  gradient.addColorStop(1, color);
  context.fillStyle = gradient;
  context.fill();

  context.strokeStyle = accentColor;
  context.lineWidth = size * 0.08;
  context.lineJoin = "round";
  context.lineCap = "round";

  const patternType = size % 1.3;

  if (patternType < 1) {
    context.beginPath();
    for (let line = -1; line <= 1; line += 0.5) {
      const y = line * size * 0.6;
      context.moveTo(-size, y);
      context.lineTo(-size * 0.4, y + size * 0.1);
      context.lineTo(0, y);
      context.lineTo(size * 0.4, y + size * 0.1);
      context.lineTo(size, y);
    }
    context.stroke();
  } else if (patternType < 2) {
    context.fillStyle = accentColor;
    const dotPositions = [
      [0, 0],
      [0.4, 0.4],
      [-0.4, 0.4],
      [0.4, -0.4],
      [-0.4, -0.4],
      [0, 0.7],
      [0, -0.7],
    ];

    dotPositions.forEach(([x, y]) => {
      context.beginPath();
      context.arc(x * size, y * size, size * 0.12, 0, Math.PI * 2);
      context.fill();
    });
  } else {
    context.beginPath();
    for (let line = -0.6; line <= 0.7; line += 0.4) {
      context.moveTo(-size, line * size);
      context.lineTo(size, line * size);
    }
    context.stroke();
  }

  context.restore();

  context.fillStyle = "rgba(255, 255, 255, 0.5)";
  context.beginPath();
  context.ellipse(
    -size * 0.25,
    -size * 0.4,
    size * 0.15,
    size * 0.25,
    Math.PI / 4,
    0,
    Math.PI * 2,
  );
  context.fill();

  context.strokeStyle = "rgba(0, 0, 0, 0.05)";
  context.lineWidth = 1;
  context.beginPath();
  context.ellipse(0, 0, size * 0.75, size, 0, 0, Math.PI * 2);
  context.stroke();
}

function drawFlower(context: CanvasRenderingContext2D, particle: Particle) {
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
}

export default function FestivePetals({ variant }: FestivePetalsProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number>(0);
  const particlesRef = useRef<Particle[]>([]);
  const [isRunning, setIsRunning] = useState(variant === "easter");

  useEffect(() => {
    if (variant === "easter") {
      setIsRunning(true);
      return;
    }

    setIsRunning(
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    );
  }, [variant]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    particlesRef.current = [];

    const resizeCanvas = () => {
      const dpr = (() => {
        if (variant === "easter") return window.devicePixelRatio || 1;

        const pixelBudgetDpr = Math.sqrt(
          8_000_000 / (window.innerWidth * window.innerHeight),
        );
        return Math.max(
          1,
          Math.min(window.devicePixelRatio || 1, 1.5, pixelBudgetDpr),
        );
      })();

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

    let previousFrameTime = 0;
    let effectIsActive = true;

    const animate = (frameTime: number) => {
      if (!effectIsActive) return;

      if (variant === "monthi" && frameTime - previousFrameTime < 1000 / 30) {
        animationFrameRef.current = requestAnimationFrame(animate);
        return;
      }
      previousFrameTime = frameTime;

      context.clearRect(0, 0, window.innerWidth, window.innerHeight);

      const particleLimit =
        variant === "easter" ? 36 : window.innerWidth < 640 ? 18 : 32;
      const spawnChance = variant === "easter" ? 0.7 : 0.22;

      if (
        particlesRef.current.length < particleLimit &&
        Math.random() < spawnChance
      ) {
        particlesRef.current.push(createParticle(variant, window.innerWidth));
      }

      particlesRef.current = particlesRef.current.filter((particle) => {
        particle.y += particle.speed;
        particle.x +=
          particle.drift +
          (variant === "easter"
            ? Math.sin(particle.rotation + particle.swayOffset) *
              particle.wobble
            : Math.sin(particle.y * 0.012 + particle.swayOffset) *
              particle.wobble);
        particle.rotation += particle.rotationSpeed;

        context.save();
        context.translate(particle.x, particle.y);
        context.rotate(particle.rotation);
        context.globalAlpha = particle.opacity;

        if (particle.kind === "egg") drawEgg(context, particle);
        else drawFlower(context, particle);

        context.restore();

        const verticalExitPadding = variant === "easter" ? 48 : 50;
        const horizontalExitPadding = variant === "easter" ? 80 : 70;

        return (
          particle.y < window.innerHeight + verticalExitPadding &&
          particle.x > -horizontalExitPadding &&
          particle.x < window.innerWidth + horizontalExitPadding
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
  }, [isRunning, variant]);

  const controlLabel = isRunning ? "Stop Animation" : "Start Animation";

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
        onClick={() => setIsRunning((running) => !running)}
        className={`fixed left-5 z-50 cursor-pointer rounded-md border-0 px-4 py-2.5 font-medium text-[#333] outline-none focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0 ${variant === "easter" ? "bottom-[35px] bg-[#fdc700]/90" : "bottom-5 bg-white/90"}`}
      >
        {controlLabel}
      </button>
    </>
  );
}
