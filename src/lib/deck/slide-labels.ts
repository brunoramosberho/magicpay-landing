// Shared between admin views (dashboard + client detail) so per-slide
// breakdowns label and order events consistently regardless of which deck
// variant the visitor saw.
import {deckSlides, shortDeckSlides} from '@/components/deck/slides';
import type {PresentationLinkVariant} from './types';

const SLIDE_LABELS: Record<string, string> = {
  cover: '01 Cover',
  background: '02 Background',
  infrastructure: '03 Infraestructura',
  whatsapp: '04 WhatsApp',
  problem: '05 Problema',
  flow: '06 Flow',
  'what-is-magic': '07 Solución',
  'keyboard-demo': '08 Teclado',
  'thirty-x': '09 30x',
  'claim-demo': '10 Claim',
  'tap-demo': '11 Tap',
  'voice-demo': '12 Voz',
  whitelabel: '13 White-label',
  security: '14 Seguridad',
  benefits: '15 Beneficios',
  implementation: '16 Implementación',
  regulatory: '17 Regulatorio',
  pricing: '18 Pricing',
  closing: '19 Cierre',
  'short-recap': 'Recap'
};

// For short-variant breakdowns we want the 1–6 numbering instead of the
// full deck's 07/08/09… positions. Built lazily from the slide arrays so
// it stays in sync if the order changes.
const SHORT_LABELS: Record<string, string> = Object.fromEntries(
  shortDeckSlides.map((s, i) => {
    const human = SLIDE_LABELS[s.id]?.replace(/^\d+\s+/, '') ?? s.id;
    return [s.id, `${String(i + 1).padStart(2, '0')} ${human}`];
  })
);

const FULL_ORDER: Record<string, number> = Object.fromEntries(
  deckSlides.map((s, i) => [s.id, i])
);
const SHORT_ORDER: Record<string, number> = Object.fromEntries(
  shortDeckSlides.map((s, i) => [s.id, i])
);

export function getSlideLabel(
  slideId: string,
  variant: PresentationLinkVariant = 'full'
): string {
  const map = variant === 'short' ? SHORT_LABELS : SLIDE_LABELS;
  return map[slideId] ?? SLIDE_LABELS[slideId] ?? slideId;
}

// Slides not in the variant's array fall back to a high index so they sort
// to the bottom rather than crashing — happens if a visitor opened a Full
// link and a Short link from the same browser and we render their combined
// breakdown under one variant.
export function getSlideOrder(
  slideId: string,
  variant: PresentationLinkVariant = 'full'
): number {
  const map = variant === 'short' ? SHORT_ORDER : FULL_ORDER;
  return map[slideId] ?? 999;
}

// Denominators used in "slide X / Y" depth indicators. Full = 18 because
// the route hides the bio slide by default; Short = 6.
export function getSlideTotal(variant: PresentationLinkVariant = 'full'): number {
  if (variant === 'short') return shortDeckSlides.length;
  return deckSlides.length - 1;
}
