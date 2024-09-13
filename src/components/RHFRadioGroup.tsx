import { Controller, RegisterOptions, useFormContext } from "react-hook-form";
import { RadioGroup, Radio, RadioGroupProps, RadioProps } from "@nextui-org/react";

interface RHFRadioGroupDataProps {
  key: string;
  label: string
}

interface RHFRadioGroupProps {
  radio?: RadioProps;
  radioGroup?: RadioGroupProps;
  data: RHFRadioGroupDataProps[];
  rules?: RegisterOptions;
  name: string;
  defaultValue?: string;
}

const RHFRadioGroup = ({ radio, radioGroup, data, rules, name, defaultValue }: RHFRadioGroupProps) => {
  const { control } = useFormContext<{ [key: string]: string }>();

  return (
    <Controller
      control={control}
      rules={rules}
      name={name}
      defaultValue={defaultValue ?? ""}
      render={({ field, formState: { errors } }) => (
        <RadioGroup
          {...radioGroup}
          {...field}
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



