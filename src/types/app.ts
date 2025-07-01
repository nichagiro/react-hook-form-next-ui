import { DateValue, TimeInputValue } from "@heroui/react";

export interface IForm {
  input: string;
  date: DateValue;
  time: TimeInputValue;
  select: string;
  area: string;
  autocomplete: string;
  radios: string;
  checkbox: true,
  checkboxGroup: string[];
  opt: string;
}

