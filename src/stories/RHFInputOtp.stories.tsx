import type { Meta, StoryObj } from '@storybook/react';
import RHFInputOtp from '../components/RHFInputOtp';

const meta = {
  title: 'Form/Text/InputOtp',
  component: RHFInputOtp,
  tags: ['autodocs'],
} satisfies Meta<typeof RHFInputOtp>;

export default meta;
type Story = StoryObj<typeof meta>;

export const InputOtp: Story = {
  args: {
    name: "inputOtpField",
    description: "inputOtpField",
    length: 4
  },
};
