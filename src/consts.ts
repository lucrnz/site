import type { LinkData } from "./types/link";

export const SITE_TITLE = "Lucdev Website";
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
  Luc = "Luc"
}

export type AuthorInformation = Record<
  AuthorName,
  {
    url: string;
    avatarUrl: string;
    avatarAlt: string;
  }
>;

export const AUTHOR_INFORMATION: AuthorInformation = {
  [AuthorName["Luc"]]: {
    url: "/about",
    avatarUrl: "/images/profile_picture.png",
    avatarAlt: "Luc's avatar, twilight sparkle pony"
  }
};

export const X_USERNAME = "lucrnz";

export const DEFAULT_AUTHOR = AuthorName["Luc"];

export const SITE_GIT_REPO = "https://github.com/lucrnz/site";

export const LINKS: LinkData[] = [
  {
    name: "GitHub",
    url: "https://github.com/lucrnz",
    section: "main"
  },
  {
    name: "X (Twitter)",
    url: `https://twitter.com/${X_USERNAME}`,
    section: "main"
  },
  {
    name: "Ko-fi",
    url: "https://ko-fi.com/lucrnz",
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
