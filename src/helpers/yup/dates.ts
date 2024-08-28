import { DateValue, TimeInputValue } from "@nextui-org/react";
import yup from "../../utils/yup";

export const dualDateValidate = (startDate: string, endDate: string) => {
  const startDateRule = yup.mixed<DateValue>().test(
    'Menor',
    'Este campo debe ser menor a la fecha final',
    (value, context) => {
      const field = context.parent[endDate];
      if (!field || !value) return true;
      const days = value.compare(field);
      return days <= 0
    });

  const endDateRule = yup.mixed<DateValue>().test(
    'Mayor',
    'Este campo debe ser mayor a la fecha inicial',
    (value, context) => {
      const field = context.parent[startDate];
      if (!field || !value) return true;
      const days = value.compare(field)
      return days >= 0
    })

  return { startDateRule, endDateRule }
}


export const dualTimeValidate = (startTime: string, endTime: string) => {
  const startTimeRule = yup.mixed<TimeInputValue>().test(
    'Menor',
    'Este campo debe ser menor a la hora final',
    (value, context) => {
      const field = context.parent[endTime];
      if (!field || !value) return true;
      const days = value.compare(field);
      return days <= 0
    });

  const endTimeRule = yup.mixed<TimeInputValue>().test(
    'Mayor',
    'Este campo debe ser mayor a la hora final',
    (value, context) => {
      const field = context.parent[startTime];
      if (!field || !value) return true;
      const days = value.compare(field)
      return days >= 0
    })

  return { startTimeRule, endTimeRule }
}