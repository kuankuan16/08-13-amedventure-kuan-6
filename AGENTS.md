<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# AMED Ventures Website

## Mission and current status

This repository began as the AI Website Cloner Template, but it is now an AMED Ventures website project. Template documentation and automation remain in the repository; do not mistake them for the current product specification.

Three intentional design variants coexist:

| Route family | Role | Main implementation |
| --- | --- | --- |
| `/` | Original single-page, Sakazuki-influenced proposal | `src/app/page.tsx`, `src/components/amed/*.tsx`, `src/lib/amed/content.ts` |
| `/v2` | Ritovex-influenced multi-page proposal | `src/app/v2/`, `src/components/amed/rx/`, `src/lib/amed/rx-content.ts` |
| `/b` | Latest and most actively refined proposal | `src/app/b/`, `src/components/amed/gravity/`, `src/lib/amed/b-content.ts` |

Recent commit history makes `/b` the current working direction, but no decision is recorded to promote it to `/`. Preserve all three route families and do not add a redirect, replace `/`, or delete a variant without explicit user approval.

The `gravity` names under `/b` are historical. The current `/b` home uses a scroll-driven editorial image grid, and current `/b` section pages intentionally have no sphere field. Do not reintroduce bubbles or Three.js merely because stale component names and comments still mention them.

## Required intake before changing code

1. Read `docs/research/PROJECT_HANDOFF.md`; it is the detailed Claude-to-Codex handoff.
2. Check `git status --short --branch` and preserve user changes.
3. Identify the route family in scope. Changes to one proposal must not leak into the other proposals unless the user explicitly asks for shared behavior.
4. Read the target route, its adjacent components, its content module, and the recent commits that produced it before editing.
5. Read the relevant local Next.js 16 guide under `node_modules/next/dist/docs/` before writing framework code.
6. For UI changes, inspect the rendered route at desktop, tablet, and mobile widths before assuming behavior from component names or old research notes.

Do not run the repository's `/clone-website` workflow to continue ordinary AMED development. That skill is retained for explicit new cloning work and may create isolated routes and artifacts that are inappropriate for an existing proposal.

## Sources of truth and precedence

Apply information in this order:

1. The user's current instruction.
2. This file and `docs/research/PROJECT_HANDOFF.md`.
3. Current code plus the latest relevant Git commits.
4. Route-specific content modules and verified source links.
5. Historical research documents.
6. Upstream template README, changelog, and package metadata.

`docs/research/DESIGN_SYSTEM.md` and `docs/research/COPY_DECK.md` describe the first `/` proposal. They are useful history, not the visual or copy specification for `/b` or `/v2`. `docs/research/INSPECTION_GUIDE.md` is a generic reverse-engineering checklist.

If code and documentation disagree in a way that affects product intent, preserve the current behavior, show the discrepancy, and ask before making a product-level decision.

## Architecture and edit boundaries

- `src/app/layout.tsx` and `src/app/app.css` are global. Changes here can affect every route family.
- `/v2` and `/b` both load `src/app/v2/rx.css`; treat it as shared code and regression-test both families after editing it.
- `/b` reuses selected `rx` sections and UI. Search for all consumers before changing a shared component or content shape.
- `src/lib/amed/content.ts` holds shared team and portfolio records in addition to `/` copy.
- `src/lib/amed/rx-content.ts` supplies `/v2` navigation, milestones, CTA/footer data, and content reused by `/b`.
- `src/lib/amed/b-content.ts` is the `/b` page-copy layer and records its approved source.
- All AMED brand files, generated editorial imagery, portfolio logos, team photos, and videos live under `public/amed/`. Reuse them; do not overwrite or recompress originals without approval.

## Current `/b` design contract

