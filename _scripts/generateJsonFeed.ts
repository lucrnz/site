import { dirname, join } from "https://deno.land/std@0.158.0/path/mod.ts";
import { validateDir } from "./common/validateDir.ts";

const publicDir = join(
  dirname(new URL("", import.meta.url).pathname),
  "..",
  "public",
);

validateDir([publicDir]);

import { XMLParser } from "npm:fast-xml-parser@4.0.11";
import { convert as convertHTMLToText } from "npm:html-to-text@8.2.1";

const xmlData = new TextDecoder().decode(
  Deno.readFileSync(`${publicDir}/rss.xml`),
);

interface RSSFeedItem {
  title: string;
  pubDate: string;
  link: string;
  guid: string;
  description: string;
}

interface RSSFeedChannel {
  title: string;
  link: string;
  description: string;
  generator: string;
  language: string;
  lastBuildDate: string;
  item: RSSFeedItem[];
}

interface RSSFeedContainer {
  channel: RSSFeedChannel;
}

interface RSSFeedParsed {
  rss: RSSFeedContainer;
}

interface JSONFeedAuthor {
  name: string;
  url: string;
  avatar: string;
}

interface JSONFeedItem {
  id: string;
  url: string;
  title: string;
  content_html: string;
  content_text: string;
  date_published: Date;
}

interface JSONFeed {
  version: string;
  title: string;
  author: JSONFeedAuthor;
  items: JSONFeedItem[];
}

const parser = new XMLParser(xmlData);
const parsed = parser.parse(xmlData) as RSSFeedParsed;

const jsonFeedItems: JSONFeedItem[] = [];

for (const item of parsed.rss.channel.item) {
  jsonFeedItems.push({
    id: item.link,
    url: item.link,
    title: item.title,
    content_html: item.description.replaceAll("&#x2F;", "/"),
    content_text: convertHTMLToText(item.description.replaceAll("&#x2F;", "/")),
    date_published: new Date(item.pubDate),
  } as JSONFeedItem);
}

const jsonFeed = {
  version: "https://jsonfeed.org/version/1",
  title: "Luc's blog",
  author: {
    name: "Luc/Lucie/Lucien",
    url: "https://lucdev.net",
    avatar: "https://lucdev.net/images/avatar.png",
  } as JSONFeedAuthor,
  items: jsonFeedItems
} as JSONFeed;

const outputFilePath = `${publicDir}/blog.json`;

const outputData = new TextEncoder().encode(JSON.stringify(jsonFeed));
Deno.writeFileSync(outputFilePath, outputData);

console.log(`Written ${outputFilePath} - ${outputData.length} bytes.`);
