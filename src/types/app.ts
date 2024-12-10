import { DateValue, TimeInputValue } from "@nextui-org/react";

export interface IForm {
  input: string;
  date: DateValue;
  time: TimeInputValue;
  select: string;
  date1: DateValue;
  date2: DateValue;
  area: string;
  dualtime1: TimeInputValue;
  dualtime2: TimeInputValue;
  autocomplete: string;
  radios: string;
  checkbox: true,
  checkboxGroup: string[];
  opt: string;
}

