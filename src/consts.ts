export const API_URL = "https://mi-lucdev-backend.vercel.app/api";

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

export const MASTODON_ACCOUNTS = [
  "https://pony.social/@luc",
  "https://mas.to/@lucie"
];

export const ENCRYPTED_LINKS = {
  linkedin:
    "U2FsdGVkX1+aEaXXuUnu2hVpIe5rDxhKa7pNKQ0/1WnkeoK3mJ7QiJPGZjeNzBxUsrAvZr3TkkE=",
  email: "U2FsdGVkX1/21rPmwwzduKPF/Vr3B6d6okrQTo8hO3mMNlEk",
  whatsapp: "U2FsdGVkX183uTxK64ohoMpgr7ezHY2DTfre4h+wgGwVk9utCduaSWqfAg=="
};

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
