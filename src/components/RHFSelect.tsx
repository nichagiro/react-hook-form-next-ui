import React from "react";
import { Select, SelectItem } from "@nextui-org/react"
import { Controller, useFormContext } from "react-hook-form"
import { RHFSelectProps } from "../types/global";

const RHFSelect = ({ name, data, rules, defaultOptions = "", ...props }: RHFSelectProps) => {
  const { control } = useFormContext<{ [key: string]: string }>();

  return (
    <Controller
      control={control}
      rules={rules}
      name={name}
      defaultValue={defaultOptions}
      render={({ field, formState: { errors } }) => (
        <Select
          {...props}
          {...field}
          items={data}
          selectedKeys={new Set(field.value ? field.value.split(",") : [])}
          errorMessage={errors[name] ? errors[name]?.message : ""}
          isInvalid={Boolean(errors[name])}
        >
          {item => <SelectItem key={item.key}>{item.label}</SelectItem>}
        </Select>
      )}
    />
  )
}

export default RHFSelect