import type { Meta, StoryObj } from '@storybook/react';
import RHFInput from '../components/RHFInput';

const meta = {
  title: 'Form/Text/Input',
  component: RHFInput,
  tags: ['autodocs'],
} satisfies Meta<typeof RHFInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Input: Story = {
  args: {
    name: "inputField",
    label: "inputField",
    defaultValue: "User-1547"
  },
};
