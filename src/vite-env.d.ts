/// <reference types="vite/client" />

import { Time } from "@internationalized/date";
import { CalendarDate } from "@nextui-org/react";


export interface Iform {
  input: string;
  date: CalendarDate;
  time: Time;
  select: string;
  date1: CalendarDate;
  date2: CalendarDate;
}

export interface iRows {
  id: string;
  service: string;
  topic: string;
  date: string;
  hour: string;
  status: string;
}