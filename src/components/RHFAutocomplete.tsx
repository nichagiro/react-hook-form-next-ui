import { Autocomplete, AutocompleteItem, InputProps } from "@nextui-org/react"
import { Controller, RegisterOptions, useFormContext } from "react-hook-form";

interface DataOptionsRHFAutocomplete {
  key: string,
  label: string
}

interface RHFAutocompleteProps extends Omit<InputProps, "validate"> {
  name: string;
  rules?: RegisterOptions;
  data: DataOptionsRHFAutocomplete[];
}

const RHFAutocomplete = ({ defaultValue, name, data, rules, ...props }: RHFAutocompleteProps) => {
  const { control } = useFormContext<{ [key: string]: string }>();

  return (
    <Controller
      control={control}
      defaultValue={defaultValue}
      name={name}
      rules={rules}
      render={({ field, formState: { errors } }) => (
        <Autocomplete
          {...field}
          {...props}
          selectedKey={field.value ?? ""}
          defaultItems={data}
          onSelectionChange={field.onChange}
          isInvalid={Boolean(errors[name])}
          errorMessage={errors[name] ? errors[name]?.message : ""}
          inputProps={{
            classNames: {
              input: errors[name] ? "placeholder:text-danger" : ""
            }
          }}
        >
          {(item) => <AutocompleteItem key={item.key}>{item.label}</AutocompleteItem>}
        </Autocomplete>
      )
      }
    />
  )
}

export default RHFAutocomplete