'use client'
import Link from 'next/link'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { Button } from '@/components/ui/button'
import React from 'react'
import { cn } from '@/lib/utils'
import { LanguageSwitcher } from './language-switcher'

export const HeroHeader = () => {
    const t = useTranslations('common')
    const [isScrolled, setIsScrolled] = React.useState(false)

    React.useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])
    return (
        <header>
            <nav
                className="fixed z-50 w-full px-2">
                <div className={cn('mx-auto mt-2 max-w-6xl px-6 transition-all duration-300 lg:px-12', isScrolled && 'bg-background/50 max-w-4xl rounded-2xl border backdrop-blur-lg lg:px-5')}>
                    <div className="relative flex flex-wrap items-center justify-between gap-6 py-3 lg:gap-0 lg:py-4">
                        <div className="flex w-full justify-between items-center">
                            <Link
                                href="#"
                                aria-label="home"
                                className="flex items-center space-x-2"
                                onClick={(e) => {
                                    e.preventDefault()
                                    window.scrollTo({ top: 0, behavior: 'smooth' })
                                }}>
                                <Image
                                    src="/magic.svg"
                                    alt="Magic"
                                    width={115}
                                    height={43}
                                    className="h-6 w-auto"
                                />
                            </Link>

                            <div className="flex items-center gap-4">
                                <LanguageSwitcher />
                                <Link href="#contact" className="cursor-pointer">
                                    <Button
                                        variant={isScrolled ? "default" : "outline"}
                                        size="sm"
                                        className="hover:cursor-pointer hover:opacity-66 hover:border-opacity-66 transition-all duration-100">
                                        <span>{t('requestDemo')}</span>
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    )
}
