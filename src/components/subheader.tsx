'use client'

import { useTranslations } from 'next-intl'

export default function Subheader() {
    const t = useTranslations('subheader')

    return (
        <section className="bg-background py-12">
            <div className="mx-auto max-w-5xl px-6">
                <div className="text-center text-foreground/80">
                    <p className="font-normal" style={{ fontSize: '1.375em' }}>
                        {t('headline')}
                    </p>
                    <p className="mt-2 font-normal" style={{ fontSize: '1em' }}>
                        {t('footnote')}
                    </p>
                </div>
            </div>
        </section>
    )
}
