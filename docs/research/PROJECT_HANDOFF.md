# AMED Ventures Project Handoff

Last audited: 2026-08-17  
Audited branch: `main`  
Audited HEAD: `a515d87` (`Hero grid recut as a muted editorial set around a light blue-grey studio silhouette`)

## Why this document exists

Claude Code performed the prior implementation work, but the repository had no project-specific handoff or task ledger. `CLAUDE.md` already imports `AGENTS.md`, so the correct inheritance path is to keep shared agent rules in `AGENTS.md` and place the deeper project history here. Codex and Claude should both treat this file as required context before continuing development.

This is a state handoff, not a claim that every implementation decision is final. The user remains the authority for which proposal should ship.

## Executive state

- The working tree was clean at the start of this audit.
- The repository contains three preserved proposals: `/`, `/v2`, and `/b`.
- `/b` received the latest and longest sequence of refinements and is the best default starting point for new design work.
- `/b` has not been promoted to `/`; no redirect or release decision is documented.
- No standalone TODO, issue, PR, or Claude session handoff was found in the repository.
- The only explicit unfinished marker in source says that full biographies are pending for some team members.
- The generic README, changelog, package name, and much of the agent skill still describe the upstream cloning template. They are repository/tooling history, not AMED product requirements.

## Route and ownership map

| URL | Purpose | Route entry | Components | Primary content/style |
| --- | --- | --- | --- | --- |
| `/` | Original cinematic single-page proposal | `src/app/page.tsx` | `src/components/amed/*.tsx` | `src/lib/amed/content.ts`, `src/app/app.css` |
| `/v2` | Ritovex-style home | `src/app/v2/page.tsx` | `src/components/amed/rx/` | `src/lib/amed/rx-content.ts`, `src/app/v2/rx.css` |
| `/v2/about` | V2 about | `src/app/v2/about/page.tsx` | RX sections/UI | RX content/CSS |
| `/v2/portfolio` | V2 portfolio | `src/app/v2/portfolio/page.tsx` | RX sections/UI | shared portfolio + RX content |
| `/v2/story` | V2 milestone feed | `src/app/v2/story/page.tsx` | RX sections/UI | RX milestone content |
| `/v2/team` | V2 team | `src/app/v2/team/page.tsx` | RX sections/UI | shared team content |
| `/v2/contact` | V2 contact | `src/app/v2/contact/page.tsx` | RX UI | RX contact/footer content |
| `/b` | Current Proposal B home | `src/app/b/page.tsx` | `src/components/amed/gravity/GravityB.tsx` plus reused RX sections/UI | shared content, RX CSS, gravity shared components |
| `/b/about` | Proposal B about | `src/app/b/about/page.tsx` | `gravity/pages/about.tsx` | `b-content.ts`, shared PageShell/PageHero |
| `/b/portfolio` | Proposal B portfolio | `src/app/b/portfolio/page.tsx` | `gravity/pages/portfolio.tsx` | current portfolio records + B descriptions |
| `/b/story` | Proposal B milestones | `src/app/b/story/page.tsx` | `gravity/pages/story.tsx` | RX milestones + B headings |
| `/b/team` | Proposal B team | `src/app/b/team/page.tsx` | `gravity/pages/team.tsx` | shared team records + B headings |
| `/b/contact` | Proposal B contact | `src/app/b/contact/page.tsx` | `gravity/pages/contact.tsx` | B contact copy + RX mail/footer data |

Shared layers matter:

- The root layout loads Instrument Sans and Fraunces and imports global `app.css`.
- Both `/v2` and `/b` import `src/app/v2/rx.css`.
- `/b` reuses `RxLogoBand`, `RxGlance`, `RxCta`, `RxFooter`, portfolio/team data, and milestone data.
- A change in RX code can therefore alter Proposal B even when the file path says `rx` or `/v2`.

## How the proposals evolved

### Original `/`

Commit `2ddd89e` built the first AMED site from a Sakazuki-inspired motion system. It introduced the research copy deck, design system, brand assets, media, GSAP/Lenis motion primitives, and the single-page section stack.

The root route remains the closest implementation of:

- `docs/research/DESIGN_SYSTEM.md`
- `docs/research/COPY_DECK.md`

Those documents should not be applied verbatim to later proposals.

### `/v2`

