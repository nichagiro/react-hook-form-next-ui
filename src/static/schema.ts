import { Time, CalendarDate } from "@internationalized/date";
import * as yup from "yup";

const schema = yup
  .object({
    input: yup.string().required(),
    // inputR: yup.string().required(),
    date: yup.mixed<CalendarDate>().required(),
    time: yup.mixed<Time>().required(),
    date1: yup.mixed<CalendarDate>().required(),
    date2: yup.mixed<CalendarDate>().required(),
    select: yup.string().required(),
  }).required();

export default schema

