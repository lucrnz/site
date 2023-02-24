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
  if (mode === StyleRuleMode.Hover) {
    const normalStyle = element.getAttribute("style") || "";

    element.addEventListener("mouseover", () => applyRules(element, style));

    element.addEventListener("mouseout", () =>
      element.setAttribute("style", normalStyle)
    );

    return;
  }

  applyRules(element, style);
}
