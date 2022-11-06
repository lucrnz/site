import { dirname, join } from "https://deno.land/std@0.158.0/path/mod.ts";
import { validateDir } from "./common/validateDir.ts";

type XessSource = {
  repo: string;
  license: string;
  main: string;
};

const source: XessSource = {
  repo: "https://github.com/Xe/Xess",
  license: "https://raw.githubusercontent.com/Xe/Xess/master/LICENSE",
  main: "https://raw.githubusercontent.com/Xe/Xess/master/classic/xess.css",
};

const staticDir = join(
  dirname(new URL("", import.meta.url).pathname), "..", "static");

validateDir([staticDir]);

const targetFilePath = join(staticDir, "xess.css");

const licenseContents = (await (await fetch(source.license)).text()).trim();
const mainContents = (await (await fetch(source.main)).text()).trim();

const targetContents =
  `/* ${source.repo}\n${licenseContents} */\n${mainContents}\n`;

await Deno.writeFile(targetFilePath, new TextEncoder().encode(targetContents));
console.log(`Written ${targetFilePath}`);
