"use client"

import React, { forwardRef, useRef, useEffect, useState } from "react"
import Image from 'next/image'
import { cn } from "@/lib/utils"
import { AnimatedBeam } from "@/registry/magicui/animated-beam"

const IntegrationCard = forwardRef<
  HTMLDivElement,
  { className?: string; children?: React.ReactNode; isCenter?: boolean }
>(({ className, children, isCenter = false }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        'bg-white relative z-20 flex size-12 rounded-xl border border-gray-400/10',
        className
      )}
    >
      <div className={cn('m-auto size-fit *:size-12', isCenter && 'w-full h-full flex items-center justify-center')}>
        {children}
      </div>
    </div>
  )
})

IntegrationCard.displayName = "IntegrationCard"

export function BrandCustomizableThumbnail() {
  return (
    <div className="relative flex h-full w-full items-center justify-center overflow-hidden">
      <div className="bg-white/90 rounded-[2.592rem] shadow-2xl relative z-20 flex items-center justify-center overflow-hidden" style={{ width: '18.66rem', height: '16.79rem' }}>
        <SwingingMaskAnimation key="swinging-animation" />
      </div>
    </div>
  )
}

function SwingingMaskAnimation() {
  const [position, setPosition] = useState(0) // 0 to 100
  const [direction, setDirection] = useState(1) // 1 = right, -1 = left
  const [currentBase, setCurrentBase] = useState(0) // Track which keyboard is the base
  const [progress, setProgress] = useState(0) // 0 to 1 for easing

  // Ease-in-out function
  const easeInOutCubic = (t: number) => {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prevProgress) => {
        const increment = 0.008 // Slower speed (was 1.5/100 = 0.015)
        const newProgress = prevProgress + increment
        
        if (newProgress >= 1) {
          // Swing completed
          if (direction === 1) {
            // Completed swing to the right
            if (currentBase === 0) {
              setCurrentBase(1) // 0 → 1
            } else if (currentBase === 3) {
              setCurrentBase(4) // 3 → 4
            }
            setDirection(-1)
          } else {
            // Completed swing to the left
            if (currentBase === 1) {
              setCurrentBase(3) // 1 → 3
            } else if (currentBase === 4) {
              setCurrentBase(0) // 4 → 0 (loop back, skip 5)
            }
            setDirection(1)
          }
          return 0
        }
        
        return newProgress
      })
    }, 16) // 60fps

    return () => clearInterval(interval)
  }, [direction, currentBase])

  // Apply easing to position
  useEffect(() => {
    const easedProgress = easeInOutCubic(progress)
    if (direction === 1) {
      setPosition(easedProgress * 100) // 0 to 100
    } else {
      setPosition(100 - easedProgress * 100) // 100 to 0
    }
  }, [progress, direction])

  // Define keyboard paths
  const keyboards: { [key: number]: string } = {
    0: "/customization-animation/Keyboard-0.png?v=11", // Light theme - Blue button
    1: "/customization-animation/Keyboard-1.png?v=11", // Dark theme - Green button
    3: "/customization-animation/Keyboard-3.png?v=11", // Light theme - Black button
    4: "/customization-animation/Keyboard-4.png?v=11"  // Dark theme - Orange button
  }

  // Determine base and reveal based on current state
  const baseImage = keyboards[currentBase]
  let revealImage = keyboards[1] // Default fallback
  if (currentBase === 0) {
    revealImage = keyboards[1] // Light/Blue → Dark/Green
  } else if (currentBase === 1) {
    revealImage = keyboards[3] // Dark/Green → Light/Black
  } else if (currentBase === 3) {
    revealImage = keyboards[4] // Light/Black → Dark/Orange
  } else if (currentBase === 4) {
    revealImage = keyboards[0] // Dark/Orange → Light/Blue (loop back, skip 5)
  }

  return (
    <div className="relative w-full h-full">
      {/* Base background */}
      <div className="absolute inset-0">
        <Image
          src={baseImage}
          alt="Keyboard theme"
          fill
          className="object-contain scale-[0.9]"
        />
      </div>

      {/* Reveal layer */}
      <div 
        className="absolute inset-0"
        style={{
          clipPath: direction === 1 
            ? `polygon(0% 0%, ${position}% 0%, ${position}% 100%, 0% 100%)` // Reveal from left
            : `polygon(${position}% 0%, 100% 0%, 100% 100%, ${position}% 100%)` // Reveal from right
        }}
      >
        <Image
          src={revealImage}
          alt="Reveal keyboard theme"
          fill
          className="object-contain scale-[0.9]"
        />
      </div>

      {/* Vertical swinging line */}
      <div 
        className="absolute top-0 bottom-0 w-[4px] pointer-events-none z-10"
        style={{
          left: `${position}%`,
          transform: 'translateX(-50%)',
          background: 'linear-gradient(to bottom, transparent, rgba(59, 130, 246, 0.6) 20%, rgba(59, 130, 246, 0.8) 50%, rgba(59, 130, 246, 0.6) 80%, transparent)',
          boxShadow: '0 0 20px rgba(59, 130, 246, 0.5)'
        }}
      />
    </div>
  )
}

