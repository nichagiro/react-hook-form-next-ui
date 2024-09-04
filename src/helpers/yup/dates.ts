import { DateValue, TimeInputValue } from "@nextui-org/react";
import yup from "../../utils/yup";
import moment from "moment";
import { DateMinMaxValueProps, DualDateValidateProps, DualTimeValidateProps } from "./types";
import { getErrorNameRange, testDateMinMax, testDualDate, testDualDateRange, testDualTimeRange } from "./test";

export const dualDateValidate = ({
  endDate, startDate, range = 0, type, maxEndDate,
  maxStartDate, minEndDate, minStartDate
}: DualDateValidateProps) => {

  const startDateRule = yup.mixed<DateValue>().test(
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
      `Fecha maxima ${moment(maxStartDate).format("DD/MM/YYYY")}`,
      value => testDateMinMax({ value, date: maxStartDate, type: "max" })
    )
  }).when([], {
    is: minStartDate,
    then: schema => schema.test(
      'Min Date',
      `Fecha minima ${moment(minStartDate).format("DD/MM/YYYY")}`,
      value => testDateMinMax({ value, date: minStartDate, type: "min" })
    )
  });

  const endDateRule = yup.mixed<DateValue>().test(
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
      `Fecha maxima ${moment(maxEndDate).format("DD/MM/YYYY")}`,
      value => testDateMinMax({ value, date: maxEndDate, type: "max" })
    )
  }).when([], {
    is: minEndDate,
    then: schema => schema.test(
      'Min Date',
      `Fecha minima ${moment(minEndDate).format("DD/MM/YYYY")}`,
      value => testDateMinMax({ value, date: minEndDate, type: "min" })
    )
  });

  return { startDateRule, endDateRule }
}

export const dateMinMaxValidate = ({ minDate, maxDate }: DateMinMaxValueProps) => {
  return yup.mixed<DateValue>().test(
    'Min Date',
    `Fecha minima ${moment(minDate).format("DD/MM/YYYY")}`,
    value => testDateMinMax({ value, date: minDate, type: "min" })
  ).test(
    'Max Date',
    `Fecha maxima ${moment(maxDate).format("DD/MM/YYYY")}`,
    value => testDateMinMax({ value, date: maxDate, type: "max" })
  )
}

export const dualTimeValidate = ({ endTime, startTime, range = 0, type }: DualTimeValidateProps) => {
  const startTimeRule = yup.mixed<TimeInputValue>().test(
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

  const endTimeRule = yup.mixed<TimeInputValue>().test(
    'Mayor',
    'Este campo debe ser mayor a la hora final',
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