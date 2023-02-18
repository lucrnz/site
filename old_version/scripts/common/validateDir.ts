import { existsSync } from "https://deno.land/std@0.175.0/node/fs.ts?s=existsSync";

export const validateDir = (directories : string[]) => {
  for (const dir of directories) {
    if (!existsSync(dir)) {
      console.error(`directory: ${dir} does not exists.`);
      Deno.exit(1);
    }
  }
}

