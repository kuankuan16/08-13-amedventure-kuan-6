# Design System — extracted from sakazuki.io, transposed to AMED Ventures

Source of design language: `https://sakazuki.io/` (Next.js + Lenis + p5.js).
Source of content/brand: `https://www.amedventures.com/` + AMED brand lockup.

**What we take:** motion vocabulary, layout rhythm, typographic scale system, interaction model.
**What we do NOT take:** any sakazuki copy, imagery, logo, or the crimson/beige palette.
All imagery is newly generated; all copy is written for AMED; palette is AMED's own.

---

## 1. Scaling system (the single most important structural rule)

Sakazuki designs on a **1360px artboard** (`--size: 1360`) and expresses nearly every length in
`vw`, so the whole composition scales proportionally on desktop.

Measured proof at viewport width 1413px:

| Design px (1360 artboard) | Measured computed px @1413 |
| --- | --- |
| 16 | 16.6235 |
| 13 | 13.5066 |
| 30 | 31.1691 |
| 60 | 62.3382 |
| 140 | 145.456 |

`measured = design / 1360 * viewportWidth`.

**AMED adopts the same two-regime approach**, but on a **1440px artboard** to match the AMED
brand deck and the previous AMED build:

- Desktop (`>= 1024px`): `vw` units — helper `px(n) = n / 1440 * 100vw`
- Below `1024px`: switch to `rem` / `clamp()` so text never becomes unreadably small

## 2. Typography

Sakazuki uses `hagrid` (display) + `hagrid-text` (body) — both licensed Adobe Typekit faces we
cannot redistribute. AMED substitutes a pairing with the same personality: a wide, low-contrast
geometric display with tall x-height, plus a quiet neutral text face.

- **Display:** `Instrument Serif` is too editorial; we use **Fraunces** (optical-size variable
  serif, soft humanist) for warmth OR **General Sans** for institutional neutrality.
  → Chosen: **General Sans** (display + text) to stay continuous with the AMED lockup, with
  **Fraunces** reserved for the single hero statement to add the "human warmth" the brief asks for.
- Uppercase micro-labels with wide tracking are used as section eyebrows (sakazuki: `PHILOSOPHY`).

### Scale (design px on the 1440 artboard)

| Token | Size / line-height | Use |
| --- | --- | --- |
| `display-xl` | 140 / 0.92, tracking -0.045em | Hero + big statement numbers |
| `display-l` | 88 / 0.95 | Section statements |
| `display-m` | 60 / 1.0 | Sub-statements |
| `title` | 30 / 1.4 | Card + label headings |
| `body` | 16 / 1.4 | Paragraphs |
| `small` | 13 / 1.4 | Feature list items, meta |
| `eyebrow` | 13 / 1.2, uppercase, tracking 0.14em | Section eyebrows |

## 3. Color

Sakazuki palette (reference only — NOT used):
`--primary #c30d23`, `--secondary #000`, `--third #e1d6ce`, `--light #f3eae4`, `--input #f5f1ea`.

**AMED palette** (sampled from the AMED Ventures lockup, carried over from the prior AMED build,
which is the authority for these values):

| Token | Value | Role |
| --- | --- | --- |
| `--navy-950` | `#050b23` | Deepest ground, hero |
| `--navy-900` | `#10163c` | Secondary dark ground |
| `--indigo` | `#3f3f80` | Brand mid, gradients |
| `--cyan` | `#00a8d0` | **Primary brand blue** (the AMED mark blue) |
| `--cyan-hot` | `#7fd6ea` | Highlight / hover |
| `--ice` | `#f7f9fc` | Light ground |
| `--chalk` | `#ffffff` | Light ground / text on dark |
| `--ink` | `#071022` | Text on light |

The brief asks for **bright, elegant, humane, institutional**. So unlike sakazuki (which is
mostly black + crimson), AMED's page runs **light-dominant** with dark cinematic bookends:
dark hero → light philosophy/thesis → dark portfolio exhibition → light close.
This also satisfies "dark-to-light transitions between page sections" from the motion vocabulary.

## 4. Easing + timing tokens

Taken directly (these are generic curves, not protectable expression):

