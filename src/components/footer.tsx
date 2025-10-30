'use client'
import { useTranslations } from 'next-intl'

export default function Footer() {
    const t = useTranslations('footer')
    const currentYear = new Date().getFullYear();

    return (
        <footer className="border-t border-gray-200 bg-background">
            <div className="mx-auto max-w-7xl px-6 py-8">
                <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                    {/* Copyright */}
                    <div className="text-center md:text-left">
                        <p className="text-sm text-foreground/70"
                           style={{ fontFamily: "'Apercu Pro', ui-sans-serif, system-ui, sans-serif" }}>
                            {t('copyright', { year: currentYear, brand: 'magicPay®' })}
                        </p>
                    </div>

                    {/* Legal Links */}
                    <div className="flex flex-wrap justify-center md:justify-end gap-4 md:gap-6">
                        <a 
                            href="#aviso-privacidad" 
                            className="text-sm text-foreground/70 hover:text-foreground transition-colors"
                           style={{ fontFamily: "'Apercu Pro', ui-sans-serif, system-ui, sans-serif" }}>
                            {t('privacyNotice')}
                        </a>
                        <a 
                            href="#terminos-condiciones" 
                            className="text-sm text-foreground/70 hover:text-foreground transition-colors"
                           style={{ fontFamily: "'Apercu Pro', ui-sans-serif, system-ui, sans-serif" }}>
                            {t('termsConditions')}
                        </a>
                        <a 
                            href="#terminos-uso" 
                            className="text-sm text-foreground/70 hover:text-foreground transition-colors"
                           style={{ fontFamily: "'Apercu Pro', ui-sans-serif, system-ui, sans-serif" }}>
                            {t('termsOfUse')}
                        </a>
                        <a 
                            href="#proteccion-datos" 
                            className="text-sm text-foreground/70 hover:text-foreground transition-colors"
                           style={{ fontFamily: "'Apercu Pro', ui-sans-serif, system-ui, sans-serif" }}>
                            {t('dataProtection')}
                        </a>
                    </div>
                </div>

                {/* Additional Legal Text for Mexico */}
                <div className="mt-6 pt-6 border-t border-gray-200">
                    <p className="text-xs text-foreground/60 text-center"
                       style={{ fontFamily: "'Apercu Pro', ui-sans-serif, system-ui, sans-serif" }}>
                        {t('legalText', { brand: 'magicPay®' })}
                    </p>
                </div>
            </div>
        </footer>
    );
}

