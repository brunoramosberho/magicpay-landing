/**
 * Build the "NN — Topic" eyebrow string for a slide. Number reflects the
 * slide's *runtime* position (1-based), so the same slide reads
 * "02 — Teclado" in the short deck and "08 — Teclado" in the full deck.
 *
 * Strips an existing "NN — " / "NN - " prefix from the i18n label so legacy
 * keys keep working without rewriting every translation.
 */
export function eyebrow(index: number, label: string): string {
  const num = String(index + 1).padStart(2, '0');
  const topic = label.replace(/^\d+\s*[—–-]\s*/, '');
  return `${num} — ${topic}`;
}
