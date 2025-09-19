import React from "react";
import type { Preview } from "@storybook/react-vite";
import "../src/index.css"
import WrapperForm from "../src/stories/layouts/WrapperForm"

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [
    (Story) => (
      <WrapperForm>
        <Story />
      </WrapperForm>
    ),
  ]
};

export default preview;
