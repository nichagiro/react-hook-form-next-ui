# Configure your project

This library is based on NextUI and React-hook-form. Here you will find form components where we combine these two libraries for easier and faster use. There is also refactoring of components (currently modal and table) for faster and more complete use of all functions.


## Demo
[Storybook - Demo](https://storybook-rhfnextui.web.app)

## Install the library

```bash
npm i react-hook-form-next-ui
```

## Update tailwind file *(tailwind.config.js)*


It is important to import the styles from NextUI and this library.

```js
//tailwind.config.js
import { heroui } from "@heroui/react";

export default {
  content: [
    "./node_modules/react-hook-form-next-ui/dist/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    heroui()
  ]
}
```

## Example 

```js
import { FormProvider, SubmitHandler, useForm } from "react-hook-form"
import { Button } from "@heroui/react";
import RHFInput from "../components/RHFInput";
import schema from "../static/schema";
import { yupResolver } from "@hookform/resolvers/yup";
import { IForm } from "../types/app";

const App = () => {
  const methods = useForm<IForm>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<IForm> = async data => {
    console.log("🚀 ~ Event ~ data:", data)
  }

  return (
    <FormProvider {...methods}>
      <Panel title="Contact Form" collapse>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <RHFInput name="user" label="User Name" color="primary" />
          <Button type="submit">Submit</Button>
        </form>
      </Panel>
    </FormProvider>
  )
}
```

# Yup Schema Helpers (Helper)

This documentation provides an overview of custom helpers for validating dates and times, as well as their integration with `yup`.

## Summary

This set of utilities includes:

- **`dateMinMaxValidate`**: Validates a date within a minimum and maximum range.
- **`dualDateValidate`**: Generates rules to validate date pairs (start and end) with range restrictions.
- **`dualTimeValidate`**: Validates time pairs (start and end) with range restrictions.

## Example

```js
import * as yup  from "yup";
import { dateMinMaxValidate, dualDateValidate, dualTimeValidate } from "../helpers/yup/dates";

const { endDateRule, startDateRule } = dualDateValidate({
  startDate: "date1",
  endDate: "date2",
  range: 2,
  type: "months",
  maxEndDate: "2024-09-28",
  minEndDate: "2024-09-01",
  maxStartDate: "2024-09-28",
  minStartDate: "2024-09-01"
});

const { endTimeRule, startTimeRule } = dualTimeValidate({
  endTime: "dualtime2",
  startTime: "dualtime1",
  range: 1,
  type: "hours",
})

const rangeValue = dateMinMaxValidate({
  maxDate: "2024-09-05",
  minDate: "2024-09-02"
})

const schema = yup
  .object({
    date: rangeValue.required(),
    date1: startDateRule.required(),
    date2: endDateRule.required(),
    dualtime1: startTimeRule.required(),
    dualtime2: endTimeRule.required(),
  }).required();

export default schema
```

