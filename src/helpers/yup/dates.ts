import { CalendarDate } from "@nextui-org/react";
import yup from "../../utils/yup";

export const dualDateValidate = (startDate: string, endDate: string) => {
  const startDateRule = yup.mixed<CalendarDate>().test(
    'Menor',
    'Este campo debe ser menor a la fecha final',
    (value, context) => {
      const field = context.parent[endDate];
      if (!field || !value) return true;
      const days = value.compare(field);
      return days <= 0
    }).notRequired();

  const endDateRule = yup.mixed<CalendarDate>().test(
    'Menor',
    'Este campo debe ser menor a la fecha final',
    (value, context) => {
      const field = context.parent[startDate];
      if (!field || !value) return true;
      const days = value.compare(field)
      return days >= 0
    }).notRequired()

  return { startDateRule, endDateRule }
}
