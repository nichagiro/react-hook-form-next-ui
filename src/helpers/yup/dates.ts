import { DateValue, TimeInputValue } from "@nextui-org/react";
import { DateMinMaxValueProps, DualDateValidateProps, DualTimeValidateProps } from "./types";
import { getErrorNameRange, testDateMinMax, testDualDate, testDualDateRange, testDualTimeRange } from "./test";
import { mixed } from "yup"
import { format } from "@formkit/tempo";

export const dualDateValidate = ({
  endDate, startDate, range = 0, type, maxEndDate,
  maxStartDate, minEndDate, minStartDate
}: DualDateValidateProps) => {

  const startDateRule = mixed<DateValue>().test(
    'Menor',
    'Este campo debe ser menor a la fecha final',
    (value, context) => testDualDate({ value, context, name: endDate, type: "min" })
  ).when([], {
    is: range && range > 0 && type,
    then: schema => schema.test(
      'Rango de tiempo',
      getErrorNameRange(type, range),
      (value, context) => testDualDateRange({
        context, value, range, name: endDate,
        rangeDate: type, type: "min"
      })
    )
  }).when([], {
    is: maxStartDate,
    then: schema => schema.test(
      'Max Date',
      `Fecha maxima ${format(maxStartDate!, "DD/MM/YYYY")}`,
      value => testDateMinMax({ value, date: maxStartDate, type: "max" })
    )
  }).when([], {
    is: minStartDate,
    then: schema => schema.test(
      'Min Date',
      `Fecha minima ${format(minStartDate!, "DD/MM/YYYY")}`,
      value => testDateMinMax({ value, date: minStartDate, type: "min" })
    )
  });

  const endDateRule = mixed<DateValue>().test(
    'Mayor',
    'Este campo debe ser mayor a la fecha inicial',
    (value, context) => testDualDate({ value, context, name: startDate, type: "max" })
  ).when([], {
    is: range && range > 0 && type,
    then: schema => schema.test(
      'Rango de tiempo',
      getErrorNameRange(type, range),
      (value, context) => testDualDateRange({
        context, value, range, name: startDate,
        rangeDate: type, type: "max"
      })
    )
  }).when([], {
    is: maxEndDate,
    then: schema => schema.test(
      'Max Date',
      `Fecha maxima ${format(maxEndDate!, "DD/MM/YYYY")}`,
      value => testDateMinMax({ value, date: maxEndDate, type: "max" })
    )
  }).when([], {
    is: minEndDate,
    then: schema => schema.test(
      'Min Date',
      `Fecha minima ${format(minEndDate!, "DD/MM/YYYY")}`,
      value => testDateMinMax({ value, date: minEndDate, type: "min" })
    )
  });

  return { startDateRule, endDateRule }
}

export const dateMinMaxValidate = ({ minDate, maxDate }: DateMinMaxValueProps) => {
  return mixed<DateValue>().test(
    'Min Date',
    `Fecha minima ${format(minDate!, "DD/MM/YYYY")}`,
    value => testDateMinMax({ value, date: minDate, type: "min" })
  ).test(
    'Max Date',
    `Fecha maxima ${format(maxDate!, "DD/MM/YYYY")}`,
    value => testDateMinMax({ value, date: maxDate, type: "max" })
  )
}

export const dualTimeValidate = ({ endTime, startTime, range = 0, type }: DualTimeValidateProps) => {
  const startTimeRule = mixed<TimeInputValue>().test(
    'Menor',
    'Este campo debe ser menor a la hora final',
    (value, context) => testDualDate({ value, context, name: endTime, type: "min" })
  ).when([], {
    is: range && range > 0 && type,
    then: schema => schema.test(
      'Rango de tiempo',
      getErrorNameRange(type, range),
      (value, context) => testDualTimeRange({
        value, context, name: endTime, type: "min",
        range, rangeDate: type
      })
    )
  });

  const endTimeRule = mixed<TimeInputValue>().test(
    'Mayor',
    'Este campo debe ser mayor a la hora inicial',
    (value, context) => testDualDate({ value, context, name: startTime, type: "max" })
  ).when([], {
    is: range && range > 0 && type,
    then: schema => schema.test(
      'Rango de tiempo',
      getErrorNameRange(type, range),
      (value, context) => testDualTimeRange({
        value, context, name: startTime, type: "max",
        range, rangeDate: type
      })
    )
  });

  return { startTimeRule, endTimeRule }
}