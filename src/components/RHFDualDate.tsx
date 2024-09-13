import { DatePicker, DatePickerProps, DateValue } from "@nextui-org/react"
import { useEffect, useMemo } from "react"
import { Controller, RegisterOptions, useFormContext, useWatch } from "react-hook-form"

interface RHFNextUiDate extends DatePickerProps {
  name: string
  rules?: RegisterOptions;
}

interface RHFDualDateProps {
  startDate: RHFNextUiDate;
  endDate: RHFNextUiDate;
}

const RHFDualDate = ({ startDate, endDate }: RHFDualDateProps) => {
  const { control, trigger, getValues, formState } = useFormContext<{ [key: string]: DateValue | null }>();
  
  const startName = useMemo(() => startDate.name, [startDate.name])
  const endName = useMemo(() => endDate.name, [endDate.name])

  const initDate = useWatch({ control, name: [startName] })
  const finishDate = useWatch({ control, name: [endName] })


  useEffect(() => {
    if (!formState.isSubmitted) return
    const values = getValues();

    if (values[startName] && values[endName]) {
      trigger([startName]);
      trigger([endName])
    }
  }, [finishDate, initDate, trigger, getValues, formState.isSubmitted, endName, startName])

  return (
    <>
      <Controller
        control={control}
        name={startName}
        rules={startDate.rules}
        defaultValue={startDate.defaultValue ?? null}
        render={({ field, formState: { errors } }) => (
          <DatePicker
            {...field}
            {...startDate}
            value={field.value}
            errorMessage={errors[startName] ? errors[startName]?.message : ""}
            isInvalid={Boolean(errors[startName])}
          />
        )}
      />
      <Controller
        control={control}
        name={endName}
        rules={endDate.rules}
        defaultValue={endDate.defaultValue ?? null}
        render={({ field, formState: { errors } }) => (
          <DatePicker
            {...field}
            {...endDate}
            value={field.value}
            errorMessage={errors[endName] ? errors[endName]?.message : ""}
            isInvalid={Boolean(errors[endName])}
          />
        )}
      />
    </>
  )
}

export default RHFDualDate