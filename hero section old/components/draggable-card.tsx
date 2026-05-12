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
  // min is for very small screens (~360px), preferred is vw-based, max caps on large screens
  const minW = Math.round(widthVw * 360)
  const maxW = Math.round(widthVw * 1600)
  const minH = Math.round(heightVw * 360)
  const maxH = Math.round(heightVw * 1600)

  const widthCss = `clamp(${minW}px, ${widthVw * 100}vw, ${maxW}px)`
  const heightCss = `clamp(${minH}px, ${heightVw * 100}vw, ${maxH}px)`

  return (
    <motion.div
      className="absolute cursor-grab active:cursor-grabbing"
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
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.98, cursor: "grabbing" }}
      onDragStart={() => setZIndex(100)}
      onDragEnd={() => setZIndex(index + 10)}
    >
      {/* Polaroid frame */}
      <div
        className="bg-white p-2 pb-8"
        style={{
          boxShadow: "0 10px 40px rgba(0,0,0,0.3), 0 4px 12px rgba(0,0,0,0.2)",
          width: widthCss,
        }}
      >
        <div
          className="relative overflow-hidden"
          style={{ width: "100%", paddingBottom: `${(heightVw / widthVw) * 100}%` }}
        >
          <Image
            src={src}
            alt={alt}
            fill
            className="object-cover pointer-events-none select-none"
            sizes={`${Math.round(widthVw * 100)}vw`}
            draggable={false}
          />
        </div>
      </div>
    </motion.div>
  )
}
