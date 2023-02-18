const checkExternalUrl = (url: string) => {
  const lowerCaseUrl = url.toLowerCase();
  const isAbsolute =
    lowerCaseUrl.startsWith("http") || lowerCaseUrl.startsWith("https");

  if (isAbsolute) {
    return new URL(url).hostname === window.location.hostname;
  }

  return false;
};

export default checkExternalUrl;
