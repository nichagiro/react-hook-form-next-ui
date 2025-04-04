import React, { useCallback, useMemo } from "react";
import { Select, SelectedItems, SelectItem, SelectItemProps, SelectProps, SharedSelection } from "@heroui/react"
import { Controller, RegisterOptions, useFormContext } from "react-hook-form"

interface RHFSelectProps extends Omit<SelectProps, "children" | "items" | "selectedKeys" | "errorMessage" | "isInvalid"> {
  name: string;
  rules?: RegisterOptions;
  data: SelectItemProps[];
  allOptions?: Omit<SelectItemProps, "key">;
  allSelectText?: string;
}

const RHFSelect = ({ name, data, rules, defaultSelectedKeys, disabledKeys, renderValue, allOptions, allSelectText, onSelectionChange, selectionMode, ...props }: RHFSelectProps) => {
  const { control, setValue } = useFormContext<{ [key: string]: string }>();

  const isMultiple = useMemo(() => selectionMode === "multiple", [selectionMode])

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
      const disableds = new Set(disabledKeys)
      const include = options.has("all")

      let items: SharedSelection = values

      if (include && isMultiple) {
        
        // indica que ya viene seleccionado todo entonces se deselecciona
        if (options.size - 1 === data.length) {
          setValue(name, "")
          items = new Set()
        }
        else {
          const dataOptions = data.filter(item => !disableds.has(item.key as string))
          const vals = dataOptions.map(x => x.key)
          setValue(name, vals.toString())
          items = new Set(vals as string[])
        }
      }

      onSelectionChange?.(items)

    }, 250)
  }, [data, name, onSelectionChange, setValue, disabledKeys, isMultiple])

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
          selectionMode={selectionMode}
          onSelectionChange={values => selectionChange(values)}
          isInvalid={Boolean(errors[name])}
          renderValue={renderValue ?? isMultiple ? RenderValue : undefined}
          disabledKeys={disabledKeys}
        >
          {item => <SelectItem {...item} key={item.key} />}
        </Select>
      )}
    />
  )
}

export default RHFSelect