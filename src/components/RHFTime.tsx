import { TimeInput, TimeInputProps, TimeInputValue } from "@nextui-org/react";
import { Controller, useFormContext } from "react-hook-form";

interface Props extends TimeInputProps {
  name: string;
}

const RHFTime = (props: Props) => {
  const { control } = useFormContext<{ [key: string]: TimeInputValue }>();

  return (
    <Controller
      control={control}
      name={props.name}
      render={({ field, formState: { errors } }) => (
        <TimeInput
          {...field}
          {...props}          
          value={field.value ?? null}
          isInvalid={Boolean(errors[props.name])}
          errorMessage={errors[props.name] ? errors[props.name]?.message : ""}
        />
      )}
    />
  )
}

export default RHFTime