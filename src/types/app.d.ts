import { CalendarDate } from "@nextui-org/react";
import { Time } from "@internationalized/date";

export interface IForm {
  input: string;
  date: CalendarDate;
  time: Time;
  select: string;
  date1: CalendarDate;
  date2: CalendarDate;
}