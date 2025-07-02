import React from "react";
import type { Preview } from "@storybook/react-vite";
import "../src/styles/index.css"
import WrapperForm from "../src/stories/layouts/WrapperForm"

export const decorators = [
  Story => (
    <WrapperForm>
      <Story />
    </WrapperForm>
  ),
];

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
