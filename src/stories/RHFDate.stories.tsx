import type { Meta, StoryObj } from '@storybook/react-vite';
import RHFDate from '../components/RHFDate';

const meta = {
  title: 'Form/Date/Calendar',
  component: RHFDate,
  tags: ['autodocs'],
  argTypes: {
    defaultValue: { description : "value: @internationalized/date"}
  },
} satisfies Meta<typeof RHFDate>;

export default meta;
type Story = StoryObj<typeof meta>;


export const Date: Story = {
  args: {
    name: "DateField",
    label: "DateField",
  },
};
