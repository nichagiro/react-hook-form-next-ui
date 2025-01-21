import React from "react";
import { Controller, RegisterOptions, useFormContext } from "react-hook-form";
import { RadioGroup, Radio, RadioGroupProps, RadioProps } from "@heroui/react";
interface RHFRadioGroupProps extends Omit<RadioGroupProps, "isInvalid" | "errorMessage"> {
  rules?: RegisterOptions;
  data: RadioProps[];
  name: string;
}

const RHFRadioGroup = ({ data, rules, name, defaultValue, ...props }: RHFRadioGroupProps) => {
  const { control } = useFormContext<{ [key: string]: string }>();

  return (
    <Controller
      control={control}
      rules={rules}
      name={name}
      defaultValue={defaultValue ?? ""}
      render={({ field, formState: { errors } }) => (
        <RadioGroup
          {...field}
          {...props}
          isInvalid={Boolean(errors[name])}
          errorMessage={errors[name] ? errors[name]?.message : ""}
        >
          {data.map((item, index) => <Radio {...item} key={index} />)}
        </RadioGroup>
      )}
    />
  )

}

export default RHFRadioGroup



