# CLAUDE.md

Project notes for future Claude sessions. Read this first when picking up work on
this repo — it's faster than rediscovering everything from scratch.

## What this repo is

Three surfaces under one Next.js app:

1. **Public landing page** at `/` → `/en` or `/es`. Marketing site, contact form,
   help pages. Uses `next-intl` for routing + translations.
2. **Sales deck** at `/deck/[clientSlug]/[token]`. Branded, per-client pitch
   that replaces the static PDF we used to send. Has an admin at `/deck/admin`
   to create clients, generate links, view engagement analytics.
3. **Static SDK docs** at `/docs`. Plain HTML/CSS/JS under `public/docs/` — not
   a Next route, served via a rewrite in `next.config.ts`. Treat it as a
   separate microsite; we rarely touch it from app code.

## Stack

- Next.js 15 (App Router) + React 19 + Turbopack
- TypeScript strict mode
- Tailwind v4 + shadcn/ui + framer-motion
- styled-jsx (used heavily inside deck slides — Tailwind is for the landing)
- `next-intl` for landing i18n; a custom `I18nProvider` for the deck
- Supabase Postgres + Storage (deck data only; the landing has no DB state)
- Resend for the contact form
- `jose` (JWT) for deck admin sessions

## Commands

```bash
npm run dev      # next dev --turbopack on :3000
npm run build    # next build --turbopack
npm run start    # production server
npm run lint     # eslint
npx tsc --noEmit # typecheck
```

There are no tests. Verification = typecheck + lint + manual smoke (`curl -s -o
/dev/null -w "%{http_code}\n" http://localhost:3000/...`).

## Repo layout

```
src/
├── app/
│   ├── [locale]/              # Landing (next-intl): /, /help, /privacidad, /demo-keyboard
│   │   ├── layout.tsx         # NextIntlClientProvider wrapper
│   │   └── page.tsx           # Home
│   ├── api/
│   │   ├── deck/
│   │   │   ├── admin/         # Auth'd CRUD for clients/links/logos
│   │   │   └── track/         # Public analytics ingestion
│   │   └── send-demo-request/ # Contact form → Resend
│   ├── deck/                  # NOT under [locale] — its own surface
│   │   ├── [clientSlug]/[token]/page.tsx
│   │   ├── admin/             # /deck/admin (cookie-gated)
│   │   ├── deck-tokens.css    # Global tokens + mobile @media block
│   │   └── layout.tsx
│   ├── globals.css
│   └── layout.tsx             # Root (intentionally minimal — locale layout does the work)
├── components/
│   ├── deck/                  # All deck UI lives here
│   │   ├── deck-shell.tsx     # Frame, keyboard nav, analytics, SlideNavContext
│   │   ├── i18n-context.tsx   # Deck-local i18n (separate from next-intl)
│   │   ├── language-toggle.tsx
│   │   ├── magic-keyboard.tsx # The branded payment keyboard preview
│   │   ├── claim-demo.tsx     # Slide 10 interactive
│   │   ├── video-phone.tsx    # iPhone-frame video player + fullscreen toggle
│   │   ├── visitor-name-gate.tsx
│   │   ├── sections-menu.tsx  # Header "Demos" dropdown
│   │   └── slides/            # One file per logical group
│   │       ├── index.ts       # Slide order — 01–19
│   │       ├── foundations.tsx
│   │       ├── demo-placeholders.tsx
│   │       ├── business.tsx
│   │       └── pricing-closing.tsx
│   ├── ui/                    # shadcn/ui primitives
│   ├── logos/                 # Brand SVGs (Pix, SEPA, Bizum…)
│   └── hero-section.tsx, footer.tsx, contact.tsx, …  # Landing pieces
├── lib/
│   ├── deck/
│   │   ├── i18n.ts            # All deck strings (es + en) — typed
│   │   ├── types.ts           # Client / PresentationLink / DeckSession / SlideEvent
│   │   ├── tokens.ts          # generateToken() + slugify()
│   │   └── admin-auth.ts      # JWT sessions for /deck/admin
│   ├── supabase/server.ts     # supabaseAdmin() — service role, server-only
│   └── utils.ts
├── i18n/                      # next-intl config (LANDING ONLY)
│   ├── routing.ts             # locales = ['en','es'], default 'en'
│   └── request.ts
├── middleware.ts              # next-intl middleware; explicitly skips /deck and /docs
messages/                      # next-intl strings (landing only)
public/
├── deck/
│   ├── videos/                # keyboard.mp4, tap.mp4, voice.mp4
│   └── logos/                 # icon.svg, magic.svg, bruno.jpg
└── docs/                      # The /docs static microsite (own HTML/CSS/JS)
```

