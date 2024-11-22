import { AutocompleteItemProps, AutocompleteProps, SelectItemProps, SelectProps } from "@nextui-org/react";
import { RegisterOptions } from "react-hook-form";

export type Icolor = "danger" | "default" | "primary" | "secondary" | "success" | "warning" | undefined;

export interface RHFAutocompleteProps extends Omit<AutocompleteProps, "children"> {
  name: string;
  rules?: RegisterOptions;
  data: AutocompleteItemProps[];
}

export interface RHFSelectProps extends Omit<SelectProps, "children"> {
  name: string;
  rules?: RegisterOptions;
  data: SelectItemProps[];
}
