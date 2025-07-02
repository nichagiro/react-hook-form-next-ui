import React from "react";
import { Controller, RegisterOptions, useFormContext } from "react-hook-form";
import { Checkbox, CheckboxGroup, CheckboxGroupProps, CheckboxProps } from "@heroui/react";

interface RHFCheckboxProps extends Omit<CheckboxGroupProps, "children" | "isInvalid"> {
  rules?: RegisterOptions;
  name: string;
  data: CheckboxProps[]
}

const RHFCheckboxGroup = ({ defaultValue, rules, name, data, ...props }: RHFCheckboxProps) => {
  const { control } = useFormContext<{ [key: string]: string[] }>();

  return (
    <Controller
      control={control}
      rules={rules}
      name={name}
      defaultValue={defaultValue ?? []}
      render={({ field, formState: { errors } }) => (
        <CheckboxGroup
          {...field}
          {...props}
          isInvalid={Boolean(errors[name])}
          onChange={(value) => { field.onChange(value); props.onChange?.(value) }}
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
              {errors[name]?.message ?? ""}
            </div>
          }
        </CheckboxGroup>
      )}
    />
  )

}

export default RHFCheckboxGroup


