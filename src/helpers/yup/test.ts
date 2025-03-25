import { TestDateRangeProps, TestDualDateProps, TestDualDateRangeProps, TypeRangeDateValue, TypeRangeTimeValue } from "./types";
import { diffDays, diffHours, diffMinutes, diffMonths, diffYears, isAfter, isEqual, parse } from '@formkit/tempo';

export const testDualDateRange = ({ value, context, name, range, rangeDate, type }: TestDualDateRangeProps) => {
  const field = context.parent[name];
  if (!field || !value || !range || range === 0 || !rangeDate) return true;

  const end = parse(type == "min" ? field.toString() : value.toString());
  const start = parse(type == "max" ? field.toString() : value.toString());

  let diff;

  switch (rangeDate) {
    case "days":
      diff = diffDays(end, start)
      break;
    case "months":
      diff = diffMonths(end, start)
      break;
    case "years":
      diff = diffYears(end, start)
      break;
    default:
      diff = 0;
      break;
  }

  return diff < range
}

export const testDualDate = ({ context, name, type, value }: TestDualDateProps) => {
  const field = context.parent[name];
  if (!field || !value) return true;

  const days = value.compare(field)
  return type == "max" ? days >= 0 : days <= 0
}

export const testDateMinMax = ({ value, date, type }: TestDateRangeProps) => {
  if (!value || !date) return true;

  let fieldDate;
  let valueDate;

  try {
    fieldDate = parse(date);
    valueDate = parse(value.toString());
  } catch { return false }

  if (isEqual(valueDate, fieldDate)) return true

  const diff = isAfter(valueDate, fieldDate);

  return type === "min" ? diff : !diff
}

export const testDualTimeRange = ({ value, context, name, range, rangeDate, type }: TestDualDateRangeProps) => {
  const field = context.parent[name];
  if (!field || !value || !range || range === 0 || !rangeDate) return true;

  const dateValue = value.toString();
  const dateField = field.toString();

  const start = parse(type == "max" ? dateField : dateValue, "HH:mm:ss");
  const end = parse(type == "min" ? dateField : dateValue, "HH:mm:ss");

  let diff = 0;

  if (rangeDate === "hours") {
    diff = diffHours(end, start)
  } else {
    diff = diffMinutes(end, start)
  }

  return diff < range
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