Commit `4933de2` introduced a Ritovex-inspired direction using content approved in a prior AMED `/c` build. Later commits expanded it into a multi-page site, isolated its CSS in `v2/rx.css`, added a Satoshi/Fraunces type system, normalized portfolio logos, added team photos, and refined the focus/philosophy layouts.

### `/b`

Commit `0d4796e` began Proposal B as a Three.js gravity-field concept. The proposal then changed substantially:

1. It became a full multi-page family and adopted approved `/c` copy.
2. Section pages intentionally lost the bubble field.
3. The home eventually dropped the sphere field too and moved to a Studio Aton-style media grid.
4. The visual ground moved to white; buttons became solid, gradient-free pills.
5. `/b` adopted the RX container, CTA, footer, and portions of its content system.
6. The hero gained a dark loader, curtain wipe, full-width Satoshi wordmark, grid contraction, counter-drifting rows, multiply veil, and centred scroll dial.
7. Section pages gained full-bleed media openings, masked category words, and scroll contraction.
8. Philosophy became a sticky photo-card stack; story became a featured editorial layout.
9. Portfolio gained source filters, verified company links, larger normalized marks, and hover-revealed details.
10. Team was rebuilt around expandable biographies; About gained a looping studio video.
11. The latest visual iteration replaced the opening and all five page banners with a warm, high-key MedTech venture set, then rebuilt the B Story archive and refined Team.

The implementation still uses names such as `GravityB`, `gravity/`, `AmbientField`, `PaletteKey`, and metadata containing “Gravity.” These are historical artifacts, not instructions to restore the earlier concept.

## Proposal B design contract at handoff

### Visual system

- Background: white-dominant, with a very light neutral vignette where used.
- Photography: warm, high-key editorial realism with cream/pale-taupe interiors, honey/amber window light, muted olive/brown clothing, realistic skin, and credible MedTech diligence. Avoid generic hospital stock photography, finance clichés, and dark blue-grey grading.
- Text: near-black `#111213`/`#0a0a0a` families.
- Brand accent: `#00A8D0`, used for labels and the header reading-progress line.
- Typography: Satoshi for body/UI/wordmark; Fraunces for the humanist serif heading role.
- Proposal B now exposes semantic typography roles from `gravity/shared.tsx`: `CARD_TITLE`, `HERO_LEAD`, `BODY_TEXT`, `SUPPORTING_TEXT`, `ROLE_TEXT`, `CONTROL_TEXT`, `FIELD_LABEL`, and `STORY_TAG`. Page-hero support paragraphs use `HERO_LEAD` at 20px; standard body copy uses `BODY_TEXT` at 17px. Use those roles for equivalent text levels so new cards, filters, forms, and buttons do not drift in family, weight, spacing, or line height.
- Container: `.rx-frame`, maximum width `96rem`.
- Labels: small uppercase Satoshi with wide tracking; labels are blue and bracket-free.
- CTAs: consistent pill geometry, solid ink or solid white depending on the ground, with an arrow disc. No gradients.
- Portfolio logo presentation: white ground with consistent visual mass and a high-density dark navy/near-black monochrome treatment (`grayscale`, increased contrast, reduced brightness), matching the approved partner-logo reference. Retain the lowercase asset names; a prior case-only rename fixed deployment failures.

### Home behavior

- A numeric loader appears on a dark stage with the AMED logo.
- A white curtain wipes upward to reveal the page.
- The hero owns `300svh`; a `100svh` sticky viewport contains a three-row medical/editorial media grid.
- Desktop begins with the centre frame filling the viewport. Scrolling contracts the grid and then counter-drifts the outer and centre rows.
- The AMED VENTURES wordmark contracts during the opening scroll, then releases upward with the page.
- The seven active frames are exactly venture capital ×2, medical ×1, neural macro ×1, device/surgery lab ×1, cardiovascular ×1, and biomedical macro ×1. The centre frame is a more human two-person founder/investor conversation; the bottom row is biomedical on the left and medical on the right.
- A darker neutral-grey veil covers the complete hero viewport so reversed type remains legible while preserving the distinct stone, sage, lavender, pearl, navy, pale-blue, and blush frame palette.
- Compact mode begins below `1024px` and uses a different stacked wordmark/media composition.
- The scroll dial is centred, uses a pointer cursor, and moves to the next screen when clicked.
- The remainder of the home page reuses the RX logo band and glance system, then the B philosophy and story treatments, shared CTA, and footer.

### Section-page behavior

