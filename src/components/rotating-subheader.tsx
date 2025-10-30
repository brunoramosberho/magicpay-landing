"use client"

import { CustomWordRotate } from "@/components/custom-word-rotate"
import { useTranslations } from "next-intl"
import { ReactNode } from "react"

export default function RotatingSubheader() {
    const t = useTranslations('rotatingSubheader')

    const highlight = (chunks: ReactNode) => (
        <span style={{ color: '#306FF6' }}>{chunks}</span>
    )

    const rotatingPhrases = [
        t.rich('step1', {
            highlight,
            br: () => <br />
        }),
        t.rich('step2', {
            highlight,
            br: () => <br />
        }),
        t.rich('step3', {
            highlight,
            br: () => <br />
        })
    ]

    return (
        <section className="bg-background py-6">
            <div className="mx-auto max-w-5xl px-6">
                <div className="text-center text-foreground/80">
                    <div className="font-normal relative" style={{ fontSize: '2.25em', minHeight: '1.2em' }}>
                        <CustomWordRotate 
                            words={rotatingPhrases}
                            duration={3000}
                            className="font-normal text-center"
                            motionProps={{
                                initial: { opacity: 0, y: -32 },
                                animate: { opacity: 1, y: 0 },
                                exit: { opacity: 0, y: 32 },
                                transition: { duration: 0.5, ease: "easeOut" },
                            }}
                        />
                    </div>
                    <p className="mt-2 font-normal" style={{ fontSize: '0.875em' }}>
                        {t('footnote')}
                    </p>
                </div>
            </div>
        </section>
    )
}
