import type { Meta, StoryObj } from '@storybook/react-vite';
import RHFTime from '../components/RHFTime';

const meta = {
  title: 'Form/Date/Time',
  component: RHFTime,
  tags: ['autodocs'],
} satisfies Meta<typeof RHFTime>;

export default meta;
type Story = StoryObj<typeof meta>;


export const Time: Story = {
  args: {
    name: "timeField",
    label: "timeField"
  },
};
