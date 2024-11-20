import type { Meta, StoryObj } from '@storybook/react';
import RHFRadioGroup from '../components/RHFRadioGroup';

const meta = {
  title: 'Form/RadioGroup',
  component: RHFRadioGroup,
  tags: ['autodocs'],
} satisfies Meta<typeof RHFRadioGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const RadioGroup: Story = {
  args: {
    name: "radioField",
    data: [{
      key: "1",
      label: "Radio1"
    }, {
      key: "2",
      label: "Radio2"
    }],   
  },
};
