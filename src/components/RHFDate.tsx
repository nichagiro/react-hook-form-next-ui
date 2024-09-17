import React from "react";
import { DatePicker, DatePickerProps, DateValue } from "@nextui-org/react";
import { Controller, RegisterOptions, useFormContext } from "react-hook-form";

interface RHFDateProps extends DatePickerProps {
  name: string;
  rules?: RegisterOptions
}

const RHFDate = ({ name, rules, defaultValue = null, ...props }: RHFDateProps) => {
  const { control } = useFormContext<{ [key: string]: DateValue | null }>();

  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      defaultValue={defaultValue}
      render={({ field, formState: { errors } }) => (
        <DatePicker
        {...props}
        {...field}
          value={field.value}
          errorMessage={errors[name] ? errors[name]?.message : ""}
          isInvalid={Boolean(errors[name])}
        />
      )}
    />
  )
}

export default RHFDate