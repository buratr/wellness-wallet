"use client";

import Script from "next/script";
import { useEffect, useRef } from "react";

/**
 * Text that "prints" itself character by character while it scrolls through the viewport.
 * Lighting starts when the top of the block reaches startRatio of the viewport height and
 * finishes when its bottom reaches endRatio.
 */
export function ScrollLitText({
  text,
  className,
  startRatio = 0.7,
  endRatio = 0.5,
}: {
  text: string;
  className?: string;
  startRatio?: number;
  endRatio?: number;
}) {
  const ref = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const chars = Array.from(el.querySelectorAll<HTMLElement>(".char"));
    let visible = -1;
    let raf = 0;

    const update = () => {
      raf = 0;
      const rect = el.getBoundingClientRect();
      const startY = window.innerHeight * startRatio;
      const endY = window.innerHeight * endRatio;
      const denom = endY - rect.height - startY;
      const raw = Math.abs(denom) < 1e-6 ? (rect.top <= startY ? 1 : 0) : (rect.top - startY) / denom;
      const count = Math.floor(Math.min(1, Math.max(0, raw)) * chars.length);
      if (count === visible) return;
      visible = count;
      chars.forEach((c, i) => c.classList.toggle("visible", i < count));
    };
    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [startRatio, endRatio]);

  // words stay unbreakable so a line never wraps mid-word
  const words = text.split(" ");
  return (
    <p ref={ref} className={className}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {words.map((word, w) => (
          <span key={w}>
            <span className="whitespace-nowrap">
              {Array.from(word).map((ch, i) => (
                <span key={i} className="char">
                  {ch}
                </span>
              ))}
            </span>
            {w < words.length - 1 && <span className="char"> </span>}
          </span>
        ))}
      </span>
    </p>
  );
}

/** Eased page scrolling for mouse wheel and keyboard (smoothscroll-for-websites). */
export function SmoothWheel() {
  return (
    <Script
      src="https://cdnjs.cloudflare.com/ajax/libs/smoothscroll/1.4.10/SmoothScroll.min.js"
      strategy="afterInteractive"
      onReady={() => {
        const init = (window as unknown as { SmoothScroll?: (o: object) => void }).SmoothScroll;
        init?.({
          animationTime: 800,
          stepSize: 70,
          accelerationDelta: 30,
          accelerationMax: 2,
          keyboardSupport: true,
          arrowScroll: 50,
          pulseAlgorithm: true,
          pulseScale: 4,
          pulseNormalize: 1,
          touchpadSupport: true,
        });
      }}
    />
  );
}
