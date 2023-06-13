/* @preserve
 * Thank you Xe Iaso!
 * https://github.com/Xe/Xeact/blob/main/xeact.js
 * https://github.com/Xe/Xeact/blob/main/LICENSE
 */

/**
 * Generate a relative URL from `url`, appending all key-value pairs from `params` as URL-encoded parameters.
 *
 * @type{function(string=, Object=): string}
 */
const u = (url = "", params = {}) => {
  let result = new URL(url, window.location.href);
  Object.entries(params).forEach((kv) => {
    let [k, v] = kv;
    result.searchParams.set(k, v);
  });
  return result.toString();
};

export { u };
