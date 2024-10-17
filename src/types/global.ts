import { AutocompleteProps, SelectProps } from "@nextui-org/react";
import { RegisterOptions } from "react-hook-form";

export type Icolor = "danger" | "default" | "primary" | "secondary" | "success" | "warning" | undefined;

export type IdateFormats = "DD/MM/YYYY" | "DD/MM/YYYY HH:mm" | "DD-MM-YYYY hh:mm" | "DD-MM-YYYY HH:mm" | "DD-MM-YYYY hh:mm";

interface DataOptionsSelect {
  key: string,
  label: string
}
export interface RHFAutocompleteProps extends Omit<AutocompleteProps, "children"> {
  name: string;
  rules?: RegisterOptions;
  data: DataOptionsSelect[];
  defaultValue?: string
}

export interface RHFSelectProps extends Omit<SelectProps, "children"> {
  name: string;
  rules?: RegisterOptions;
  data: DataOptionsSelect[];
  defaultOptions?: string;
}
