"use client"

import { motion } from "framer-motion"
import { useEffect, useRef, useState } from "react"
import { GridBackground } from "./grid-background"
import { StickyNote } from "./sticky-note"
import { SketchButton } from "./sketch-button"
import { DraggableCard } from "./draggable-card"

const FULL_NAME = "Mayank"

// widthVw / heightVw are fractions of 1 viewport width (e.g. 0.14 = 14vw)
// All cards now have the same size for consistency
const photoCards = [
  {
    src: "/img/hero card img/hero-card-1.jpeg",
    alt: "Hero card image 1",
    initialX: 3,
    initialY: 8,
    rotation: -12,
    widthVw: 0.14,
    heightVw: 0.16,
  },
  {
    src: "/img/hero card img/hero-card-2.jpeg",
    alt: "Hero card image 2",
    initialX: 74,
    initialY: 4,
    rotation: 8,
    widthVw: 0.14,
    heightVw: 0.16,
  },
  {
    src: "/img/hero card img/hero-card-3.jpeg",
    alt: "Hero card image 3",
    initialX: 76,
    initialY: 38,
    rotation: 5,
    widthVw: 0.14,
    heightVw: 0.16,
  },
  {
    src: "/img/hero card img/hero-card-4.jpeg",
    alt: "Hero card image 4",
    initialX: 2,
    initialY: 60,
    rotation: -8,
    widthVw: 0.14,
    heightVw: 0.16,
  },
  {
    src: "/img/hero card img/hero-card-5.jpeg",
    alt: "Hero card image 5",
    initialX: 6,
    initialY: 33,
    rotation: 15,
    widthVw: 0.14,
    heightVw: 0.16,
  },
  {
    src: "/img/hero card img/hero-card-6.jpeg",
    alt: "Hero card image 6",
    initialX: 71,
    initialY: 70,
    rotation: -6,
    widthVw: 0.14,
    heightVw: 0.16,
  },
]

function TypewriterText({ text }: { text: string }) {
  const [displayed, setDisplayed] = useState("")
  const [done, setDone] = useState(false)

  useEffect(() => {
    let i = 0
    // Small delay before starting so the page settles
    const timeout = setTimeout(() => {
      const interval = setInterval(() => {
        i++
        setDisplayed(text.slice(0, i))
        if (i >= text.length) {
          clearInterval(interval)
          setDone(true)
        }
      }, 90)
      return () => clearInterval(interval)
    }, 400)
    return () => clearTimeout(timeout)
  }, [text])

  return (
    <span>
      {displayed}
      {!done && (
        <motion.span
          className="inline-block w-[3px] h-[0.85em] bg-white align-middle ml-1 mb-1"
          animate={{ opacity: [1, 0, 1] }}
          transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
        />
      )}
    </span>
  )
}

export function HeroSection() {
  // This ref is passed to every DraggableCard as the drag constraint boundary
  const constraintsRef = useRef<HTMLElement | null>(null)

  const handleViewWork = () => {
    const projectsSection = document.getElementById("projects")
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section
      ref={constraintsRef as React.RefObject<HTMLElement>}
      className="relative w-full overflow-hidden"
      style={{ minHeight: "100vh" }}
    >
      <GridBackground />

      {/* Photo Cards */}
      {photoCards.map((card, index) => (
        <DraggableCard
          key={index}
          src={card.src}
          alt={card.alt}
          initialX={card.initialX}
          initialY={card.initialY}
          rotation={card.rotation}
          index={index}
          widthVw={card.widthVw}
          heightVw={card.heightVw}
          constraintsRef={constraintsRef}
        />
      ))}

      {/* Center Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center z-30 pointer-events-none px-4 sm:px-6 md:px-8">
        <motion.h1
          className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl xl:text-9xl text-white text-center font-serif tracking-tight leading-tight"
          style={{ fontFamily: "var(--font-serif), 'Playfair Display', serif" }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <TypewriterText text={FULL_NAME} />
        </motion.h1>

        <div className="mt-6 sm:mt-8 md:mt-10 pointer-events-auto z-40">
          <SketchButton onClick={handleViewWork}>View Work</SketchButton>
        </div>

        <motion.p
          className="mt-8 sm:mt-12 md:mt-16 text-white/60 text-xs sm:text-xs md:text-sm tracking-[0.3em] uppercase font-sans"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1.6 }}
        >
          Drag to move
        </motion.p>
      </div>
    </section>
  )
}
