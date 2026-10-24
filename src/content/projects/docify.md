---
title: Docify
headline: ChatGPT Asked to Write the Documentation; Writes Its Own README
deck: A 2023 tool that reads a repository and drafts the README. Its README was, naturally, written by it.
year: 2023
repo: https://github.com/iamadhee/docify
stars: 1
tech: [Python, OpenAI GPT-3, YAML]
status: archived
---
Developers hate writing documentation, and in April 2023 one of them decided to make a language model do it instead. Docify copies three files into the root of a repository, reads the code, and asks GPT-3 to describe each function, class and module.

The result is a draft README, which the author is expected to review before pasting. The project's own README ends with a confession: it was produced by Docify, with nothing changed except the logo.

A warning in the documentation notes that the tool sends your code to a third party. The documentation is, again, written by that third party.
