#!/usr/bin/env node
/**
 * Enforces the three layers of the design system.
 *
 *   tokens/primitives.css   raw values, no var()
 *   tokens/semantic.css     roles mapped to primitives, no raw colours
 *   components, layouts     read semantic tokens only; no primitives, no raw colours
 *   pages                   compose components; no <style> blocks at all
 *
 * Exit code 1 and a file:line list on any breach.
 */
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, relative } from "node:path";

const root = new URL("..", import.meta.url).pathname;
const src = join(root, "src");

function walk(dir, out = []) {
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    if (statSync(full).isDirectory()) walk(full, out);
    else out.push(full);
  }
  return out;
}

const failures = [];
function check(file, pattern, message) {
  const lines = readFileSync(file, "utf8").split("\n");
  lines.forEach((line, i) => {
    if (/^\s*(\/\*|\*|\/\/)/.test(line)) return; // comments
    if (pattern.test(line)) failures.push(`${relative(root, file)}:${i + 1}  ${message}\n    ${line.trim()}`);
  });
}

const HEX = /(^|[\s:(,])#[0-9a-fA-F]{3,8}\b/;
const PRIMITIVE = /--primitive-/;
const VAR = /var\(/;
const STYLE_TAG = /<style/;

// Layer 1
check(join(src, "styles/tokens/primitives.css"), VAR, "primitives must not reference other tokens");

// Layer 2
const semantic = join(src, "styles/tokens/semantic.css");
check(semantic, HEX, "semantic tokens must map to primitives, not raw colours");
for (const line of readFileSync(semantic, "utf8").split("\n")) {
  const m = line.match(/^\s*--[\w-]+:\s*(.+);/);
  if (m && !/var\(--primitive-|var\(--color-|var\(--primitive-/.test(m[1])) {
    failures.push(`${relative(root, semantic)}  semantic token holds a raw value\n    ${line.trim()}`);
  }
}

// Layer 3: base, components, layouts
const consumers = [
  join(src, "styles/base.css"),
  ...walk(join(src, "components")),
  ...walk(join(src, "layouts")),
];
for (const file of consumers) {
  check(file, PRIMITIVE, "consumers must use semantic tokens, not primitives");
  check(file, HEX, "consumers must use colour tokens, not raw colours");
}

// Layer 4: pages compose, they do not style
for (const file of walk(join(src, "pages"))) {
  check(file, STYLE_TAG, "pages must compose components; move styling into a component");
  check(file, PRIMITIVE, "pages must not read tokens");
  check(file, HEX, "pages must not read raw colours");
}

if (failures.length) {
  console.error(`Design system check failed (${failures.length}):\n`);
  for (const f of failures) console.error(f + "\n");
  process.exit(1);
}
console.log(`Design system check passed: ${consumers.length} consumers, ${walk(join(src, "pages")).length} pages.`);
