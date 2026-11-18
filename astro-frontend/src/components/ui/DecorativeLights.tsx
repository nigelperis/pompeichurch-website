import { useEffect, useRef } from "react";

export default function DecorativeLights() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const colors = [
      "#F06449",
      "#3AAFA9",
      "#4361EE",
      "#F4C95D",
      "#9B5DE5",
      "#00BBF9",
      "#F9844A",
      "#90BE6D",
    ];

    interface Light {
      x: number;
      y: number;
      color: string;
      twinkle: number;
      twinkleSpeed: number;
      size: number;
    }

    let lights: Light[] = [];

    const createLights = () => {
      const numLights = Math.max(10, Math.floor(canvas.width / 60));
      lights = Array.from({ length: numLights + 1 }, (_, index) => {
        const baseY = 22;
        return {
          x: (canvas.width / numLights) * index,
          y: baseY,
          color: colors[index % colors.length],
          twinkle: Math.random(),
          twinkleSpeed: 0.02 + Math.random() * 0.03,
          size: 7,
        };
      });
    };

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = 40;
      createLights();
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    function animate() {
      if (!canvas || !ctx) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ctx.strokeStyle = "transparent";
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(0, 8);
      ctx.lineTo(canvas.width, 8);
      ctx.stroke();

      lights.forEach((light) => {
        ctx.strokeStyle = "transparent";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(light.x, 8);
        ctx.lineTo(light.x, light.y - light.size);
        ctx.stroke();
      });

      lights.forEach((light) => {
        light.twinkle += light.twinkleSpeed;
        if (light.twinkle > 1) light.twinkle = 0;

        const brightness =
          0.3 + Math.abs(Math.sin(light.twinkle * Math.PI)) * 0.7;

        if (light.size > 0 && isFinite(light.x) && isFinite(light.y)) {
          const gradient = ctx.createRadialGradient(
            light.x,
            light.y,
            0,
            light.x,
            light.y,
            light.size * 2,
          );
          gradient.addColorStop(0, light.color);
          gradient.addColorStop(0.5, `${light.color}33`);
          gradient.addColorStop(1, "transparent");

          ctx.globalAlpha = brightness * 0.5;
          ctx.fillStyle = gradient;
          ctx.beginPath();
          ctx.arc(light.x, light.y, light.size * 2, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.globalAlpha = brightness;

        ctx.fillStyle = light.color;
        ctx.beginPath();
        ctx.ellipse(
          light.x,
          light.y,
          light.size * 0.7,
          light.size,
          0,
          0,
          Math.PI * 2,
        );
        ctx.fill();

        ctx.fillStyle = "#888";
        ctx.fillRect(
          light.x - light.size * 0.5,
          light.y - light.size - 2,
          light.size,
          2,
        );

        ctx.globalAlpha = brightness * 0.6;
        ctx.fillStyle = "white";
        ctx.beginPath();
        ctx.ellipse(
          light.x - light.size * 0.2,
          light.y - light.size * 0.2,
          light.size * 0.3,
          light.size * 0.4,
          0,
          0,
          Math.PI * 2,
        );
        ctx.fill();

        ctx.globalAlpha = 1;
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
        top: "-10px",
        left: 0,
        width: "100%",
        height: "40px",
        pointerEvents: "none",
        zIndex: 5,
      }}
    />
  );
}
