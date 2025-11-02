import React from 'react'
import Link from 'next/link'
import { getTranslations } from 'next-intl/server'
import { AuroraText } from '@/components/ui/aurora-text'
import { RequestDemoButton } from '@/components/ui/request-demo-button'
import { HeroHeader } from './header'


export default async function HeroSection() {
    const t = await getTranslations('hero')
    const tCommon = await getTranslations('common')

    return (
        <>
            <HeroHeader />
            <main className="overflow-hidden">
                <div
                    aria-hidden
                    className="absolute inset-0 isolate hidden opacity-65 contain-strict pointer-events-none -z-10 lg:block">
                    <div className="w-140 h-320 -translate-y-87.5 absolute left-0 top-0 -rotate-45 rounded-full bg-[radial-gradient(68.54%_68.72%_at_55.02%_31.46%,hsla(0,0%,85%,.08)_0,hsla(0,0%,55%,.02)_50%,hsla(0,0%,45%,0)_80%)]" />
                    <div className="h-320 absolute left-0 top-0 w-60 -rotate-45 rounded-full bg-[radial-gradient(50%_50%_at_50%_50%,hsla(0,0%,85%,.06)_0,hsla(0,0%,45%,.02)_80%,transparent_100%)] [translate:5%_-50%]" />
                    <div className="h-320 -translate-y-87.5 absolute left-0 top-0 w-60 -rotate-45 bg-[radial-gradient(50%_50%_at_50%_50%,hsla(0,0%,85%,.04)_0,hsla(0,0%,45%,.02)_80%,transparent_100%)]" />
                </div>
                <section>
                    <div className="relative pt-16 md:pt-24">
                        <div className="mask-b-from-35% mask-b-to-90% absolute inset-0 top-56 -z-20 lg:top-32">
                            <div className="hidden size-full dark:block bg-gradient-to-b from-slate-900 via-purple-900 to-slate-900"></div>
                        </div>

                        <div
                            aria-hidden
                            className="absolute inset-0 -z-10 size-full [background:radial-gradient(125%_125%_at_50%_100%,transparent_0%,var(--color-background)_75%)]"
                        />

                        <div className="mx-auto max-w-7xl px-6">
                            <div className="text-center sm:mx-auto lg:mr-auto lg:mt-0">
                                {/* <AnimatedGroup variants={transitionVariants}>
                                    <div className="mx-auto flex w-fit items-center justify-center">
                                        <Image
                                            src="/icon.svg"
                                            alt="Magic Icon"
                                            width={62}
                                            height={62}
                                            className="h-16 w-16"
                                        />
                                    </div>
                                </AnimatedGroup> */}

                                <h1 className="mx-auto mt-4 max-w-4xl text-balance"
                                    style={{ 
                                        fontFamily: "'Apercu Pro', ui-sans-serif, system-ui, sans-serif", 
                                        fontWeight: 450,
                                        fontSize: '88pt',
                                        lineHeight: 1.0
                                    }}>
                                    {t('title')}{' '}
                                    <AuroraText 
                                        colors={["#306FF6", "#B7E9FC", "#306FF6", "#123888"]}
                                        speed={1.5}>
                                        {t('magic')}
                                    </AuroraText>
                                </h1>
                                <p className="mx-auto mt-8 max-w-2xl text-balance"
                                   style={{ fontFamily: "'Apercu Pro', ui-sans-serif, system-ui, sans-serif", fontWeight: 400, fontSize: '1.375em' }}>
                                    {t('subtitle')}
                                </p>
                                <p className="mx-auto mt-3 max-w-2xl text-balance"
                                   style={{ fontFamily: "'Apercu Pro', ui-sans-serif, system-ui, sans-serif", fontWeight: 400, fontSize: '1.125em' }}>
                                    {t('description')}
                                </p>

                                <div className="mt-12 flex flex-col items-center justify-center">
                                    <Link href="#contact">
                                        <RequestDemoButton label={tCommon('requestDemo')} />
                                    </Link>
                                </div>
                            </div>
                        </div>

                        <div className="relative mt-8 px-2 sm:mt-12 md:mt-20 pb-16 md:pb-20">
                            <div className="relative mx-auto max-w-6xl">
                                <div 
                                    className="aspect-video w-full mx-auto relative overflow-hidden"
                                    style={{ 
                                        /* Frame 1 */
                                        boxSizing: 'border-box',
                                        
                                        background: '#F7F7F7',
                                        backgroundColor: 'color(display-p3 0.970 0.970 0.970)',
                                        boxShadow: '0 0.125em 2em rgba(0, 0, 0, 0.08), 0 0.125em 2em color(display-p3 0.000 0.000 0.000 / 0.08)',
                                        borderRadius: '1.6875em',
                                        border: '1px solid transparent',
                                        backgroundImage: 'linear-gradient(#F7F7F7, #F7F7F7), linear-gradient(0deg, #FFFFFF 0%, rgba(255, 255, 255, 0.2) 50%, #FFFFFF 100%)',
                                        backgroundOrigin: 'border-box',
                                        backgroundClip: 'padding-box, border-box'
                                    }}>
                                    <video
                                        src="/magicpay-walkthrough.mp4"
                                        autoPlay
                                        loop
                                        muted
                                        playsInline
                                        preload="none"
                                        poster="/placeholder-1.png"
                                        className="rounded-[1.6875em] w-full h-full object-cover object-center"
                                        controls={false}
                                    />
                                </div>
                                
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </>
    )
}
