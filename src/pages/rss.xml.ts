import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import type { APIContext } from "astro";
import { site } from "../site";

/** The wire. Every editorial and every syndicated article, newest first. */
export async function GET(context: APIContext) {
  const posts = (await getCollection("posts")).sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
  return rss({
    title: site.paper.name,
    description: `${site.paper.tagline} Writing by ${site.person.name}.`,
    site: context.site!,
    items: posts.map((post) => ({
      title: post.data.headline ?? post.data.title,
      description: post.data.description,
      pubDate: post.data.date,
      link: post.data.source === "local" ? `/opinion/${post.id}` : post.data.url!,
    })),
    customData: `<language>en-gb</language>`,
  });
}
