import React from "react";
import { Autocomplete, AutocompleteItem, AutocompleteItemProps, AutocompleteProps } from "@heroui/react"
import { Controller, RegisterOptions } from "react-hook-form";
interface RHFAutocompleteProps extends Omit<AutocompleteProps,
  "value" | "children" | "items" | "defaultSelectedKey" | "selectedKey" | "defaultItems" | "isInvalid" | "errorMessage"
> {
  name: string
  data: AutocompleteItemProps[]
  rules?: RegisterOptions
}

const RHFAutocomplete = ({ onSelectionChange, name, data, rules, inputProps, ...props }: RHFAutocompleteProps) => {
  return (
    <Controller
      defaultValue={""}
      name={name}
      rules={rules}
      render={({ field, formState: { errors } }) => (
        <Autocomplete
          {...field}
          {...props}
          selectedKey={field.value}
          defaultItems={data}
          onSelectionChange={e => { field.onChange(e ?? ""); onSelectionChange?.(e ?? "") }}
          onBlur={value => { field.onBlur(); props.onBlur?.(value) }}
          isInvalid={Boolean(errors[name])}
          errorMessage={errors[name] ? errors[name]?.message as string : ""}
          inputProps={{
            ...inputProps,
            classNames: {
              input: errors[name] ? "placeholder:text-danger" : "",
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