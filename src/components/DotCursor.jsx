import { useEffect, useRef } from "react";

function withAlpha(input, alpha) {
  const opacity = Math.max(0, Math.min(1, alpha));
  const hex = input.trim().match(/^#([0-9a-f]{3,8})$/i);

  if (!hex) return `rgba(0, 0, 0, ${opacity})`;

  let value = hex[1];
  if (value.length === 3 || value.length === 4) {
    value = value.split("").map((character) => character + character).join("");
  }

  const rgb = Number.parseInt(value.slice(0, 6), 16);
  return `rgba(${(rgb >> 16) & 255}, ${(rgb >> 8) & 255}, ${rgb & 255}, ${opacity})`;
}

/**
 * Canvas cursor adapted from the user-supplied Dot Cursor snippet.
 * It only activates on fine pointers, retaining the native cursor for touch,
 * keyboard, and reduced-motion users.
 */
export default function DotCursor({
  headColor = "#f4e54c",
  trailColor = "#f4e54c",
  size = 11,
  trailLength = 9,
  trailThickness = 8,
}) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    const finePointer = window.matchMedia?.("(pointer: fine)");
    const reducedMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)");

    if (!canvas || !context || !finePointer?.matches || reducedMotion?.matches) return undefined;

    let width = 1;
    let height = 1;
    let active = false;
    let targetX = 0;
    let targetY = 0;
    let cursorX = 0;
    let cursorY = 0;
    let radius = size / 2;
    let hoveredControl = false;
    let animationFrame = 0;
    let lastFrame = performance.now();
    let points = [];

    const previousCursor = document.documentElement.style.cursor;
    const resize = () => {
      const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.max(1, Math.floor(width * pixelRatio));
      canvas.height = Math.max(1, Math.floor(height * pixelRatio));
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    };

    const showNativeCursor = () => {
      document.documentElement.style.cursor = previousCursor;
    };

    const move = (event) => {
      if (!active) {
        active = true;
        cursorX = event.clientX;
        cursorY = event.clientY;
        points = [];
        canvas.style.opacity = "1";
      }

      targetX = event.clientX;
      targetY = event.clientY;
      hoveredControl = event.target instanceof Element
        && Boolean(event.target.closest("a, button, input, select, textarea, [role='button']"));
      document.documentElement.style.cursor = "none";
    };

    const leave = () => {
      active = false;
      points = [];
      canvas.style.opacity = "0";
      showNativeCursor();
    };

    const drawTrail = (trailLife) => {
      const count = points.length;
      if (count < 2) return;

      const maxHalfWidth = Math.max(0.5, ((trailThickness / 20) * size) / 2);
      const leftX = [];
      const leftY = [];
      const rightX = [];
      const rightY = [];
      let normalX = 0;
      let normalY = 0;

      for (let index = 0; index < count; index += 1) {
        const previous = points[Math.max(0, index - 1)];
        const next = points[Math.min(count - 1, index + 1)];
        const deltaX = next.x - previous.x;
        const deltaY = next.y - previous.y;
        const distance = Math.hypot(deltaX, deltaY);

        if (distance > 0.0001) {
          normalX = -deltaY / distance;
          normalY = deltaX / distance;
        }

        const progress = Math.max(0, Math.min(1, 1 - points[index].age / trailLife));
        const halfWidth = maxHalfWidth * progress;
        leftX.push(points[index].x + normalX * halfWidth);
        leftY.push(points[index].y + normalY * halfWidth);
        rightX.push(points[index].x - normalX * halfWidth);
        rightY.push(points[index].y - normalY * halfWidth);
      }

      context.beginPath();
      context.moveTo(leftX[0], leftY[0]);
      for (let index = 1; index < count; index += 1) context.lineTo(leftX[index], leftY[index]);
      for (let index = count - 1; index >= 0; index -= 1) context.lineTo(rightX[index], rightY[index]);
      context.closePath();
      context.fillStyle = trailColor;
      context.fill();
    };

    const frame = (now) => {
      const deltaSeconds = Math.min(0.05, Math.max(0.001, (now - lastFrame) / 1000));
      lastFrame = now;
      context.clearRect(0, 0, width, height);

      if (active) {
        const followEase = 1 - Math.exp(-deltaSeconds / 0.01);
        cursorX += (targetX - cursorX) * followEase;
        cursorY += (targetY - cursorY) * followEase;

        const trailLife = trailLength * 40;
        points.push({ x: cursorX, y: cursorY, age: 0 });
        points.forEach((point) => { point.age += deltaSeconds * 1000; });
        points = points.filter((point) => point.age < trailLife);
        drawTrail(trailLife);

        const targetRadius = hoveredControl ? (size * 3.3) / 2 : size / 2;
        const hoverEase = 1 - Math.exp(-deltaSeconds * 15);
        radius += (targetRadius - radius) * hoverEase;

        context.beginPath();
        context.arc(cursorX, cursorY, Math.max(0.5, radius), 0, Math.PI * 2);
        if (hoveredControl) {
          context.lineWidth = 2;
          context.strokeStyle = headColor;
          context.stroke();
        } else {
          context.fillStyle = headColor;
          context.fill();
        }
      }

      animationFrame = requestAnimationFrame(frame);
    };

    resize();
    animationFrame = requestAnimationFrame(frame);
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", move, { passive: true });
    document.documentElement.addEventListener("mouseleave", leave);
    window.addEventListener("blur", leave);

    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", move);
      document.documentElement.removeEventListener("mouseleave", leave);
      window.removeEventListener("blur", leave);
      showNativeCursor();
    };
  }, [headColor, size, trailColor, trailLength, trailThickness]);

  return <canvas ref={canvasRef} className="dot-cursor" aria-hidden="true" />;
}
