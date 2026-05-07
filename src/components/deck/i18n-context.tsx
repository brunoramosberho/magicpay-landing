'use client';

import {createContext, useContext, useEffect, useMemo, useState} from 'react';
import {i18n, type Locale, type StringKey} from '@/lib/deck/i18n';

type Ctx = {
  locale: Locale;
  setLocale: (l: Locale) => void;
  t: (k: StringKey) => string;
};

const I18nContext = createContext<Ctx | null>(null);

export function I18nProvider({
  children,
  defaultLocale = 'es'
}: {
  children: React.ReactNode;
  defaultLocale?: Locale;
}) {
  const [locale, setLocaleState] = useState<Locale>(defaultLocale);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('mgic_deck_locale');
      if (stored === 'es' || stored === 'en') setLocaleState(stored);
    } catch {
      // ignore
    }
  }, []);

  const value = useMemo<Ctx>(
    () => ({
      locale,
      setLocale: (l) => {
        setLocaleState(l);
        try {
          localStorage.setItem('mgic_deck_locale', l);
        } catch {
          // ignore
        }
      },
      t: (k) => i18n[locale][k] ?? i18n.es[k] ?? String(k)
    }),
    [locale]
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error('useI18n must be used inside I18nProvider');
  return ctx;
}
