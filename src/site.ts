import promptsterImage from "./assets/sites/promptster.jpg";
import tldrImage from "./assets/sites/tldr.jpg";
import twpImage from "./assets/sites/twp.jpg";

/**
 * Site facts. Edit this file to change who the paper is about.
 * Components read from here. No personal detail lives in a component.
 */
export const site = {
  paper: {
    name: "The Madras Dispatch",
    tagline: "All the code that's fit to ship.",
    url: "https://adheeban.com",
    city: "Chennai",
    /** Printed below the masthead on inner pages. */
    publisher: "Adheeban Manoharan",
    /** Used to number the volume. Volume I began this year. */
    firstVolumeYear: 2021,
  },
  person: {
    name: "Adheeban Manoharan",
    firstName: "Adheeban",
    surname: "Manoharan",
    role: "Software Engineer",
    employer: "Kissflow",
    employerUrl: "https://kissflow.com",
    careerStart: "2021-07-01",
    location: "Chennai, India",
    email: "caeser.alfred@gmail.com",
  },
  social: {
    github: { label: "GitHub", handle: "iamadhee", url: "https://github.com/iamadhee" },
    linkedin: { label: "LinkedIn", handle: "adheeban-manoharan", url: "https://linkedin.com/in/adheeban-manoharan" },
    devto: { label: "Dev.to", handle: "iamadhee", url: "https://dev.to/iamadhee" },
    x: { label: "X", handle: "iamadhee_", url: "https://x.com/iamadhee_" },
    coffee: { label: "Buy Me a Coffee", handle: "adheebanm", url: "https://buymeacoffee.com/adheebanm" },
  },
  /** How a project's status is printed, everywhere it appears. */
  statusLabel: { live: "Live", beta: "Beta", maintained: "Maintained", archived: "Archived", building: "In the works", docked: "Back issues" },
  /** How a status reads on the top line of a display advertisement. */
  advertLine: { live: "Now open to the public", beta: "On trial, admission free", maintained: "Still trading", archived: "Closed, with thanks", building: "Opening shortly", docked: "Back issues only" },
  /** Other titles from the same press. Printed as display advertisements on page G1. */
  sites: [
    { name: "Promptster", host: "promptster.adheeban.com", url: "https://promptster.adheeban.com", tagline: "Learn to write prompts. Three paths, 31 challenges, instant feedback.", status: "live", image: promptsterImage },
    { name: "tldr", host: "tldr.adheeban.com", url: "https://tldr.adheeban.com", tagline: "The hard parts of tech, five minutes at a time.", status: "live", image: tldrImage },
    { name: "The Watch Project", host: "twp.adheeban.com", url: "https://twp.adheeban.com", tagline: "A playground for watch designs: cases, dials, hands and straps.", status: "beta", image: twpImage },
  ],
  /** Sections of the paper, in print order. `page` is the folio shown on that section's first page. */
  sections: [
    { slug: "/", name: "Front Page", page: "A1" },
    { slug: "/business", name: "Business", page: "B1" },
    { slug: "/technology", name: "Technology", page: "C1" },
    { slug: "/opinion", name: "Opinion", page: "D1" },
    { slug: "/puzzles", name: "Puzzles", page: "E1" },
    { slug: "/classifieds", name: "Classifieds", page: "F1" },
    { slug: "/advertisements", name: "Advertisements", page: "G1" },
    { slug: "/style-book", name: "Style Book", page: "H1" },
  ],
  puzzles: {
    /** Day 1 of The Daily Five. */
    epoch: "2026-10-24",
  },
  weather: {
    place: "Chennai",
    coords: { lat: 13.0827, lon: 80.2707, timezone: "Asia/Kolkata" },
    summary: "Hot and humid. Chance of rain, 40 per cent. Chance of a deploy, moderate.",
    high: "31°",
    low: "26°",
  },
} as const;

export type Section = (typeof site.sections)[number];

export function sectionFor(slug: string): Section {
  const found = site.sections.find((s) => s.slug === slug);
  if (!found) throw new Error(`Unknown section: ${slug}`);
  return found;
}
