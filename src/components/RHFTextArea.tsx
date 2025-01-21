import React from "react";
import { Textarea, TextAreaProps } from "@heroui/react";
import { Controller, RegisterOptions, useFormContext } from "react-hook-form";

interface RHFTextAreaProps extends Omit<TextAreaProps, "errorMessage" | "isInvalid"> {
  name: string;
  rules?: RegisterOptions
}

const RHFTextArea = ({ defaultValue = "", rules, name, classNames, ...props }: RHFTextAreaProps) => {
  const { control } = useFormContext<{ [key: string]: string }>();

  return (
    <Controller
      control={control}
      defaultValue={defaultValue}
      name={name}
      rules={rules}
      render={({ field, formState: { errors } }) => (
        <Textarea
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

export default RHFTextArea
