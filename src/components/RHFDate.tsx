import { CalendarDate, DatePicker, DatePickerProps } from "@nextui-org/react";
import { Controller, useFormContext } from "react-hook-form";

interface Props extends DatePickerProps {
  name: string;
}

const RHFDate = (props: Props) => {
  const { control } = useFormContext<{ [key: string]: CalendarDate }>();

  return (
    <Controller
      control={control}
      name={props.name}
      render={({ field, formState: { errors } }) => (
        <DatePicker
          {...field}
          {...props}
          value={field.value ?? null}
          errorMessage={errors[props.name] ? errors[props.name]?.message : ""}
          isInvalid={Boolean(errors[props.name])}
        />
      )}
    />
  )
}

export default RHFDate