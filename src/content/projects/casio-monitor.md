---
title: casio-monitor
headline: Man Builds Robot to Wait for Casio Sale So He Does Not Have To
deck: Sweeps about 1,350 products every five minutes and alerts at 60 per cent off. Ignores the pianos.
year: 2026
repo: https://github.com/iamadhee/casio-monitor
tech: [Python, Shopify JSON, ntfy, GitHub Actions]
status: live
---
The Bhawar Casio store lists roughly 1,350 products. About 1,170 of them are wristwatches. The rest are calculators, pianos, label printers and stopwatches, and this monitor has been told to ignore them.

Every five minutes it reads the store's product feed, scores each watch by its deepest discounted in-stock variant, and pushes an alert when anything reaches 60 per cent off. One alert per product. The same deal never repeats unless it gets deeper. If more than eight deals land at once, the top eight go out and the rest are summarised, on the grounds that a phone can only buzz so much.

The ntfy topic is never committed to the repository, and a test asserts that it stays that way. Thirteen real G-Shocks ship with no product type at all, so the filter excludes the non-watches rather than matching the watches. This is the sort of detail the author enjoys.
