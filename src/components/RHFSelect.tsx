import React from "react";
import { Select, SelectItem, SelectItemProps, SelectProps } from "@nextui-org/react"
import { Controller, RegisterOptions, useFormContext } from "react-hook-form"

interface RHFSelectProps extends Omit<SelectProps, "children"> {
  name: string;
  rules?: RegisterOptions;
  data: SelectItemProps[];
}

const RHFSelect = ({ name, data, rules, defaultSelectedKeys, ...props }: RHFSelectProps) => {
  const { control } = useFormContext<{ [key: string]: string }>();

  return (
    <Controller
      control={control}
      rules={rules}
      name={name}
      defaultValue={defaultSelectedKeys?.toString() ?? undefined}
      render={({ field, formState: { errors } }) => (
        <Select
          {...props}
          {...field}
          items={data}
          selectedKeys={
            field.value == "all"
              ? data.map(items => items.key)
              : field.value ? field.value.split(",") : []
          }
          errorMessage={errors[name]?.message || ""}
          isInvalid={Boolean(errors[name])}
        >
          {item => <SelectItem {...item} key={item.key} />}
        </Select>
      )}
    />
  )
}

export default RHFSelect