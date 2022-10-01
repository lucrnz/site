import removeMarkdown from "npm:remove-markdown@0.5.0";
import { getStdin } from "https://deno.land/x/get_stdin@v1.1.0/mod.ts";

const input = await getStdin({ exitOnEnter: false });

const calculateReadTimeMinutes = (contents: string): number => {
  const wpm = 230;
  const words = contents.trim().split(/\s+/).length;
  return Math.ceil(words / wpm);
};

if (!input.includes("+++")) {
  console.log(`Ignoring file, as it does not have the required separator.`);
  Deno.exit(1);
}

const markdownData = input.substring(
  input.indexOf("+++", input.indexOf("+++") + 1) + 4,
).trim();

const readTime: number = calculateReadTimeMinutes(
  removeMarkdown(markdownData),
);

console.log(`Read time: ${readTime}`);
