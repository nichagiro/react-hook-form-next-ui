import { Controller, RegisterOptions, useFormContext } from "react-hook-form";
import { RadioGroup, Radio, RadioGroupProps, RadioProps } from "@nextui-org/react";
import { useMemo } from "react";

interface RHFRadioGroupDataProps {
  key: string;
  label: string
}

interface RHFRadioGroupProps {
  radio?: RadioProps;
  radioGroup: RadioGroupProps;
  data: RHFRadioGroupDataProps[];
  rules?: RegisterOptions;
}

const RHFRadioGroup = ({ radio, radioGroup, data, rules }: RHFRadioGroupProps) => {
  const { control } = useFormContext<{ [key: string]: string }>();
  const name = useMemo(() => radioGroup.name ?? "radioGroup", [radioGroup.name])

  return (
    <Controller
      control={control}
      rules={rules}
      name={name}
      defaultValue={radioGroup.defaultValue ?? ""}
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



