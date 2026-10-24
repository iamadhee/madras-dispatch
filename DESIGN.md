# Design language

## The idea

The site is a broadsheet newspaper with a staff of one. Every element does a job a printed newspaper would recognise. A headline says what happened. A deck says why it matters. A byline says who is responsible. A jump line says where the story continues. Nothing is decoration.

The voice is playful and self-aware. Headlines treat a career as breaking news. The facts stay accurate.

## The three layers

Each layer reads only the layer beneath it. `scripts/check-design-system.mjs` enforces this on every build.

| Layer | File | May read | May not |
|---|---|---|---|
| 1. Primitives | `src/styles/tokens/primitives.css` | Nothing | Other tokens |
| 2. Semantic tokens | `src/styles/tokens/semantic.css` | Primitives | Raw values |
| 3. Base, components, layouts | `src/styles/base.css`, `src/components/`, `src/layouts/` | Semantic tokens | Primitives, raw colours |
| 4. Pages | `src/pages/` | Components | Tokens, `<style>` blocks |

To add a colour, size or space: add a primitive, then give it a role in semantic tokens. Never add a raw value anywhere else.

To add a visual pattern: add a component. Pages compose components and hold no styling.

## Two editions

The same roles print in two editions. The day edition is newsprint grey with printed black. The evening edition is night paper with light ink. It follows the reader's system, or the edition they chose with the switch in the edition line, which the browser remembers. Every colour role is one `light-dark()` pair, so neither edition is a copy of the other; `data-theme` on the root picks the scheme. Only `semantic.css` knows about the evening edition. No component does.

## Palette

Newsprint grey, printed black, one spot colour. No cream. No pure black.

| Role | Use |
|---|---|
| `--color-paper` | The sheet |
| `--color-paper-raised` | Coupons and cut-outs |
| `--color-paper-tint` | Tinted boxes, code |
| `--color-ink` | Text, rules, headlines |
| `--color-ink-soft` | Decks, bylines, captions |
| `--color-ink-muted` | Meta lines, credits |
| `--color-stamp` | The one red thing on a page: stamp, link hover, focus ring |
| `--color-photo-plate`, `--color-halftone`, `--blend-photo` | How a plate prints in each edition |

## Type

| Face | Role |
|---|---|
| UnifrakturMaguntia | The nameplate only |
| Old Standard TT, bold | Headlines, kickers, section names, table headings |
| Newsreader, variable with optical sizes | Everything you read |

Base size 16px, ratio 1.2. Roles run from `--text-fine` (credits) to `--text-nameplate`.

Small capitals come in three label roles, set once in `base.css` and never restated in a component:

| Class | Use |
|---|---|
| `.label` | Edge and strip labels, table heads, credits, folio lines, statuses |
| `.label-box` | The centred title of a boxed component |
| `.label-inline` | Kickers, byline names, the section strip, ledger captions |

Boxed components (`Box`, `IndexBox`, `Classified`, `Coupon`, `Ear`) open with a heavy rule and share one padding. Facts go in a ruled box; asides go in a tinted one. Project status words come from `site.statusLabel` and nowhere else. Body copy is justified, hyphenated, and indented between paragraphs with no space. Decks are italic. Caps with tracking are reserved for kickers, section names and folio lines, where a newspaper uses them.

## Paper and ink

The stock is drawn, not flat. Two fixed overlays cover the sheet: grain and fibre (`--texture-grain`, `--texture-fibre`) at `--opacity-grain`, and the cloudiness of newsprint (`--texture-mottle`) at `--opacity-mottle`. They multiply in the day edition and screen in the evening one.

The ink is pressed, not painted. Every letter spreads a hair into the paper (`--ink-spread`, a text shadow on `body`). Display type (the nameplate, section names, banner, lead and secondary headlines, pull quotes, advert names) carries the class `ink-display`: a noise mask gives uneven coverage (`--texture-ink`) and an SVG filter in the page gives ragged edges (`--filter-ink`, `#ink-bleed` in `Base.astro`). Brief headlines and small text stay crisp. Print drops all of it.

No two visits are alike. When a reader arrives, the press re-seeds the four textures and the edge filter before the sheet paints. Each piece of display type takes the ink mask at its own offset, and each stamp lands at its own tilt. All of these come from the visit's seed, kept in the browser for the session, so turning a page does not change the paper under the reader. The seeds live in the texture primitives; the press script in `Base.astro` only replaces them.

## Layout

