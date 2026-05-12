"use client"

import { motion } from "framer-motion"
import { useEffect, useRef, useState } from "react"
import { GridBackground } from "./grid-background"
import { StickyNote } from "./sticky-note"
import { SketchButton } from "./sketch-button"
import { DraggableCard } from "./draggable-card"

const FULL_NAME = "Uthinh Pham"

// widthVw / heightVw are fractions of 1 viewport width (e.g. 0.14 = 14vw)
const photoCards = [
  {
    src: "/placeholder.svg?height=280&width=200",
    alt: "Portrait photo",
    initialX: 3,
    initialY: 8,
    rotation: -12,
    widthVw: 0.12,
    heightVw: 0.17,
  },
  {
    src: "/placeholder.svg?height=200&width=280",
    alt: "Car photo",
    initialX: 74,
    initialY: 4,
    rotation: 8,
    widthVw: 0.17,
    heightVw: 0.12,
  },
  {
    src: "/placeholder.svg?height=200&width=280",
    alt: "Desk setup",
    initialX: 76,
    initialY: 38,
    rotation: 5,
    widthVw: 0.16,
    heightVw: 0.115,
  },
  {
    src: "/placeholder.svg?height=200&width=280",
    alt: "Garage scene",
    initialX: 2,
    initialY: 60,
    rotation: -8,
    widthVw: 0.16,
    heightVw: 0.115,
  },
  {
    src: "/placeholder.svg?height=250&width=180",
    alt: "Coke cans",
    initialX: 6,
    initialY: 33,
    rotation: 15,
    widthVw: 0.11,
    heightVw: 0.15,
  },
  {
    src: "/placeholder.svg?height=200&width=280",
    alt: "Bike",
    initialX: 71,
    initialY: 70,
    rotation: -6,
    widthVw: 0.15,
    heightVw: 0.11,
  },
  {
    src: "/placeholder.svg?height=180&width=200",
    alt: "Controller",
    initialX: 18,
    initialY: 76,
    rotation: 10,
    widthVw: 0.12,
    heightVw: 0.105,
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

  return (
    <section
      ref={constraintsRef as React.RefObject<HTMLElement>}
      className="relative min-h-screen w-full overflow-hidden"
    >
      <GridBackground />

      {/* Sticky Note */}
      <StickyNote text="without writing a single line of code!" />

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
      <div className="absolute inset-0 flex flex-col items-center justify-center z-30 pointer-events-none">
        <motion.h1
          className="text-6xl md:text-8xl lg:text-9xl text-white text-center font-serif tracking-tight leading-tight"
          style={{ fontFamily: "var(--font-serif), 'Playfair Display', serif" }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <TypewriterText text={FULL_NAME} />
        </motion.h1>

        <div className="mt-10 pointer-events-auto">
          <SketchButton>View Work</SketchButton>
        </div>

        <motion.p
          className="mt-16 text-white/60 text-xs tracking-[0.3em] uppercase font-sans"
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
