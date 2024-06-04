import type { Alpine } from "alpinejs";

import intersectPlugin from "@alpinejs/intersect";
import collapsePlugin from "@alpinejs/collapse";

export default (Alpine: Alpine) => {
  Alpine.plugin(collapsePlugin);
  Alpine.plugin(intersectPlugin);
};
