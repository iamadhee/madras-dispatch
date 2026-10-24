#!/usr/bin/env node
/**
 * Pulls the Dev.to article list and adds a content file for any article
 * not yet in src/content/posts. Existing files are never changed, so
 * hand-written headlines survive. Run: npm run sync:devto
 */
import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const USERNAME = "iamadhee";
const dir = new URL("../src/content/posts/", import.meta.url).pathname;

const res = await fetch(`https://dev.to/api/articles?username=${USERNAME}&per_page=100`);
if (!res.ok) throw new Error(`Dev.to returned HTTP ${res.status}`);
const articles = await res.json();

const known = new Set(
  readdirSync(dir)
    .filter((f) => f.endsWith(".md"))
    .map((f) => readFileSync(join(dir, f), "utf8").match(/^url:\s*(\S+)/m)?.[1])
    .filter(Boolean),
);

let added = 0;
for (const a of articles) {
  if (known.has(a.url)) continue;
  const slug = a.slug.replace(/-[a-z0-9]+$/i, "").slice(0, 60);
  const quote = (s) => JSON.stringify(String(s));
  const file = `---
title: ${quote(a.title)}
headline: ${quote(a.title)}
date: ${a.published_at.slice(0, 10)}
source: devto
url: ${a.url}
readingTime: ${a.reading_time_minutes}
reactions: ${a.public_reactions_count}
tags: [${a.tag_list.join(", ")}]
description: ${quote(a.description)}
featured: false
---
`;
  writeFileSync(join(dir, `${slug}.md`), file);
  console.log(`added  ${slug}.md  (write a headline for it)`);
  added += 1;
}
console.log(added ? `${added} new article(s).` : "Nothing new on the wire.");
