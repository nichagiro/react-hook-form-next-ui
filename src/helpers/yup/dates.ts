import { DateValue, TimeInputValue } from "@nextui-org/react";
import yup from "../../utils/yup";
import moment from "moment";

type TypeRangeDateValue = "days" | "months" | "years";
type TypeRangeTimeValue = "hours" | "minutes";
interface DualDateValidateProps {
  startDate: string;
  endDate: string;
  type?: TypeRangeDateValue;
  range?: number;
}

interface DualTimeValidateProps {
  startTime: string;
  endTime: string;
  range?: number;
  type?: TypeRangeTimeValue;
}

const getNameType = (type: TypeRangeDateValue | TypeRangeTimeValue | undefined, range: number): string => {
  switch (type) {
    case "days":
      return range === 1 ? "El rango es de 1 dia" : `El rango es de ${range} dias`
    case "months":
      return range === 1 ? "El rango es de 1 mes" : `El rango es de ${range} meses`
    case "years":
      return range === 1 ? "El rango es de 1 año" : `El rango es de ${range} años`
    case "hours":
      return range === 1 ? "El rango es de 1 hora" : `El rango es de ${range} horas`
    case "minutes":
      return range === 1 ? "El rango es de 1 minuto" : `El rango es de ${range} minutos`
    default:
      return "Custom Test"
  }
}

export const dualDateValidate = ({ endDate, startDate, range = 0, type }: DualDateValidateProps) => {
  const startDateRule = yup.mixed<DateValue>().test(
    'Menor',
    'Este campo debe ser menor a la fecha final',
    (value, context) => {
      const field = context.parent[endDate];
      if (!field || !value) return true;
      const days = value.compare(field);
      return days <= 0

    }).when([], {
      is: range && range > 0 && type,
      then: schema => schema.test(
        'Rango de tiempo',
        getNameType(type, range),
        (value, context) => {
          const field = context.parent[endDate];
          if (!field || !value || !range || range === 0 || !type) return true;

          const start = moment(value.toString());
          const end = moment(field.toString());
          const diff = end.diff(start, type, true);

          return diff <= range
        }
      )
    });

  const endDateRule = yup.mixed<DateValue>().test(
    'Mayor',
    'Este campo debe ser mayor a la fecha inicial',
    (value, context) => {
      const field = context.parent[startDate];
      if (!field || !value) return true;
      const days = value.compare(field)
      return days >= 0
    }).when([], {
      is: range && range > 0 && type,
      then: schema => schema.test(
        'Rango de tiempo',
        getNameType(type, range),
        (value, context) => {
          const field = context.parent[startDate];
          if (!field || !value || !range || range === 0 || !type) return true;

          const end = moment(value.toString());
          const start = moment(field.toString());
          const diff = end.diff(start, type, true);

          return diff <= range
        }
      )
    });

  return { startDateRule, endDateRule }
}

export const dualTimeValidate = ({ endTime, startTime, range = 0, type }: DualTimeValidateProps) => {
  const startTimeRule = yup.mixed<TimeInputValue>().test(
    'Menor',
    'Este campo debe ser menor a la hora final',
    (value, context) => {
      const field = context.parent[endTime];
      if (!field || !value) return true;
      const days = value.compare(field);
      return days <= 0
    }).when([], {
      is: range && range > 0 && type,
      then: schema => schema.test(
        'Rango de tiempo',
        getNameType(type, range),
        (value, context) => {
          const field = context.parent[endTime];
          if (!field || !value || !type || !range || range === 0) return true;

          const start = moment(value.toString(), ["HH:mm", "hh:mm"]);
          const end = moment(field.toString(), ["HH:mm", "hh:mm"]);
          const diff = end.diff(start, type, true);

          return diff <= range
        }
      )
    });

  const endTimeRule = yup.mixed<TimeInputValue>().test(
    'Mayor',
    'Este campo debe ser mayor a la hora final',
    (value, context) => {
      const field = context.parent[startTime];
      if (!field || !value) return true;
      const days = value.compare(field)
      return days >= 0
    }).when([], {
      is: range && range > 0 && type,
      then: schema => schema.test(
        'Rango de tiempo',
        getNameType(type, range),
        (value, context) => {
          const field = context.parent[startTime];
          if (!field || !value || !type || !range || range === 0) return true;

          const end = moment(value.toString(), ["HH:mm", "hh:mm"]);
          const start = moment(field.toString(), ["HH:mm", "hh:mm"]);
          const diff = end.diff(start, type, true);

          return diff <= range
        }
      )
    });

  return { startTimeRule, endTimeRule }
}