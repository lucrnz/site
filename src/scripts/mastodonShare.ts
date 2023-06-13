/* @preserve
 * Thank you Xe Iaso!
 * https://github.com/Xe/site/blob/main/src/frontend/components/MastodonShareButton.tsx
 * https://github.com/Xe/site/blob/main/LICENSE
 */

import { u } from "./xeact";

export function setupMastodonShare() {
  const form = <HTMLFormElement>document.getElementById("masto-share")!;

  console.log("form", form);

  const getToot = () =>
    (<HTMLInputElement>form.querySelector("#toot")).value.replace(
      "%CURRENTURL%",
      window.location.href
    );

  const getURL = () =>
    (<HTMLInputElement>form.querySelector("#instanceurl")).value;

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    let instanceURL = getURL();

    if (!instanceURL.startsWith("https://")) {
      instanceURL = `https://${instanceURL}`;
    }

    localStorage["mastodon_instance"] = instanceURL;
    const text = getToot();
    const mastodonURL = u(instanceURL + "/share", {
      text,
      visibility: "public"
    });

    window.open(mastodonURL, "_blank");
  });

  let defaultURL = localStorage["mastodon_instance"];

  if (defaultURL) {
    (<HTMLInputElement>form.querySelector("#instanceurl")).value = defaultURL;
  }
}
