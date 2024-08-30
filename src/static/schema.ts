import yup from "../utils/yup";
import { dualDateValidate, dualTimeValidate } from "../helpers/yup/dates";
import { DateValue, TimeInputValue } from "@nextui-org/react";

const { endDateRule, startDateRule } = dualDateValidate({
  startDate: "date1",
  endDate: "date2",
  range: 2,
  type: "months",
});

const { endTimeRule, startTimeRule } = dualTimeValidate({
  endTime: "dualtime2",
  startTime: "dualtime1",
  range: 1,
  type: "minutes"
})

const schema = yup
  .object({
    input: yup.string().required(),
    date: yup.mixed<DateValue>().required(),
    time: yup.mixed<TimeInputValue>().required(),
    date1: startDateRule.required(),
    date2: endDateRule.required(),
    select: yup.string().required(),
    area: yup.string().required(),
    dualtime1: startTimeRule.required(),
    dualtime2: endTimeRule.required(),
    autocomplete: yup.string().required(),
  }).required();

export default schema

