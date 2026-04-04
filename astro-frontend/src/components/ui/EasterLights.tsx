import { useEffect, useRef } from "react";

interface Ornament {
  x: number;
  y: number;
  baseY: number;
  color: string;
  twinkle: number;
  twinkleSpeed: number;
  size: number;
  kind: "egg" | "flower";
}

export default function EasterLights() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const pastelColors = [
      "#F7C9A9",
      "#F6D186",
      "#B7E4C7",
      "#A9DEF9",
      "#E4C1F9",
      "#FFC8DD",
    ];

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = 52;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const ornaments: Ornament[] = [];
    const ornamentCount = Math.max(10, Math.floor(canvas.width / 72));

    for (let i = 0; i <= ornamentCount; i++) {
      const x = (canvas.width / ornamentCount) * i;
      const baseY = 26 + Math.sin(i * 0.55) * 5;

      ornaments.push({
        x,
        y: baseY,
        baseY,
        color: pastelColors[i % pastelColors.length],
        twinkle: Math.random(),
        twinkleSpeed: 0.015 + Math.random() * 0.025,
        size: 8,
        kind: i % 4 === 0 ? "flower" : "egg",
      });
    }

    function drawFlower(
      context: CanvasRenderingContext2D,
      ornament: Ornament,
      brightness: number,
    ) {
      context.save();
      context.translate(ornament.x, ornament.y);
      context.globalAlpha = brightness;

      for (let i = 0; i < 5; i++) {
        context.rotate((Math.PI * 2) / 5);
        context.beginPath();
        context.ellipse(
          0,
          ornament.size * 0.7,
          ornament.size * 0.55,
          ornament.size * 0.8,
          0,
          0,
          Math.PI * 2,
        );
        context.fillStyle = ornament.color;
        context.fill();
      }

      context.beginPath();
      context.arc(0, 0, ornament.size * 0.45, 0, Math.PI * 2);
      context.fillStyle = "#FDE68A";
      context.fill();
      context.restore();
    }

    function drawEgg(
      context: CanvasRenderingContext2D,
      ornament: Ornament,
      brightness: number,
    ) {
      context.save();
      context.translate(ornament.x, ornament.y);
      context.globalAlpha = brightness;

      context.beginPath();
      context.ellipse(
        0,
        0,
        ornament.size * 0.72,
        ornament.size,
        0,
        0,
        Math.PI * 2,
      );
      context.fillStyle = ornament.color;
      context.fill();

      context.fillStyle = "rgba(255, 255, 255, 0.55)";
      context.fillRect(-ornament.size * 0.6, -1, ornament.size * 1.2, 1.8);
      context.fillRect(
        -ornament.size * 0.45,
        ornament.size * 0.25,
        ornament.size * 0.9,
        1.8,
      );
      context.restore();
    }

    function animate() {
      if (!canvas || !ctx) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ctx.strokeStyle = "#C7B26A";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(0, 11);

      for (let i = 0; i <= ornamentCount; i++) {
        const x = (canvas.width / ornamentCount) * i;
        const y = 11 + Math.sin(i * 0.55) * 3;
        ctx.lineTo(x, y);
      }

      ctx.stroke();

      ornaments.forEach((ornament) => {
        ctx.strokeStyle = "rgba(120, 120, 120, 0.35)";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(
          ornament.x,
          11 + Math.sin((ornament.x / canvas.width) * Math.PI * 2) * 2,
        );
        ctx.lineTo(ornament.x, ornament.y - ornament.size);
        ctx.stroke();
      });

      ornaments.forEach((ornament) => {
        ornament.twinkle += ornament.twinkleSpeed;
        if (ornament.twinkle > 1) ornament.twinkle = 0;

        const brightness =
          0.45 + Math.abs(Math.sin(ornament.twinkle * Math.PI)) * 0.55;

        const glow = ctx.createRadialGradient(
          ornament.x,
          ornament.y,
          0,
          ornament.x,
          ornament.y,
          ornament.size * 2.1,
        );
        glow.addColorStop(0, `${ornament.color}CC`);
        glow.addColorStop(0.5, `${ornament.color}33`);
        glow.addColorStop(1, "transparent");

        ctx.globalAlpha = brightness * 0.45;
        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(ornament.x, ornament.y, ornament.size * 2, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1;

        if (ornament.kind === "flower") {
          drawFlower(ctx, ornament, brightness);
        } else {
          drawEgg(ctx, ornament, brightness);
        }

        ctx.fillStyle = "#948261";
        ctx.fillRect(
          ornament.x - ornament.size * 0.45,
          ornament.y - ornament.size - 2,
          ornament.size * 0.9,
          2,
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

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        top: "-8px",
        left: 0,
        width: "100%",
        height: "52px",
        pointerEvents: "none",
        zIndex: 5,
      }}
    />
  );
}
