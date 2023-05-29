export type LinkSection = "main" | "contact" | "crypto" | "resume";

export type LinkData = {
  name: string;
  url: string;
  description?: string;
  section: LinkSection | LinkSection[];
};
