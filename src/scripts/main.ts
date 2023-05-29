import { SITE_GITHUB } from "../consts";
import setupHamburgerMenu from "./hamburgerMenu";

export default async function () {
  console.log(`Psst! Website source code over here: ${SITE_GITHUB}`);
  setupHamburgerMenu();
}
