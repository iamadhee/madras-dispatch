import { defineCollection } from "astro:content";
import { z } from "astro/zod";
import { glob } from "astro/loaders";

const work = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/work" }),
  schema: z.object({
    company: z.string(),
    companyUrl: z.string().url().optional(),
    role: z.string(),
    start: z.coerce.date(),
    end: z.coerce.date().nullable().default(null),
    location: z.string(),
    headline: z.string(),
    deck: z.string(),
    highlights: z.array(z.string()).default([]),
  }),
});

const projects = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/projects" }),
  schema: z.object({
    title: z.string(),
    headline: z.string(),
    deck: z.string(),
    year: z.number().int(),
    repo: z.string().url().optional(),
    url: z.string().url().optional(),
    stars: z.number().int().optional(),
    tech: z.array(z.string()).default([]),
    status: z.enum(["live", "beta", "maintained", "archived"]),
    featured: z.boolean().default(false),
  }),
});

const posts = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/posts" }),
  schema: z.object({
    title: z.string(),
    headline: z.string().optional(),
    date: z.coerce.date(),
    source: z.enum(["devto", "local"]),
    url: z.string().url().optional(),
    readingTime: z.number().int().optional(),
    reactions: z.number().int().default(0),
    tags: z.array(z.string()).default([]),
    description: z.string(),
    featured: z.boolean().default(false),
  }),
});

export const collections = { work, projects, posts };
