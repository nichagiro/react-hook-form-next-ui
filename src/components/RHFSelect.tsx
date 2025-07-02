import React from "react";
import { Select, SelectItem, SelectItemProps, SelectProps } from "@heroui/react"
import { Controller, RegisterOptions, useFormContext } from "react-hook-form"

interface RHFSelectProps extends Omit<SelectProps, "children" | "items" | "selectedKeys" | "errorMessage" | "isInvalid"> {
  name: string;
  rules?: RegisterOptions;
  data: SelectItemProps[]; // items[]
}

const RHFSelect = ({ name, rules, data, defaultSelectedKeys, disabledKeys, ...props }: RHFSelectProps) => {
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
          selectedKeys={field.value ? field.value.split(",") : []}
          errorMessage={errors[name]?.message || ""}
          isInvalid={Boolean(errors[name])}
          disabledKeys={disabledKeys}
        >
          {item => <SelectItem {...item} key={item.key} />}
        </Select>
      )}
    />
  )
}

export default RHFSelect