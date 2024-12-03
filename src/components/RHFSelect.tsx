import React, { useCallback, useMemo } from "react";
import { Select, SelectedItems, SelectItem, SelectItemProps, SelectProps, SharedSelection } from "@nextui-org/react"
import { Controller, RegisterOptions, useFormContext } from "react-hook-form"

interface RHFSelectProps extends Omit<SelectProps, "children"> {
  name: string;
  rules?: RegisterOptions;
  data: SelectItemProps[];
  allOptions?: Omit<SelectItemProps, "key">;
  allSelectText?: string;
}

const RHFSelect = ({ name, data, rules, defaultSelectedKeys, allOptions, allSelectText, onSelectionChange, ...props }: RHFSelectProps) => {
  const { control, setValue } = useFormContext<{ [key: string]: string }>();

  const isMultiple = useMemo(() => props.selectionMode === "multiple", [props.selectionMode])

  const dataSelect = useMemo(
    () => allOptions && isMultiple ? ([
      {
        key: "all",
        children: allOptions.children,
        textValue: allOptions.textValue
      },
      ...data]) : data,
    [data, allOptions, isMultiple]
  )

  const selectionChange = useCallback((values: SharedSelection) => {
    setTimeout(() => {
      const options = new Set(values)
      const include = options.has("all")
      let items: SharedSelection = values

      if (include) {
        if (options.size === data.length + 1) {
          setValue(name, "")
          items = new Set()
        }
        else {
          setValue(name, data.map(item => item.key).filter(item => item !== "all").toString())
          items = "all"
        }

      }

      const returnValue = data.length === options.size ? "all" : items
      onSelectionChange?.(returnValue)

    }, 250)
  }, [data, name, onSelectionChange, setValue])

  const RenderValue = useCallback((items: SelectedItems) => (
    <span>
      {
        items.length >= data.length
          ? allSelectText ?? "Todas las opciones"
          : items.filter(opt => opt.key !== "all").map(item => item.textValue).join(", ")
      }
    </span>
  ), [allSelectText, data])

  return (
    <Controller
      control={control}
      rules={rules}
      name={name}
      defaultValue={defaultSelectedKeys?.toString() ?? undefined}
      render={({ field, formState: { errors } }) => (
        <Select
          {...props}
          {...field}
          items={dataSelect}
          selectedKeys={
            field.value ? field.value.split(",") : []
          }
          errorMessage={errors[name]?.message || ""}
          onSelectionChange={values => selectionChange(values)}
          isInvalid={Boolean(errors[name])}
          renderValue={isMultiple ? RenderValue : undefined}
        >
          {item => <SelectItem {...item} key={item.key} />}
        </Select>
      )}
    />
  )
}

export default RHFSelect