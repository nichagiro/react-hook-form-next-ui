import { Input, InputProps } from "@nextui-org/react";
import { Controller, useFormContext } from "react-hook-form";

interface Props extends InputProps {
  name: string;
}

const RHFInput = (props: Props) => {
  const { control } = useFormContext<{ [key: string]: string }>();

  return (
    <Controller
      control={control}
      name={props.name}
      defaultValue={props.defaultValue ?? ""}
      render={({ field, formState: { errors } }) => (
        <Input
          {...field}
          {...props}
          onValueChange={field.onChange}
          isInvalid={Boolean(errors[props.name])}
          errorMessage={errors[props.name] ? errors[props.name]?.message : ""}
          classNames={{
            input: errors[props.name] ? "placeholder:text-red-500" : ""
          }}
        />
      )}
    />
  )
}

export default RHFInput