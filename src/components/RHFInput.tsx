import React from "react";
import { Input, InputProps } from "@heroui/react";
import { Controller, RegisterOptions, useFormContext } from "react-hook-form";

interface RHFInputProps extends Omit<InputProps, "errorMessage" | "isInvalid"> {
  name: string;
  rules?: RegisterOptions
}

const RHFInput = ({ defaultValue = "", rules, name, classNames, ...props }: RHFInputProps) => {
  const { control } = useFormContext<{ [key: string]: string }>();

  return (
    <Controller
      control={control}
      defaultValue={defaultValue}
      name={name}
      rules={rules}
      render={({ field, formState: { errors } }) => (
        <Input
          {...props}
          {...field}
          onChange={(value) => { field.onChange(value); props.onChange?.(value) }}
          isInvalid={Boolean(errors[name])}
          errorMessage={errors[name] ? errors[name]?.message : ""}
          classNames={{
            ...classNames,
            input: `${classNames?.input || ""} ${errors[name] ? "placeholder:text-danger" : ""}`
          }}
        />
      )}
    />
  )
}

export default RHFInput