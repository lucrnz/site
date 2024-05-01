/* @preserve
 * Thank you Xe Iaso!
 * https://github.com/Xe/site/blob/main/src/frontend/components/MastodonShareButton.tsx
 * https://github.com/Xe/site/blob/main/LICENSE
 */

import { u } from "./xeact";

export function setupMastodonShare() {
  const form = document.getElementById("masto-share") as HTMLFormElement | null;

  if (!form) {
    return;
  }

  const getToot = () =>
    (form.querySelector("#toot")! as HTMLInputElement).value.replace(
      "%CURRENTURL%",
      window.location.href
    );

  const getURL = () =>
    (form.querySelector("#instanceurl")! as HTMLInputElement).value;

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    let instanceURL = getURL();

    if (!instanceURL.startsWith("https://")) {
      instanceURL = `https://${instanceURL}`;
    }

    localStorage["mastodon_instance"] = instanceURL;
    const text = getToot();
    const mastodonURL = u(`${instanceURL}/share`, {
      text,
      visibility: "public"
    });

    window.open(mastodonURL, "_blank");
  });

  let defaultURL = localStorage["mastodon_instance"];

  if (defaultURL) {
    (form.querySelector("#instanceurl")! as HTMLInputElement).value =
      defaultURL;
  }
}

export function setupXShare() {
  const form = document.getElementById("x-share") as HTMLFormElement | null;

  if (!form) {
    return;
  }

  const link = form.querySelector("a")! as HTMLAnchorElement;
  const dataElement = form.querySelector("#x-share-data")! as HTMLInputElement;

  const values = JSON.parse(dataElement.value) as {
    title: string;
    tags: string[];
    url: string;
    username: string;
  };

  link.href = u(link.href, {
    size: "large",
    text: values.title,
    url: values.url,
    hashtags: values.tags.join(","),
    via: values.username,
    related: values.username
  });
}
