import type { GenericArgument } from "../types/GenericArgument";

export interface Quirk {
  Setup(args: GenericArgument[]): void;
  Apply(): void;
}
