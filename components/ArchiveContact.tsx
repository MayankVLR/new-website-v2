"use client";

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './ArchiveContact.module.css';

gsap.registerPlugin(ScrollTrigger);

const ScrubText = ({ text, isStrong }: { text: string; isStrong?: boolean }) => {
  const containerRef = useRef<HTMLParagraphElement>(null);
  const words = text.split(" ");

  useEffect(() => {
    if (!containerRef.current) return;

    const wordElements = containerRef.current.querySelectorAll(`.${styles.word}`);
    
    gsap.fromTo(
      wordElements,
      { opacity: 0.15 },
      {
        opacity: 1,
        stagger: 0.03,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top center",
          end: "center center",
          scrub: 1.5,
          markers: false,
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <p ref={containerRef} style={{ fontSize: "26px", lineHeight: "1.5", marginBottom: "32px", fontWeight: isStrong ? 800 : 500, color: isStrong ? "#1E4ED8" : "#111", letterSpacing: "-0.01em" }}>
      {words.map((word, i) => (
        <span key={i} className={styles.word} style={{ opacity: 0.15, display: "inline", willChange: "opacity", transition: "opacity 0.1s ease-out" }}>
          {word}{" "}
        </span>
      ))}
    </p>
  );
};

export default function ArchiveContact() {
  const archiveRef = useRef<HTMLElement>(null);

  return (
    <>
      {/* ===== ARCHIVE ===== */}
      <section id="archive" className={styles.archiveSection} ref={archiveRef}>
        <div className="section-label arrow-deco">Favourites from my</div>
        <div className="section-title-ghost">Archive</div>

        <div className={styles.archiveText}>
          <ScrubText text="This is a space where I experiment, explore ideas, and create whatever feels exciting in the moment." isStrong={true} />
          <ScrubText text="You'll find a mix of screen printing, typography, photography, personal projects, and random things from my everyday life — the stuff I make outside of office work, just for the fun of creating and trying new things." />
        </div>

        <p className={styles.archivePlaceholder}>Soon i will add here something</p>
      </section>
    </>
  );
}
