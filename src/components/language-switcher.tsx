'use client'

import { useLocale } from 'next-intl'
import { usePathname, useRouter } from '@/i18n/routing'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Globe2 } from 'lucide-react'

export function LanguageSwitcher() {
  const locale = useLocale()
  const router = useRouter()
  const pathname = usePathname()

  const handleLanguageChange = (newLocale: string) => {
    router.replace(pathname, { locale: newLocale })
  }

  const localeLabel = locale === 'es' ? 'ES' : 'EN'

  return (
    <Select value={locale} onValueChange={handleLanguageChange}>
      <SelectTrigger
        size="sm"
        aria-label="Language selector"
        className="w-[68px] px-2 justify-center"
      >
        <span className="flex items-center gap-1 text-sm font-medium text-foreground">
          <Globe2 className="size-3.5 text-primary" aria-hidden />
          <span aria-hidden>{localeLabel}</span>
        </span>
      </SelectTrigger>
      <SelectContent align="end" className="min-w-[4.5rem]">
        <SelectItem value="en" aria-label="English">
          <span className="text-sm font-medium">EN</span>
        </SelectItem>
        <SelectItem value="es" aria-label="Español">
          <span className="text-sm font-medium">ES</span>
        </SelectItem>
      </SelectContent>
    </Select>
  )
}

