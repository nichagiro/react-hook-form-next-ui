import React from "react";
import { Controller, RegisterOptions } from "react-hook-form";
import { Checkbox, CheckboxProps } from "@heroui/react";

interface RHFCheckboxProps extends Omit<CheckboxProps, "value" | "isSelected" | "isInvalid" | "onChange" | "defaultSelected"> {
  name: string
  rules?: RegisterOptions
}

const RHFCheckbox = ({ rules, name, ...props }: RHFCheckboxProps) => {
  return (
    <Controller
      rules={rules}
      name={name}
      render={({ field, formState: { errors } }) => (
        <Checkbox
          {...props}
          {...field}
          isSelected={Boolean(field.value)}
          isInvalid={Boolean(errors[name])}
        >
          {props.children}
        </Checkbox>
      )}
    />
  )

}

export default RHFCheckbox