## Environment variables

Set in `.env.local`. Missing values cause hard failures at runtime — there are
no fallbacks for the secrets.

| Var | Used by | Required for |
|---|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | both | Deck (read/write), admin |
| `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` | client SDK | (currently unused server-side) |
| `SUPABASE_SECRET_KEY` | `supabaseAdmin()` | All server-side Supabase ops |
| `RESEND_API_KEY` | `/api/send-demo-request` | Contact form |
| `ADMIN_PASSWORD` | `admin-auth.ts` | `/deck/admin` login |
| `ADMIN_ALLOWED_EMAIL_DOMAINS` | `admin-auth.ts` | Comma-separated allow-list (e.g. `magicpay.mx,mgic.me`) |
| `ADMIN_SESSION_SECRET` | `admin-auth.ts` | JWT signing |

## The deck — deeper

### Data model

- `clients` — slug, name, **display_name** (label for the deck chrome — falls
  back to `name` when null), **kind** (`'client' \| 'regulator'`), brand_color,
  logo_url, app_icon_url, pricing_*, currency, notes, archived_at.
- `presentation_links` — client_id, **token** (the public URL secret),
  recipient_*, expires_at, revoked_at.
- `deck_sessions` — visitor_id, visitor_name, ua, referrer, ip_country/region/city,
  total_duration_ms, max_slide_index.
- `slide_events` — session_id, slide_id, slide_index, entered_at, exited_at,
  duration_ms, interactions[].

### Public route

`/deck/[clientSlug]/[token]` → `src/app/deck/[clientSlug]/[token]/page.tsx`.
Looks up the link by token, verifies slug match + not revoked/expired, forwards
the joined client to `DeckShell`. Marked `dynamic = 'force-dynamic'` because we
need fresh server reads + analytics.

`?bio=1` (or `?bio=true`) includes the Bruno background slide (it's at position
1 and filtered out by default). Slide numbering re-renders to match.

### Slide architecture

A slide is a `SlideDef`:

```ts
{
  id: string;
  variant?: 'light' | 'grey' | 'dark';
  bare?: boolean;             // hide the slide-internal footer note
  Body: React.ComponentType<SlideContext>;
}
```

`SlideContext` gives the slide `{client, index, total}`. The order in
`slides/index.ts` is the deck order — append/remove there. New slides should
follow the existing pattern: a `Body` that returns the slide DOM + a styled-jsx
block at the bottom with both desktop styles and a `@media (max-width: 640px)`
mobile block.

### Navigation interception (`SlideNavContext`)

The deck-shell exposes a context with `registerInterceptor(fn)`. A slide can
claim prev/next before the deck navigates — the interceptor returns `true` to
consume the action, `false` to let the deck advance. Both keyboard arrows AND
on-screen nav buttons route through `tryAdvance(dir)`, so mobile taps and
desktop keys behave identically. The interceptor is cleared on slide change.

