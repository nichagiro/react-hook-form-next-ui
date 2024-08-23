import { DatePicker, DatePickerProps, DateValue } from "@nextui-org/react"
import { useEffect } from "react"
import { Controller, RegisterOptions, useFormContext, useWatch } from "react-hook-form"

interface Date extends DatePickerProps {
  name: string
  rules?: RegisterOptions;
}

interface RHFDualDateProps {
  startDate: Date;
  endDate: Date;
}

const RHFDualDate = ({ startDate, endDate }: RHFDualDateProps) => {
  const { control, trigger, getValues, formState } = useFormContext<{ [key: string]: DateValue | null }>();
  const initDate = useWatch({ control, name: [endDate.name] })
  const finishDate = useWatch({ control, name: [startDate.name] })

  useEffect(() => {
    if (Object.keys(formState.errors).length === 0) return
    const { initDate, finishDate } = getValues();

    if (initDate && finishDate) {
      trigger([startDate.name]);
      trigger([endDate.name])
    }
  }, [finishDate, initDate, trigger, getValues, formState.errors, endDate.name, startDate.name])

  return (
    <>
      <Controller
        control={control}
        name={startDate.name}
        rules={startDate.rules}
        defaultValue={startDate.defaultValue ?? null}
        render={({ field, formState: { errors } }) => (
          <DatePicker
            {...field}
            {...startDate}
            value={field.value}
            errorMessage={errors[startDate.name] ? errors[startDate.name]?.message : ""}
            isInvalid={Boolean(errors[startDate.name])}
          />
        )}
      />
      <Controller
        control={control}
        name={endDate.name}
        rules={endDate.rules}
        defaultValue={endDate.defaultValue ?? null}
        render={({ field, formState: { errors } }) => (
          <DatePicker
            {...field}
            {...endDate}
            value={field.value}
            errorMessage={errors[endDate.name] ? errors[endDate.name]?.message : ""}
            isInvalid={Boolean(errors[endDate.name])}
          />
        )}
      />
    </>
  )
}

export default RHFDualDate