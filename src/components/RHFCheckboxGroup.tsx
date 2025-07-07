import React from "react";
import { Controller, RegisterOptions } from "react-hook-form";
import { Checkbox, CheckboxGroup, CheckboxGroupProps, CheckboxProps } from "@heroui/react";

interface RHFCheckboxProps extends Omit<CheckboxGroupProps, "defaultSelected" | "value" | "children" | "isInvalid" | "defaultValue"> {
  rules?: RegisterOptions
  name: string
  data: CheckboxProps[]
}

const RHFCheckboxGroup = ({ onChange, rules, name, data, ...props }: RHFCheckboxProps) => {
  return (
    <Controller
      rules={rules}
      name={name}
      defaultValue={[]}
      render={({ field, formState: { errors } }) => (
        <CheckboxGroup
          {...props}
          {...field}
          isInvalid={Boolean(errors[name])}
          onChange={(value) => { field.onChange(value); onChange?.(value) }}
        >
          {
            data.map(item => (
              <Checkbox {...item} key={item.value}>
                {item.children}
              </Checkbox>
            ))
          }
          {
            Boolean(errors[name]) &&
            <div data-slot="error-message" className="text-tiny text-danger w-full">
              {errors[name]?.message as string ?? ""}
            </div>
          }
        </CheckboxGroup>
      )}
    />
  )

}

export default RHFCheckboxGroup


