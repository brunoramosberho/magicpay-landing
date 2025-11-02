'use client'

import React from 'react'
import dynamic from 'next/dynamic'

const Lottie = dynamic(() => import('lottie-react'), { ssr: false })

type LottiePlayerProps = {
    src: string
    loop?: boolean
    autoplay?: boolean
    className?: string
    ariaLabel?: string
}

export default function LottiePlayer({ src, loop = true, autoplay = true, className, ariaLabel }: LottiePlayerProps) {
    const [animationData, setAnimationData] = React.useState<unknown | null>(null)
    const [error, setError] = React.useState<string | null>(null)
    const [shouldLoad, setShouldLoad] = React.useState(false)
    const containerRef = React.useRef<HTMLDivElement | null>(null)

    React.useEffect(() => {
        const element = containerRef.current
        if (!element) return

        if (typeof IntersectionObserver === 'undefined') {
            setShouldLoad(true)
            return
        }

        const observer = new IntersectionObserver(
            (entries) => {
                const entry = entries[0]
                if (entry?.isIntersecting) {
                    setShouldLoad(true)
                    observer.disconnect()
                }
            },
            {
                rootMargin: '200px'
            }
        )

        observer.observe(element)

        return () => {
            observer.disconnect()
        }
    }, [])

    React.useEffect(() => {
        if (!shouldLoad) return
        let isMounted = true
        setError(null)
        setAnimationData(null)
        fetch(src)
            .then(async (res) => {
                if (!res.ok) throw new Error(`Failed to load Lottie: ${res.status}`)
                return res.json()
            })
            .then((json) => {
                if (isMounted) setAnimationData(json)
            })
            .catch((e) => {
                if (isMounted) setError(e?.message ?? 'Failed to load animation')
            })
        return () => {
            isMounted = false
        }
    }, [src, shouldLoad])

    if (error) {
        return <div ref={containerRef} role="img" aria-label={ariaLabel ?? 'Lottie animation failed to load'} className={className} />
    }

    return (
        <div ref={containerRef} className={className} aria-hidden={!ariaLabel}>
            {animationData && shouldLoad ? (
                <Lottie
                    animationData={animationData as object}
                    loop={loop}
                    autoplay={autoplay}
                    className="size-full"
                    aria-label={ariaLabel}
                />
            ) : null}
        </div>
    )
}


