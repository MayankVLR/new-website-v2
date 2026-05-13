"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { useState, type RefObject } from "react"

interface DraggableCardProps {
  src: string
  alt: string
  initialX: number
  initialY: number
  rotation: number
  index: number
  /** Width as a fraction of viewport width (e.g. 0.14 = 14vw) */
  widthVw: number
  /** Height as a fraction of viewport width (e.g. 0.18 = 18vw) */
  heightVw: number
  constraintsRef: RefObject<HTMLElement | null>
}

export function DraggableCard({
  src,
  alt,
  initialX,
  initialY,
  rotation,
  index,
  widthVw,
  heightVw,
  constraintsRef,
}: DraggableCardProps) {
  const [zIndex, setZIndex] = useState(index + 10)

  // Convert vw fractions to CSS clamp values for responsive sizing
  // Added a hard minimum width (120px) so cards aren't too small on mobile
  const minW = Math.max(120, Math.round(widthVw * 320))
  const maxW = Math.round(widthVw * 1920)

  const widthCss = `clamp(${minW}px, ${widthVw * 100}vw, ${maxW}px)`

  return (
    <motion.div
      className="absolute cursor-grab active:cursor-grabbing group"
      style={{
        left: `${initialX}%`,
        top: `${initialY}%`,
        zIndex,
      }}
      initial={{ opacity: 0, scale: 0.8, rotate: rotation }}
      animate={{
        opacity: 1,
        scale: 1,
        rotate: rotation,
        y: [0, -5, 0],
      }}
      transition={{
        opacity: { duration: 0.5, delay: index * 0.1 },
        scale: { duration: 0.5, delay: index * 0.1 },
        y: {
          duration: 3 + (index % 3) * 0.8,
          repeat: Infinity,
          ease: "easeInOut",
          delay: index * 0.3,
        },
      }}
      drag
      dragConstraints={constraintsRef}
      dragElastic={0.08}
      dragMomentum={false}
      whileHover={{ scale: 1.05, rotate: 0 }}
      whileTap={{ scale: 0.98, cursor: "grabbing" }}
      onDragStart={() => setZIndex(100)}
      onDragEnd={() => setZIndex(index + 10)}
    >
      {/* Polaroid frame */}
      <div
        className="bg-[#fdfcf8] rounded-sm relative"
        style={{
          padding: "6%",
          paddingBottom: "22%",
          boxShadow: "0 15px 35px rgba(0,0,0,0.25), 0 5px 15px rgba(0,0,0,0.1)",
          width: widthCss,
        }}
      >
        <div
          className="relative overflow-hidden bg-[#1a1a1a]"
          style={{ width: "100%", paddingBottom: `${(heightVw / widthVw) * 100}%` }}
        >
          <Image
            src={src}
            alt={alt}
            fill
            className="object-cover pointer-events-none select-none contrast-[1.05] sepia-[0.15] saturate-[0.85] brightness-[0.95]"
            sizes={`${Math.round(widthVw * 100)}vw`}
            draggable={false}
          />
          {/* Vintage Vignette & Inner Shadow Overlay */}
          <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_20px_rgba(0,0,0,0.4)] mix-blend-multiply" />
          <div className="absolute inset-0 pointer-events-none shadow-[inset_0_1px_3px_rgba(0,0,0,0.2)]" />
        </div>
      </div>
    </motion.div>
  )
}
