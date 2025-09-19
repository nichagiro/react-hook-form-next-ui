# Configure your project

This library is based on NextUI and React-hook-form. Here you will find form components where we combine these two libraries for easier and faster use. There is also refactoring of components (currently modal and table) for faster and more complete use of all functions.


## Demo
[Storybook - Demo](https://storybook-rhfnextui.web.app)

## Install the library

```bash
npm i rhf-hero-ui
```

## Tailwind config
```js
// main.css 
@import "tailwindcss"; // v4
@source '../node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}';
```

## Example 

```js
import { FormProvider, SubmitHandler, useForm } from "react-hook-form"
import { Button } from "@heroui/react";
import RHFInput from "../components/RHFInput";
import { IForm } from "../types/app";

const App = () => {
  const methods = useForm<IForm>();

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
