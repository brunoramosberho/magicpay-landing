"use client"

import { useEffect, useRef } from 'react'
import Image from 'next/image'

interface Particle {
  x: number
  y: number
  z: number
  char: string
  baseSpeed: number
  wobble: number
  wobbleSpeed: number
  rotation: number
  rotationSpeed: number
}

export interface CustomizableCodexAnimationProps {
  // Character settings
  characters?: string[]
  particleCount?: number
  
  // Animation speed settings
  baseSpeed?: number
  speedVariation?: number
  wobbleAmount?: number
  rotationEnabled?: boolean
  
  // Visual settings
  minSize?: number
  maxSize?: number
  minOpacity?: number
  maxOpacity?: number
  
  // Color settings
  characterColor?: string
  shadowEnabled?: boolean
  glowEnabled?: boolean
  
  // Font settings
  fontFamily?: string
  fontWeight?: string
  
  // Icon settings
  showIcon?: boolean
  iconSrc?: string
  iconSize?: number
  iconOpacity?: number
  
  // Direction
  flowDirection?: 'up' | 'down' | 'left' | 'right'
}

export function CustomizableCodexAnimation({
  characters = ['2', '+', '*', '/', '=', '√', '∑', '∆', 'π', 'e'],
  particleCount = 200,
  baseSpeed = 0.4,
  speedVariation = 0.6,
  wobbleAmount = 0.5,
  rotationEnabled = false,
  minSize = 12,
  maxSize = 32,
  minOpacity = 0.3,
  maxOpacity = 0.9,
  characterColor = 'white',
  shadowEnabled = true,
  glowEnabled = true,
  fontFamily = 'monospace',
  fontWeight = 'bold',
  showIcon = false,
  iconSrc = '/magic.svg',
  iconSize = 200,
  iconOpacity = 100,
  flowDirection = 'up'
}: CustomizableCodexAnimationProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Get dimensions from parent or use defaults
    const parent = canvas.parentElement
    let width = parent?.offsetWidth || canvas.offsetWidth || 800
    let height = parent?.offsetHeight || canvas.offsetHeight || 600
    
    canvas.width = width * 2
    canvas.height = height * 2
    ctx.scale(2, 2)

    const particles: Particle[] = []

    // Initialize particles (spawn in center 66% for centered effect)
    const centerOffset = width * 0.17 // Start at 17% from left
    const centerWidth = width * 0.66   // Use 66% of width
    
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: centerOffset + Math.random() * centerWidth,
        y: Math.random() * height * 1.5,
        z: Math.random() * 1000,
        char: characters[Math.floor(Math.random() * characters.length)],
        baseSpeed: baseSpeed + Math.random() * speedVariation,
        wobble: Math.random() * Math.PI * 2,
        wobbleSpeed: 0.01 + Math.random() * 0.02,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.02
      })
    }

    let animationFrameId: number

    const animate = () => {
      // Clear canvas completely for now (we'll add motion blur later)
      ctx.clearRect(0, 0, width, height)

      // Sort particles by z-index
      particles.sort((a, b) => b.z - a.z)

      particles.forEach((particle) => {
        // Calculate scale based on depth
        const scale = 1000 / (particle.z + 500)
        
        // Update position based on flow direction
        switch (flowDirection) {
          case 'up':
            particle.y -= particle.baseSpeed * scale
            particle.z -= particle.baseSpeed * 2
            break
          case 'down':
            particle.y += particle.baseSpeed * scale
            particle.z -= particle.baseSpeed * 2
            break
          case 'left':
            particle.x -= particle.baseSpeed * scale
            particle.z -= particle.baseSpeed * 2
            break
          case 'right':
            particle.x += particle.baseSpeed * scale
            particle.z -= particle.baseSpeed * 2
            break
        }
        
        particle.wobble += particle.wobbleSpeed
        if (rotationEnabled) {
          particle.rotation += particle.rotationSpeed
        }

        // Add wobble movement
        const wobbleX = Math.sin(particle.wobble) * wobbleAmount
        const wobbleY = Math.cos(particle.wobble * 0.5) * wobbleAmount * 0.5

        // Reset particle if it goes off screen (keep in center 66%)
        const centerOffset = width * 0.17
        const centerWidth = width * 0.66
        
        if (particle.z < 0 || 
            particle.y < -50 || particle.y > height + 50 ||
            particle.x < -50 || particle.x > width + 50) {
          switch (flowDirection) {
            case 'up':
              particle.y = height + 50
              particle.x = centerOffset + Math.random() * centerWidth
              break
            case 'down':
              particle.y = -50
              particle.x = centerOffset + Math.random() * centerWidth
              break
            case 'left':
              particle.x = width + 50
              particle.y = Math.random() * height
              break
            case 'right':
              particle.x = -50
              particle.y = Math.random() * height
              break
          }
          particle.z = 900 + Math.random() * 100
        }

        // Calculate size and opacity based on depth
        const size = minSize + scale * (maxSize - minSize)
        const opacity = Math.min(maxOpacity, minOpacity + scale * (maxOpacity - minOpacity))

        // Calculate position with perspective and wobble
        const x = particle.x + wobbleX + (particle.x - width / 2) * (1 - scale) * 0.1
        const y = particle.y + wobbleY

        if (opacity > 0.1) {
          ctx.save()
          ctx.translate(x, y)
          
          if (rotationEnabled) {
            ctx.rotate(particle.rotation)
          }

          // Shadow for depth
          if (shadowEnabled) {
            ctx.fillStyle = `rgba(0, 0, 0, ${opacity * 0.4})`
            ctx.font = `${fontWeight} ${size}px ${fontFamily}`
            ctx.fillText(particle.char, 2, 2)
          }

          // Main character
          let fillColor: string
          if (characterColor === 'white') {
            fillColor = `rgba(255, 255, 255, ${opacity})`
          } else if (characterColor.startsWith('rgba')) {
            // Extract RGB values and apply opacity
            const rgbaMatch = characterColor.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/)
            if (rgbaMatch) {
              fillColor = `rgba(${rgbaMatch[1]}, ${rgbaMatch[2]}, ${rgbaMatch[3]}, ${opacity})`
            } else {
              fillColor = `rgba(255, 255, 255, ${opacity})`
            }
          } else if (characterColor.startsWith('rgb')) {
            const rgbMatch = characterColor.match(/rgb\((\d+),\s*(\d+),\s*(\d+)/)
            if (rgbMatch) {
              fillColor = `rgba(${rgbMatch[1]}, ${rgbMatch[2]}, ${rgbMatch[3]}, ${opacity})`
            } else {
              fillColor = `rgba(255, 255, 255, ${opacity})`
            }
          } else {
            fillColor = `rgba(255, 255, 255, ${opacity})`
          }
          
          ctx.fillStyle = fillColor
          ctx.font = `${fontWeight} ${size}px ${fontFamily}`
          ctx.fillText(particle.char, 0, 0)

          // Glow/highlight
          if (glowEnabled) {
            ctx.fillStyle = `rgba(255, 255, 255, ${opacity * 0.3})`
            ctx.font = `${fontWeight} ${size * 0.8}px ${fontFamily}`
            ctx.fillText(particle.char, -1, -1)
          }

          ctx.restore()
        }
      })

      animationFrameId = requestAnimationFrame(animate)
    }

    animate()

    const handleResize = () => {
      const parent = canvas.parentElement
      width = parent?.offsetWidth || canvas.offsetWidth || 800
      height = parent?.offsetHeight || canvas.offsetHeight || 600
      canvas.width = width * 2
      canvas.height = height * 2
      ctx.scale(2, 2)
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
      cancelAnimationFrame(animationFrameId)
    }
  }, [characters, particleCount, baseSpeed, speedVariation, wobbleAmount, rotationEnabled, 
      minSize, maxSize, minOpacity, maxOpacity, characterColor, shadowEnabled, glowEnabled, 
      fontFamily, fontWeight, flowDirection])

  return (
    <div className="absolute inset-0 w-full h-full">
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 w-full h-full" 
        style={{ backgroundColor: 'transparent' }}
      />
      {showIcon && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
          <Image
            src={iconSrc}
            alt="Icon"
            width={iconSize}
            height={iconSize}
            style={{ opacity: iconOpacity / 100 }}
          />
        </div>
      )}
    </div>
  )
}

