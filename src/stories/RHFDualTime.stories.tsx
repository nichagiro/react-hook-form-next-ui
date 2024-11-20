import type { Meta, StoryObj } from '@storybook/react';
import RHFDualTime from '../components/RHFDualTime';
import React from 'react';

const meta = {
  title: 'Form/Time/DualTime',
  component: RHFDualTime,
  tags: ['autodocs'],
} satisfies Meta<typeof RHFDualTime>;

export default meta;
type Story = StoryObj<typeof meta>;

export const DualTime: Story = {
  args: {
    startTime: { name: "startTime", label: "startTime" },
    endTime: { name: "endTime", label: "endTime", color: "primary" }
  },
  render: story => (
    <div className='flex gap-4'>
      <RHFDualTime {...story} />
    </div>
  )
};