export function AnimatedBeamDemo() {
  const containerRef = useRef<HTMLDivElement>(null)
  const div1Ref = useRef<HTMLDivElement>(null)
  const div2Ref = useRef<HTMLDivElement>(null)
  const div3Ref = useRef<HTMLDivElement>(null)
  const div4Ref = useRef<HTMLDivElement>(null)
  const div5Ref = useRef<HTMLDivElement>(null)
  const div6Ref = useRef<HTMLDivElement>(null)
  const div7Ref = useRef<HTMLDivElement>(null)

  return (
    <div
      className="relative flex h-full w-full items-center justify-center overflow-hidden scale-95"
      ref={containerRef}
    >
      <div className="flex size-full max-h-[288px] max-w-4xl flex-row items-center justify-between px-10">
        <div className="flex flex-col items-center justify-between h-full">
          <IntegrationCard ref={div1Ref}>
            <Image
              src="/chat-icons/Frame 101698.svg"
              alt="Chat"
              width={20}
              height={20}
            />
          </IntegrationCard>
          <IntegrationCard ref={div2Ref}>
            <Image
              src="/chat-icons/Frame 101699.svg"
              alt="Chat"
              width={20}
              height={20}
            />
          </IntegrationCard>
          <IntegrationCard ref={div3Ref}>
            <Image
              src="/chat-icons/Frame 101702.svg"
              alt="Chat"
              width={20}
              height={20}
            />
          </IntegrationCard>
        </div>

        <div ref={div4Ref} className="bg-white/90 rounded-[2.16rem] shadow-2xl relative z-20 flex items-center justify-center overflow-hidden" style={{ width: '15.55rem', height: '14rem' }}>
          <Image
            src="/chat-icons/Keyboard.svg"
            alt="Keyboard"
            width={300}
            height={300}
            className="w-full h-full object-contain scale-[1.2]"
          />
        </div>

        <div className="flex flex-col items-center justify-between h-full">
          <IntegrationCard ref={div5Ref}>
            <Image
              src="/chat-icons/Frame 101703.svg"
              alt="Chat"
              width={20}
              height={20}
            />
          </IntegrationCard>
          <IntegrationCard ref={div6Ref}>
            <Image
              src="/chat-icons/Frame 101704.svg"
              alt="Chat"
              width={20}
              height={20}
            />
          </IntegrationCard>
          <IntegrationCard ref={div7Ref}>
            <Image
              src="/chat-icons/Icon.svg"
              alt="Chat"
              width={20}
              height={20}
            />
          </IntegrationCard>
        </div>
      </div>

      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div4Ref}
        toRef={div1Ref}
        curvature={-75}
        endYOffset={2}
        gradientStartColor="#3b82f6"
        gradientStopColor="#1d4ed8"
        reverse
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div4Ref}
        toRef={div2Ref}
        startYOffset={12}
        endYOffset={12}
        gradientStartColor="#3b82f6"
        gradientStopColor="#1d4ed8"
        reverse
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div4Ref}
        toRef={div3Ref}
        curvature={75}
        endYOffset={22}
        gradientStartColor="#3b82f6"
        gradientStopColor="#1d4ed8"
        reverse
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div4Ref}
        toRef={div5Ref}
        curvature={-75}
        endXOffset={24}
        endYOffset={2}
        gradientStartColor="#3b82f6"
        gradientStopColor="#1d4ed8"
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div4Ref}
        toRef={div6Ref}
        startYOffset={12}
        endYOffset={12}
        gradientStartColor="#3b82f6"
        gradientStopColor="#1d4ed8"
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div4Ref}
        toRef={div7Ref}
        curvature={75}
        endXOffset={24}
        endYOffset={22}
        gradientStartColor="#3b82f6"
        gradientStopColor="#1d4ed8"
      />
    </div>
  )
}
