"use client"

import { motion } from "framer-motion"

interface StickyNoteProps {
  text: string
  rotation?: number
}

export function StickyNote({ text, rotation = -8 }: StickyNoteProps) {
  return (
    <motion.div
      className="absolute top-[8%] left-1/2 -translate-x-1/2 z-20"
      initial={{ opacity: 0, y: -20, rotate: rotation }}
      animate={{ opacity: 1, y: 0, rotate: rotation }}
      transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
    >
      <div
        className="px-6 py-4 font-[var(--font-handwritten)]"
        style={{
          backgroundColor: "#a8d8ea",
          boxShadow: "4px 4px 12px rgba(0, 0, 0, 0.25)",
          fontFamily: "var(--font-handwritten), Caveat, cursive",
        }}
      >
        <p className="text-xl md:text-2xl text-gray-800 whitespace-nowrap">
          {text}
        </p>
      </div>
    </motion.div>
  )
}
