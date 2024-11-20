import type { Meta, StoryObj } from '@storybook/react';
import RHFDualDate from '../components/RHFDualDate';
import React from 'react';

const meta = {
  title: 'Form/Date/DualDate',
  component: RHFDualDate,
  tags: ['autodocs'],
  argTypes: {
    startDate: { control: "object" },
    endDate: { control: "object" },
  },
} satisfies Meta<typeof RHFDualDate>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Dates: Story = {
  args: {
    startDate: { name: "startDate", label: "startDate" },
    endDate: { name: "endDate", label: "endDate", color: "primary" },
  },
  render: story => (
    <div className='flex gap-4'>
      <RHFDualDate {...story} />
    </div>
  )
};