- White-dominant ground, near-black ink, and AMED brand blue `#00A8D0` for the label/progress accent.
- Active section-page photography uses luminous neutral white, deep navy, cool pale grey, crisp natural sunlight and shadow, credible devices and evidence, natural posture/eye lines, and subtle documentary grain. When East Asian people appear in a founder/investor scene, they represent AMED's capital side: observing, questioning, comparing evidence, or taking notes rather than presenting the product. The home grid deliberately varies stone, sage, lavender, pearl, navy, pale-blue, and blush backgrounds instead of forcing every frame into one blue grade. Avoid showroom symmetry, waxy skin, duplicated props, impossible devices, and other obvious AI-image cues.
- Two-typeface system: Satoshi for body/UI/wordmark and Fraunces for headings. Satoshi is currently loaded from Fontshare; Fraunces comes from `next/font` in the root layout.
- Shared content frame: `96rem` maximum width via `.rx-frame`.
- Buttons are unified pill controls with solid fills; do not add gradients.
- Home-only opening: dark loader, curtain wipe, 300svh sticky seven-image editorial grid (VC ×2, medical, neural macro, device/surgery lab, cardiovascular, biomedical macro), full-width AMED VENTURES wordmark, neutral contrast veil, contraction/counter-drift motion, and centred scroll dial. The centre shows a bright diligence meeting from the capital side: a separate founder presents the device while an East Asian investment partner questions and reviews evidence. The top row keeps the bright biomedical mesh detail on the left and a left-weighted transparent neurovascular brain on the right; this source composition is intentional because the contracted right frame reveals only its left portion. The two bottom frames are biomedical left and medical right.
- Section pages: full-bleed rising documentary-style media hero, masked category word, a darker neutral-grey contrast layer, scroll contraction, then white content. No bubble field. About's secondary video shows an investment team evaluating a prototype.
- The five section-page heroes share a backlit editorial language but use distinct actions and low-saturation palettes: About/luminous blue-white ribbed-glass partnership with an East Asian investor, founder, vascular implant and anatomically consistent female reflection; Portfolio/steel-blue innovator studying a transparent heart, with a dedicated compact crop; Story/lavender milestone sequencing; Team/the right-side pair from the approved walking group (dark-navy-suited man and warm-beige-suited East Asian woman) in warm-ivory backlight, with dedicated desktop and compact assets; and Contact/mauve first-pitch exchange. Do not collapse them back into repeated generic meeting scenes.
- Header begins reversed over media, becomes a blurred white bar after scrolling, and shows an AMED-blue reading-progress line. Contact is a pill CTA linked to `/b/contact`, not a desktop nav item; the footer retains the complete route list. Scroll dials are real pointer-cursor buttons and advance to the next screen.
- Primary responsive regime changes below `1024px`. Preserve the deliberately different compact hero composition rather than scaling desktop mechanically.
- On the compact home hero, the `AMED` and `VENTURES` wordmark lines remain adjacent and vertically stacked, while person-led frames use top-biased crops that keep heads inside the rounded image boundary.
- Motion is part of the design. Maintain scroll, reveal, hover, loader, and mask behavior; also add or preserve `prefers-reduced-motion` behavior when touching motion code.
- About's investment-focus rows use a left-to-right white hover wipe on desktop. On compact screens, tapping a row toggles its corresponding image in a downward-sliding accordion immediately below that row.
- About's portfolio-index title is 62px on desktop, its left and right content columns align at the top, and the smaller stage-coverage label remains subordinate. Preserve the viewport-entry reveals for the title, stage label, timeline, and counts.
- Portfolio logos use a white ground and a consistent high-density dark navy/near-black monochrome treatment. Keep their optical sizes balanced and do not restore low-opacity grey marks.
- The first white copy screen on each `/b` section page uses a top-aligned two-column row: large heading left, lead paragraph right; compact layouts stack them.
- Each About, Portfolio, Story, Team, and Contact hero completes its category-word animation, holds for one second, then automatically eases to `#page-hero-content`; direct user interaction cancels that movement.
- `/b/story` uses image-free, three-up cards, real milestone categories, fixed 9-record pagination, white surfaces, category rails, and a category-colour hover layer that wipes in at 50% opacity. `/b/team` uses optically normalized warm portraits, serif names, compact homepage-style pill actions, and 17px biography copy. Michelle Tsai and Jeremy Tseng retain their approved `*-warm.png` portraits. Michael Wang, William Tai, and Joe Liu use identity-preserving `*-jaw.png` variants with a restrained under-chin shadow; the remaining active portraits use the documented `*-warm-soft.png` or `*-warm-soft-v2.png` files.
- Proposal B typography is role-based: Fraunces is reserved for editorial headings, card titles, and team names; Satoshi is used for body copy, roles, controls, form labels, dates, and supporting metadata. Page-hero support paragraphs use the shared 20px `HERO_LEAD`; standard body copy uses the 17px `BODY_TEXT`. Reuse the exported `CARD_TITLE`, `HERO_LEAD`, `BODY_TEXT`, `SUPPORTING_TEXT`, `ROLE_TEXT`, `CONTROL_TEXT`, `FIELD_LABEL`, and `STORY_TAG` roles from `gravity/shared.tsx` instead of inventing local type styling for equivalent levels.
- `/b/contact` carries the full pitch form immediately after the hero without a duplicate “Pitch your company” section heading. Its submit action uses the same compact outlined pill and black arrow disc as the site header/home controls.