```
--ease-quint-out:    cubic-bezier(.23, 1, .32, 1)     /* the workhorse */
--ease-in-out-cubic: cubic-bezier(.645, .045, .355, 1)
--hover-duration:    .6s
--hover-translate-y: -100%
--stagger-start:     .18s      /* first element delay, in-view reveals */
--stagger-step:      .14s      /* per-element increment */
--firstview-start:   .4s       /* first paint delay, hero only */
--firstview-step:    .14s
--bg-expand-duration: 1s
--sticky-track:      140dvh    /* per stacked sticky card */
```

## 5. Layout containers

```
--container-padding:    1.625rem   (26px, desktop)
--container-padding-md: .9375rem   (15px, mobile)
--content-max-width:    67.75rem   (1084px)
```

## 6. Motion vocabulary (the "wow factor")

Enumerated from live DOM + CSS. Each becomes a reusable primitive in `src/components/amed/motion/`.

| # | Primitive | Mechanism observed | AMED use |
| --- | --- | --- | --- |
| M1 | **Smooth scroll** | Lenis (`html.lenis`) | Global; respects `prefers-reduced-motion` |
| M2 | **Fixed canvas stage + scrolling slides** | `canvasStage` fixed inset-0, `p5Canvas` z-index -1; three 100vh `slide` sections scroll over it | Hero: fixed media stage, 3 statement slides scroll over |
| M3 | **Flying logo** | `data-main-visual-flying-logo`, `data-logo-composition`, `logoSpin3d` keyframe; fixed z-101 | AMED mark flies from hero centre into the header slot on load |
| M4 | **Line-mask reveal** | `.animatedLine > .animatedLineInner`, `translateY(100%)` → `0` inside `overflow:hidden`, staggered by `--stagger-*` | Every heading on the page |
| M5 | **Hover roll text** | `HoverRevealText/inner`, duplicated label, `translateY(-100%)` over `.6s` quint-out | Nav links, buttons, portfolio rows |
| M6 | **Sticky step viewport** | `Philosophy/stickyViewport` sticky top:0 h:100vh + `data-philosophy-active-index` / `-step-count` / `-step` driven by scroll progress | Thesis section: pinned visual, index switches as copy scrolls |
| M7 | **Stacked sticky cards** | `Benefit/benefitItem` all `position:sticky; top:20.78px`, one per colour (red/black/cream), each on a `140dvh` track → cards stack and overlay | "What we do" — 3 stacked full-bleed cards |
| M8 | **Scroll-driven frame sequence** | `Founder` section: 1381 `<img>` frames swapped by scroll position | Too heavy + needs 1381 renders. **Substituted** with a Higgsfield-generated `<video>` scrubbed by scroll — same effect, one asset |
| M9 | **Sticky title + accordion** | `FAQ/titleWrap` sticky top:54px beside an accordion of `data-faq-item` | FAQ / "How we partner" |
| M10 | **Marquee** | `bottomMintIconMarqueeRight` keyframe in the fixed bottom bar | Portfolio logo marquee |
| M11 | **Fixed bottom bar** | `Header/bottomBar` fixed at viewport bottom, h:75, z:90 | Persistent CTA bar |
| M12 | **Mask-wrap reveal** | `data-collective-logo-mask-wrap`, `data-collective-target-revealed`, `data-collective-exit-hiding` | Section enters via mask, exits by hiding |

## 7. Page topology (sakazuki, for rhythm reference)

Measured section offsets at 1413px wide, total scroll height 24052px:

| # | Section | Top | Height | Note |
| --- | --- | --- | --- | --- |
| 0 | MainVisual | 0 | 2445 | 3 × 100vh slides over fixed canvas |
| 1 | Philosophy | 2445 | 2990 | sticky step viewport |
| 2 | Collective | 5734 | 3640 | mask reveal, flying logo |
| 3 | Benefit | 9375 | 5099 | 3 stacked sticky cards |
| 4 | Founder | 13333 | 4764 | 1381-frame scroll sequence |
| 5 | Journey | 18168 | 2236 | horizontal/step journey, 20 imgs |
| 6 | FAQ | 20559 | 2470 | sticky title + accordion |

**Rhythm rule:** roughly 2200–5100px per section, i.e. every section owns 3–6 viewport
heights of scroll. AMED keeps this pacing — it is what makes the page feel cinematic rather
than like a normal marketing page.
