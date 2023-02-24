import getCssVariable from "./getCssVariable";

export type StyleRules = Record<string, string>;

export enum StyleRuleMode {
  Normal = "normal",
  Hover = "hover"
}

function applyRules(element: HTMLElement, rules: StyleRules) {
  const define = (rule: string, value: string) =>
    ((element.style as any)[rule] = value);
  for (const [rule, value] of Object.entries(rules)) {
    if (value.startsWith("$")) {
      const variable = value.slice(1);
      const cssVariable = getCssVariable(variable);
      define(rule, cssVariable);
      continue;
    }
    define(rule, value);
  }
}

export function styleElement(
  element: HTMLElement,
  style: StyleRules,
  mode: StyleRuleMode = StyleRuleMode.Normal
) {
  const normalStyle = element.getAttribute("style") || "";
  const mediaQuery = window.matchMedia("screen");

  if (mode === StyleRuleMode.Hover) {
    element.addEventListener("mouseover", () => {
      if (mediaQuery.matches) {
        applyRules(element, style);
      }
    });

    element.addEventListener("mouseout", () => {
      if (mediaQuery.matches) {
        element.setAttribute("style", normalStyle);
      }
    });

    return;
  }

  if (mediaQuery.matches) {
    applyRules(element, style);
  }

  const mediaQueryListener = (event: MediaQueryListEvent) => {
    if (event.matches) {
      applyRules(element, style);
      return;
    }

    element.setAttribute("style", normalStyle);
  };

  mediaQuery.addEventListener("change", mediaQueryListener);
}
