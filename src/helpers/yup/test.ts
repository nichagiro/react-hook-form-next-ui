import moment from "moment";
import { parseDate } from '@internationalized/date';
import { TestDateRangeProps, TestDualDateProps, TestDualDateRangeProps, TypeRangeDateValue, TypeRangeTimeValue } from "./types";

export const testDualDateRange = ({ value, context, name, range, rangeDate, type }: TestDualDateRangeProps) => {
  const field = context.parent[name];
  if (!field || !value || !range || range === 0 || !rangeDate) return true;

  const end = moment(type == "min" ? field.toString() : value.toString());
  const start = moment(type == "max" ? field.toString() : value.toString());
  const diff = end.diff(start, rangeDate, true);

  return diff <= range
}

export const testDualDate = ({ context, name, type, value }: TestDualDateProps) => {
  const field = context.parent[name];
  if (!field || !value) return true;

  const days = value.compare(field)
  return type == "max" ? days >= 0 : days <= 0
}

export const testDateMinMax = ({ value, date, type }: TestDateRangeProps) => {
  if (!value || !date) return true;

  const timeValue = parseDate(date);
  const days = value.compare(timeValue);
  return type === "min" ? days >= 0 : days <= 0
}

export const testDualTimeRange = ({ value, context, name, range, rangeDate, type }: TestDualDateRangeProps) => {
  const field = context.parent[name];
  if (!field || !value || !range || range === 0 || !rangeDate) return true;

  const start = moment(type == "max" ? field.toString() : value.toString(), ["HH:mm", "hh:mm"]);
  const end = moment(type == "min" ? field.toString() : value.toString(), ["HH:mm", "hh:mm"]);
  const diff = end.diff(start, rangeDate, true);

  return diff <= range
}

export const getErrorNameRange = (type: TypeRangeDateValue | TypeRangeTimeValue | undefined, range: number): string => {
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