- Section pages use the white RX ground and share `PageShell`.
- Their opening is a full-bleed media panel that rises into place and contracts on scroll.
- A large category word reveals letter by letter over the media.
- Copy follows on white; About replaces the secondary wide still with an autoplaying, muted, looping venture-investment video of a team evaluating a medical prototype.
- On the first white copy screen, the category label sits above a two-column row: large English heading on the left and lead paragraph on the right, with both text blocks top-aligned. Compact layouts stack them.
- The header reverses over opening media, becomes a blurred white bar after 40px of scroll, and displays reading progress.
- Desktop navigation omits Contact because the contact pill is always present and links to `/b/contact`; the footer keeps all destinations.
- The Team roster uses the same light-grey `#f4f4f5` ground as Portfolio and two-up horizontal white profile cards on desktop: optically normalized square portrait left, role and serif name plus a compact home/header-style pill action right, then a single stacked card on mobile. Biography paragraphs are 17px. Michelle Tsai and Jeremy Tseng keep the approved warm portraits untouched; the other available portraits use subtle `warm-soft` skin retouches. `Read More` appears only for members whose shared data includes a biography.
- `/b/story` owns a B-specific image-free editorial archive: three-up cards on desktop, white surfaces with category-specific left rails, a 50%-opacity category-colour wipe on hover/focus, real category filtering, 9 records per page, a result counter, page numbers, and accessible previous/next controls. It reuses factual milestone data without changing `/v2/story`.
- `/b/contact` carries the complete founder-introduction form immediately after the hero; the duplicate pitch heading was intentionally removed and the submit control matches the compact site pill geometry.
- The five `/b` section-page heroes (About, Portfolio, Story, Team, Contact) complete their masked-word entrance, hold for one second, and then ease automatically to `#page-hero-content`. Any wheel, touch, pointer, or keyboard interaction cancels the pending/active automatic movement.

## Content authority

Use the route-specific modules rather than copying text from old documents:

- `src/lib/amed/b-content.ts`: Proposal B headings, leads, principles, company notes, team group labels, and contact copy. Its header records the approved prior `/c` site as the source.
- `src/lib/amed/rx-content.ts`: V2 content plus shared milestones, story links, CTA, address, mailto, and navigation that B remaps to `/b`.
- `src/lib/amed/content.ts`: the shared team and portfolio data, asset resolver, and original `/` content.

Important factual rules:

- The current portfolio model has 16 active company records plus a separate exited list. The historical copy deck describes 15 companies and contains a different snapshot.
- Do not infer or fabricate sectors, stages, outcomes, financial metrics, biographies, or addresses.
- Milestone URLs and dates are editorial data with external sources. They may become stale and should be rechecked before publishing a factual update.
- The Story dataset currently contains 30 portfolio announcements inherited from the auditable source behind the approved `08-06-amedventure-kuan-4.vercel.app/c` reference. It preserves that source's single-category classification and intentionally leaves eight publisher dates blank rather than inventing them.
- Several leadership/advisor/operations team records have no full `bio`; do not invent one to complete the expandable-team treatment.

## Asset authority

Everything AMED-specific is under `public/amed/`:

- `brand/`: three AMED logo variants.
- `images/`: original proposal media plus the current hero, page hero, focus, philosophy, macro, micro, and grid sets.
- `logos/`: portfolio logos with deployment-safe lowercase filenames.
- `team/`: available portraits.
- `video/`: hero, firm, and About clips. Proposal B About currently uses `about-venture-conviction.mp4`.

These assets include large generated JPEGs and MP4s. Do not overwrite, recompress, or delete originals during a normal UI task. Add a clearly named alternative when experimentation is required.

Proposal B currently uses the seven-frame home set documented in `IMAGE_DIRECTION_VC.md`, including the user-supplied `home-vc-cardiac-device-user.png`, plus `page-*-editorial.png` for all five section-page heroes. Story cards intentionally contain no images. Investment Philosophy cards use their original `philosophy-01.jpg`–`philosophy-04.jpg` images. Earlier `home-warm-*`, `page-*-warm.png`, `*-vc.png`, and first-pass studio alternatives remain beside the active set as reversible fallbacks. Continue the active art direction and asset map from `docs/research/IMAGE_DIRECTION_VC.md` when adding or replacing Proposal B photography.

