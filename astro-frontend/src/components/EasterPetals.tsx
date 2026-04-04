import { useEffect, useRef, useState } from "react";

interface Particle {
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
  accentColor: string;
}

export default function EasterPetals() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number>(0);
  const particlesRef = useRef<Particle[]>([]);
  const isEggsRunningRef = useRef(true);
  const [isEggsRunning, setIsEggsRunning] = useState(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const eggPalette = [
      { color: "#F7C9A9", accentColor: "#F28C8C", pattern: "dots" },
      { color: "#F6D186", accentColor: "#B48E3E", pattern: "stripes" },
      { color: "#B7E4C7", accentColor: "#4B8F72", pattern: "zigzag" },
      { color: "#A9DEF9", accentColor: "#4F88C6", pattern: "dots" },
      { color: "#E4C1F9", accentColor: "#A85DC4", pattern: "stripes" },
      { color: "#FFC8DD", accentColor: "#E27AA4", pattern: "zigzag" },
    ];

    const resizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const createParticle = (): Particle => {
      const palette = eggPalette[Math.floor(Math.random() * eggPalette.length)];
      const size = 11 + Math.random() * 9;

      return {
        x: Math.random() * window.innerWidth,
        y: -40 - Math.random() * 120,
        size,
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
    };

    const drawEgg = (particle: Particle) => {
      const { size, color, accentColor } = particle;

      ctx.save();
      ctx.beginPath();
      ctx.ellipse(0, 0, size * 0.75, size, 0, 0, Math.PI * 2);
      ctx.clip();
      const gradient = ctx.createRadialGradient(
        -size * 0.2,
        -size * 0.3,
        size * 0.1,
        0,
        0,
        size,
      );
      gradient.addColorStop(0, color);
      gradient.addColorStop(1, color);
      ctx.fillStyle = gradient;
      ctx.fill();

      ctx.strokeStyle = accentColor;
      ctx.lineWidth = size * 0.08;
      ctx.lineJoin = "round";
      ctx.lineCap = "round";

      const patternType = size % 1.3;

      if (patternType < 1) {
        // Zig-Zag Pattern
        ctx.beginPath();
        for (let i = -1; i <= 1; i += 0.5) {
          const y = i * size * 0.6;
          ctx.moveTo(-size, y);
          ctx.lineTo(-size * 0.4, y + size * 0.1);
          ctx.lineTo(0, y);
          ctx.lineTo(size * 0.4, y + size * 0.1);
          ctx.lineTo(size, y);
        }
        ctx.stroke();
      } else if (patternType < 2) {
        // Polka Dots
        ctx.fillStyle = accentColor;
        const dotPositions = [
          [0, 0],
          [0.4, 0.4],
          [-0.4, 0.4],
          [0.4, -0.4],
          [-0.4, -0.4],
          [0, 0.7],
          [0, -0.7],
        ];
        dotPositions.forEach(([px, py]) => {
          ctx.beginPath();
          ctx.arc(px * size, py * size, size * 0.12, 0, Math.PI * 2);
          ctx.fill();
        });
      } else {
        // Stripe Pattern
        ctx.beginPath();
        for (let i = -0.6; i <= 0.7; i += 0.4) {
          ctx.moveTo(-size, i * size);
          ctx.lineTo(size, i * size);
        }
        ctx.stroke();
      }

      ctx.restore();

      ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
      ctx.beginPath();
      ctx.ellipse(
        -size * 0.25,
        -size * 0.4,
        size * 0.15,
        size * 0.25,
        Math.PI / 4,
        0,
        Math.PI * 2,
      );
      ctx.fill();

      ctx.strokeStyle = "rgba(0,0,0,0.05)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.ellipse(0, 0, size * 0.75, size, 0, 0, Math.PI * 2);
      ctx.stroke();
    };

    const drawParticle = (particle: Particle) => {
      ctx.save();
      ctx.translate(particle.x, particle.y);
      ctx.rotate(particle.rotation);
      ctx.globalAlpha = particle.opacity;
      drawEgg(particle);

      ctx.restore();
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    function animate() {
      if (!canvas || !ctx) return;

      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

      if (
        isEggsRunningRef.current &&
        particlesRef.current.length < 36 &&
        Math.random() < 0.7
      ) {
        particlesRef.current.push(createParticle());
      }

      particlesRef.current = particlesRef.current.filter((particle) => {
        particle.y += particle.speed;
        particle.x +=
          particle.drift +
          Math.sin(particle.rotation + particle.swayOffset) * particle.wobble;
        particle.rotation += particle.rotationSpeed;

        drawParticle(particle);

        return (
          particle.y < window.innerHeight + 48 &&
          particle.x > -80 &&
          particle.x < window.innerWidth + 80
        );
      });

      animationFrameRef.current = requestAnimationFrame(animate);
    }

    animate();

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  const toggleEggs = () => {
    isEggsRunningRef.current = !isEggsRunningRef.current;
    setIsEggsRunning(isEggsRunningRef.current);

    if (!isEggsRunningRef.current) {
      particlesRef.current = [];
    }
  };

  return (
    <>
      <canvas
        ref={canvasRef}
        style={{
          position: "fixed",
          inset: 0,
          pointerEvents: "none",
          zIndex: 9999,
          background: "transparent",
        }}
      />

      <button
        onClick={toggleEggs}
        style={{
          position: "fixed",
          bottom: 35,
          left: 20,
          zIndex: 50,
          padding: "10px 16px",
          background: "rgba(253, 199, 0, 0.9)",
          color: "#333",
          borderRadius: "6px",
          cursor: "pointer",
          border: "none",
          fontWeight: "500",
        }}
      >
        {isEggsRunning ? "Stop Animation" : "Start Animation"}
      </button>
    </>
  );
}
