/* eslint-disable @typescript-eslint/no-explicit-any */
import { FormProvider, SubmitHandler, useForm } from "react-hook-form"
import React, { ReactNode } from "react";

const WrapperForm = ({ children }: { children: ReactNode }) => {
  const methods = useForm<any>({
    mode: "onTouched"
  });

  const onSubmit: SubmitHandler<any> = async data => {
    console.log("🚀 ~ Event ~ data:", data)
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        {children}
      </form>
    </FormProvider>
  )
}

export default WrapperForm