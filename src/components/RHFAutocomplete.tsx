import React from "react";
import { Autocomplete, AutocompleteItem, AutocompleteItemProps, AutocompleteProps } from "@nextui-org/react"
import { Controller, RegisterOptions, useFormContext } from "react-hook-form";
interface RHFAutocompleteProps extends Omit<AutocompleteProps, "children"> {
  name: string;
  rules?: RegisterOptions;
  data: AutocompleteItemProps[];
}

const RHFAutocomplete = ({ onSelectionChange, defaultSelectedKey, name, data, rules, ...props }: RHFAutocompleteProps) => {
  const { control } = useFormContext<{ [key: string]: string | number }>();

  const onChange = (e: string | number | null) => {
    if (onSelectionChange) {
      onSelectionChange(e)
    }
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
          isInvalid={Boolean(errors[name])}
          errorMessage={errors[name] ? errors[name]?.message : ""}
          inputProps={{
            classNames: {
              input: errors[name] ? "placeholder:text-danger" : ""
            }
          }}
        >
          {data.map((item) => <AutocompleteItem {...item} key={item.key} />)}
        </Autocomplete>
      )}
    />
  )
}

export default RHFAutocomplete