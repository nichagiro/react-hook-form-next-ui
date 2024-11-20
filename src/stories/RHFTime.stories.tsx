import type { Meta, StoryObj } from '@storybook/react';
import RHFTime from '../components/RHFTime';

const meta = {
  title: 'Form/Time/Time',
  component: RHFTime,
  tags: ['autodocs'],
  argTypes: {
    defaultValue: { description: "@internationalized/time", type: "string" }
  },
} satisfies Meta<typeof RHFTime>;

export default meta;
type Story = StoryObj<typeof meta>;


export const Time: Story = {
  args: {
    name: "timeField",
    label: "timeField"
  },
};
