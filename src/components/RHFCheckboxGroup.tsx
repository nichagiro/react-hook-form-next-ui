import React from "react";
import { Controller, RegisterOptions, useFormContext } from "react-hook-form";
import { Checkbox, CheckboxGroup, CheckboxGroupProps, CheckboxProps } from "@nextui-org/react";

interface RHFCheckboxProps extends CheckboxGroupProps {
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
              {errors[name] ? errors[name]?.message : ""}
            </div>
          }
        </CheckboxGroup>
      )}
    />
  )

}

export default RHFCheckboxGroup


