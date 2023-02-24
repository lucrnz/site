export enum GenericArgumentType {
  Boolean = "boolean",
  Function = "function",
  Number = "number",
  String = "string"
}

export type GenericArgument = {
  name: string;
  type: GenericArgumentType;
  value: string | number | boolean | Function;
};
