import React from "react";
import {  InputOtp, InputOtpProps } from "@nextui-org/react";
import { Controller, RegisterOptions, useFormContext } from "react-hook-form";

interface RHFInputProps extends InputOtpProps {
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