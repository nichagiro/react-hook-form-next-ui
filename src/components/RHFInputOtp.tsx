import React from "react";
import {  InputOtp, InputOtpProps } from "@heroui/react";
import { Controller, RegisterOptions, useFormContext } from "react-hook-form";

interface RHFInputProps extends Omit<InputOtpProps, "errorMessage" | "isInvalid"> {
  name: string;
  rules?: RegisterOptions
}

const RHFInputOtp = ({ defaultValue = "", rules, name, classNames, ...props }: RHFInputProps) => {
  const { control } = useFormContext<{ [key: string]: string }>();

  return (
    <Controller
      control={control}
      defaultValue={defaultValue}
      name={name}
      rules={rules}
      render={({ field, formState: { errors } }) => (
        <InputOtp
          {...props}
          {...field}
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

export default RHFInputOtp