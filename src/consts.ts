import type { Link } from "./types/link";

export const API_URL = "https://mi.lucdev.net/api";

export const SITE_TITLE = "Luc's Website";
export const SITE_DESCRIPTION =
  "My personal website including all my projects, contact links and my blog.";

export const NAV_BAR_LINKS = {
  "/": "Home",
  "/blog": "Blog",
  "/read": "Read",
  "/resume": "Resume",
  "/about": "About"
};

export enum LicenseName {
  "CC-BY-NC-ND-4.0" = "CC-BY-NC-ND-4.0",
  "CC-BY-SA-4.0" = "CC-BY-SA-4.0",
  "CC0-1.0" = "CC0-1.0"
}

export type LicenseInformation = Record<LicenseName, string>;

export const DEFAULT_LICENSE = LicenseName["CC0-1.0"];

export const LICENSES: LicenseInformation = {
  [LicenseName["CC0-1.0"]]:
    "https://creativecommons.org/publicdomain/zero/1.0/legalcode.txt",
  [LicenseName["CC-BY-SA-4.0"]]:
    "https://creativecommons.org/licenses/by-sa/4.0/legalcode.txt",
  [LicenseName["CC-BY-NC-ND-4.0"]]:
    "https://creativecommons.org/licenses/by-nc-sa/4.0/legalcode.txt"
};

export enum AuthorName {
  "Luc" = "Luc",
  "Hera" = "Hera"
}

export type AuthorInformation = Record<AuthorName, string>;

export const AUTHOR_URL: AuthorInformation = {
  [AuthorName["Luc"]]: "/about",
  [AuthorName["Hera"]]: "https://snowdin.town/users/alfredohno"
};

export const DEFAULT_AUTHOR = AuthorName["Luc"];

export const SITE_GITHUB = "https://github.com/lucrnz/site";

export const FEDI_ACCOUNTS = [
  "https://0w0.is/luc",
  "https://pony.social/@luc",
  "https://mas.to/@lucie"
];

export const LINKS: Link[] = [
  {
    name: "GitHub",
    url: "https://github.com/lucrnz",
    description: "My projects",
    section: "main"
  },
  {
    name: "Fediverse",
    url: "https://0w0.is/luc",
    description: "Decentralized social network",
    section: "main"
  },
  {
    name: "Dev.to",
    url: "https://dev.to/lucrnz",
    description: "Official mirror of my blog",
    section: "main"
  },
  {
    name: "Ko-fi",
    url: "https://ko-fi.com/lucrnz",
    description: "Donations",
    section: "main"
  },
  {
    name: "Linkedin",
    url: "https://linkedin.com/in/luciana-hillcoat",
    section: ["resume"]
  },
  {
    name: "Email",
    url: "mailto:me@lucdev.net",
    section: ["contact", "resume"]
  },
  {
    name: "Matrix",
    url: "https://matrix.to/#/@luc:psps.cat",
    section: "contact"
  },
  {
    name: "Telegram",
    url: "https://t.me/lucrnz",
    section: "contact"
  },
  {
    name: "Discord",
    url: "https://discord.com/users/1056533413915529267",
    section: "contact"
  },
  {
    name: "GPG Keys",
    url: "https://file.lucdev.net/luc-gpg.key",
    section: "crypto"
  }
];

type ClassicButton = {
  name: string;
  fileName: string;
};

export const CLASSIC_BUTTONS: ClassicButton[] = [
  {
    fileName: "computer.png",
    name: "I like computer"
  },
  {
    fileName: "html.gif",
    name: "I dream in HTML"
  },
  {
    fileName: "imagination.gif",
    name: "Powered by imagination"
  },
  {
    fileName: "preserve.gif",
    name: "Internet Archive, Preverse!"
  },
  {
    fileName: "repair.jpg",
    name: "Right to repair!"
  }
];
