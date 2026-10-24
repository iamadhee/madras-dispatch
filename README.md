# The Madras Dispatch

A personal portfolio set as a daily newspaper. Built with Astro, published as static files.

## Run it

```sh
npm install
npm run dev        # http://localhost:4321
npm test           # design-system check, type check, build
```

Node 22.23 or newer. The `.node-version` file pins 24 for Cloudflare Pages.

## Change the content

| What | Where |
|---|---|
| Name, employer, social links, weather ear, sections | `src/site.ts` |
| Jobs (Business, page B1) | `src/content/work/*.md` |
| Projects (Technology, page C1) | `src/content/projects/*.md` |
| Posts (Opinion, page D1) | `src/content/posts/*.md` |
| Front-page lead story | `src/pages/index.astro` |
| Photograph | `src/assets/adheeban.jpg` |

| Other titles, on the Advertisements page | `src/site.ts`, `sites` |
| Daily Five word lists | `scripts/build-words.mjs` writes `src/data/words.ts` |
| Daily Five day 1 | `src/site.ts`, `puzzles.epoch` |
| Archive and project pictures | `src/assets/` |

`npm run sync:devto` adds a content file for any new Dev.to article. Write its headline afterwards.

Each content file has a frontmatter schema. The schemas are in `src/content.config.ts`. A post with `source: devto` links out. A post with `source: local` gets its own page under `/opinion/`.

## Change the design

Read `DESIGN.md` first. The design is three layers, and `npm run check` fails the build when a layer reaches past the one beneath it. The live reference is the Style Book at `/style-book`.

## Deploy to Cloudflare Pages

1. Push this folder to a Git repository.
2. In Cloudflare, create a Pages project from that repository.
3. Set the build settings:

| Setting | Value |
|---|---|
| Framework preset | Astro |
| Build command | `npm run build` |
| Build output directory | `dist` |

4. Set the production URL in `astro.config.mjs` (`site`) so canonical and Open Graph links are correct.

`public/_headers` sets long cache lifetimes for hashed assets. No functions, no adapter. One optional environment variable: `GITHUB_TOKEN`, which raises the GitHub rate limit when the build fetches star counts.

The build also fetches today's Chennai weather from Open-Meteo. Both fetches fall back to the content files when offline.
