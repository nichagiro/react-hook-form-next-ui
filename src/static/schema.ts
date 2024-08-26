import { Time, CalendarDate } from "@internationalized/date";
import yup from "../utils/yup";
import { dualDateValidate } from "../helpers/yup/dates";

const { endDateRule, startDateRule } = dualDateValidate("date1", "date2");

const schema = yup
  .object({
    input: yup.string().required(),
    // inputR: yup.string().required(),
    date: yup.mixed<CalendarDate>().required(),
    time: yup.mixed<Time>().required(),
    date1: startDateRule.required(),
    date2: endDateRule.required(),
    select: yup.string().required(),
  }).required();

export default schema