The About focus intro body is 17px. Its four-row hover image column is 32rem wide and shares the same left edge as the intro body above. The four principle-card descriptions also use the shared 17px body role.

## Known gaps and technical debt

These were discovered during the handoff audit and were not fixed as part of the documentation task:

1. **No product task ledger.** There is no authoritative list of the remaining user-requested visual changes. Future work must begin from the user's next instruction and current rendered state.
2. **Promotion is undecided.** `/b` appears to be the active candidate but still coexists with `/` and `/v2`.
3. **Partial biographies.** `RxMemberCard` explicitly documents that full bios are pending for some people; shared `TEAM` records confirm that not every member has a bio or photo.
4. **Stale Gravity naming.** `/b` metadata, comments, folders, unused `AmbientField`, `palette.ts`, and Three.js dependencies reflect an earlier design. Rename/remove only as a deliberate cleanup task after checking every import and deployment impact.
5. **Smooth-scroll review needed.** `useSmoothScroll` in `gravity/shared.tsx` currently calls its optional `onFrame` callback twice per animation frame, intercepts wheel input, and does not contain the reduced-motion guard used by the root Lenis implementation.
6. **External font dependency.** Satoshi is loaded at runtime from `api.fontshare.com`; offline development or a blocked third-party request falls back to system sans.
7. **Research coverage gap.** There are no route-specific topology, behavior, or screenshot-diff documents for `/v2` or `/b`. `docs/design-references/comparison.png` belongs to the upstream template demo.
8. **Template-facing metadata.** `README*`, `CHANGELOG.md`, and `package.json` still identify the repository as the AI Website Cloner Template.
9. **CI branch mismatch.** `.github/workflows/ci.yml` listens to `master`, while this project works on `main`; normal pushes to `main` may not run that workflow.
10. **Generated rules must stay synchronized.** CI expects the agent rule and skill generators to produce no diff.
11. **Quality-gate baseline.** On 2026-08-17, `npm run typecheck` and `npm run build` passed, and all 14 application routes were prerendered. `npm run check` stopped at ESLint because `SmoothScroll` reads `lenisRef.current` during render (`react-hooks/refs`); ESLint also reported seven existing unused-variable warnings. The build separately warned that `metadataBase` is unset for resolving social images.

## Safe continuation workflow

1. Confirm the requested route family. Default to investigating `/b` when the user refers to “the current design,” but state the assumption if the route is not obvious.
2. Preserve `/` and `/v2` unless the user authorizes removal or promotion.
3. Start from the rendered route and recent commit history, not from the original copy deck.
4. Keep copy and factual data centralized in the appropriate content module.
5. When editing RX shared code or CSS, regression-test both `/v2` and `/b`.
6. Inspect desktop (`1440px`), tablet (`768px`), and mobile (`390px`) behavior for visual changes.
7. Test hover, scroll, loader, route navigation, external links, videos, and reduced-motion behavior as relevant.
8. Run `npm run check` before handoff. For a narrow documentation-only change, at minimum validate generated-rule synchronization and run the applicable checks.
9. If `AGENTS.md` changed, run `bash scripts/sync-agent-rules.sh`.
10. If the clone skill changed, run `node scripts/sync-skills.mjs`.

## Build and deployment notes

- Required Node version: 24.
- Normal commands: `npm run dev`, `npm run lint`, `npm run typecheck`, `npm run build`, `npm run check`.
- Normal non-Vercel build output is standalone.
- Vercel omits explicit output so its own build pipeline can manage it.
- `EXPORT_BUILD=1` creates a static export, enables unoptimized images, and mounts the application at `/amed-preview`.
- `allowedDevOrigins` currently includes `192.168.0.148`.

## Agent configuration lineage

- `AGENTS.md` is the project-wide source of truth and now contains the essential AMED rules.
- `CLAUDE.md` is intentionally one line: `@AGENTS.md`. This is how Claude inherits the same knowledge.
- `GEMINI.md` follows the same pointer pattern.
- `scripts/sync-agent-rules.sh` expands `AGENTS.md` into generated files for tools that do not read it directly.
- The cloning skill is separately sourced from `.claude/skills/clone-website/SKILL.md` and mirrored to `.codex/skills/clone-website/SKILL.md` plus other platforms.
- The cloning skill is not a task tracker and should not be invoked for ordinary continuation of the current AMED proposals.

Keep this document current when route ownership, the active proposal, content authority, or known handoff risks materially change.
