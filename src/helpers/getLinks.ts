import { LINKS } from "../consts";
import type { LinkSection } from "../types/link";

export function getLinksBySection(section: LinkSection) {
  return LINKS.filter((link) =>
    Array.isArray(link.section)
      ? link.section.includes(section)
      : link.section === section
  );
}
