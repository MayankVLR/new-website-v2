"use client";

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './Projects.module.css';

gsap.registerPlugin(ScrollTrigger);

const featuredVideos = [
  {
    id: "1PRrUeDXpXRJOZAFAfWIt3qqgcnDgb2t5",
    title: "zepto x mayank - 2026",
    type: "Motion Film",
    cover: "/img/cover/1videocover.png"
  },
  {
    id: "149v56iieWV2WtjCgn01Wrwxk6YVbHYye",
    title: "cool stuff i made",
    type: "Motion Film",
    cover: "/img/cover/2videocover.png"
  },
  {
    id: "1wqOCPNbOPb3liu9qxawUMmzAIMXQESB7",
    title: "bengali happy new year",
    type: "Motion Film",
    cover: "/img/cover/3videocover.png"
  },
  {
    id: "1tM0KWcVBESiEXn7PKj0wwACjeQWiz-jE",
    title: "character animation",
    type: "Motion Film",
    cover: "/img/cover/4videocover.png"
  }
];

export default function Projects() {
  const containerRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [activeVideo, setActiveVideo] = useState<string | null>(null);
  const selectedVideo = featuredVideos.find((video) => video.id === activeVideo);

  useEffect(() => {
    // Stagger reveal of project cards on scroll
    gsap.fromTo(cardsRef.current, 
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.15,
        ease: "power2.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%",
          toggleActions: "play none none reverse"
        }
      }
    );
  }, []);

  useEffect(() => {
    if (!activeVideo) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setActiveVideo(null);
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeVideo]);

  const addToRefs = (el: HTMLDivElement) => {
    if (el && !cardsRef.current.includes(el)) {
      cardsRef.current.push(el);
    }
  };

  return (
    <section id="projects" className={styles.projectsSection} ref={containerRef}>
      <div className={styles.projectsHeader}>
        <div className={styles.projectsHeaderDeco}>
          <div className={styles.line}></div>
          <span>✦</span>
        </div>
        <h2 className={styles.projectsHeading}>Featured works</h2>
        <div className={styles.projectsHeaderDeco}>
          <span>✦</span>
          <div className={styles.line}></div>
        </div>
      </div>

      <div className={styles.projectsGrid}>
        {featuredVideos.map((video, index) => (
          <div key={index} className={styles.projectCard} ref={addToRefs}>
            <div className={styles.projectThumb}>
              <button
                type="button"
                className={styles.playButton}
                onClick={() => setActiveVideo(video.id)}
                aria-label={`Play ${video.title}`}
              >
                <Image
                  src={video.cover}
                  alt={`${video.title} thumbnail`}
                  fill
                  className={styles.projectImage}
                  sizes="(max-width: 768px) 88vw, 500px"
                />
                <span className={styles.playIcon} aria-hidden="true" />
              </button>
            </div>
            <div className={styles.projectName}>{video.title}</div>
            <div className={styles.projectType}>{video.type}</div>
          </div>
        ))}
      </div>

      <Link href="/videos" className={styles.seeMoreButton}>
        See more
      </Link>

      {selectedVideo && (
        <div
          className={styles.videoModal}
          role="dialog"
          aria-modal="true"
          aria-label={`${selectedVideo.title} video player`}
          onClick={() => setActiveVideo(null)}
        >
          <div className={styles.videoModalInner} onClick={(event) => event.stopPropagation()}>
            <button
              type="button"
              className={styles.closeButton}
              onClick={() => setActiveVideo(null)}
              aria-label="Close video"
            >
              x
            </button>
            <iframe
              className={styles.modalVideo}
              src={`https://drive.google.com/file/d/${selectedVideo.id}/preview`}
              allow="autoplay"
              allowFullScreen
              title={selectedVideo.title}
            />
          </div>
        </div>
      )}
    </section>
  );
}
