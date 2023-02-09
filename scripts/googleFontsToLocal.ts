const fontSources = [
  "https://fonts.googleapis.com/css2?family=JetBrains+Mono&display=swap"
];

const userAgent = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/106.0.0.0 Safari/537.36";
const fetchCfg = {headers: {"User-Agent": userAgent}};

import { dirname, join } from "https://deno.land/std@0.175.0/path/mod.ts";
import { validateDir } from "./common/validateDir.ts";

const baseDir = dirname(new URL('', import.meta.url).pathname);
const staticDir = join(baseDir, "..", "static");
const fontsDir = join(staticDir, "fonts");

validateDir([baseDir, staticDir, fontsDir]);

let sourceCss : string[] = [];

for (const url of fontSources) {
  const fetchRes = await fetch(url, {...fetchCfg});
  const text = await fetchRes.text();

  if (text.length > 0) {
    sourceCss = [...sourceCss, ...text.split("\n")];
  }
}

const downloadFont = async (url : string) : Promise<string> => {
  if (! url.includes("/s/")) {
    console.error(`Invalid url: ${url}`);
    Deno.exit(1);
  }

  const fileName = url.split("/s/", 2)[1].replaceAll("/", "-");
  console.log(`Downloading ${fileName}...`);

  const fetchRes = await fetch(url, { ...fetchCfg });
  const data = await fetchRes.arrayBuffer();

  Deno.writeFileSync(join(fontsDir, fileName), new Uint8Array(data));
  return fileName;
}

const resultCss = [];

for (const line of sourceCss) {
  if (line.includes("src:") && line.includes("url") && line.includes("fonts.gstatic.com")) {
    const url = line.trim().split("url(", 2)[1].split(")")[0];
    const fontFileName = await downloadFont(url);
    resultCss.push(line.replace(url, `/fonts/${fontFileName}`));
  } else {
    resultCss.push(line);
  }
}

const cssFilePath = join(staticDir, "fonts.css");

Deno.writeFileSync(cssFilePath, (new TextEncoder()).encode(resultCss.join("\n")));

console.log(`Written ${cssFilePath}`);
