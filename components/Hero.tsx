"use client";

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import Link from 'next/link';
import styles from './Hero.module.css';

export default function Hero() {
  const heroRef = useRef<HTMLSelectElement>(null);
  const objectsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Floating animation for sticky notes
    gsap.to('.sticky-note-blue', {
      y: -10,
      rotation: -5,
      duration: 2,
      yoyo: true,
      repeat: -1,
      ease: "sine.inOut"
    });

    gsap.to('.sticky-note-yellow', {
      y: -8,
      rotation: 4,
      duration: 2.2,
      yoyo: true,
      repeat: -1,
      ease: "sine.inOut",
      delay: 0.2
    });

    // Parallax effect on mouse move for scattered objects
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const xPos = (clientX / window.innerWidth - 0.5) * 40;
      const yPos = (clientY / window.innerHeight - 0.5) * 40;

      gsap.to('.parallax-obj', {
        x: xPos,
        y: yPos,
        duration: 1,
        ease: "power2.out",
        stagger: 0.05
      });
      
      gsap.to('.parallax-obj-fast', {
        x: xPos * 2,
        y: yPos * 2,
        duration: 1,
        ease: "power2.out",
        stagger: 0.05
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <section id="hero" className={styles.hero} ref={heroRef as any}>
      {/* Scattered objects */}
      <div ref={objectsRef}>
        <div className={`${styles.scatterObj} ${styles.objCoffee} parallax-obj`}>☕</div>
        <div className={`${styles.scatterObj} ${styles.objScissors} parallax-obj-fast`}>✂️</div>
        <div className={`${styles.scatterObj} ${styles.objHeadphones} parallax-obj`}>🎧</div>
        <div className={`${styles.scatterObj} ${styles.objPlant} parallax-obj-fast`}>🌵</div>
        <div className={`${styles.scatterObj} ${styles.objCamera} parallax-obj`}>📷</div>
        <div className={`${styles.scatterObj} ${styles.objFlowers} parallax-obj`}>🌼</div>
        <div className={`${styles.scatterObj} ${styles.objPaper} parallax-obj-fast`}>📄</div>
        <div className={`${styles.scatterObj} ${styles.objPens} parallax-obj`}>✏️</div>

        {/* Laptop svg top-left */}
        <div className={`${styles.scatterObj} parallax-obj`} style={{top: '-10px', left: '-40px', width: '280px', fontSize: '140px'}}>💻</div>

        {/* Binder clips */}
        <div className={`${styles.scatterObj} ${styles.objClips} parallax-obj`}>
          <div className={styles.clipItem} style={{background: '#e84040'}}></div>
          <div className={styles.clipItem} style={{background: '#e8a040'}}></div>
          <div className={styles.clipItem} style={{background: '#40c840'}}></div>
          <div className={styles.clipItem} style={{background: '#4040e8'}}></div>
          <div className={styles.clipItem} style={{background: '#e84040'}}></div>
          <div className={styles.clipItem} style={{background: '#e8a040'}}></div>
        </div>
      </div>

      {/* Hero center */}
      <div className={styles.heroCenter}>
        <div className={styles.stickyNotes}>
          <div className={`${styles.sticky} ${styles.blue} sticky-note-blue`}>Brand<br/>designer</div>
          <div className={`${styles.sticky} ${styles.yellow} sticky-note-yellow`}>Visual<br/>storyteller</div>
        </div>
        <div className={styles.heroTitle}>Welcome to<br/>Mayank&apos;s Portfolio</div>
        <Link href="#projects" className={styles.heroBtn}>View Projects</Link>
      </div>

      {/* Ticket */}
      <div className={`${styles.ticket} parallax-obj`}>
        <div>
          <div className={styles.ticketCity}>Ahmedabad</div>
          <div className={styles.ticketCode}>AMD</div>
          <div className={styles.ticketTime}>9:20 pm</div>
        </div>
        <div className={styles.ticketArrow}>✈</div>
        <div>
          <div className={styles.ticketCity}>Bengaluru</div>
          <div className={styles.ticketCode}>BLR</div>
          <div className={styles.ticketTime}>11:05 pm</div>
        </div>
      </div>
    </section>
  );
}
