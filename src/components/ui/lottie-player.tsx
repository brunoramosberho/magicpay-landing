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

    React.useEffect(() => {
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
    }, [src])

    if (error) {
        return <div role="img" aria-label={ariaLabel ?? 'Lottie animation failed to load'} className={className} />
    }

    if (!animationData) {
        return <div aria-hidden className={className} />
    }

    return (
        <Lottie
            animationData={animationData as object}
            loop={loop}
            autoplay={autoplay}
            className={className}
            aria-label={ariaLabel}
        />
    )
}


