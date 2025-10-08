"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import UnicornScene from "unicornstudio-react"

interface CodexBackgroundContainerProps {
  showIcon?: boolean
  iconSrc?: string
  iconSize?: number
  iconOpacity?: number
}

export function CodexBackgroundContainer({ 
  showIcon = false,
  iconSrc = "/magic.svg",
  iconSize = 200,
  iconOpacity = 80
}: CodexBackgroundContainerProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)

    const updateDimensions = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect()
        setDimensions({
          width: rect.width,
          height: rect.height
        })
      }
    }

    // Initial measurement with delay
    const timer = setTimeout(updateDimensions, 100)

    // Update on resize
    const resizeObserver = new ResizeObserver(updateDimensions)
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current)
    }

    return () => {
      clearTimeout(timer)
      resizeObserver.disconnect()
    }
  }, [])

  return (
    <div ref={containerRef} className="absolute inset-0 w-full h-full">
      {mounted && dimensions.width > 0 && dimensions.height > 0 && (
        <>
          <UnicornScene
            production={true}
            projectId="1grEuiVDSVmyvEMAYhA6"
            width={dimensions.width}
            height={dimensions.height}
          />
          {showIcon && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <Image
                src={iconSrc}
                alt="Icon"
                width={iconSize}
                height={iconSize}
                style={{ opacity: iconOpacity / 100 }}
              />
            </div>
          )}
        </>
      )}
    </div>
  )
}

