"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./Footer.module.css";

gsap.registerPlugin(ScrollTrigger);

const RunawaySticky = () => {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const stickyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.to(stickyRef.current, {
      y: -20,
      rotation: -8,
      duration: 4,
      yoyo: true,
      repeat: -1,
      ease: "sine.inOut",
    });
  }, []);

  const handleHover = () => {
    const newX = Math.random() * 260 - 130;
    const newY = Math.random() * 260 - 130;
    setPos({ x: newX, y: newY });
  };

  return (
    <div
      style={{
        transform: `translate(${pos.x}px, ${pos.y}px)`,
        transition: "transform 0.4s cubic-bezier(0.25, 1, 0.5, 1)",
        position: "absolute",
        zIndex: 10,
        cursor: "pointer",
      }}
      onMouseEnter={handleHover}
    >
      <div className={styles.contactSticky} ref={stickyRef}>
        Try catch me
      </div>
    </div>
  );
};

export default function Footer() {
  const contactRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.fromTo(
      `.${styles.contactRight}`,
      { x: 50, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: contactRef.current,
          start: "top 70%",
          toggleActions: "play none none reverse",
        },
      },
    );
  }, []);

  return (
    <>
      <section id="contact" className={styles.contactSection} ref={contactRef}>
        <div className={styles.contactNavSpacer}></div>
        <div className={styles.contactBody}>
          <div className={styles.contactLeft}>
            <div className={styles.contactDotBg}></div>
            <RunawaySticky />
          </div>

          <div className={styles.contactRight}>
            <h2>
              Couldn&apos;t
              <br />
              Catch Me
              <br />
              There?
            </h2>
            <div className={styles.contactReach}>
              <span className={styles.star}>*</span>
              Reach out to me here
            </div>

            <div className={styles.socialRow}>
              <a
                href="https://www.instagram.com/mayankfilmz/"
                className={styles.socialBtn}
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="2" y="2" width="20" height="20" rx="5" />
                  <circle cx="12" cy="12" r="5" />
                  <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
                </svg>
                Instagram
              </a>
              <a
                href="https://www.linkedin.com/in/mayank-jagtap/"
                className={styles.socialBtn}
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
                LinkedIn
              </a>
            </div>

            <div className={styles.contactInfoRow}>
              <a href="mailto:Mayankjagtap50@gmail.com" className={styles.contactInfoBtn}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
                Mayankjagtap50@gmail.com
              </a>
            </div>
          </div>
        </div>
      </section>

      <footer className={styles.footer}>
        <p>&copy; 2025 Designed by Mayank</p>
      </footer>
    </>
  );
}
