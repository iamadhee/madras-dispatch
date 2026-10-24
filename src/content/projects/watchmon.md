---
title: watchmon
headline: Price Monitor Watches Watches; Rings Phone When One Is a Steal
deck: Tracks several storefronts, keeps a price history per product, and alerts through ntfy and Telegram. 233 tests, no network required.
year: 2026
repo: https://github.com/iamadhee/watchmon
tech: [Python, Chromium, ntfy, Telegram, GitHub Actions, launchd]
status: live
featured: true
---
A buyer of wristwatches, tired of refreshing shop pages, has built a machine to refresh them for him. watchmon reads one or more storefronts, records what each watch cost on each visit, and raises two kinds of alarm. The first fires when any automatic-movement watch drops under a price ceiling. The second, called a steal, fires when a watch falls far below its own recorded history.

The storefronts are not named in the code. Each origin comes from an environment variable, because one of the shops serves a 483-byte "Site Maintenance" page to anyone outside its home country, and the author would rather not advertise which one.

Alerts go to a phone through ntfy, to the Mac as a native banner, and, for confirmed steals, to a Telegram channel with the price history attached. The test suite runs 233 tests without touching the network. The watches, so far, remain unbought.
