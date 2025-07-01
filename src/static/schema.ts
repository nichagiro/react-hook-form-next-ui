import * as yup from "yup";
import { DateValue, TimeInputValue } from "@heroui/react";
import { IForm } from "../types/app";


const schema: yup.ObjectSchema<IForm> = yup
  .object({
    input: yup.string().required(),
    date: yup.mixed<DateValue>().required(),
    time: yup.mixed<TimeInputValue>().required(),
    select: yup.string().required(),
    area: yup.string().required(),
    autocomplete: yup.string().required(),
    radios: yup.string().required(),
    checkbox: yup.boolean().required().isTrue(),
    checkboxGroup: yup.array().required().min(2),
    opt: yup.string().required().length(4)
  }).required();

export default schema

