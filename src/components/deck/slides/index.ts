import type {SlideDef} from '../deck-shell';
import {
  CoverSlide,
  BackgroundSlide,
  InfrastructureSlide,
  WhatsappSlide,
  ProblemSlide,
  FlowSlide,
  WhatIsMagicSlide,
  ThirtyXSlide
} from './foundations';
import {
  KeyboardIntroSlide,
  KeyboardDemoSlide,
  KeyboardVideoLiveSlide,
  ClaimDemoSlide,
  TapDemoSlide,
  VoiceDemoSlide,
  WhitelabelSlide
} from './demo-placeholders';
import {SecuritySlide, BenefitsSlide, ImplementationSlide, RegulatorySlide} from './business';
import {PricingSlide, ClosingSlide, ShortRecapSlide} from './pricing-closing';

// Full deck. Keyboard story is two beats: a 17s ambient video that sets
// the scene, then the interactive walkthrough where the presenter can
// step through the flow live.
export const deckSlides: SlideDef[] = [
  CoverSlide,             // 01
  BackgroundSlide,        // 02
  InfrastructureSlide,    // 03
  WhatsappSlide,          // 04
  ProblemSlide,           // 05
  FlowSlide,              // 06
  WhatIsMagicSlide,       // 07
  KeyboardIntroSlide,     // 08 — full-bleed video intro
  KeyboardDemoSlide,      // 09 — interactive walkthrough
  ThirtyXSlide,           // 10
  ClaimDemoSlide,         // 11
  TapDemoSlide,           // 12
  VoiceDemoSlide,         // 13
  WhitelabelSlide,        // 14
  SecuritySlide,          // 15
  BenefitsSlide,          // 16
  ImplementationSlide,    // 17
  RegulatorySlide,        // 18
  PricingSlide,           // 19
  ClosingSlide            // 20
];

// Compact cold-share preview. Goal: give a flavour of what magic is without
// revealing pricing, security details, or implementation depth. The
// keyboard story is a single ambient video here (no interactive demo)
// so the viewer is left curious about the rest.
export const shortDeckSlides: SlideDef[] = [
  CoverSlide,             // Branded cover
  WhatIsMagicSlide,       // SDK explanation
  KeyboardVideoLiveSlide, // Live keyboard video (teaser)
  ThirtyXSlide,           // 30× faster
  TapDemoSlide,           // Tap demo
  VoiceDemoSlide,         // Voice demo
  ShortRecapSlide         // Recap + contact
];
