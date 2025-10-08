"use client"

import { useEffect, useState } from "react"
import { AnimatePresence, motion, MotionProps } from "motion/react"
import { cn } from "@/lib/utils"

interface CustomWordRotateProps {
  words: React.ReactNode[]
  duration?: number
  motionProps?: MotionProps
  className?: string
}

export function CustomWordRotate({
  words,
  duration = 2500,
  motionProps = {
    initial: { opacity: 0, y: -32 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 32 },
    transition: { duration: 0.5, ease: "easeOut" },
  },
  className,
}: CustomWordRotateProps) {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % words.length)
    }, duration)

    // Clean up interval on unmount
    return () => clearInterval(interval)
  }, [words, duration])

  return (
    <div className="py-2" style={{ overflow: 'visible' }}>
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          className={cn(className)}
          {...motionProps}
        >
          {words[index]}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
