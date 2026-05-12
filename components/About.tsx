"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./About.module.css";

gsap.registerPlugin(ScrollTrigger);

const aboutImages = {
  portrait: "/img/about me/photoofme.jpeg",
  board: "/img/about me/baord.jpeg",
  tools: "/img/about me/tools.png",
};

const ScrubText = ({ text, highlight }: { text: string; highlight?: string }) => {
  const words = text.split(" ");
  return (
    <p className={styles.scrubParagraph}>
      {words.map((word, i) => {
        const isHighlight = highlight && word.includes(highlight);
        return (
          <span key={i} className={styles.word}>
            {isHighlight ? <strong>{word}</strong> : word}{" "}
          </span>
        );
      })}
    </p>
  );
};

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const visualRefs = useRef<HTMLElement[]>([]);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    visualRefs.current.forEach((item, index) => {
      gsap.fromTo(
        item,
        { y: 48, opacity: 0, scale: 0.95 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.72,
          delay: index * 0.08,
          ease: "power3.out",
          scrollTrigger: {
            trigger: item,
            start: "top 86%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });

    const paragraphs = textRef.current?.querySelectorAll(`.${styles.scrubParagraph}`);
    paragraphs?.forEach((p) => {
      const words = p.querySelectorAll(`.${styles.word}`);
      gsap.fromTo(
        words,
        { opacity: 0.15 },
        {
          opacity: 1,
          stagger: 0.05,
          ease: "none",
          scrollTrigger: {
            trigger: p,
            start: "top 85%",
            end: "bottom 55%",
            scrub: true,
          },
        }
      );
    });
  }, []);

  const addVisualRef = (el: HTMLElement | null) => {
    if (el && !visualRefs.current.includes(el)) {
      visualRefs.current.push(el);
    }
  };

  return (
    <section id="about" className={styles.aboutSection} ref={sectionRef}>
      <div className={styles.aboutInner}>
        <h2 className={styles.aboutTitle}>About Me</h2>

        <div className={styles.aboutLayout}>
          <div className={styles.visualGrid}>
            <figure className={`${styles.visualCard} ${styles.portraitCard}`} ref={addVisualRef}>
              <Image
                src={aboutImages.portrait}
                alt="Portrait of Mayank"
                fill
                className={styles.portraitImage}
                sizes="(max-width: 768px) 100vw, 460px"
                priority={false}
              />
            </figure>

            <figure className={`${styles.visualCard} ${styles.boardCard}`} ref={addVisualRef}>
              <Image
                src={aboutImages.board}
                alt="Visual board and inspiration wall"
                fill
                className={styles.imageCover}
                sizes="(max-width: 768px) 100vw, 300px"
              />
            </figure>

            <figure className={`${styles.visualCard} ${styles.toolsCard}`} ref={addVisualRef}>
              <Image
                src={aboutImages.tools}
                alt="Creative tools collage"
                fill
                className={styles.imageContain}
                sizes="(max-width: 768px) 100vw, 300px"
              />
            </figure>
          </div>

          <div className={styles.aboutText} ref={textRef}>
            <ScrubText 
              text="Hi! I'm a Motion Designer with a deep passion for crafting compelling stories that solve real challenges for brands. I thrive on exploring complex tools, mastering new techniques, and turning creative obstacles into opportunities. Fueled by curiosity and collaboration, I'm always eager to share knowledge and connect with like-minded creatives to bring bold, impactful ideas to life." 
              highlight="Motion Designer," 
            />
            <ScrubText 
              text="Outside of work, I explore ideas, collect inspiration, and build things that reflect my style. Whether it's editing, designing, or experimenting, I'm always leveling up." 
            />
          </div>
        </div>
      </div>
    </section>
  );
}
