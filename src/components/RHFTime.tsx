import React, { useCallback } from "react";
import { TimeInput, TimeInputProps } from "@heroui/react";
import { Controller, RegisterOptions } from "react-hook-form";
import { Time } from '@internationalized/date';

interface RHFTimeProps extends Omit<TimeInputProps, "defaultValue" | "value" | "errorMessage" | "isInvalid"> {
  name: string
  shouldUnregister?: boolean
  rules?: RegisterOptions
}

const RHFTime = ({ name, shouldUnregister, granularity, rules, ...props }: RHFTimeProps) => {

  const parseTimeValue = useCallback((value: string) => {
    if (granularity === "second") {
      const [hours, minutes, seconds] = value.split(":").map(Number);
      return new Time(hours, minutes, seconds);
    } else if (granularity === "minute" || !granularity) {
      const [hours, minutes] = value.split(":").map(Number);
      return new Time(hours, minutes);
    } else {
      const [hours] = value.split(":").map(Number);
      return new Time(hours);
    }
  }, [granularity])

  return (
    <Controller
      name={name}
      rules={rules}
      shouldUnregister={shouldUnregister}
      defaultValue=""
      render={({ field, formState: { errors } }) => (
        <TimeInput
          {...props}
          {...field}
          granularity={granularity}
          value={field.value ? parseTimeValue(field.value) : null}
          onChange={value => {
            field.onChange(value ? value.toString() : null);
            props.onChange?.(value)
          }}
          onBlur={value => { field.onBlur(); props.onBlur?.(value) }}
          isInvalid={Boolean(errors[name])}
          errorMessage={errors[name] ? errors[name]?.message as string : ""}
        />
      )}
    />
  )
}

export default RHFTime