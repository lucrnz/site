import CryptoJS from "crypto-js";

export default async (passphrase: string): Promise<number> => {
  // Rationale for encrypting some links:
  // A lot of bots are crawling the web and are looking for email addresses, phone numbers, etc.
  // @TODO: Find another library, this one is not maintained anymore.

  return new Promise(async (resolve, reject) => {
    const elements = document.querySelectorAll(
      "a[data-protected-link]"
    ) as NodeListOf<HTMLAnchorElement>;

    if (!elements.length) {
      resolve(0);
      return;
    }

    let decodeTotal = 0;
    for (const element of elements) {
      const cryptedStr = element.getAttribute("data-protected-link");

      if (!cryptedStr) {
        continue;
      }

      let decoded: string | undefined;
      try {
        decoded = CryptoJS.Rabbit.decrypt(cryptedStr, passphrase).toString(
          CryptoJS.enc.Utf8
        );
      } catch (e) {
        console.error(`Error decrypting: ${cryptedStr}`);
        reject(e);
        return;
      }

      if (decoded) {
        element.removeAttribute("href");
        element.setAttribute("href", decoded);
        element.removeAttribute("data-protected-link");
        decodeTotal++;

        console.log(`Decoded link: ${decoded}`);
      }
    }

    resolve(decodeTotal);
  });
};
