"use client"

import { motion } from "framer-motion"

interface SketchButtonProps {
  children: React.ReactNode
  onClick?: () => void
}

export function SketchButton({ children, onClick }: SketchButtonProps) {
  return (
    <motion.button
      onClick={onClick}
      className="relative inline-flex min-w-[160px] min-h-[58px] items-center justify-center px-8 py-3 text-white text-sm tracking-[0.2em] font-sans uppercase font-medium"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.5 }}
    >
      {/* Hand-drawn oval border using SVG */}
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 220 76"
        preserveAspectRatio="none"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ pointerEvents: "none" }}
      >
        <motion.path
          d="M12 38 C12 18, 36 8, 110 8 C184 8, 208 18, 208 38 C208 58, 184 68, 110 68 C36 68, 12 58, 12 38"
          stroke="white"
          strokeWidth="1.5"
          strokeLinecap="round"
          fill="transparent"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1, delay: 0.8, ease: "easeInOut" }}
          style={{
            filter: "url(#roughen)",
          }}
        />
        <defs>
          <filter id="roughen">
            <feTurbulence
              type="turbulence"
              baseFrequency="0.05"
              numOctaves="2"
              result="noise"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale="1"
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </defs>
      </svg>
      <span className="relative z-10 block">{children}</span>
      
      {/* Hover glow effect */}
      <motion.div
        className="absolute inset-0 rounded-full opacity-0"
        style={{
          background: "radial-gradient(ellipse at center, rgba(255,255,255,0.15) 0%, transparent 70%)",
        }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      />
    </motion.button>
  )
}
