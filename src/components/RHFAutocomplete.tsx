import React from "react";
import { Autocomplete, AutocompleteItem, AutocompleteProps } from "@nextui-org/react"
import { Controller, RegisterOptions, useFormContext } from "react-hook-form";

interface DataOptionsRHFAutocomplete {
  key: string,
  label: string
}

interface RHFAutocompleteProps extends Omit<AutocompleteProps, "children"> {
  name: string;
  rules?: RegisterOptions;
  data: DataOptionsRHFAutocomplete[];
  defaultValue?: string
}

const RHFAutocomplete = ({ onSelectionChange, defaultValue, name, data, rules, ...props }: RHFAutocompleteProps) => {
  const { control } = useFormContext<{ [key: string]: string }>();

  const onChange = (e: string | number | null) => {
    if (onSelectionChange) {
      onSelectionChange(e)
    }
  }

  return (
    <Controller
      control={control}
      defaultValue={defaultValue}
      name={name}
      rules={rules}
      render={({ field, formState: { errors } }) => (
        <Autocomplete
          {...props}
          {...field}
          selectedKey={field.value ?? ""}
          defaultItems={data}
          onSelectionChange={e => { field.onChange(e); onChange(e) }}
          isInvalid={Boolean(errors[name])}
          errorMessage={errors[name] ? errors[name]?.message : ""}
          inputProps={{
            classNames: {
              input: errors[name] ? "placeholder:text-danger" : ""
            }
          }}
        >
          {
            data.map((item) => (
              <AutocompleteItem key={item.key} value={item.key}>
                {item.label}
              </AutocompleteItem>
            ))
          }
        </Autocomplete>
      )}
    />
  )
}

export default RHFAutocomplete