"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect } from "react";

gsap.registerPlugin(ScrollTrigger);

/**
 * Fades every `.reveal` element in and slides it up as it scrolls into view.
 * Elements that enter together (a row of cards) come in one after another.
 */
export function RevealOnScroll() {
  useEffect(() => {
    const all = gsap.utils.toArray<HTMLElement>(".reveal");
    gsap.set(all, { autoAlpha: 0, y: 80 });

    // the hero is on screen from the start: play it in sequence on load
    const hero = all.filter((el) => el.closest("header"));
    const els = all.filter((el) => !hero.includes(el));
    gsap.to(hero, {
      autoAlpha: 1,
      y: 0,
      duration: 1.1,
      ease: "power3.out",
      stagger: 0.12,
      delay: 0.1,
      clearProps: "transform",
    });

    const triggers = ScrollTrigger.batch(els, {
      start: "top 88%",
      once: true,
      onEnter: (batch) =>
        gsap.to(batch, {
          autoAlpha: 1,
          y: 0,
          duration: 1.1,
          ease: "power3.out",
          stagger: 0.12,
          // hand transform back to CSS so hover lifts keep working
          clearProps: "transform",
        }),
    });

    return () => {
      triggers.forEach((t) => t.kill());
      gsap.killTweensOf(all);
      gsap.set(all, { clearProps: "all" });
    };
  }, []);

  return null;
}