Today only `FlowSlide` (06) uses it to reveal rows one at a time. If you need
"sub-slides" on any other slide, use this same hook — don't add a window
keydown listener (that path doesn't fire for the mobile on-screen buttons).

### Mobile layout convention

Anything under `@media (max-width: 640px)` is the "PDF replacement" view:

- The deck-shell switches `.deck-main` to `overflow-y: auto` and lets slides
  flow naturally with `min-height: 100%` (no more strict 16:9).
- Each slide has its own mobile block tightening type scale, padding, and
  collapsing multi-column layouts to single column.
- The chrome shrinks: 48px header, 52px nav. The slide-internal footer-note is
  hidden via a global `!important` in `deck-tokens.css` (the styled-jsx `:global`
  selector didn't reliably reach motion.section's children).
- The bottom nav replaces the 19-dot row with a `02 / 18` counter.
- Fullscreen button is hidden (locked down on iOS Safari anyway).
- Language toggle becomes a dropdown pill (`ES ▾`) instead of inline ES/EN.

### Client kind (`client` vs `regulator`)

The `kind` column on `clients` switches the deck between:

- **client** (default) — uses the client's `name`, `brand_color`, `logo_url`,
  `app_icon_url`. Standard pitch.
- **regulator** — used for CNBV / Banxico / SHCP / similar. The client record
  has `name='el banco'` (used in slide copy), `display_name` set to the actual
  regulator (e.g. "CNBV") for the deck chrome, brand_color null (→ defaults to
  magic blue), no logo, no app icon. Slides that read awkwardly with literal
  `{client}='el banco'` interpolation use `*_regulator` i18n variants instead.

Slides currently aware of `client.kind === 'regulator'`:

| Slide | Behavior on regulator |
|---|---|
| 01 Cover | Pill shows magic icon instead of `name.charAt(0)`; audience reads `bancos` / `banks` (key `cover_regulator_audience`) instead of `client.name` |
| 07 What is magic | Bullet 1 title uses `magic_b1_title_regulator` ("SDK que vive dentro del app del banco") |
| 08 Keyboard demo | Uses `kb_title_regulator` + `kb_explanation_regulator` |
| 14 Security | Uses `sec_2_title_regulator` |
| 15 Benefits | Uses `ben_title_regulator` |
| 19 Closing | Drops `, {client.name}.` — just "Gracias." |

Header + footer mark independently render `client.display_name ?? client.name`,
so the chrome shows e.g. "magic | CNBV" while in-slide copy stays as
"el banco".

Everywhere else falls through naturally: "magic | CNBV" in the header,
"SDK integrado en el banco" on slide 7, etc.

Adding a new variant (e.g. `'investor'`):
1. `ALTER TABLE clients DROP CONSTRAINT clients_kind_check, ADD CONSTRAINT … CHECK (kind IN ('client','regulator','investor'))`.
2. Extend `ClientKind` in `src/lib/deck/types.ts` and the union in `DeckClient`.
3. Add `*_investor` i18n keys for any string with `{client}` that needs new
   copy.
4. Slide files: branch on `client.kind === 'investor'` to pick the new keys.

### Adding `{client}` interpolations

The pattern is always:

```ts
const fillClient = (s: string) => s.replaceAll('{client}', client.name);
```

Then `fillClient(t('some_key'))`. If the new key reads weirdly when `name='el
banco'` (genitive, dative, vocative…), add a `_regulator` parallel key and
branch on `client.kind`.

### i18n (deck)

`src/lib/deck/i18n.ts` exports an `as const` object with `es` and `en` blocks.
`StringKey = keyof typeof i18n.es`. The `useI18n()` hook returns `{locale, setLocale, t}`
where `t(key)` returns the locale's string (falls back to ES, then to the raw
key).

**Don't** use `next-intl` in deck files — it's reserved for the landing.

### Admin (`/deck/admin`)

- Cookie-based JWT session (`deck_admin_session`).
- Login form posts to `/api/deck/admin/login` → checks `ADMIN_PASSWORD` (constant-time
  comparison) + email allow-list, sets HttpOnly cookie.
- CRUD endpoints under `/api/deck/admin/clients/*` for clients, logos, links.
- Per-client analytics page reads from `deck_sessions` + `slide_events`.

### Analytics ingestion

`POST /api/deck/track` accepts:

- `session_start` — creates a `deck_sessions` row, returns `{sessionId}`.
- `slide_enter` / `slide_exit` — writes to `slide_events`.
- `session_heartbeat` — bumps `last_seen_at` + `total_duration_ms`.
- `interaction` — append a record to `slide_events.interactions[]`.

The deck shell fires these via `keepalive: true` fetches, plus a 15s heartbeat
interval and a `visibilitychange` flush.

## The landing — quick map

