import React from "react";
import { Select, SelectItem, SelectItemProps, SelectProps } from "@heroui/react"
import { Controller, RegisterOptions } from "react-hook-form"
interface RHFSelectProps extends Omit<SelectProps, "defaultSelectedKeys" | "children" | "items" | "selectedKeys" | "errorMessage" | "isInvalid"> {
  name: string;
  rules?: RegisterOptions;
  data: SelectItemProps[]; // items[]
}

const RHFSelect = ({ selectionMode, name, rules, data, disabledKeys, onChange, ...props }: RHFSelectProps) => {
  return (
    <Controller
      rules={rules}
      name={name}
      defaultValue={selectionMode === "multiple" ? [] : ""}
      render={({ field, formState: { errors } }) => (
        <Select
          {...props}
          {...field}
          onChange={e => {
            const value = e.target.value;
            if (selectionMode === "multiple") {
              field.onChange(value ? value.split(",") : []);
            } else {
              field.onChange(value ?? "");
            }
            onChange?.(e)
          }}
          items={data}
          selectedKeys={selectionMode === "multiple" ? field.value : [field.value]}
          errorMessage={errors[name]?.message as string || ""}
          isInvalid={Boolean(errors[name])}
          disabledKeys={disabledKeys}
          selectionMode={selectionMode}
        >
          {item => <SelectItem {...item} key={item.key} />}
        </Select>
      )}
    />
  )
}

export default RHFSelect