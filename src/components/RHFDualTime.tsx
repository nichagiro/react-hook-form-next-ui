import { TimeInput, TimeInputProps, TimeInputValue } from "@nextui-org/react";
import { useEffect, useMemo } from "react";
import { Controller, RegisterOptions, useFormContext, useWatch } from "react-hook-form";

interface RHFTimeProps extends TimeInputProps {
  rules?: RegisterOptions;
  name: string;
}

interface RHFDualTimeProps {
  startTime: RHFTimeProps;
  endTime: RHFTimeProps;
}

const RHFDualTime = ({ startTime, endTime }: RHFDualTimeProps) => {
  const { control, trigger, getValues, formState } = useFormContext<{ [key: string]: TimeInputValue | null }>();

  const startName = useMemo(() => startTime.name, [startTime.name])
  const endName = useMemo(() => endTime.name, [endTime.name])

  const initTime = useWatch({ control, name: [startName] })
  const finishTime = useWatch({ control, name: [endName] })


  useEffect(() => {
    if (!formState.isSubmitted) return
    const values = getValues();

    if (values[startName] && values[endName]) {
      trigger([startName]);
      trigger([endName])
    }
  }, [finishTime, initTime, trigger, getValues, formState.isSubmitted, endName, startName])

  return (
    <>
      <Controller
        control={control}
        name={startName}
        rules={startTime.rules}
        defaultValue={startTime.defaultValue ?? null}
        render={({ field, formState: { errors } }) => (
          <TimeInput
            {...field}
            {...startTime}
            value={field.value}
            isInvalid={Boolean(errors[startName])}
            errorMessage={errors[startName] ? errors[startName]?.message : ""}
          />
        )}
      />
      <Controller
        control={control}
        name={endName}
        rules={endTime.rules}
        defaultValue={endTime.defaultValue ?? null}
        render={({ field, formState: { errors } }) => (
          <TimeInput
            {...field}
            {...endTime}
            value={field.value}
            isInvalid={Boolean(errors[endName])}
            errorMessage={errors[endName] ? errors[endName]?.message : ""}
          />
        )}
      />
    </>
  )
}

export default RHFDualTime