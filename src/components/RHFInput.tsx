import React from "react";
import { Input, InputProps } from "@heroui/react";
import { Controller, RegisterOptions } from "react-hook-form";

interface RHFInputProps extends Omit<InputProps, "value" | "defaultValue" | "errorMessage" | "isInvalid"> {
  name: string
  rules?: RegisterOptions
}

const RHFInput = ({ rules, name, classNames, ...props }: RHFInputProps) => {
  return (
    <Controller
      name={name}
      rules={rules}
      defaultValue={""}
      render={({ field, formState: { errors } }) => (
        <Input
          {...props}
          {...field}
          onChange={(value) => { field.onChange(value); props.onChange?.(value) }}
          isInvalid={Boolean(errors[name])}
          errorMessage={errors[name] ? errors[name]?.message as string : ""}
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