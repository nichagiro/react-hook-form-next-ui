import React from "react";
import { Textarea, TextAreaProps } from "@heroui/react";
import { Controller, RegisterOptions } from "react-hook-form";

interface RHFTextAreaProps extends Omit<TextAreaProps, "errorMessage" | "isInvalid" | "defaultValue" | "value"> {
  name: string
  rules?: RegisterOptions
}

const RHFTextArea = ({ rules, name, classNames, ...props }: RHFTextAreaProps) => {
  return (
    <Controller
      defaultValue={""}
      name={name}
      rules={rules}
      render={({ field, formState: { errors } }) => (
        <Textarea
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

export default RHFTextArea
