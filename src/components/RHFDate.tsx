import React, { useCallback } from "react";
import { DatePicker, DatePickerProps } from "@heroui/react";
import { Controller, RegisterOptions } from "react-hook-form";
import { parseDate, parseDateTime } from '@internationalized/date';

interface RHFDateProps extends Omit<DatePickerProps, "value" | "errorMessage" | "defaultValue" | "isInvalid"> {
  name: string
  rules?: RegisterOptions
}

const RHFDate = ({ name, granularity, rules, ...props }: RHFDateProps) => {

  const parseDateValue = useCallback((value: string) => {
    return granularity === "day" || !granularity ? parseDate(value) : parseDateTime(value);
  }, [granularity])

  return (
    <Controller
      defaultValue={""}
      name={name}
      rules={rules}
      render={({ field, formState: { errors } }) => (
        <DatePicker
          {...props}
          {...field}
          value={field.value ? parseDateValue(field.value) : null}
          onChange={value => {
            field.onChange(value ? value.toString() : null);
            props.onChange?.(value)
          }}
          onBlur={value => { field.onBlur(); props.onBlur?.(value) }}
          errorMessage={errors[name] ? errors[name]?.message as string : ""}
          isInvalid={Boolean(errors[name])}
          granularity={granularity}
        />
      )}
    />
  )
}

export default RHFDate