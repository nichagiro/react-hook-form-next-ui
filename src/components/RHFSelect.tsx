import { Select, SelectItem, SelectProps } from "@nextui-org/react"
import { Controller, useFormContext } from "react-hook-form"

interface Data {
  id: string | number,
  name: string
}

interface Props extends Omit<SelectProps, "children"> {
  data: Data[];
  name: string;
}

const RHFSelect = (props: Props) => {
  const { control } = useFormContext<{ [key: string]: string }>();

  return (
    <Controller
      control={control}
      name={props.name}
      render={({ field, formState: { errors } }) => (
        <Select
          {...field}
          {...props}
          items={props.data}
          selectedKeys={field.value ? [field.value] : []}
          errorMessage={errors[props.name] ? errors[props.name]?.message : ""}
          isInvalid={Boolean(errors[props.name])}
        >
          {item => <SelectItem key={item.id}>{item.name}</SelectItem>}
        </Select>
      )}
    />
  )
}

export default RHFSelect