- Routes are locale-prefixed via `next-intl` middleware: `/en/*`, `/es/*`,
  default `en`. The middleware explicitly excludes `/deck`, `/docs`, `/api`,
  static files.
- Main page composes `HeroSection`, `Features`, `ContactSection`, `Footer`.
  Other components (`LogoCloud`, `RotatingSubheader`, `IntegrationsSection`)
  are wired but commented out in `[locale]/page.tsx`.
- Translations live in `messages/{en,es}.json`. Components grab them with
  `useTranslations('namespace')`.
- The contact form posts to `/api/send-demo-request` → Resend → emails Bruno +
  Santiago.

## `/docs` — the static microsite

It's a standalone HTML/CSS/JS site living under `public/docs/`. The Next config
rewrites `/docs` → `/docs/index.html`. When you change `/docs`, you're editing
plain files; no build step, no React, no shared components with the rest of the
app. Test by hitting `http://localhost:3000/docs` directly.

## Conventions / gotchas

- **styled-jsx everywhere in the deck.** Each slide owns its CSS inline.
  Tailwind classes won't be parsed inside `<style jsx>` blocks.
- **Mobile breakpoint = 640px.** There are some legacy `@media (max-width: 900px)`
  rules for tablet single-column fallbacks; the actual phone layout lives in
  `@media (max-width: 640px)`.
- **`:global()` from styled-jsx doesn't always reach motion components reliably.**
  If you need to style a descendant of `motion.section` and the selector seems
  to silently fail, drop the rule into `deck-tokens.css` global instead. See
  the `.deck-footer-note { display: none !important }` hack.
- **Don't add `position: fixed` to the header/nav in the deck-shell.** The
  layout relies on `flex` + `100dvh` + `.deck-main { overflow-y: auto }`. iOS
  Safari has a known quirk where the URL bar shows/hides during scroll — that's
  a viewport problem, not a `position: fixed` problem.
- **No tests.** When you finish work, run `npx tsc --noEmit` + `npx eslint
  src/...` and curl the affected route.
- **Don't bypass git hooks.** `--no-verify`, `--amend` (on shared commits),
  and force-push to main are off-limits unless the user explicitly asks.
- **The `[clientSlug] 2` / `admin 2` folders are macOS Finder duplicates.**
  They're an accident; ignore them. If you ever clean them up, do it in its
  own commit so the diff is clear.

## Quick recipes

### Add a new slide

1. Write the slide in the appropriate `slides/*.tsx` file. Match the structure
   of an existing slide of similar variant.
2. Export it.
3. Add it to the array in `slides/index.ts` in the position you want.
4. Add a `@media (max-width: 640px)` block at the bottom of its styled-jsx for
   mobile. Always tighten title/padding; collapse multi-column to one column.

### Add a new client

Through the admin UI at `/deck/admin` (preferred) — or SQL:

```sql
insert into clients (slug, name, currency, brand_color, kind)
values ('newco', 'NewCo', 'MXN', '#FF6600', 'client')
returning id;

insert into presentation_links (client_id, token)
values ('<id-from-above>', 'newco-pitch');
```

Then `http://localhost:3000/deck/newco/newco-pitch` is live.

### Add a regulator deck

Same as above with `kind = 'regulator'`, `name = 'el banco'`, and a
`display_name` for the chrome:

```sql
insert into clients (slug, name, display_name, currency, kind)
values ('banxico', 'el banco', 'Banxico', 'MXN', 'regulator');
```

The slug is for routing + analytics, `name` is what appears in slide copy
("magic | el banco" → wait no, the chrome uses display_name → "magic | Banxico";
in-slide copy that interpolates {client} still says "el banco" via the
`_regulator` keys), and `display_name` is what shows in the header + footer
mark. Different regulators get different slugs + display_names but identical
on-slide content.

### Add a new i18n key in the deck

1. Add `my_key: '…'` to BOTH `es:` and `en:` blocks in `src/lib/deck/i18n.ts`.
2. Use `t('my_key')` in any slide.
3. If it has `{client}`, add a matching `my_key_regulator: '…'` with the
   "del banco" version, and branch on `client.kind === 'regulator'` in the
   slide.
