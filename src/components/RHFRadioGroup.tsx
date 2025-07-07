import React from "react";
import { Controller, RegisterOptions } from "react-hook-form";
import { RadioGroup, Radio, RadioGroupProps, RadioProps } from "@heroui/react";
interface RHFRadioGroupProps extends Omit<RadioGroupProps, "value" | "defaultValue" | "isInvalid" | "errorMessage"> {
  rules?: RegisterOptions;
  data: RadioProps[];
  name: string;
}

const RHFRadioGroup = ({ data, rules, name, ...props }: RHFRadioGroupProps) => {
  return (
    <Controller
      rules={rules}
      name={name}
      defaultValue={""}
      render={({ field, formState: { errors } }) => (
        <RadioGroup
          {...field}
          {...props}
          onChange={(value) => { field.onChange(value); props.onChange?.(value) }}
          isInvalid={Boolean(errors[name])}
          errorMessage={errors[name] ? errors[name]?.message as string : ""}
        >
          {data.map((item, index) => <Radio {...item} key={index} />)}
        </RadioGroup>
      )}
    />
  )

}

export default RHFRadioGroup



