import React from "react";
import { TimeInput, TimeInputProps, TimeInputValue } from "@heroui/react";
import { Controller, RegisterOptions, useFormContext } from "react-hook-form";
interface RHFTimeProps extends Omit<TimeInputProps, "value" | "errorMessage" | "isInvalid"> {
  name: string;
  rules?: RegisterOptions;
}

const RHFTime = ({ name, rules, defaultValue, ...props }: RHFTimeProps) => {
  const { control } = useFormContext<{ [key: string]: TimeInputValue | null }>();

  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      defaultValue={defaultValue ?? null}
      render={({ field, formState: { errors } }) => (
        <TimeInput
          {...props}
          {...field}
          value={field.value}
          isInvalid={Boolean(errors[name])}
          errorMessage={errors[name] ? errors[name]?.message : ""}
        />
      )}
    />
  )
}

export default RHFTime