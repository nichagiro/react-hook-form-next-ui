import React from "react";
import { InputOtp, InputOtpProps } from "@heroui/react";
import { Controller, RegisterOptions } from "react-hook-form";

interface RHFInputProps extends Omit<InputOtpProps, "value" | "defaultValue" | "errorMessage" | "isInvalid"> {
  name: string
  rules?: RegisterOptions
}

const RHFInputOtp = ({ rules, name, classNames, ...props }: RHFInputProps) => {
  return (
    <Controller
      defaultValue={""}
      name={name}
      rules={rules}
      render={({ field, formState: { errors } }) => (
        <InputOtp
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

export default RHFInputOtp