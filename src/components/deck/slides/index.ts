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
  KeyboardDemoSlide,
  ClaimDemoSlide,
  TapDemoSlide,
  VoiceDemoSlide,
  WhitelabelSlide
} from './demo-placeholders';
import {SecuritySlide, BenefitsSlide, ImplementationSlide, RegulatorySlide} from './business';
import {PricingSlide, ClosingSlide} from './pricing-closing';

// Order matches design's index.html (01–19)
export const deckSlides: SlideDef[] = [
  CoverSlide,             // 01
  BackgroundSlide,        // 02
  InfrastructureSlide,    // 03
  WhatsappSlide,          // 04
  ProblemSlide,           // 05
  FlowSlide,              // 06
  WhatIsMagicSlide,       // 07
  KeyboardDemoSlide,      // 08 (placeholder, Phase 3)
  ThirtyXSlide,           // 09
  ClaimDemoSlide,         // 10 (placeholder, Phase 3)
  TapDemoSlide,           // 11 (placeholder, Phase 3)
  VoiceDemoSlide,         // 12 (placeholder, Phase 3)
  WhitelabelSlide,        // 13 (placeholder, Phase 3)
  SecuritySlide,          // 14
  BenefitsSlide,          // 15
  ImplementationSlide,    // 16
  RegulatorySlide,        // 17
  PricingSlide,           // 18
  ClosingSlide            // 19
];
