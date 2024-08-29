import { Textarea, TextAreaProps } from "@nextui-org/react";
import { Controller, RegisterOptions, useFormContext } from "react-hook-form";

interface RHFTextAreaProps extends TextAreaProps {
  name: string;
  rules?: RegisterOptions
}

const RHFTextArea = ({ defaultValue = "", rules, name, ...props }: RHFTextAreaProps) => {
  const { control } = useFormContext<{ [key: string]: string }>();

  return (
    <Controller
      control={control}
      defaultValue={defaultValue}
      name={name}
      rules={rules}
      render={({ field, formState: { errors } }) => (
        <Textarea
          {...field}
          {...props}
          isInvalid={Boolean(errors[name])}
          errorMessage={errors[name] ? errors[name]?.message : ""}
          classNames={{
            input: errors[name] ? "placeholder:text-danger" : ""
          }}
        />
      )}
    />
  )
}

export default RHFTextArea
