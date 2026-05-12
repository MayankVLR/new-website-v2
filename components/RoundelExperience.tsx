"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./RoundelExperience.module.css";

gsap.registerPlugin(ScrollTrigger);

const brandImages = [
  {
    name: "Britannia",
    src: "/img/brands/britannia-logo-brandlogos.net_-512x512.png",
  },
  {
    name: "Go Desi",
    src: "/img/brands/image-removebg-preview (48).png",
  },
  {
    name: "Sunfeast",
    src: "/img/brands/image-removebg-preview (47).png",
  },
];

const photos = [
  {
    src: "/img/zepto img/1.jpeg",
    alt: "Zepto experience image 1",
  },
  {
    src: "/img/zepto img/2-updated.jpeg",
    alt: "Roundel experience image 2",
  },
  {
    src: "/img/zepto img/3.jpeg",
    alt: "Zepto experience image 3",
  },
  {
    src: "/img/zepto img/4.jpeg",
    alt: "Zepto experience image 4",
  },
];

export default function RoundelSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 70%",
        toggleActions: "play none none reverse",
      },
    });

    tl.fromTo(
      cardRef.current,
      { x: -50, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
    ).fromTo(
      textRef.current,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
      "-=0.6",
    );

    gsap.fromTo(
      `.${styles.photoItem}`,
      { y: 24, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.5,
        stagger: 0.15,
        ease: "power2.out",
        scrollTrigger: {
          trigger: `.${styles.photoGrid}`,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      },
    );

    gsap.fromTo(
      `.${styles.brandItem}`,
      { y: 16, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.4,
        stagger: 0.12,
        ease: "power2.out",
        scrollTrigger: {
          trigger: `.${styles.brandGrid}`,
          start: "top 90%",
          toggleActions: "play none none reverse",
        },
      },
    );
  }, []);

  return (
    <section ref={sectionRef} className={styles.sectionContainer}>
      <div className={styles.roundelGrid}>
        <div ref={cardRef} className={styles.cardWrapper}>
          <div className={styles.targetCard}>
            <div className={styles.targetBullseye} />

            <div style={{ position: "relative", zIndex: 10 }}>
              <p className={styles.cardSubText}>Internship</p>
              <h2 className={styles.cardTitle}>@ZEPTO</h2>
            </div>
          </div>
        </div>

        <div className={styles.textWrapper}>
          <div ref={textRef}>
            <h2 className={styles.sectionTitle}>Zepto</h2>
            <p className={styles.sectionDesc}>
              Hi, I’m Mayank. I’m currently working at Zepto, and it’s been really fun working with a brand like this. I’ve met some really talented people in the office and learned a lot from the experience. I’m also really lucky to have a great manager who helped me through a lot of challenges and supported me throughout my journey.
I’ve worked on a lot of ads for performance marketing, and whenever I got the chance, I also contributed to fun event campaigns like Mango Paglu Party, Bengali New Year banners, April Fools’ campaigns, and more..
            </p>
          </div>

          <div className={styles.photoGrid}>
            {photos.map((photo) => (
              <div key={photo.src} className={styles.photoItem}>
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  className={styles.photoImage}
                  sizes="(max-width: 768px) 46vw, (max-width: 1200px) 18vw, 210px"
                />
              </div>
            ))}
          </div>
        </div>

        <div className={styles.bottomBrands}>
          <p className={styles.partnerLabel}>BRANDS I got chance to WORKED</p>
          <div className={styles.brandGrid}>
            {brandImages.map((brand) => (
              <div key={brand.name} className={styles.brandItem} title={brand.name}>
                <Image
                  src={brand.src}
                  alt={`${brand.name} logo`}
                  fill
                  className={styles.brandImage}
                  sizes="(max-width: 768px) 34vw, 140px"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