## Content and factual guardrails

- Do not invent AUM, returns, exits, approvals, investment stages, portfolio outcomes, biographies, addresses, or company descriptions.
- Keep copy edits in the appropriate content module instead of scattering new prose through JSX unless the text is strictly presentational.
- `/b` copy was carried forward from the approved prior `/c` direction recorded in `src/lib/amed/b-content.ts`.
- Team biographies and portfolio metadata live in `src/lib/amed/content.ts`; milestone sources live in `src/lib/amed/rx-content.ts`.
- Some source facts and news links are time-sensitive. Re-verify them before a user asks to publish or update factual content.
- The AMED website-preparation PDF confirms an early-to-growth investment range, eight focus areas, North America and Asia coverage, sixteen active listed companies, and four exited investments. Its AUM and years-investing values are explicitly missing. On the About portfolio-index section, emphasize stage coverage, focus breadth, and geographic reach; keep the sixteen-company count only in low-priority methodology copy rather than presenting it as a headline achievement. Never invent the missing AUM or years-investing values.
- The historical copy deck's 15-company list is not the current portfolio data model. Use the current content module unless the user explicitly requests a return to the old deck.

## Implementation conventions

- Next.js 16 App Router, React 19, TypeScript strict, Tailwind CSS v4.
- Use server components by default; add `"use client"` only when browser APIs, state, effects, or event handlers require it.
- Use named exports for reusable components, PascalCase components, camelCase helpers, and 2-space indentation.
- Do not introduce `any`.
- Follow the local styling pattern. The project uses Tailwind utilities, route CSS, and inline style objects for calculated motion/visual values; the old template's blanket ban on inline styles no longer describes this codebase.
- Prefer `next/image` for raster assets and provide meaningful alt text unless the image is intentionally decorative.
- Keep internal links inside their route family (`/b/...` versus `/v2/...`) unless cross-proposal navigation is explicitly intended.
- Do not rename the existing lowercase public logo files; the casing was fixed for case-sensitive deployments.
- Avoid broad refactors while implementing a visual iteration. These proposals intentionally share some layers and diverge in others.

## Verification

Available commands:

- `npm run dev` — local development
- `npm run lint` — ESLint
- `npm run typecheck` — TypeScript
- `npm run build` — production build
- `npm run check` — lint, typecheck, and build

Use Node.js 24 (`.nvmrc`). For UI work, also verify the affected routes at approximately 1440px, 768px, and 390px, including scroll, hover, navigation, media, and reduced-motion behavior. If a shared file changed, check every route family that imports it.

Static preview builds use `EXPORT_BUILD=1`, which enables `output: "export"`, the `/amed-preview` base path, and unoptimized images. Normal local builds use standalone output unless Vercel manages the build.

## Agent-document maintenance

- `AGENTS.md` is the single source of truth for project-wide agent rules.
- `CLAUDE.md` and `GEMINI.md` intentionally import `AGENTS.md`.
- After editing `AGENTS.md`, run `bash scripts/sync-agent-rules.sh` and commit the regenerated platform files.
- `.claude/skills/clone-website/SKILL.md` is the source for the retained cloning skill. After editing it, run `node scripts/sync-skills.mjs`.
- When the user explicitly requests parallel agent work, isolate overlapping implementation tasks with clear ownership; otherwise keep work in the current checkout.
