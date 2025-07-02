import React from "react";
import { Autocomplete, AutocompleteItem, AutocompleteItemProps, AutocompleteProps } from "@heroui/react"
import { Controller, RegisterOptions, useFormContext } from "react-hook-form";
interface RHFAutocompleteProps extends Omit<AutocompleteProps, "children" | "defaultItems" | "items" | "selectedKey" | "isInvalid" | "errorMessage"> {
  name: string;
  rules?: RegisterOptions;
  data: AutocompleteItemProps[];
}

const RHFAutocomplete = ({ onSelectionChange, defaultSelectedKey, name, data, rules, inputProps, ...props }: RHFAutocompleteProps) => {
  const { control } = useFormContext<{ [key: string]: string | number }>();

  const onChange = (e: string | number | null) => {
    if (onSelectionChange) onSelectionChange(e)
  }

  return (
    <Controller
      control={control}
      defaultValue={defaultSelectedKey}
      name={name}
      rules={rules}
      render={({ field, formState: { errors } }) => (
        <Autocomplete
          {...props}
          {...field}
          selectedKey={field.value ?? ""}
          defaultItems={data}
          onSelectionChange={e => { field.onChange(e); onChange(e) }}
          onBlur={(value) => { field.onBlur(); props.onBlur?.(value) }}
          isInvalid={Boolean(errors[name])}
          errorMessage={errors[name] ? errors[name]?.message : ""}
          inputProps={{
            ...inputProps,
            classNames: {
              input: errors[name] ? "placeholder:text-danger" : ""
            }
          }}
        >
          {data.map(item => <AutocompleteItem {...item} key={item.key} />)}
        </Autocomplete>
      )}
    />
  )
}

export default RHFAutocomplete