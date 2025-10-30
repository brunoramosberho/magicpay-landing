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

  return (
    <Select value={locale} onValueChange={handleLanguageChange}>
      <SelectTrigger className="w-[150px] h-10 px-3">
        <span className="flex items-center gap-2 text-sm font-medium text-foreground">
          <Globe2 className="size-4 text-primary" aria-hidden />
          <SelectValue />
        </span>
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="en">
          <span className="flex flex-col leading-tight">
            <span className="text-sm font-medium">English</span>
            <span className="text-xs text-muted-foreground">Global</span>
          </span>
        </SelectItem>
        <SelectItem value="es">
          <span className="flex flex-col leading-tight">
            <span className="text-sm font-medium">Español (MX)</span>
            <span className="text-xs text-muted-foreground">Latinoamérica</span>
          </span>
        </SelectItem>
      </SelectContent>
    </Select>
  )
}

