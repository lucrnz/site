import decodeLinks from "./decodeLinks";
import patchExternalLinks from "./patchExternalLinks";

export default async function () {
  await decodeLinks("qOftmrDIWgroKAZQGxiL130nARSLstcYNwyJaIc2");
  await patchExternalLinks();
}