Six columns on desktop, three on tablet, one on phones. `Grid` and `Col` build it. Column rules are hairlines drawn by `Col rule`. On narrow screens the rule becomes a top rule. Cells align to the top; `Grid stretch` makes a row of boxed cells, such as display advertisements, end level.

The section strip runs in one row while it fits. Below that it is a ruled grid, four across or two on phones, so no row starts with a stray rule.

Text columns inside a story (`Prose columns`) are never narrower than `--measure-column`; a cell too narrow for two columns gets one. Paragraphs split at the column break, as they do in print. A picture placed first inside `Prose` heads the first column and the copy flows round it into the next, so the story and its photograph end level. A story that finishes on the page ends with an end mark (`Prose end`); a story that continues gets a `JumpLine` instead. Stories stack with one hairline between them and equal space above and below it.

Structure is drawn with rules, not whitespace. The kinds, in order of weight: soft, hairline, medium, heavy, double. A double rule closes the masthead and opens the colophon. A heavy rule separates page regions.

## Pages and their newspaper names

| Route | Section | Folio |
|---|---|---|
| `/` | Front Page | A1 |
| `/business` | Work and education | B1 |
| `/technology` | Projects | C1 |
| `/opinion` | Writing | D1 |
| `/puzzles` | The Daily Five | E1 |
| `/classifieds` | Contact | F1 |
| `/advertisements` | Display notices for the other titles from this press | G1 |
| `/style-book` | Design system reference | H1 |

## Components

| Component | Job | Rule of use |
|---|---|---|
| `Masthead` | Nameplate, ears, edition line, section strip | `front` on the front page, `compact` elsewhere |
| `Folio` | Running head and section nameplate | Every inner page |
| `Headline` | Banner, lead, secondary, brief | One banner per front page |
| `Byline` | Who wrote it | Under every headline that has a story |
| `Meta` | Small facts in a line | Dates, roles, tags |
| `Prose` | Body copy | `dateline` or `dropcap`, never both |
| `PullQuote` | Lifted quotation | Quote the subject |
| `Plate` | Any picture, screened to ink; colour bleeds in on hover | Never bare in a story; wrap in `Figure` |
| `Figure` | A plate with caption and credit; `mug` floats a portrait into text | Credit is mandatory |
| `Advert` | Display advertisement: double-ruled frame, centred lines, one link | Advertisements page only |
| `DailyWord` | The Daily Five: a word a day, six guesses, streaks in the browser | Puzzles page |
| `PrintLink` | "Print this edition" | Colophon |
| `Box` | Ruled, tinted, or dashed sidebar | Ruled for facts, tinted for asides |
| `Ledger` | Ruled table | Anything with columns |
| `IndexBox` | "Inside" with page letters | Front page |
| `JumpLine` | "Continued on Page B1" | The only way to continue a story |
| `Links` | External links under a story | Repository, site |
| `Classified` | Dense notices | Classifieds and the front-page strip |
| `Coupon` | Clip-and-send contact box | Once |
| `Stamp` | Red rubber stamp | At most once per page |
| `Ear` | Boxes either side of the nameplate | Weather and price |
| `Rule`, `Grid`, `Col`, `Stack`, `Story` | Structure | Everywhere; `Grid stretch` for boxed cells that must end level |
| `stylebook/*` | Swatch, Specimen, Spec | The Style Book page only |

## What the build fetches

| Data | Source | Fallback |
|---|---|---|
| Weather in the ear, sunrise and sunset in the front-page almanac | Open-Meteo, once per build | The static line in `site.ts`, without the almanac |
| Star counts | GitHub API, once per repository; `GITHUB_TOKEN` raises the rate limit | The count in the content file |
| Share image | `public/og.jpg`, a 1200×630 capture of the front page | Regenerate after a masthead change |

## Pictures

Every picture goes through `Plate`. Sources so far: the editor's photograph, screenshots of the other titles, artwork from project repositories, and two public-domain engravings of Madras from Wikimedia Commons. Credit each one in the caption.

## Motion and accessibility

No page-load animation. Turning a page is one quick cross-fade (`--motion-fast`), done by the browser between documents; the masthead is named so it holds still, and a page is fetched when the pointer rests on its link. Links change colour on hover. Focus rings are dashed in the spot colour. `prefers-reduced-motion` turns off the transitions and the page fade. Every `aside` is named by its title.

On paper the grain, the halftone and the section links go. A page break never splits a table, a picture or a box, and never leaves a heading at the foot of a page.
