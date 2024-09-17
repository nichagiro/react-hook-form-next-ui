import React from "react";
import { Controller, RegisterOptions, useFormContext } from "react-hook-form";
import { RadioGroup, Radio, RadioGroupProps, RadioProps } from "@nextui-org/react";

interface RHFRadioGroupDataProps {
  key: string;
  label: string
}

interface RHFRadioGroupProps extends RadioGroupProps {
  rules?: RegisterOptions;
  radio?: RadioProps;
  data: RHFRadioGroupDataProps[];
  name: string;
}

const RHFRadioGroup = ({ radio, data, rules, name, defaultValue, ...props }: RHFRadioGroupProps) => {
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
          {data.map((item, index) => (
            <Radio
              {...radio}
              key={index}
              value={item.key}
            >
              {item.label}
            </Radio>
          ))}
        </RadioGroup>
      )}
    />
  )

}

export default RHFRadioGroup



