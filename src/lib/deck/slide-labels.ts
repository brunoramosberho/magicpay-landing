// Shared between admin views (dashboard + client detail) so per-slide
// breakdowns label and order events consistently regardless of which deck
// variant the visitor saw.
import {deckSlides, shortDeckSlides} from '@/components/deck/slides';
import type {PresentationLinkVariant} from './types';

// Topic-only labels for each slide id. Position numbers are appended at
// runtime from the variant's slide array, so adding/reordering slides
// doesn't require renumbering this map.
const BASE_LABELS: Record<string, string> = {
  cover: 'Cover',
  background: 'Background',
  infrastructure: 'Infraestructura',
  whatsapp: 'WhatsApp',
  problem: 'Problema',
  flow: 'Flow',
  'what-is-magic': 'Solución',
  'keyboard-intro': 'Teclado (video)',
  'keyboard-demo': 'Teclado (demo)',
  'keyboard-live': 'Teclado (live)',
  'thirty-x': '30x',
  'claim-demo': 'Claim',
  'tap-demo': 'Tap',
  'voice-demo': 'Voz',
  whitelabel: 'White-label',
  security: 'Seguridad',
  benefits: 'Beneficios',
  implementation: 'Implementación',
  regulatory: 'Regulatorio',
  pricing: 'Pricing',
  closing: 'Cierre',
  'short-recap': 'Recap'
};

function buildLabels(slides: typeof deckSlides): Record<string, string> {
  return Object.fromEntries(
    slides.map((s, i) => [
      s.id,
      `${String(i + 1).padStart(2, '0')} ${BASE_LABELS[s.id] ?? s.id}`
    ])
  );
}

const FULL_LABELS = buildLabels(deckSlides);
const SHORT_LABELS = buildLabels(shortDeckSlides);

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
  const map = variant === 'short' ? SHORT_LABELS : FULL_LABELS;
  return map[slideId] ?? FULL_LABELS[slideId] ?? BASE_LABELS[slideId] ?? slideId;
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

// Denominators used in "slide X / Y" depth indicators. Full hides the bio
// slide by default so its visible count is one less than the array length.
export function getSlideTotal(variant: PresentationLinkVariant = 'full'): number {
  if (variant === 'short') return shortDeckSlides.length;
  return deckSlides.length - 1;
}
