import { dirname, join } from "https://deno.land/std@0.175.0/path/mod.ts";
import { validateDir } from "./common/validateDir.ts";

const publicDir = join(
  dirname(new URL("", import.meta.url).pathname),
  "..",
  "public",
);

validateDir([publicDir]);

const feedFilePath = `${publicDir}/rss.xml`;

let contents = new TextDecoder().decode(
  Deno.readFileSync(feedFilePath)
);

contents = contents.replace("<title></title>", "<title>Luc's Blog</title>");
contents = contents.replace("<description></description>", "<description>Luc's personal blog</description>");

const outputData = new TextEncoder().encode(contents);
Deno.writeFileSync(feedFilePath, outputData);

console.log(`Written ${feedFilePath} - ${outputData.length} bytes.`);
