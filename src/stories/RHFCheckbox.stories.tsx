import type { Meta, StoryObj } from '@storybook/react-vite';
import RHFCheckbox from '../components/RHFCheckbox';
import React from 'react';

const meta = {
  title: 'Form/Check/Checkbox',
  component: RHFCheckbox,
  tags: ['autodocs'],
} satisfies Meta<typeof RHFCheckbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Checkbox: Story = {
  args: {
    name: "checkField",
  },
  render: (args) =>
    <RHFCheckbox {...args}>
      CheckField
    </RHFCheckbox>
};
