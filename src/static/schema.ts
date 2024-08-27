import yup from "../utils/yup";
import { dualDateValidate, dualTimeValidate } from "../helpers/yup/dates";
import { CalendarDate, TimeInputValue } from "@nextui-org/react";

const { endDateRule, startDateRule } = dualDateValidate("date1", "date2");
const { endTimeRule, startTimeRule } = dualTimeValidate("dualtime1", "dualtime2")

const schema = yup
  .object({
    input: yup.string().required(),
    // inputR: yup.string().required(),
    date: yup.mixed<CalendarDate>().required(),
    time: yup.mixed<TimeInputValue>().required(),
    date1: startDateRule.required(),
    date2: endDateRule.required(),
    select: yup.string().required(),
    area: yup.string().required(),
    dualtime1: startTimeRule.required(),
    dualtime2: endTimeRule.required(),
  }).required();

export default schema

