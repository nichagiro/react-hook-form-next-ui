import { TimeInput, TimeInputProps, TimeInputValue } from "@nextui-org/react";
import { Controller, RegisterOptions, useFormContext } from "react-hook-form";
interface RHFTimeProps extends TimeInputProps {
  name: string;
  rules?: RegisterOptions;
}

const RHFTime = ({ name, rules, defaultValue, ...props }: RHFTimeProps) => {
  const { control } = useFormContext<{ [key: string]: TimeInputValue | null }>();

  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      defaultValue={defaultValue ?? null}
      render={({ field, formState: { errors } }) => (
        <TimeInput
          {...field}
          {...props}
          value={field.value}
          isInvalid={Boolean(errors[name])}
          errorMessage={errors[name] ? errors[name]?.message : ""}
        />
      )}
    />
  )
}

export default RHFTime