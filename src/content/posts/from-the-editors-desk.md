---
title: From the Editor's Desk
headline: Why This Website Is a Newspaper
date: 2026-10-24
source: local
tags: [editorial, design]
description: A note on the first edition. What the paper is, how it is set, and the three layers it is built on.
featured: true
---
This is the first edition of a newspaper with a staff of one. Every story is about the editor, which is a conflict of interest the paper has decided to live with.

The idea is simple. A portfolio is a set of claims about a person. A newspaper is a format built to make claims legible: a headline tells you what happened, a deck tells you why it matters, a byline tells you who is responsible, and a jump line tells you where to read more. Nothing on these pages does a job a real newspaper would not recognise.

## How it is set

The nameplate is set in UnifrakturMaguntia, a blackletter in the tradition of the great mastheads. Headlines are Old Standard, a revival of the Scotch Roman types that newspapers used for most of the twentieth century. Body copy is Newsreader, a face drawn for reading news on screens, with optical sizes so that the small type stays open and the large type stays tight.

The paper is a grey newsprint, not a cream. The ink is a printed black, which is never pure. There is one spot colour, a press red, and it appears in one place on each page at most.

## How it is built

The site is built with Astro and published as static files on Cloudflare Pages. The design is a system with three layers, and the build fails if any layer reaches past the one beneath it.

1. **Primitives** hold raw values: the hex of the newsprint, the type scale, the spacing steps. Nothing reads them except the next layer.
2. **Semantic tokens** give every value a role: paper, ink, rule, headline, deck, gutter. Components read these and only these.
3. **Components** are the parts of a newspaper: masthead, folio, headline, byline, prose, figure, pull quote, box, jump line, classified, coupon. Pages compose them and hold no styling of their own.

A script checks all of this on every build. The rules are printed in full in the Style Book, on page H1.

## Corrections

The editor welcomes them. Write in on the coupon in the Classifieds.
