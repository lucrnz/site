export default (variableName: string): string =>
  getComputedStyle(document.documentElement).getPropertyValue(
    `--${variableName}`
  );
