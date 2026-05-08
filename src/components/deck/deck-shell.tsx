'use client';

import {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {motion, AnimatePresence} from 'framer-motion';
import {I18nProvider, useI18n} from './i18n-context';
import {LanguageToggle} from './language-toggle';
import {SectionsMenu} from './sections-menu';

function FullscreenButton() {
  const [isFs, setIsFs] = useState(false);
  useEffect(() => {
    const onChange = () => setIsFs(Boolean(document.fullscreenElement));
    document.addEventListener('fullscreenchange', onChange);
    return () => document.removeEventListener('fullscreenchange', onChange);
  }, []);
  return (
    <button
      type="button"
      aria-label={isFs ? 'Exit fullscreen' : 'Enter fullscreen'}
      onClick={() => {
        if (document.fullscreenElement) {
          document.exitFullscreen?.();
        } else {
          document.documentElement.requestFullscreen?.();
        }
      }}
      className="fs-btn"
    >
      {isFs ? '⤢' : '⤢'}
      <style jsx>{`
        .fs-btn {
          background: transparent;
          border: 0;
          padding: 4px 8px;
          color: var(--mp-fg-muted);
          font-size: 16px;
          cursor: pointer;
          border-radius: 4px;
          line-height: 1;
        }
        .fs-btn:hover {
          color: var(--mp-ink);
        }
      `}</style>
    </button>
  );
}

export type DeckClient = {
  slug: string;
  name: string;
  brand_color: string | null;
  logo_url: string | null;
  app_icon_url: string | null;
  currency: string;
  pricing_kickoff: number | null;
  pricing_monthly_fixed: number | null;
  pricing_per_active_user: number | null;
};

export type SlideContext = {
  client: DeckClient;
  index: number;
  total: number;
};

export type SlideDef = {
  id: string;
  /** Determines layout/colors of the slide chrome around the body. */
  variant?: 'light' | 'grey' | 'dark';
  /** Hide the standard footer (slide number + brand label) — for cover-style slides. */
  bare?: boolean;
  Body: React.ComponentType<SlideContext>;
};

export function DeckShell({
  token,
  client,
  slides
}: {
  token: string;
  client: DeckClient;
  slides: SlideDef[];
}) {
  return (
    <I18nProvider defaultLocale="es">
      <DeckShellInner token={token} client={client} slides={slides} />
    </I18nProvider>
  );
}

function DeckShellInner({
  token,
  client,
  slides
}: {
  token: string;
  client: DeckClient;
  slides: SlideDef[];
}) {
  const {t} = useI18n();
  const [index, setIndex] = useState(0);
  const sessionIdRef = useRef<string | null>(null);
  const startedAtRef = useRef<number>(Date.now());
  const slideEnteredAtRef = useRef<number>(Date.now());
  const visitorIdRef = useRef<string>('');

  useEffect(() => {
    let id = '';
    try {
      id = localStorage.getItem('mgic_deck_visitor') ?? '';
      if (!id) {
        id = crypto.randomUUID();
        localStorage.setItem('mgic_deck_visitor', id);
      }
    } catch {
      id = crypto.randomUUID();
    }
    visitorIdRef.current = id;
  }, []);

  const post = useCallback(
    async (body: Record<string, unknown>) => {
      try {
        await fetch('/api/deck/track', {
          method: 'POST',
          headers: {'content-type': 'application/json'},
          body: JSON.stringify({...body, token}),
          keepalive: true
        });
      } catch {
        // ignore
      }
    },
    [token]
  );

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch('/api/deck/track', {
          method: 'POST',
          headers: {'content-type': 'application/json'},
          body: JSON.stringify({
            type: 'session_start',
            token,
            visitorId: visitorIdRef.current,
            userAgent: navigator.userAgent,
            referrer: document.referrer || null
          })
        });
        const data = await res.json();
        if (!cancelled && data.sessionId) {
          sessionIdRef.current = data.sessionId;
          post({
            type: 'slide_enter',
            sessionId: data.sessionId,
            slideId: slides[0]?.id,
            slideIndex: 0
          });
          slideEnteredAtRef.current = Date.now();
        }
      } catch {
        // ignore
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [token, post, slides]);

  useEffect(() => {
    const heartbeat = () => {
      if (!sessionIdRef.current) return;
      post({
        type: 'session_heartbeat',
        sessionId: sessionIdRef.current,
        durationMs: Date.now() - startedAtRef.current,
        slideIndex: index
      });
    };
    const interval = window.setInterval(heartbeat, 15000);
    const onUnload = () => heartbeat();
    window.addEventListener('beforeunload', onUnload);
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'hidden') heartbeat();
    });
    return () => {
      window.clearInterval(interval);
      window.removeEventListener('beforeunload', onUnload);
    };
  }, [index, post]);

  const goTo = useCallback(
    (next: number) => {
      if (next < 0 || next >= slides.length) return;
      const sessionId = sessionIdRef.current;
      const prevSlide = slides[index];
      const duration = Date.now() - slideEnteredAtRef.current;
      if (sessionId && prevSlide) {
        post({
          type: 'slide_exit',
          sessionId,
          slideId: prevSlide.id,
          slideIndex: index,
          durationMs: duration
        });
      }
      setIndex(next);
      slideEnteredAtRef.current = Date.now();
      const nextSlide = slides[next];
      if (sessionId && nextSlide) {
        post({
          type: 'slide_enter',
          sessionId,
          slideId: nextSlide.id,
          slideIndex: next
        });
      }
    },
    [index, post, slides]
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement)?.tagName?.toLowerCase();
      if (tag === 'input' || tag === 'textarea') return;
      if (e.key === 'ArrowRight' || e.key === ' ' || e.key === 'PageDown') {
        e.preventDefault();
        goTo(index + 1);
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        e.preventDefault();
        goTo(index - 1);
      } else if (e.key === 'f' || e.key === 'F') {
        e.preventDefault();
        if (document.fullscreenElement) {
          document.exitFullscreen?.();
        } else {
          document.documentElement.requestFullscreen?.();
        }
      } else if (e.key === 'Home') {
        e.preventDefault();
        goTo(0);
      } else if (e.key === 'End') {
        e.preventDefault();
        goTo(slides.length - 1);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [goTo, index, slides.length]);

  const brand = client.brand_color || '#306FF6';
  const cssVars = useMemo(
    () => ({['--brand' as string]: brand}) as React.CSSProperties,
    [brand]
  );

  const current = slides[index];
  const variant = current?.variant ?? 'light';
  const isDark = variant === 'dark';

  return (
    <div className="deck-root" style={cssVars}>
      <header className="deck-header">
        <div className="deck-header-mark">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/deck/logos/icon.svg" alt="" aria-hidden className="brand-icon" />
          <span className="brand-name">magic</span>
          <span className="bar" aria-hidden>|</span>
          {client.logo_url ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={client.logo_url} alt={client.name} className="client-logo" />
          ) : (
            <span className="client-name">{client.name}</span>
          )}
        </div>
        <div className="deck-header-actions">
          <SectionsMenu slides={slides} currentIndex={index} onJump={goTo} />
          <FullscreenButton />
          <LanguageToggle />
        </div>
      </header>

      <main className={`deck-main ${isDark ? 'is-dark' : ''}`}>
        <AnimatePresence mode="wait">
          <motion.section
            key={current?.id ?? index}
            data-slide-id={current?.id}
            initial={{opacity: 0, y: 8}}
            animate={{opacity: 1, y: 0}}
            exit={{opacity: 0, y: -8}}
            transition={{duration: 0.25}}
            className={`deck-slide deck-frame variant-${variant}`}
          >
            {current && (
              <current.Body client={client} index={index} total={slides.length} />
            )}
            {!current?.bare && (
              <div className="deck-footer-note">
                <span className="deck-mark-small">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/deck/logos/icon.svg" alt="" aria-hidden />
                  <span>magic | {client.name}</span>
                </span>
                <span className="deck-slide-num">
                  {String(index + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}
                </span>
              </div>
            )}
          </motion.section>
        </AnimatePresence>
      </main>

      <nav className="deck-nav" aria-label="Slide navigation">
        <button
          onClick={() => goTo(index - 1)}
          disabled={index === 0}
          className="nav-btn"
          aria-label="Previous slide"
        >
          ←
        </button>
        <div className="dots" role="tablist">
          {slides.map((s, i) => (
            <button
              key={s.id}
              onClick={() => goTo(i)}
              aria-label={`Slide ${i + 1}`}
              aria-selected={i === index}
              role="tab"
              className={`dot ${i === index ? 'active' : ''}`}
              style={i === index ? {background: brand} : undefined}
            />
          ))}
        </div>
        <button
          onClick={() => goTo(index + 1)}
          disabled={index === slides.length - 1}
          className="nav-btn primary"
          style={{background: brand}}
          aria-label="Next slide"
        >
          {t('cover_subline') /* placeholder so build doesn't strip */ ? '→' : '→'}
        </button>
      </nav>

      <style jsx>{`
        .deck-root {
          height: 100vh;
          height: 100dvh;
          display: flex;
          flex-direction: column;
          background: var(--mp-bg);
          overflow: hidden;
        }
        .deck-header {
          --deck-header-h: 64px;
          height: 64px;
          flex: 0 0 64px;
          padding: 0 clamp(20px, 3vw, 40px);
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-bottom: 1px solid var(--mp-border-soft);
          background: var(--mp-bg);
          z-index: 10;
        }
        .deck-header-mark {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          font: 500 14px/1 var(--mp-font-display);
          color: var(--mp-ink);
        }
        .deck-header-mark :global(.brand-icon) {
          width: 22px;
          height: 22px;
        }
        .deck-header-mark .brand-name {
          font: 500 14px/1 var(--mp-font-display);
          letter-spacing: -0.01em;
        }
        .deck-header-mark .bar {
          color: var(--mp-neutral-300);
          font-weight: 300;
          margin: 0 2px;
        }
        .deck-header-mark .client-logo {
          height: 22px;
        }
        .deck-header-mark .client-name {
          font: 500 14px/1 var(--mp-font-display);
        }
        .deck-header-actions {
          display: flex;
          align-items: center;
          gap: 16px;
        }
        .deck-main {
          flex: 1;
          position: relative;
          overflow: hidden;
        }
        .deck-main.is-dark {
          background: var(--mp-ink);
        }
        .deck-slide {
          position: absolute;
          inset: 0;
          overflow: hidden;
        }
        .deck-slide :global(.deck-frame),
        .deck-slide > :global(div) {
          height: 100%;
          max-height: 100%;
        }
        .deck-slide.variant-light {
          background: var(--mp-bg);
          color: var(--mp-fg);
        }
        .deck-slide.variant-grey {
          background: var(--mp-grey);
          color: var(--mp-fg);
        }
        .deck-slide.variant-dark {
          background: var(--mp-ink);
          color: #fff;
        }
        .deck-slide :global(.deck-footer-note) {
          color: var(--mp-fg-muted);
        }
        .deck-slide.variant-dark :global(.deck-footer-note) {
          color: rgba(255, 255, 255, 0.55);
        }
        .deck-mark-small {
          display: inline-flex;
          align-items: center;
          gap: 8px;
        }
        .deck-mark-small :global(img) {
          height: 14px;
          opacity: 0.6;
        }
        .deck-slide.variant-dark .deck-mark-small :global(img) {
          filter: brightness(0) invert(1);
        }
        .deck-nav {
          --deck-nav-h: 56px;
          height: 56px;
          flex: 0 0 56px;
          padding: 0 clamp(16px, 3vw, 32px);
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-top: 1px solid var(--mp-border-soft);
          background: var(--mp-bg);
          gap: 16px;
        }
        .nav-btn {
          background: transparent;
          color: var(--mp-fg);
          border: 1px solid var(--mp-border);
          border-radius: var(--mp-radius-pill);
          padding: 8px 16px;
          font: 500 14px/1 var(--mp-font-body);
          cursor: pointer;
          min-width: 44px;
          transition: opacity 120ms;
        }
        .nav-btn:disabled {
          opacity: 0.3;
          cursor: not-allowed;
        }
        .nav-btn.primary {
          color: #fff;
          border-color: transparent;
          box-shadow: var(--mp-shadow-cta);
        }
        .dots {
          display: flex;
          gap: 4px;
          align-items: center;
          flex-wrap: wrap;
          justify-content: center;
          flex: 1;
          max-width: 100%;
        }
        .dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: var(--mp-neutral-300);
          border: 0;
          padding: 0;
          cursor: pointer;
          transition: background 120ms, transform 120ms;
        }
        .dot:hover {
          transform: scale(1.3);
        }
        .dot.active {
          width: 18px;
          border-radius: 999px;
        }
      `}</style>
    </div>
  );
}
